// components/VideoPlayer/TimeDisplay.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TimeDisplayProps } from '../types';

const TimeDisplay: React.FC<TimeDisplayProps> = ({ currentTime, duration }) => {
  const formatTime = (milliseconds: number): string => {
    if (!milliseconds || milliseconds <= 0) return '0:00';
    
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.timeContainer}>
      <Text style={styles.timeText}>
        {formatTime(currentTime)} / {formatTime(duration)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timeContainer: {
    marginLeft: 12,
  },
  timeText: {
    color: 'white',
    fontSize: 14,
  },
});

export default TimeDisplay;