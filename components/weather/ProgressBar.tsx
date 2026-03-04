import React from 'react';
import { StyleSheet, View } from 'react-native';

interface ProgressBarProps {
  progress: number; // 0 to 1
  startColor?: string;
  endColor?: string;
}

export function ProgressBar({ progress, startColor = '#FFD700', endColor = '#FF8C00' }: ProgressBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.background} />
      <View style={[styles.fill, { width: `${Math.min(Math.max(progress, 0), 1) * 100}%`, backgroundColor: startColor }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 4,
    borderRadius: 2,
    flex: 1,
    position: 'relative',
    backgroundColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.2, 
  },
  fill: {
    height: '100%',
    borderRadius: 2,
  },
});
