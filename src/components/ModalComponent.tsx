import React, { useState } from 'react';
import { Modal, Text, TextInput, View, Button, StyleSheet } from 'react-native';

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSave: (account: string, email: string, password: string) => void;
  account?: string;
  email?: string;
  password?: string;
  error?: string;
}

const ModalComponent: React.FC<ModalProps> = ({
  isVisible,
  onClose,
  onSave,
  account = '',
  email = '',
  password = '',
  error = '',
}) => {
  const [accountValue, setAccountValue] = useState(account);
  const [emailValue, setEmailValue] = useState(email);
  const [passwordValue, setPasswordValue] = useState(password);

  const handleSave = () => {
    if (!accountValue || !emailValue || !passwordValue) {
      onSave('', '', '');
      return;
    }

    onSave(accountValue, emailValue, passwordValue);
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.label}>Account Platform:</Text>
          <TextInput
            style={styles.input}
            value={accountValue}
            onChangeText={setAccountValue}
            placeholder="Account Platform"
            placeholderTextColor="#888"
          />

          <Text style={styles.label}>Enter Email:</Text>
          <TextInput
            style={styles.input}
            value={emailValue}
            onChangeText={setEmailValue}
            placeholder="Enter Email"
            placeholderTextColor="#888"
          />

          <Text style={styles.label}>Enter Password:</Text>
          <TextInput
            style={styles.input}
            value={passwordValue}
            onChangeText={setPasswordValue}
            placeholder="Enter Password"
            placeholderTextColor="#888"
            secureTextEntry
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <View style={styles.buttonContainer}>
            <Button title="Save" onPress={handleSave} />
            <Button title="Close" onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default ModalComponent;