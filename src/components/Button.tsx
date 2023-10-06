import { useContext } from 'react';
import { Text, Pressable } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { Styles } from '../styles/GlobalStyles';

interface ButtonProps {
    onPress: () => void;
    title: string;
    isOrange?: boolean;
    isGray?: boolean;
    style?: any;
    isSelectedOperation?: boolean; // Add isSelectedOperation prop
}

export default function Button({ title, onPress, isOrange: isBlue, isGray, isSelectedOperation }: ButtonProps) {
    const theme = useContext(ThemeContext);
    
    return (
        <Pressable
            style={({ pressed }) =>
                isSelectedOperation 
                    ? [Styles.selectedOperation, pressed && { opacity: 0.6 }]
                    : isBlue
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
