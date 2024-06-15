import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Card, CheckBox } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccountSettings = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [changeUsername, setChangeUsername] = useState(false);
    const [changePassword, setChangePassword] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                const response = await fetch('https://norsucmis.online/api/user', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const result = await response.json();
                if (response.ok) {
                    setUserData(result);
                } else {
                    Alert.alert('Error', result.message || 'Failed to load user data.');
                }
            } catch (error) {
                Alert.alert('Error', 'Failed to load user data.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleFormSubmit = async (values) => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const updateData = {};
            if (values.userName) updateData.userName = values.userName;
            if (values.password) updateData.password = values.password;

            const response = await fetch('https://norsucmis.online/api/user/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(updateData),
            });

            const result = await response.json();

            if (response.ok) {
                Alert.alert('Success', 'Account details updated successfully.');
                if (values.userName) setUserData({ ...userData, userName: values.userName });
            } else {
                Alert.alert('Error', result.message || 'An error occurred.');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to update account details.');
        }
    };

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Account Settings</Text>

            <View style={[styles.card, styles.shadow, styles.centeredCard]}>
                <Text style={styles.cardTitle}>Current User</Text>
                <Text style={styles.userName}>{userData ? userData.userName : 'N/A'}</Text>
            </View>

            <View style={[styles.card, styles.shadow]}>
                <Text style={styles.cardTitle}>Change User Information</Text>
                <CheckBox
                    title="Change Username"
                    checked={changeUsername}
                    onPress={() => setChangeUsername(!changeUsername)}
                />
                <CheckBox
                    title="Change Password"
                    checked={changePassword}
                    onPress={() => setChangePassword(!changePassword)}
                />
                <Formik
                    initialValues={{ userName: '', password: '' }}
                    validationSchema={Yup.object({
                        userName: Yup.string().when('changeUsername', {
                            is: true,
                            then: Yup.string().required('Username is required'),
                        }),
                        password: Yup.string().when('changePassword', {
                            is: true,
                            then: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
                        }),
                    })}
                    onSubmit={handleFormSubmit}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View style={styles.form}>
                            {changeUsername && (
                                <>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="New Username"
                                        onChangeText={handleChange('userName')}
                                        onBlur={handleBlur('userName')}
                                        value={values.userName}
                                    />
                                    {touched.userName && errors.userName && (
                                        <Text style={styles.error}>{errors.userName}</Text>
                                    )}
                                </>
                            )}
                            {changePassword && (
                                <>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="New Password"
                                        secureTextEntry
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                    />
                                    {touched.password && errors.password && (
                                        <Text style={styles.error}>{errors.password}</Text>
                                    )}
                                </>
                            )}
                            <Button onPress={handleSubmit} title="Update" />
                        </View>
                    )}
                </Formik>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    card: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 16,
        marginBottom: 20,
    },
    centeredCard: {
        alignItems: 'center',
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0.3, height: 0.3 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    userName: {
        fontSize: 16,
        textAlign: 'center',
    },
    form: {
        marginTop: 10,
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
    },
    error: {
        fontSize: 12,
        color: 'red',
        marginBottom: 10,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default AccountSettings;
