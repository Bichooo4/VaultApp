import React, { useState } from 'react';
import { Modal, Text, TextInput, View, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Account {
  platform: string;
  email: string;
  password: string;
}

interface ModalProps {
  isVisible: boolean;
  isEditModalVisible: boolean;
  onClose: () => void;
  onSave: (account: string, email: string, password: string) => void;
  account?: string;
  email?: string;
  password?: string;
  error?: string;
  editAccount?: Account | null;
}

const ModalComponent: React.FC<ModalProps> = ({
  isVisible,
  isEditModalVisible,
  onClose,
  onSave,
  account = '',
  email = '',
  password = '',
  error = '',
  editAccount = null,
}) => {
  const [accountValue, setAccountValue] = useState(account);
  const [emailValue, setEmailValue] = useState(email);
  const [passwordValue, setPasswordValue] = useState(password);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [visible, setVisible] = useState(isVisible);


  function generatePassword(length, number, symbols, uppercase, lowercase) {
    let charset = '';
    let password = '';

    if (number) {
      charset += '0123456789';
    }

    if (symbols) {
      charset += '!@#$%^&*()_+~`|}{[]\:;?><,./-=';
    }

    if (uppercase) {
      charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }

    if (lowercase) {
      charset += 'abcdefghijklmnopqrstuvwxyz';
    }

    for (let i = 0; i < length; i++) {
      let randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }

    return password;
  }


  const handleSave = () => {
    if (!accountValue || !emailValue || !passwordValue) {
      onSave('', '', '');
      return;
    }
    setAccountValue('');
    setEmailValue('');
    setPasswordValue('');

    onSave(accountValue, emailValue, passwordValue);
  };

  // Reset input values when the modal is closed
  const handleClose = () => {
    setAccountValue('')
    setEmailValue('')
    setPasswordValue('')
    onClose();
  };

  // Generate a random password
  const generateRandomPassword = () => {
    const password = generatePassword(10, true, true, true, true);
    setPasswordValue(password);
  };

  // Set initial values when the edit modal is opened
  React.useEffect(() => {
    if (isEditModalVisible && editAccount) {
      setAccountValue(editAccount.platform);
      setEmailValue(editAccount.email);
      setPasswordValue(editAccount.password);
    } else {
      setAccountValue(account);
      setEmailValue(email);
      setPasswordValue(password);
    }
  }, [isEditModalVisible]);

  React.useEffect(() => {
    if (!isEditModalVisible) {
      setAccountValue('');
      setEmailValue('');
      setPasswordValue('');
    }
  }, [visible]);

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
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.passwordInput}
              value={passwordValue}
              onChangeText={setPasswordValue}
              placeholder="Enter Password"
              placeholderTextColor="#888"
              secureTextEntry={isPasswordHidden}
            />
            <TouchableOpacity
              style={styles.passwordButtonContainer}
              onPress={() => setIsPasswordHidden(!isPasswordHidden)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={isPasswordHidden ? 'eye-off-outline' : 'eye-outline'}
                size={24}
                color="#888"
              />
            </TouchableOpacity>
          </View>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <TouchableOpacity style={styles.generateButtonContainer} onPress={generateRandomPassword}>
            <Text style={styles.generateButtonText}>Generate Password</Text>
          </TouchableOpacity>

          <View style={styles.buttonContainer}>
            {isEditModalVisible ? (
              <Button title="Save" onPress={handleSave} />
            ) : (
              <>
                <Button title="Save" onPress={handleSave} />
                <Button title="Close" onPress={handleClose} />
              </>
            )}
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
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  passwordButtonContainer: {
    position: 'absolute',
    right: 10,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  generateButtonContainer: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 20,
  },
  generateButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ModalComponent;
