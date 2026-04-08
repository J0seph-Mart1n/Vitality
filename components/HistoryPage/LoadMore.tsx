import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { HistoryColors } from "@/constants/Colors";

interface LoadMoreProps {
    visibleCount: number;
    recentScans: any[];
    setVisibleCount: (count: number) => void;
}

export const LoadMore = ({ visibleCount, recentScans, setVisibleCount }: LoadMoreProps) => {
    if (visibleCount >= recentScans.length) {
        return null;
    }

    return (
        <View style={styles.loadMoreContainer}>
            <TouchableOpacity
                style={styles.loadMoreBtn}
                onPress={() => setVisibleCount(visibleCount + 4)}
            >
                <Text style={styles.loadMoreText}>Load older scans</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    loadMoreContainer: {
        marginTop: 40,
        alignItems: 'center',
    },
    loadMoreBtn: {
        backgroundColor: HistoryColors.surfaceContainerLow,
        paddingHorizontal: 32,
        paddingVertical: 14,
        borderRadius: 14,
    },
    loadMoreText: {
        color: HistoryColors.onSurfaceVariant,
        fontSize: 16,
        fontWeight: '700',
    },
});