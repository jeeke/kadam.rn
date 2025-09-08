import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import AppPressable from '../../ui/AppPressable/AppPressable';
import { PlayerControlsProps } from '../types';

const PlayerControls: React.FC<PlayerControlsProps> = ({
    status,
    onPlayPause,
    isLoading
}) => {
    const renderPlayPauseButton = () => {
        if (isLoading) {
            return <ActivityIndicator size="large" color="#fff" />;
        }

        return (
            <AppPressable onPress={onPlayPause} style={styles.playPauseButton}>
                <Text style={styles.playPauseText}>
                    {status.isPlaying ? 'Pause' : 'Play'}
                </Text>
            </AppPressable>
        );
    };

    return (
        <View style={styles.container}>
            {renderPlayPauseButton()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
    },
    playPauseButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    playPauseText: {
        color: '#fff',
        fontSize: 20,
    },
});

export default PlayerControls;
