import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async () => {
        if (!userName || !password || !confirmPassword) {
            setError('Please fill in all fields.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const response = await axios.post('https://norsucmis.online/api/register', {
                userName,
                password,
            });
            console.log(response.data); 
            navigation.navigate('Login'); 
        } catch (error) {
            console.error('Registration error:', error);
            setError('Registration failed. Please try again.');
        }
    };

    const handleNavigateToLogin = () => {
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <Image source={require('../images/logo1.png')} style={styles.logo} />
            <Text style={styles.title}>Register</Text>
            <View style={styles.title}>
                <Text style={styles.subtitle}>sign up to continue</Text>
            </View>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TextInput
                style={styles.input}
                placeholder="Username"
                onChangeText={text => setUsername(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={text => setPassword(text)}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                onChangeText={text => setConfirmPassword(text)}
                secureTextEntry
            />
            <TouchableOpacity style={styles.buttonConfirm} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            <View style={styles.loginButtonContainer}>
                <TouchableOpacity onPress={handleNavigateToLogin}>
                    <Text style={styles.registerText}>Already have an account?</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#20215e',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff', 
        marginBottom: 20,
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
    logo: {
        width: 250,
        height: 100,
        marginBottom: 20,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    loginButtonContainer: {
        marginTop: 10, 
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
    registerText: {
        color: '#2d8cf0',
        fontWeight: '600',
    },
    subtitle: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 17,
    },
});

export default RegisterScreen;
