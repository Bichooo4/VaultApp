import React, { useState, useEffect, useContext } from "react";
import { View, Text, Alert } from "react-native";
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
    if (displayValue === '0') {
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
      setOperation(buttonValue);
      setFirstOperand(displayValue);
      setDisplayValue("");
    }
  };

  const handleClearPress = () => {
    setDisplayValue('0');
    setFirstOperand(null);
    setOperation(null);
  };

  const handleEqualPress = () => {
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
    }

    setDisplayValue(result.toString());
    setFirstOperand(null);
  };

  const theme = useContext(ThemeContext);
  const displayValueStyle = [
    { fontSize: displayValue.length >= 6 ? 52 : 74, marginBottom: 20 },
    theme === 'light' ? { color: 'black' } : { color: 'white' }
  ];

  return (
    <View style={Styles.viewBottom}>
      <View style={{ height: 120, width: "90%", justifyContent: "flex-end", alignSelf: "center" }}>
        <Text style={displayValueStyle}>{displayValue}</Text>
      </View>
      <View style={Styles.row}>
        <Button title="C" isGray onPress={handleClearPress} />
        <Button title="+/-" isGray onPress={() => handleOperationPress("+/-")} />
        <Button title="％" isGray onPress={() => handleOperationPress("％")} />
        <Button title="÷" isBlue onPress={() => handleOperationPress("/")} />
      </View>
      <View style={Styles.row}>
        <Button title="7" onPress={() => handleNumberPress("7")} />
        <Button title="8" onPress={() => handleNumberPress("8")} />
        <Button title="9" onPress={() => handleNumberPress("9")} />
        <Button title="×" isBlue onPress={() => handleOperationPress("*")} />
      </View>
      <View style={Styles.row}>
        <Button title="4" onPress={() => handleNumberPress("4")} />
        <Button title="5" onPress={() => handleNumberPress("5")} />
        <Button title="6" onPress={() => handleNumberPress("6")} />
        <Button title="-" isBlue onPress={() => handleOperationPress("-")} />
      </View>
      <View style={Styles.row}>
        <Button title="1" onPress={() => handleNumberPress("1")} />
        <Button title="2" onPress={() => handleNumberPress("2")} />
        <Button title="3" onPress={() => handleNumberPress("3")} />
        <Button title="+" isBlue onPress={() => handleOperationPress("+")} />
      </View>
      <View style={Styles.row}>
        <Button title="." onPress={() => handleNumberPress(".")} />
        <Button title="0" onPress={() => handleNumberPress("0")} />
        <Button title="⌫" onPress={() => setDisplayValue(displayValue.slice(0, -1))} />
        <Button title="=" isBlue onPress={() => handleEqualPress()} />
      </View>
    </View>
  );
}

export default MyKeyboard;
