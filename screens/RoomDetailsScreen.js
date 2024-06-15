import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

const RoomDetailsScreen = ({ route, navigation }) => {
    const { roomId } = route.params;
    const [roomDetails, setRoomDetails] = useState(null);
    const [computers, setComputers] = useState([]);

    const fetchRoomDetails = async () => {
        try {
            const response = await axios.get(`https://norsucmis.online/api/rooms/${roomId}`);
            setRoomDetails(response.data);
        } catch (error) {
            console.error('Error fetching room details:', error);
        }
    };

    const fetchComputers = async () => {
        try {
            const response = await axios.get(`https://norsucmis.online/api/rooms/${roomId}/computers`);
            setComputers(response.data);
        } catch (error) {
            console.error('Error fetching computers:', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchRoomDetails();
            fetchComputers();
        }, [roomId])
    );

    return (
        <View style={styles.container}>
            <Image source={require('../assets/logo.png')} style={styles.backgroundImage} />
            {roomDetails ? (
                <>
                    <Text style={styles.title}>{roomDetails.roomName}</Text>
                </>
            ) : (
                <Text>Loading...</Text>
            )}
            {computers.length > 0 && (
                <View style={styles.computersContainer}>
                    {computers.map((computer) => (
                        <TouchableOpacity
                            key={computer.id}
                            style={[
                                styles.computerButton,
                                computer.working ? styles.working : styles.notWorking,
                            ]}
                            onPress={() =>
                                navigation.navigate('ComputerDetailsScreen', {
                                    computerId: computer.id,
                                    roomId: roomId,
                                })
                            }
                        >
                            <Text style={styles.computerButtonText}>{computer.computerName}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
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
    title: {
        fontSize: 24,
        top: 50,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    computersContainer: {
        flex: 1,
        top: 50,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    },
    computerButton: {
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        margin: 10, 
    },
    computerButtonText: {
        color: '#fff',
        textShadowColor: '#000', 
        textShadowOffset: { width: 1, height: 1 }, 
        textShadowRadius: 1, 
    },
    working: {
        backgroundColor: '#3fab3e',
    },
    notWorking: {
        backgroundColor: '#eb3910',
    },
    backgroundImage: {
        position: 'absolute',
        width: 400, 
        height: 400, 
        opacity: 0.1, 
        zIndex: -1, 
    },
});

export default RoomDetailsScreen;
