import { useContext } from 'react';
import { Text } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { Styles } from '../styles/GlobalStyles';

interface VaultProps {
}

export default function Vault() {
    return (
        <>
           <Text>This is your vault.</Text>
        </>
    );
};
