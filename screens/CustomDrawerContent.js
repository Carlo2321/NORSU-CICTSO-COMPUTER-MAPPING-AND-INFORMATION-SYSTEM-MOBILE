import React from 'react';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CustomDrawerContent = (props) => {
    const navigation = useNavigation();

    const handleLogout = () => {
        navigation.replace('Auth', { screen: 'Login' });
    };

    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Icon name="logout" size={24} color="#274c5c" />
                <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between', 
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginHorizontal: 16,
        marginBottom: 10, 
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
    },
    logoutButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#274c5c',
        marginLeft: 10,
    },
});

export default CustomDrawerContent;
