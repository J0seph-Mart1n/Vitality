import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { HistoryColors } from "@/constants/Colors";

export const ListHeader = () => {
    return (
        <View style={styles.listHeader}>
            <View>
                <Text style={styles.labelTimeline}>TIMELINE</Text>
                <Text style={styles.titleHistory}>Scan History</Text>
            </View>
            <TouchableOpacity style={styles.sortButton}>
                <MaterialIcons name="sort" size={18} color={HistoryColors.primary} />
                <Text style={styles.sortButtonText}>Sort by Date</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    listHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 24,
    },
    labelTimeline: {
        fontSize: 12,
        fontWeight: '700',
        color: HistoryColors.primary,
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        marginBottom: 4,
    },
    titleHistory: {
        fontSize: 32,
        fontWeight: '800',
        color: HistoryColors.onSurface,
        letterSpacing: -0.5,
    },
    sortButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingBottom: 4,
    },
    sortButtonText: {
        color: HistoryColors.primary,
        fontSize: 14,
        fontWeight: '700',
    },
});