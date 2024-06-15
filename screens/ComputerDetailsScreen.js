import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image, TextInput } from 'react-native';
import axios from 'axios';

const ComputerDetailsScreen = ({ route, navigation }) => {
    const { computerId, roomId, authToken } = route.params;
    const [computerDetails, setComputerDetails] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [remarksModalVisible, setRemarksModalVisible] = useState(false);
    const [newRemarks, setNewRemarks] = useState('');

    useEffect(() => {
        const fetchComputerDetails = async () => {
            try {
                const response = await axios.get(`https://norsucmis.online/api/computers/${computerId}`);
                setComputerDetails(response.data);
                setNewRemarks(response.data.remarks || ''); 
            } catch (error) {
                console.error('Error fetching computer details:', error);
            }
        };

        fetchComputerDetails();
    }, [computerId]);

    const updateComputerStatus = async (status) => {
        try {
            const response = await axios.put(`https://norsucmis.online/api/computers/${computerId}/status`, 
                {working: status},
                { headers: { Authorization: `Bearer ${authToken}` } }
            );
            console.log('Computer status updated:', response.data);
            setModalVisible(false);
            navigation.navigate('RoomDetailsScreen', { roomId });
        } catch (error) {
            console.error('Error updating computer status:', error);
        }
    };

    const updateRemarks = async () => {
        try {
            const response = await axios.put(`https://norsucmis.online/api/computers/${computerId}/remarks`, 
            { remarks: newRemarks},
                { headers: { Authorization: `Bearer ${authToken}` } }
            );
            console.log('Remarks updated:', response.data);
            setRemarksModalVisible(false);
            setComputerDetails((prevDetails) => ({
                ...prevDetails,
                remarks: newRemarks,
            }));
        } catch (error) {
            console.error('Error updating remarks:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/logo.png')} style={styles.backgroundImage} />
            {computerDetails ? (
                <>
                    <Text style={styles.title}>{computerDetails.computerName}</Text>
                    <Text style={[styles.detailText, styles.infoBackground]}>Hostname: {computerDetails.computerName}</Text>
                    <Text style={[styles.detailText, styles.infoBackground]}>IP Address: {computerDetails.ipAddress}</Text>
                    <Text style={[styles.detailText, styles.infoBackground]}>MAC Address: {computerDetails.macAddress}</Text>
                    <View style={[styles.statusContainer, computerDetails.working ? styles.working : styles.notWorking]}>
                        <Text style={styles.statusText}>Status: {computerDetails.working ? 'Working' : 'Not working'}</Text>
                    </View>
                    <View style={[styles.statusContainer, styles.remarks]}>
                        <Text style={styles.statusText}>Remarks: {computerDetails.remarks}</Text>
                    </View>
                </>
            ) : (
                <Text style={styles.loadingText}>Loading...</Text>
            )}
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.changeStatusButton}>
                <Text style={styles.buttonText}>Change Status</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setRemarksModalVisible(true)} style={styles.changeStatusButton}>
                <Text style={styles.buttonText}>Add/Update Remarks</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Change Status</Text>
                        <TouchableOpacity
                            onPress={() => updateComputerStatus(true)}
                            style={[styles.modalButton, styles.workingButton]}
                        >
                            <Text style={styles.modalButtonText}>Working</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => updateComputerStatus(false)}
                            style={[styles.modalButton, styles.notWorkingButton]}
                        >
                            <Text style={styles.modalButtonText}>Not Working</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            style={[styles.modalButton, styles.cancelButton]}
                        >
                            <Text style={styles.modalButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={remarksModalVisible}
                onRequestClose={() => {
                    setRemarksModalVisible(!remarksModalVisible);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Add/Update Remarks</Text>
                        <TextInput
                            style={styles.remarksInput}
                            multiline
                            numberOfLines={4}
                            onChangeText={(text) => setNewRemarks(text)}
                            value={newRemarks}
                        />
                        <TouchableOpacity
                            onPress={updateRemarks}
                            style={[styles.modalButton, styles.saveButton]}
                        >
                            <Text style={styles.modalButtonText}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setRemarksModalVisible(false)}
                            style={[styles.modalButton, styles.cancelButton]}
                        >
                            <Text style={styles.modalButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f5d3',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'black',
    },
    detailText: {
        fontSize: 18,
        marginBottom: 10,
        color: 'black',
        padding: 10,
        borderRadius: 5,
    },
    infoBackground: {
        backgroundColor: 'white',
    },
    statusContainer: {
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
    },
    working: {
        backgroundColor: '#28a745',
    },
    notWorking: {
        backgroundColor: '#dc3545',
    },
    remarks: {
        backgroundColor: '#dc3545', 
    },
    statusText: {
        color: '#fff',
        fontSize: 16,
    },
    backgroundImage: {
        position: 'absolute',
        width: 400,
        height: 400,
        opacity: 0.1,
        zIndex: -1,
    },
    loadingText: {
        fontSize: 18,
        color: '#555',
    },
    changeStatusButton: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 5,
        marginTop: 20,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: 300,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    remarksInput: {
        width: '100%',
        height: 100,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    remarksInput: {
        width: '100%',
        height: 100,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        textAlignVertical: 'top', 
    },
    modalButton: {
        width: '100%',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 5,
    },
    modalButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    workingButton: {
        backgroundColor: '#28a745',
    },
    notWorkingButton: {
        backgroundColor: '#dc3545',
    },
    cancelButton: {
        backgroundColor: '#6c757d',
    },
    saveButton: {
        backgroundColor: '#007BFF',
    },
});

export default ComputerDetailsScreen;
