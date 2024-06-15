import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = ({ navigation }) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    
    const authenticateUser = async (username, password) => {
        try {
            const response = await axios.post('https://norsucmis.online/api/login', {
                userName: username,
                password: password,
                device_name: 'mobile'
            });

            const token = response.data.token;

            await AsyncStorage.setItem('userToken', token);

            return true;
        } catch (error) {
            console.error('Error authenticating user:', error);
            return false;
        }
    };

    const handleLogin = async () => {
        try {
            const isAuthenticated = await authenticateUser(userName, password);
            if (isAuthenticated) {
                navigation.navigate('Main');
            } else {
                setError('Invalid credentials. Please try again.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.error(err);
        }
    };

    const handleNavigateToRegistration = () => {
        navigation.navigate('Registration');
    };

    return (
        <View style={styles.form}>
            <Image source={require('../images/logo1.png')} style={styles.logo} />
            <View style={styles.title}>
                <Text style={styles.welcomeText}>Welcome,</Text>
                <Text style={styles.subtitle}>sign in to continue</Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Username"
                onChangeText={setUserName}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.buttonConfirm} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <View style={styles.registerLink}>
                <TouchableOpacity onPress={handleNavigateToRegistration}>
                    <Text style={styles.registerText}>Don't have an account? Register here</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    form: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#20215e',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: 'black',
        shadowColor: 'black',
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 1,
    },
    logo: {
        width: 250,
        height: 100,
        marginBottom: 20,
    },
    title: {
        marginBottom: 25,
    },
    subtitle: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 17,
    },
    input: {
        width: 250,
        height: 40,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: 'black',
        backgroundColor: 'beige',
        fontSize: 15,
        fontWeight: '600',
        color: '#323232',
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    buttonConfirm: {
        width: 120,
        height: 40,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: 'black',
        backgroundColor: 'beige',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    buttonText: {
        fontSize: 17,
        fontWeight: '600',
        color: '#323232',
    },
    registerLink: {
        alignItems: 'center',
    },
    registerText: {
        color: '#2d8cf0',
        fontWeight: '600',
    },
    welcomeText: {
        color: '#fff',
    },
    errorText: {
        color: 'red',
        marginTop: 10,
    },
});

export default LoginScreen;
