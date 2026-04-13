import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Platform,
    ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { DailyLogColors } from '@/constants/Colors';

interface BottomActionProps {
    showEstimate: boolean;
    isEstimating: boolean;
    isSaving: boolean;
    handleCalculateEstimate: () => void;
    handleSaveDailyLog: () => void;
}

export default function BottomAction({ showEstimate, isEstimating, isSaving, handleCalculateEstimate, handleSaveDailyLog }: BottomActionProps) {
    return (
        <>
            {showEstimate && (
                <View style={styles.bottomActionArea}>
                    <View style={{ flexDirection: 'row', gap: 12 }}>
                        <TouchableOpacity
                            style={[styles.submitButton, { flex: 1, backgroundColor: DailyLogColors.surfaceContainerHighest }]}
                            activeOpacity={0.8}
                            onPress={handleCalculateEstimate}
                            disabled={isEstimating || isSaving}
                        >
                            {isEstimating ? (
                                <ActivityIndicator color={DailyLogColors.secondary} size="small" />
                            ) : (
                                <>
                                    <MaterialIcons name="refresh" size={24} color={DailyLogColors.secondary} />
                                    <Text style={[styles.submitButtonText, { color: DailyLogColors.secondary }]}>Re-Analyze</Text>
                                </>
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.submitButton, { flex: 1.5 }]}
                            activeOpacity={0.8}
                            onPress={handleSaveDailyLog}
                            disabled={isSaving || isEstimating}
                        >
                            {isSaving ? (
                                <ActivityIndicator color={DailyLogColors.white} size="small" />
                            ) : (
                                <>
                                    <MaterialIcons name="add-task" size={24} color={DailyLogColors.white} />
                                    <Text style={styles.submitButtonText}>Save Log</Text>
                                </>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    bottomActionArea: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: Platform.OS === 'ios' ? 120 : 140, // Taller padding to raise content above the navbar
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.05)',
    },
    submitButton: {
        height: 64,
        backgroundColor: DailyLogColors.brandGreen,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        shadowColor: DailyLogColors.brandGreen,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    submitButtonText: {
        color: DailyLogColors.white,
        fontSize: 18,
        fontWeight: '800',
        letterSpacing: -0.5,
    },
})