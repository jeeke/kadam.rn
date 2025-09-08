import { VideoView, useVideoPlayer } from "expo-video";
import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const { height, width } = Dimensions.get("window");

const videos = [
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  ];

function ReelItem({ uri, isActive }: { uri: string; isActive: boolean }) {
  const player = useVideoPlayer(uri, (player) => {
    player.loop = true;
    if (isActive) player.play();
  });

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isActive) {
      player.play();
    } else {
      player.pause();
    }
  }, [isActive]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (player?.duration > 0) {
        setProgress(player.currentTime / player.duration);
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.reel}>
      <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen={false}
        allowsPictureInPicture={false}
        contentFit="cover"
      />

      <View style={styles.overlay}>
        <Text style={styles.caption}>Awesome Reel 🎬</Text>
        <Text style={styles.author}>by Creator</Text>
        <View style={styles.actions}>
          <TouchableOpacity><Text style={styles.actionBtn}>❤️</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.actionBtn}>💬</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.actionBtn}>🔗</Text></TouchableOpacity>
        </View>
      </View>

      {/* <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { flex: progress }]} />
        <View style={{ flex: 1 - progress }} />
      </View> */}
    </View>
  );
}

export default function VideoScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <FlatList
      data={videos}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item, index }) => (
        <ReelItem uri={item} isActive={currentIndex === index} />
      )}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      onMomentumScrollEnd={(event) => {
        const newIndex = Math.round(event.nativeEvent.contentOffset.y / height);
        setCurrentIndex(newIndex);
      }}
      windowSize={3}
      initialNumToRender={2}
    />
  );
}

const styles = StyleSheet.create({
  reel: { width, height, backgroundColor: "black" },
  video: { width: "100%", height: "90%" },
  overlay: {
    position: "absolute",
    bottom: 100,
    width: "100%",
    paddingHorizontal: 20,
    
  },
  caption: { color: "#fff", fontSize: 16, marginBottom: 4 },
  author: { color: "#d1d5db", marginBottom: 10 },
  actions: {
    position: "absolute",
    right: 20,
    bottom: 40,
    alignItems: "center",
  },
  actionBtn: { fontSize: 28, marginBottom: 20, color: "#fff" },
  progressBarContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    flexDirection: "row",
    width: "100%",
    height: 4,
    backgroundColor: "#333",
  },
  progressBar: {
    height: 4,
    backgroundColor: "#fff",
  },
});

