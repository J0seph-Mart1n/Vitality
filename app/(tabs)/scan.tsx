import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Platform,
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';

const colors = {
  primaryFixed: '#a3f69c',
  primaryFixedDim: '#88d982',
  primaryContainer: '#5dac5b',
  white: '#ffffff',
  overlay: 'rgba(0, 0, 0, 0.6)',
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const VIEWFINDER_WIDTH = SCREEN_WIDTH * 0.75;
const VIEWFINDER_HEIGHT = VIEWFINDER_WIDTH * (4 / 3);
const BORDER_WIDTH = 1000;

const ScanScreen = () => {
    const [permission, requestPermission] = useCameraPermissions();
    const [flash, setFlash] = useState(false);
    const[gridVisible, setGridVisible] = useState(false);
    const cameraRef = useRef<any>(null);
    const isFocused = useIsFocused(); // Ensures camera stops when switching tabs

    // Animation for the scanning line
    const scanAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (isFocused) {
        Animated.loop(
            Animated.sequence([
            Animated.timing(scanAnim, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            }),
            Animated.timing(scanAnim, {
                toValue: 0,
                duration: 2000,
                useNativeDriver: true,
            }),
            ])
        ).start();
        } else {
        scanAnim.stopAnimation();
        }
    },[isFocused]);

    // Handle taking a photo
    const takePhoto = async () => {
        if (cameraRef.current) {
        try {
            const photo = await cameraRef.current.takePictureAsync({
            quality: 0.8,
            });
            // You can handle the image URI here (e.g., send to API, show preview)
            Alert.alert('Photo Captured!', `Image saved to cache: ${photo.uri.substring(0, 50)}...`);
            const formData = new FormData();
            formData.append('image', {
                uri: photo.uri,
                type: 'image/jpeg',
                name: 'nutrition.jpg',
            });

            try {
                const apiUrl = process.env.EXPO_PUBLIC_API_URL;
                const response = await fetch(`${apiUrl}/analyze-label`, {
                method: 'POST',
                body: formData,
                headers: { 'Content-Type': 'multipart/form-data' },
                });
                
                const data = await response.json();
                console.log("Analysis Results:", data);
                // Render data.benefits and data.harmful_effects in your UI
            } catch (error) {
                console.error(error);
            }
        } catch (error) {
            console.error('Failed to take photo', error);
        }
        }
    };

    // Permission UI
    if (!permission) return <View style={styles.container} />;
    if (!permission.granted) {
        return (
        <View style={styles.permissionContainer}>
            <Text style={styles.permissionText}>We need your permission to show the camera</Text>
            <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
            </TouchableOpacity>
        </View>
        );
    }

    const scanLineTranslateY = scanAnim.interpolate({
        inputRange:[0, 1],
        outputRange: [0, 430], // Adjust based on your viewfinder height
    });

    return (
        <View style={styles.container}>
            {isFocused && (
                <CameraView
                    ref={cameraRef}
                    style={[StyleSheet.absoluteFillObject, styles.camera]}
                    facing="back"
                    enableTorch={flash}
                >
                    <View style={styles.overlayContainer}>
                        {/* Header & Flash Toggle */}
                        <SafeAreaView style={styles.headerSafeArea}>
                            <View style={styles.header}>
                                <View style={styles.headerLeft} />
                                <View style={styles.headerRight}>
                                    <TouchableOpacity 
                                        style={[styles.iconButton, flash && styles.iconButtonActive]} 
                                        onPress={() => setFlash(!flash)}
                                    >
                                        <MaterialIcons 
                                            name={flash ? "flash-on" : "flash-off"} 
                                            size={24} 
                                            color={flash ? colors.primaryFixed : "#fff"} 
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </SafeAreaView>

                        {/* Top Overlay */}
                        <View style={styles.overlayDim} />

                        {/* Middle Row with Cutout */}
                        <View style={styles.middleRow}>
                        <View style={styles.overlayDim} />
                        
                        {/* The Viewfinder Cutout */}
                        <View style={styles.viewfinderContainer}>
                            {/* Rounded Mask Overlay */}
                            <View style={[StyleSheet.absoluteFill, { alignItems: 'center', justifyContent: 'center', zIndex: -1 }]} pointerEvents="none">
                                <View
                                    style={{
                                    width: VIEWFINDER_WIDTH + BORDER_WIDTH * 2,
                                    height: VIEWFINDER_HEIGHT + BORDER_WIDTH * 2,
                                    borderWidth: BORDER_WIDTH,
                                    borderColor: colors.overlay,
                                    borderRadius: BORDER_WIDTH + 32,
                                    }}
                                />
                            </View>

                            <View style={styles.viewfinder}>
                                {/* Corner Markers */}
                            <View style={[styles.corner, styles.topLeft]} />
                            <View style={[styles.corner, styles.topRight]} />
                            <View style={[styles.corner, styles.bottomLeft]} />
                            <View style={[styles.corner, styles.bottomRight]} />

                            {/* Grid Overlay */}
                            {gridVisible && (
                            <View style={StyleSheet.absoluteFillObject}>
                                <View style={styles.gridLineHorizontal} />
                                <View style={styles.gridLineHorizontal} />
                                <View style={styles.gridLineVertical} />
                                <View style={styles.gridLineVertical} />
                            </View>
                            )}

                            {/* Scanning Animation Line */}
                            <Animated.View
                            style={[
                                styles.scanLine,
                                { transform: [{ translateY: scanLineTranslateY }] },
                            ]}
                            />
                            </View>
                        </View>

                        <View style={styles.overlayDim} />
                        </View>

                        {/* Bottom Overlay & Controls */}
                        <View style={[styles.overlayDim, styles.bottomOverlay]}>
                        

                        {/* Bottom Card & Actions */}
                        <View style={styles.bottomControls}>
                            {/* Macro Snapshot Indicator */}
                            <View style={styles.statusCard}>
                                <View style={styles.statusIconBg}>
                                    <MaterialIcons name="local-dining" size={28} color={colors.primaryFixed} />
                                </View>
                                <View style={styles.statusTextContainer}>
                                    <Text style={styles.subGuidanceText}>Capture the label</Text>
                                    <Text style={styles.statusLabel}>DETECTING</Text>
                                </View>
                                {/* Shutter Button integrated into the flow */}
                                <TouchableOpacity style={styles.captureButtonMini} onPress={takePhoto}>
                                    <View style={styles.captureButtonInner} />
                                </TouchableOpacity>
                            </View>

                            {/* Tip Section */}
                            <View style={styles.tipContainer}>
                            <MaterialIcons name="lightbulb" size={20} color={colors.primaryFixedDim} />
                            <Text style={styles.tipText}>
                                Keep the label flat and avoid shadows for best results.
                            </Text>
                            </View>
                        </View>
                        </View>
                    </View>
                </CameraView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    permissionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#226137ff',
        padding: 24,
    },
    permissionText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    permissionButton: {
        backgroundColor: colors.primaryContainer,
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 12,
    },
    permissionButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    camera:{
        width: '100%',
        height: '100%',
    },
    // -- Overlay & Cutout System --
    overlayContainer: {
        flex: 1,
        zIndex: 10,
        paddingBottom: 60,   
    },
    overlayDim: {
        flex: 1,
    },
    middleRow: {
        flexDirection: 'row',
        height: VIEWFINDER_HEIGHT,
    },
    viewfinderContainer: {
        width: VIEWFINDER_WIDTH,
        height: VIEWFINDER_HEIGHT,
        position: 'relative',
    },
    viewfinder: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 32,
        backgroundColor: 'transparent',
        overflow: 'hidden',
    },
    // -- Viewfinder Corners --
    corner: {
        position: 'absolute',
        width: 40,
        height: 40,
        borderColor: colors.primaryFixed,
        zIndex: 30,
    },
    topLeft: {
        top: 0, left: 0,
        borderTopWidth: 4, borderLeftWidth: 4,
        borderTopLeftRadius: 32,
    },
    topRight: {
        top: 0, right: 0,
        borderTopWidth: 4, borderRightWidth: 4,
        borderTopRightRadius: 32,
    },
    bottomLeft: {
        bottom: 0, left: 0,
        borderBottomWidth: 4, borderLeftWidth: 4,
        borderBottomLeftRadius: 32,
    },
    bottomRight: {
        bottom: 0, right: 0,
        borderBottomWidth: 4, borderRightWidth: 4,
        borderBottomRightRadius: 32,
    },
    // -- Viewfinder Scanning Effects --
    scanLine: {
        width: '100%',
        height: 2,
        backgroundColor: colors.primaryFixed,
        shadowColor: colors.primaryFixed,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 5,
    },
    gridLineHorizontal: {
        position: 'absolute',
        width: '100%',
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.2)',
        top: '33%',
    },
    gridLineVertical: {
        position: 'absolute',
        height: '100%',
        width: 1,
        backgroundColor: 'rgba(255,255,255,0.2)',
        left: '33%',
    },
    // -- Bottom Section --
    bottomOverlay: {
        alignItems: 'center',
        paddingTop: 24,
        paddingBottom: Platform.OS === 'ios' ? 120 : 100, // Clearance for tab bar
        zIndex: 20,
    },
    guidanceText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
    },
    subGuidanceText: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 16,
        marginTop: 1,
        marginBottom: 10,
    },
    bottomControls: {
        width: '100%',
        alignItems: 'center',
        gap: 16,
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 120 : 100,
    },
    statusCard: {
        width: '90%',
        maxWidth: 400,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 28,
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusIconBg: {
        width: 56,
        height: 56,
        borderRadius: 16,
        backgroundColor: 'rgba(93, 172, 91, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    statusTextContainer: {
        flex: 1,
    },
    statusLabel: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 1.5,
    },
    statusTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
        marginTop: 2,
    },
    captureButtonMini: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 3,
        borderColor: 'rgba(255,255,255,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    captureButtonInner: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: colors.primaryFixed,
    },
    tipContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.05)',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        width: '90%',
        maxWidth: 400,
    },
    tipText: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 12,
        marginLeft: 12,
        flex: 1,
    },
    // -- Header --
    headerSafeArea: {
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: 50,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: Platform.OS === 'android' ? 40 : 16, // Top padding for android status bar
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
        marginLeft: 12,
    },
    headerRight: {
        flexDirection: 'row',
        gap: 8,
    },
    iconButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconButtonActive: {
        backgroundColor: 'rgba(163, 246, 156, 0.3)', // primaryFixed tint
    },
});

export default ScanScreen;