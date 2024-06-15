import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import axios from 'axios';

const FirstFloorScreen = ({ route, navigation }) => {
    const { floorId } = route.params;
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get(`https://norsucmis.online/api/floors/${floorId}/rooms`);
                setRooms(response.data);
            } catch (error) {
                console.error('Error fetching rooms:', error);
            }
        };

        fetchRooms();
    }, [floorId]);

    return (
        <View style={styles.container}>
            <Image source={require('../assets/logo.png')} style={styles.backgroundImage} />
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Floor {floorId}</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                {rooms.map((room) => (
                    <TouchableOpacity
                        key={room.id}
                        style={styles.roomButton}
                        onPress={() => navigation.navigate('RoomDetailsScreen', { roomId: room.id })}
                    >
                        <Text style={styles.roomButtonText}>{room.roomName}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f5d3', 
        
    },
    titleContainer: {
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    title: {
        fontSize: 24,
        top: 50,
        fontWeight: 'bold',
        marginBottom: 60,
    },
    scrollViewContainer: {
        flex: 1, 
        flexDirection: 'row', 
        flexWrap: 'wrap',
        justifyContent: 'center', 
        alignItems: 'center',
    },
    roomButton: {
        backgroundColor: '#fff',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#000',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: 150, 
        margin: 10, 
    },
    roomButtonText: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    backgroundImage: {
        position: 'absolute',
        width: 400, 
        top: 100,
        height: 400, 
        opacity: 0.1, 
        zIndex: -1, 
    },
});

export default FirstFloorScreen;
