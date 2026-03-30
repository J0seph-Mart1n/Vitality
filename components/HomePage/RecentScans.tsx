import { StyleSheet, Text, View, Animated, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { recentScans } from '@/constants/SampleScans';
import { colors } from '@/constants/Colors';

const VISIBLE_COUNT = 3;

export default function RecentScans() {
    
    const displayedScans = recentScans.slice(0, VISIBLE_COUNT);

    return (
        <View style={styles.section}>
          <View style={styles.recentScansHeader}>
            <Text style={styles.recentScansTitle}>Recent Scans</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.scansGrid}>
            {displayedScans.map((scan) => (
              <TouchableOpacity key={scan.id} style={styles.scanItem}>
                <Image source={{ uri: scan.image }} style={styles.scanImage} />
                <View style={styles.scanDetails}>
                  <Text style={styles.scanTitle} numberOfLines={1}>
                    {scan.title}
                  </Text>
                  <Text style={styles.scanSubtitle}>{scan.subtitle}</Text>
                </View>
                <View style={styles.scanStatus}>
                  <View style={[styles.statusIconBg, { backgroundColor: scan.statusColor + '20' }]}>
                    <MaterialIcons name={scan.icon as any} size={20} color={scan.statusColor} />
                  </View>
                  <Text style={[styles.statusText, { color: scan.statusColor }]}>{scan.statusText}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
  section: {
    marginTop: 24,
    marginBottom: 24,
  },
  recentScansHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  recentScansTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.onSurface,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  scansGrid: {
    gap: 12,
  },
  scanItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLow,
    padding: 12,
    borderRadius: 16,
  },
  scanImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: colors.surfaceContainerHigh,
    marginRight: 16,
  },
  scanDetails: {
    flex: 1,
  },
  scanTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 4,
  },
  scanSubtitle: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
  },
  scanStatus: {
    alignItems: 'center',
    marginLeft: 12,
  },
  statusIconBg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
})