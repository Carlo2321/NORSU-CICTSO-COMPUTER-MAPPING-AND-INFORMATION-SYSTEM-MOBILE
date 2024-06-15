import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';

const DrawerToggleButton = ({ navigation }) => {
    return (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Icon name="menu" size={30} color="black" />
        </TouchableOpacity>
    );
};

export default DrawerToggleButton;
