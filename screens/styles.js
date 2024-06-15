import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#20215e',
    },
    logo: {
        width: 300,
        height: 100,
        marginBottom: 20,
    },
    title: {
        color: '#ffffff', 
        fontSize: 24,
        marginBottom: 10,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    textColor: {
        color: '#ffffff', // Text color
    },
    button: {
        position: 'relative',
        display: 'inline-block',
        cursor: 'pointer',
        borderWidth: 0,
        verticalAlign: 'middle',
        textDecoration: 'none',
        fontFamily: 'inherit',
        fontSize: 15,
        backgroundColor: '#1899D6',
        borderRadius: 16,
        paddingVertical: 13,
        paddingHorizontal: 19,
        marginVertical: 10,
    },
    buttonText: {
        fontWeight: '600',
        color: '#382b22', // Keep color from referred code
        textTransform: 'uppercase',
    },
    learnMoreButton: {
        position: 'relative',
        display: 'inline-block',
        cursor: 'pointer',
        borderWidth: 2,
        borderColor: '#b18597',
        borderRadius: 16,
        paddingVertical: 13,
        paddingHorizontal: 19,
        marginVertical: 10,
        backgroundColor: '#fff0f0',
    },
    input: {
        width: '80%', // Adjust the width as needed
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        color: '#ffffff',
    },
    registerButtonContainer: {
        marginTop: 10, 
    },
});

export default styles;
