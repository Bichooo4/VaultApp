import React, { useState, useEffect, useContext } from "react";
import { View, Text, Alert, Pressable } from "react-native";
import * as SecureStore from 'expo-secure-store';
import Button from "./Button";
import { Styles } from "../styles/GlobalStyles";
import { myColors } from '../styles/colors';
import { ThemeContext } from '../context/ThemeContext';

interface MyKeyboardProps {
  navigation: any;
}

const MyKeyboard: React.FC<MyKeyboardProps> = ({ navigation }) => {
  const key = 'passcode';
  const [passcode, setPasscode] = useState('');
  const [displayValue, setDisplayValue] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operation, setOperation] = useState(null);
  const [selectedOperation, setSelectedOperation] = useState(null);

  useEffect(() => {
    getValueFor(key);
  }, []);

  const save = async (key: string, value: string): Promise<void> => {
    await SecureStore.setItemAsync(key, value);
  }

  const getValueFor = async (key: string): Promise<void> => {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      setPasscode(result);
    }
  }

  const handleNumberPress = (buttonValue: string) => {
    if (buttonValue === "." && displayValue.includes(".")) {
      Alert.alert('Error', 'You cannot add more than one decimal point');
      return;
    }
    if (displayValue === '0' || operation) {
      setDisplayValue(buttonValue);
    } else if (displayValue.length < 10) {
      setDisplayValue(displayValue + buttonValue);
    }
  };

  const handleOperationPress = (buttonValue: string) => {
    let percentage;
  
    if (buttonValue === '+/-') {
      if (displayValue.length === 6) {
        setPasscode(displayValue);
        save(key, displayValue);
      }
    }
    if (buttonValue === "％") {
      if (displayValue === passcode) {
        navigation.navigate('Vault');
      } else if (displayValue !== passcode) {
        percentage = parseFloat(displayValue) / 100;
        setDisplayValue(percentage.toString());
      }
    } else {
      if (selectedOperation) {
        // Handle consecutive operation presses
        setOperation(buttonValue);
        setSelectedOperation(buttonValue);
      } else {
        setSelectedOperation(buttonValue);
        setFirstOperand(displayValue);
        setOperation(buttonValue);
      }
    }
  };

  const handleClearPress = () => {
    setDisplayValue('0');
    setFirstOperand(null);
    setOperation(null);
    setSelectedOperation(null);
  };

  const handleEqualPress = () => {
    if (!operation || !firstOperand) {
      return;
    }

    const secondOperand = parseFloat(displayValue);
    let result = 0;

    switch (operation) {
      case '+':
        result = parseFloat(firstOperand) + secondOperand;
        break;
      case '-':
        result = parseFloat(firstOperand) - secondOperand;
        break;
      case '*':
        result = parseFloat(firstOperand) * secondOperand;
        break;
      case '/':
        result = parseFloat(firstOperand) / secondOperand;
        break;
      default:
        return;
    }

    setDisplayValue(result.toString());
    setFirstOperand(null);
    setOperation(null);
    setSelectedOperation(null);
  };

  const theme = useContext(ThemeContext);
  const displayValueStyle = [
    { fontSize: displayValue.length >= 7 ? 60 : 78, },
    theme === 'light' ? { color: 'black' } : { color: 'white' }
  ];

  const zeroButtonStyle = theme === 'light' ? Styles.btnZeroLight : Styles.btnZeroDark;
  const getSelectedOperationStyle = (buttonValue: string) => {
    if (buttonValue === selectedOperation) {
      return false;
    } else {
      return true; // Return null to remove all other styles from the button
    }
  };

  const isSlectedOperationStyle = (buttonValue: string) => {
    if (buttonValue === selectedOperation) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <View style={Styles.viewBottom}>
      <View style={{ height: 120, width: "90%", justifyContent: "flex-end", alignSelf: "center" }}>
        <Text style={displayValueStyle}>{displayValue}</Text>
      </View>
      <View style={Styles.row}>
        <Button title="C" isGray onPress={handleClearPress} />
        <Button title="+/-" isGray onPress={() => handleOperationPress("+/-")} />
        <Button title="％" isGray onPress={() => handleOperationPress("％")} />
        <Button title="÷" isOrange={getSelectedOperationStyle('/')} isSelectedOperation={isSlectedOperationStyle('/')} onPress={() => handleOperationPress("/")} />
      </View>
      <View style={Styles.row}>
        <Button title="7" onPress={() => handleNumberPress("7")} />
        <Button title="8" onPress={() => handleNumberPress("8")} />
        <Button title="9" onPress={() => handleNumberPress("9")} />
        <Button title="×" isOrange={getSelectedOperationStyle('*')} isSelectedOperation={isSlectedOperationStyle('*')} onPress={() => handleOperationPress("*")} />
      </View>
      <View style={Styles.row}>
        <Button title="4" onPress={() => handleNumberPress("4")} />
        <Button title="5" onPress={() => handleNumberPress("5")} />
        <Button title="6" onPress={() => handleNumberPress("6")} />
        <Button title="-" isOrange={getSelectedOperationStyle('-')} isSelectedOperation={isSlectedOperationStyle('-')} onPress={() => handleOperationPress("-")} />
      </View>
      <View style={Styles.row}>
        <Button title="1" onPress={() => handleNumberPress("1")} />
        <Button title="2" onPress={() => handleNumberPress("2")} />
        <Button title="3" onPress={() => handleNumberPress("3")} />
        <Button title="+" isOrange={getSelectedOperationStyle('+')} isSelectedOperation={isSlectedOperationStyle('+')} onPress={() => handleOperationPress("+")} />
      </View>
      <View style={[Styles.row, { alignItems: 'stretch' }]}>
        <Pressable style={zeroButtonStyle} onPress={() => handleNumberPress("0")}>
          <Button title="0" onPress={() => handleNumberPress("0")}/>
        </Pressable>
        <Button title="." onPress={() => handleNumberPress(".")} />
        <Button title="=" isOrange onPress={() => handleEqualPress()} />
      </View>
    </View>
  );
}

export default MyKeyboard;