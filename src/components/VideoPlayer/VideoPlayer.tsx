// components/VideoPlayer/VideoPlayer.tsx
import { screenHeight, screenWidth } from '@/src/utils/resizing';
import { TimeUpdateEventPayload, useVideoPlayer, VideoPlayer, VideoView } from 'expo-video';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AppPressable from '../ui/AppPressable/AppPressable';
import Controls from './components/Controls';
import ErrorView from './components/ErrorView';
import { VideoPlayerProps, VideoPlayerStatus } from './types';


const CustomVideoPlayer: React.FC<VideoPlayerProps> = ({
    source,
    style,
    resizeMode = 'contain',
    autoPlay = false,
    loop = false,
    muted = false,
    onPlaybackStatusUpdate,
    showControls = true,
    ...props
}) => {
    const videoRef = useRef<VideoView>(null);
    const player = useVideoPlayer(source, (player: VideoPlayer) => {
        player.loop = loop;
        player.muted = muted;
        if (autoPlay) {
            player.play();
        }
    });

    const [status, setStatus] = useState<VideoPlayerStatus>({
        isPlaying: false,
        isBuffering: false,
        isMuted: muted,
        position: 0,
        duration: 0,
        isLoaded: false
    });

    const [showPlayerControls, setShowPlayerControls] = useState<boolean>(showControls);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        if (!player) return;

        const subscriptions: any[] = [];

        const playingChangeSub = player.addListener('playingChange', ({ isPlaying, oldIsPlaying }) => {
            setStatus(prev => ({ ...prev, isPlaying }));
        });

        const statusChangeSub = player.addListener('statusChange', (payload) => {
            const isBuffering = payload.status === 'loading';
            const isIdle = payload.status === 'idle'
            console.log("AFD000", payload.error )
            setStatus(prev => ({ ...prev, isLoaded: payload.status === 'readyToPlay', isBuffering }));
            setIsLoading(isBuffering || isIdle);

            if (payload.error) {
                setError(payload.error);
                setIsLoading(false);
            }
        });

        const muteChangeSub = player.addListener('mutedChange', (payload) => {
            setStatus(prev => ({ ...prev, isMuted: payload.muted }));
        });

        // Removed bufferingChangeSub and errorSub as they are handled by statusChangeSub

        const progressSub = player.addListener('timeUpdate', ({ currentTime: position, currentLiveTimestamp }: TimeUpdateEventPayload) => {
            console.error("yiyiuijoj", position, currentLiveTimestamp)
            const newStatus = { ...status, position, duration: player.duration };
            setStatus(newStatus);
            onPlaybackStatusUpdate?.(newStatus);

        });

        subscriptions.push(
            playingChangeSub,
            muteChangeSub,
            statusChangeSub,
            progressSub
        );

        return () => {
            subscriptions.forEach(sub => sub.remove());
        };
    }, [player]);

    const togglePlayPause = (): void => {
        if (!player) return;

        if (status.isPlaying) {
            player.pause();
        } else {
            player.play();
        }
    };

    const toggleMute = (): void => {
        if (!player) return;
        player.muted = !status.isMuted;
    };

    const seekTo = (position: number): void => {
        if (!player) return;
        player.currentTime = position;
    };

    const toggleControls = (): void => {
        setShowPlayerControls(prev => !prev);
    };

    const enterFullscreen = (): void => {
        if (videoRef.current) {
            videoRef.current.enterFullscreen();
        }
    };

    if (error) {
        return <ErrorView error={error} onRetry={() => setError(null)} />;
    }

    return (
        <View style={[styles.container, style]}>
            <AppPressable
                disabledAnimation
                onPress={() => {
                    // togglePlayPause()
                    setShowPlayerControls(prev => !prev)
                }}
                style={[StyleSheet.absoluteFillObject, { zIndex: 1, backgroundColor: showPlayerControls ?  'rgba(0,0,0,0.5)' : 'transparent' }]} />

            {player && (
                <VideoView
                    ref={videoRef}
                    player={player}
                    style={styles.video}
                    contentFit={resizeMode}
                    allowsFullscreen
                    allowsPictureInPicture
                    nativeControls={false}
                    {...props}
                />
            )}

          

            {showPlayerControls && player && (
                <Controls
                    status={status}
                    onPlayPause={togglePlayPause}
                    onSeek={seekTo}
                    isLoading={isLoading}
                    onToggleMute={toggleMute}
                    onToggleFullscreen={enterFullscreen}
                    onToggleControls={toggleControls}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        overflow: 'hidden',
        width: screenWidth,
        height: screenHeight,
    },
    video: {
        width: screenWidth,
        height: screenHeight,
        // backgroundColor:'red'
    },
});

export default CustomVideoPlayer;