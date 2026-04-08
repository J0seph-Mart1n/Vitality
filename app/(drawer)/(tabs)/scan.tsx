import React, { useState, useRef } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';
import { takePhoto } from '@/functions/TakePhoto';
import ScanHeader from '@/components/ScanPage/ScanHeader';
import ScanView from '@/components/ScanPage/ScanView';
import BottomControls from '@/components/ScanPage/BottomControls';
import Permission from '@/components/ScanPage/Permission';
import AnalyzingModal from '@/components/ScanPage/AnalyzingModal';

const ScanScreen = () => {
    const [permission, requestPermission] = useCameraPermissions();
    const [flash, setFlash] = useState(false);
    const cameraRef = useRef<any>(null);
    const isFocused = useIsFocused(); // Ensures camera stops when switching tabs
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    // Permission UI
    if (!permission) return <View style={styles.container} />;
    if (!permission.granted) {
        return (
            <Permission requestPermission={requestPermission} />
        );
    }

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
                        <ScanHeader flash={flash} setFlash={setFlash} />

                        {/* Top Overlay */}
                        <View style={styles.overlayDim} />

                        {/* Middle Row with Cutout */}
                        <ScanView isFocused={isFocused} />

                        {/* Bottom Overlay & Controls */}
                        <BottomControls takePhoto={() => takePhoto(cameraRef, isAnalyzing, setIsAnalyzing)} />
                    </View>
                </CameraView>
            )}

            {/* Global Loading Modal */}
            <AnalyzingModal isAnalyzing={isAnalyzing} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    camera: {
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
});

export default ScanScreen;