import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

interface WeatherCardProps {
  title?: string;
  icon?: string;
  children: React.ReactNode;
  style?: ViewStyle;
}

export function WeatherCard({ title, icon, children, style }: WeatherCardProps) {
  const colorScheme = useColorScheme();
  const weatherColors = Colors[colorScheme ?? 'light'].weather;

  return (
    <View style={[styles.container, { backgroundColor: weatherColors.cardBg }, style]}>
      {title && (
        <View style={styles.header}>
            {icon && <IconSymbol name={icon as any} size={18} color={weatherColors.textSecondary} style={{marginRight: 6}} />}
            <ThemedText style={[styles.title, { color: weatherColors.textSecondary },{fontSize:14 }]}>{title}</ThemedText>
        </View>
      )}
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  title: {
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
  flex: 1,
  justifyContent: 'center',
}
});
