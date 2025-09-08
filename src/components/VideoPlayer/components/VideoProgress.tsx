// components/VideoPlayer/ProgressBar.tsx
import Slider from '@react-native-community/slider';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ProgressBarProps } from '../../types/videoPlayer';

const ProgressBar: React.FC<ProgressBarProps> = ({ currentTime, duration, onSeek }) => {
  const [isSeeking, setIsSeeking] = useState<boolean>(false);

  const handleValueChange = (value: number): void => {
    setIsSeeking(true);
  };

  const handleSlidingComplete = (value: number): void => {
    setIsSeeking(false);
    const seekPosition = value * duration;
    onSeek(seekPosition);
  };

  const progress = duration > 0 ? currentTime / duration : 0;

  return (
    <View style={styles.progressContainer}>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        value={progress}
        minimumTrackTintColor="#FF0000"
        maximumTrackTintColor="#FFFFFF"
        thumbTintColor="#FF0000"
        onValueChange={handleValueChange}
        onSlidingComplete={handleSlidingComplete}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
  },
  slider: {
    width: '100%',
    height: 40,
  },
});

export default ProgressBar;