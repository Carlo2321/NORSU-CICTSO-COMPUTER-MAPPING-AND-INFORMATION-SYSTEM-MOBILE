import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import BuildingButton from './BuildingButton';

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/logo.png')} style={styles.backgroundImage} />
            <BuildingButton />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f5d3', 
    },
    backgroundImage: {
        position: 'absolute',
        width: 400, 
        height: 400, 
        opacity: 0.2, 
        zIndex: -1, 
    },
});

export default HomeScreen;
