import AppPressable from '@/src/components/ui/AppPressable/AppPressable';
import { screenHeight, screenWidth } from '@/src/utils/resizing';
import { MutedChangeEventPayload, StatusChangeEventPayload, TimeUpdateEventPayload, useVideoPlayer, VideoPlayer, VideoView } from 'expo-video';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import PlayerControls from '../Player/Components/PlayerControls'; // Will create this
import PlayerError from '../Player/Components/PlayerError'; // Will create this
import PlayerLoading from '../Player/Components/PlayerLoading'; // Will create this
import { VideoPlayerProps, VideoPlayerStatus } from '../Player/types';

const CustomVideoPlayer: React.FC<VideoPlayerProps> = ({
    source,
    style,
    resizeMode = 'fill',
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
        player.timeUpdateEventInterval = 0.1;
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

        const playingChangeSub = player.addListener('playingChange', ({ isPlaying }) => {
            setStatus((prev: VideoPlayerStatus) => ({ ...prev, isPlaying }));
        });

        const statusChangeSub = player.addListener('statusChange', (payload: StatusChangeEventPayload) => {
            const isBuffering = payload.status === 'loading';
            const isIdle = payload.status === 'idle';
            setStatus((prev: VideoPlayerStatus) => ({ ...prev, isLoaded: payload.status === 'readyToPlay', isBuffering }));
            setIsLoading((isBuffering || isIdle));

            if (payload.error) {
                setError(payload.error);
                setIsLoading(false);
            }
        });

        const muteChangeSub = player.addListener('mutedChange', ({ muted: isMuted }: MutedChangeEventPayload) => {
            setStatus((prev: VideoPlayerStatus) => ({ ...prev, isMuted }));
        });

        const progressSub = player.addListener('timeUpdate', ({ currentTime: position }: TimeUpdateEventPayload) => {
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

    const enterFullscreen = (): void => {
        if (videoRef.current) {
            videoRef.current.enterFullscreen();
        }
    };

    if (error) {
        return <PlayerError error={error} onRetry={() => setError(null)} />;
    }

    return (
        <View style={[styles.container, style]}>
            <AppPressable
                disabledAnimation
                onPress={() => {
                    setShowPlayerControls((prev: boolean) => !prev)
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

            {isLoading && <PlayerLoading />}

            {showPlayerControls && player && (
                <PlayerControls
                    status={status}
                    onPlayPause={togglePlayPause}
                    onSeek={seekTo}
                    onToggleMute={toggleMute}
                    onToggleFullscreen={enterFullscreen}
                    isLoading={isLoading}
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
    },
});

export default CustomVideoPlayer;
