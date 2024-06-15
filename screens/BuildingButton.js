import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const BuildingButton = () => {
    const [showFloors, setShowFloors] = useState(false);
    const [building, setBuilding] = useState(null);
    const [floors, setFloors] = useState([]);
    const navigation = useNavigation();  

    useEffect(() => {
        const fetchBuildingData = async () => {
            try {
                const response = await axios.get('https://norsucmis.online/api/buildings');
                if (response.data && response.data.length > 0) {
                    setBuilding(response.data[0]); 
                    setFloors(response.data[0].floors || []); 
                }
                console.log('Building Data:', response.data);
            } catch (error) {
                console.error('Error fetching building data:', error);
            }
        };

        fetchBuildingData();
    }, []);

    useEffect(() => {
        const fetchFloorData = async () => {
            try {
                const response = await axios.get('https://norsucmis.online/api/floors');
                setFloors(response.data);
                console.log('Floors Data:', response.data);
            } catch (error) {
                console.error('Error fetching floor data:', error);
            }
        };
    
        fetchFloorData();
    }, []);

    const toggleFloors = () => {
        setShowFloors(!showFloors);
    };

    const selectFloor = (floorId) => {
        navigation.navigate('FirstFloorScreen', { floorId });
    };

    const renderFloorButtons = () => {
        return floors.map((floor) => (
            <TouchableOpacity
                key={floor.id}
                onPress={() => selectFloor(floor.id)}
                style={styles.floorButton}
            >
                <Text style={styles.floorButtonText}>{floor.floorNumber}</Text>
            </TouchableOpacity>
        ));
    };

    const redirectToRoomWithMostNotWorking = async () => {
        try {
            const response = await axios.get('https://norsucmis.online/api/most-not-working-rooms');
            const room = response.data.room;
            if (room && room.id) {
                navigation.navigate('RoomDetailsScreen', { roomId: room.id });
            } else {
                console.error('Room data is not available');
            }
        } catch (error) {
            console.error('Error redirecting to room with most not working computers:', error);
        }
    };

    return (
        <View style={styles.container}>
            {building && (
                <TouchableOpacity onPress={toggleFloors} style={styles.buildingButton}>
                    <Text style={styles.buildingButtonText}>{building.buildingName}</Text>
                </TouchableOpacity>
            )}
            {showFloors && floors && floors.length > 0 && (
                <View style={styles.floorContainer}>
                    {renderFloorButtons()}
                </View>
            )}
            <TouchableOpacity onPress={redirectToRoomWithMostNotWorking} style={styles.exclamationButton}>
                <Text style={styles.exclamationButtonText}>!</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    buildingButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
        backgroundColor: '#ff5252',
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 8,
        elevation: 5,
    },
    buildingButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    floorContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 10,
    },
    floorButton: {
        backgroundColor: '#b4debe',
        padding: 8,
        borderRadius: 5,
        margin: 5,
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 8,
        backgroundColor: '#ff5252',
        elevation: 3,
    },
    floorButtonText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#fff',
    },
    exclamationButton: {
        backgroundColor: '#ff0',
        padding: 8,
        left: 155,
        width: 30,
        top: -40,
        borderRadius: 50,
        elevation: 5,
    },
    exclamationButtonText: {
        fontSize: 14,
        position: 'relative',
        textAlign: "center",
        fontWeight: 'bold',
        color: '#000',
    },
});

export default BuildingButton;
