import * as React from "react";
import Button from "./Button";
import { View, Text } from "react-native";
import { Styles } from "../styles/GlobalStyles";
import { myColors } from '../styles/colors';
import * as SecureStore from 'expo-secure-store';

interface MyKeyboardProps {
  navigation: any;
}

export default function MyKeyboard({ navigation }: MyKeyboardProps) {
  const key = 'passcode';
  const [passcode, setPasscode] = React.useState('');
  const [firstNumber, setFirstNumber] = React.useState("");
  const [secondNumber, setSecondNumber] = React.useState("");
  const [operation, setOperation] = React.useState("");
  const [result, setResult] = React.useState<number | null>(null);

  async function save(key: string, value: string): Promise<void> {
    await SecureStore.setItemAsync(key, value);
  }
  
  async function getValueFor(key: string): Promise<void> {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      setPasscode(result);
    }
  }
  

  React.useEffect(() => {
    getValueFor(key);
  }, []);

  const handleNumberPress = (buttonValue: string) => {
    if (buttonValue === "." && firstNumber.includes(".")) {
      alert('Error: You cannot add more than one decimal point');
      return;
    }
    if (firstNumber.length < 10) {
      setFirstNumber(firstNumber + buttonValue);
    }
  };

  const handleOperationPress = (buttonValue: string) => {
    if(buttonValue === '+/-'){
      if (firstNumber.length === 6) {
        setPasscode(firstNumber);
        save(key, firstNumber);
      } 
    }
    if (buttonValue === "％") {
      if (firstNumber === passcode) {
        navigation.navigate('Vault');
      }
    }
    setOperation(buttonValue);
    setSecondNumber(firstNumber);
    setFirstNumber("");
  };

  const clear = () => {
    setFirstNumber("");
    setSecondNumber("");
    setOperation("");
    setResult(null);
  };

  const firstNumberDisplay = () => {
    if (result !== null) {
      return <Text style={result < 99999 ? [Styles.screenFirstNumber, { color: myColors.result }] : [Styles.screenFirstNumber, { fontSize: 50, color: myColors.result }]}>{result?.toString()}</Text>;
    }
    if (firstNumber && firstNumber.length < 6) {
      return <Text style={Styles.screenFirstNumber}>{firstNumber}</Text>;
    }
    if (firstNumber === "") {
      return <Text style={Styles.screenFirstNumber}>{"0"}</Text>;
    }
    if (firstNumber.length > 5 && firstNumber.length < 8) {
      return (
        <Text style={[Styles.screenFirstNumber, { fontSize: 70 }]}>
          {firstNumber}
        </Text>
      );
    }
    if (firstNumber.length > 7) {
      return (
        <Text style={[Styles.screenFirstNumber, { fontSize: 50 }]}>
          {firstNumber}
        </Text>
      );
    }
  };

  const getResult = () => {
    switch (operation) {
      case "+":
        clear();
        setResult(parseFloat(secondNumber) + parseFloat(firstNumber));
        break;
      case "-":
        clear();
        setResult(parseFloat(secondNumber) - parseFloat(firstNumber));
        break;
      case "*":
        clear();
        setResult(parseFloat(secondNumber) * parseFloat(firstNumber));
        break;
      case "/":
        if (parseFloat(firstNumber) === 0) {
          alert("Error: You cannot divide by zero");
        } else {
          clear();
          setResult(parseFloat(secondNumber) / parseFloat(firstNumber));
        }
        break;
      default:
        clear();
        setResult(0);
        break;
    }
  };

  return (
    <View style={Styles.viewBottom}>
      <View
        style={{
          height: 120,
          width: "90%",
          justifyContent: "flex-end",
          alignSelf: "center",
        }}
      >
        <Text style={Styles.screenSecondNumber}>
          {secondNumber}
          <Text style={{ color: "purple", fontSize: 50, fontWeight: '500' }}>{operation}</Text>
        </Text>
        {firstNumberDisplay()}
      </View>
      <View style={Styles.row}>
        <Button title="C" isGray onPress={clear} />
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
        <Button title="⌫" onPress={() => setFirstNumber(firstNumber.slice(0, -1))} />
        <Button title="=" isBlue onPress={() => getResult()} />
      </View>
    </View>
  );
}