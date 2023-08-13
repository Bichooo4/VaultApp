import { useContext } from 'react';
import { Text, Pressable } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { Styles } from '../styles/GlobalStyles';

interface ButtonProps {
    onPress: () => void;
    title: string;
    isBlue?: boolean;
    isGray?: boolean;
}

export default function Button({ title, onPress, isBlue, isGray }: ButtonProps) {
    const theme = useContext(ThemeContext);
    
    return (
        <Pressable
            style={({ pressed }) =>
                isBlue
                    ? [Styles.btnBlue, pressed && { opacity: 0.6 }]
                    : isGray
                    ? [Styles.btnGray, pressed && { opacity: 0.6 }]
                    : theme === 'light'
                    ? [Styles.btnLight, pressed && { opacity: 0.6 }]
                    : [Styles.btnDark, pressed && { opacity: 0.6 }]
            }
            onPress={onPress}
        >
            <Text
                style={
                    isBlue || isGray
                    ? Styles.smallTextLight
                    : theme === 'dark'
                    ? Styles.smallTextLight
                    : Styles.smallTextDark
                }
            >
                {title}
            </Text>
        </Pressable>
    );
}
