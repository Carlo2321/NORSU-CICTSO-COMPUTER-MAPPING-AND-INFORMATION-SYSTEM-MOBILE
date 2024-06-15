import React from 'react';
import 'react-native-gesture-handler';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { DrawerToggleButton, createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import RegistrationScreen from "./screens/RegistrationScreen"; 
import AccountSettings from "./screens/AccountSettings";
import FirstFloorScreen from "./screens/FirstFloorScreen";
import RoomDetailsScreen from './screens/RoomDetailsScreen';
import ComputerDetailsScreen from './screens/ComputerDetailsScreen';
import CustomDrawerContent from './screens/CustomDrawerContent';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const MainDrawerNavigator = () => {
    return (
        <Drawer.Navigator 
            screenOptions={{ headerShown: false }}
            drawerContent={props => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen 
                name='Home' 
                component={HomeScreen} 
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Icon name="home" size={size} color={color} />
                    ),
                }}
            />
        
            <Drawer.Screen 
                name='AccountSettings' 
                component={AccountSettings} 
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Icon name="settings" size={size} color={color} />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
};

const MainStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: true }}>
            <Stack.Screen 
                name="Home" 
                component={MainDrawerNavigator} 
                options={({ navigation }) => ({
                    headerLeft: () => <DrawerToggleButton navigation={navigation} />,
                    headerTitleAlign: "center",
                    headerTintColor: "white",
                    headerStyle: {
                        backgroundColor: "#3aa69c",
                    }
                })}
            />
            <Stack.Screen 
                name="FirstFloorScreen" 
                component={FirstFloorScreen} 
                options={{
                    title: 'Exit building',
                }} 
            />
            <Stack.Screen 
                name="RoomDetailsScreen" 
                component={RoomDetailsScreen} 
                options={{
                    title: 'Back to rooms',
                }} 
            />
            <Stack.Screen 
                name="ComputerDetailsScreen" 
                component={ComputerDetailsScreen} 
                options={{
                    title: 'Back to computers',
                }} 
            />
        </Stack.Navigator>
    );
};

const AuthStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
        </Stack.Navigator>
    );
};

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Auth" component={AuthStackNavigator} />
                <Stack.Screen name="Main" component={MainStackNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
