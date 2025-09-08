
import CustomVideoPlayer from '@/src/components/VideoPlayer/VideoPlayer';
import { bottomInsets } from '@/src/utils/resizing';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const RoughScreen = () => {
  const handlePlaybackStatusUpdate = (status: any) => {
    console.log('Playback status:', status);
  };
  return (
    <View style={styles.container}>
      <CustomVideoPlayer
        source={{ uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}}
        style={styles.videoPlayer}
        autoPlay={false}
        loop={false}
        showControls={true}
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
      />
    </View>
  )
}

export default RoughScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
  },
  videoPlayer: {
    width: '100%',
    bottom: bottomInsets
  },
});