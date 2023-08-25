import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';
import AccountList from './AccountList';
import ModalComponent from './ModalComponent';
import { v4 as uuidv4 } from 'uuid';

interface VaultProps { }
interface Account {
  id: string;
  platform: string;
  email: string;
  password: string;
}

export default function Vault() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [editAccount, setEditAccount] = useState<Account | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [account, setAccount] = useState('');
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  const folderPath = `${FileSystem.documentDirectory}Private/`;
  const filePath = `${folderPath}userData.txt`;

  // Encryption and decryption functions
  function encryption(str: string) {
    let codes = '';
    for (let i = 0; i < str.length; i++) {
      const charCode = str.charCodeAt(i);
      let paddedCode: string;
      if (charCode < 10) {
        paddedCode = '00' + charCode;
      } else if (charCode < 100) {
        paddedCode = '0' + charCode;
      } else {
        paddedCode = charCode.toString();
      }
      codes += paddedCode;
    }
    return codes;
  }

  function decryption(codes: string) {
    let originalString = '';
    for (let i = 0; i < codes.length; i += 3) {
      const asciiChunk = codes.substr(i, 3);
      const charCode = parseInt(asciiChunk, 10);
      const character = String.fromCharCode(charCode);
      originalString += character;
    }
    return originalString;
  }

  const loadDataFromFile = async () => {

    try {
      const fileContent = await FileSystem.readAsStringAsync(filePath);

      // Decrypt before parsing
      const encryptedData = fileContent;
      const decryptedData = decryption(encryptedData);

      const userData = JSON.parse(decryptedData);

      setData(userData);

    } catch (error) {
      console.log('Error loading data from file:', error);
    }
  };

  const saveDataToFile = async () => {

    try {

      // Encrypt before saving
      const encryptedData = encryption(JSON.stringify(data));

      await FileSystem.writeAsStringAsync(
        filePath, encryptedData
      );

    } catch (error) {
      console.log('Error saving data to file:', error);
    }
  };

  useEffect(() => {
    loadDataFromFile();
  }, []);

  useEffect(() => {
    console.log('Data:', data);
    saveDataToFile();
  }, [data]);

  const handleAddNew = () => {
    setModalVisible(true);
  };
  const handleEdit = (id: string) => {
    const accountToEdit = data.find((account) => account.id === id);

    if (accountToEdit) {
      setModalVisible(true);
      setEditModalVisible(true);
      setEditAccount(accountToEdit);
    }
  };

  const handleRemove = (id: string) => {
    const newData = data.filter((account) => account.id !== id);
    setData(newData);
  };

  const handleSave = (account: string, email: string, password: string) => {
    if (!account || !email || !password) {
      setError('All fields are required.');
      return;
    }

    if (isEditModalVisible && editAccount) {
      const updatedAccount = {
        id: editAccount.id,
        platform: account,
        email,
        password,
      };

      const updatedData = data.map((item) => {
        if (item.id === editAccount.id) {
          return updatedAccount;
        }
        return item;
      });

      setData(updatedData);
      setEditModalVisible(false);
      setEditAccount(null);
    } else {
      const newAccount = {
        id: uuidv4(),
        platform: account,
        email,
        password,
      };

      setData((prevData) => [...prevData, newAccount]);
    }

    setAccount('');
    setEmail('');
    setPassword('');
    setError('');
    setModalVisible(false);
  };

  const handleClose = () => {
    setAccount('');
    setEmail('');
    setPassword('');
    setError('');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <ModalComponent
        isVisible={isModalVisible}
        onClose={handleClose}
        onSave={handleSave}
        account={account}
        email={email}
        password={password}
        error={error}
        isEditModalVisible={isEditModalVisible}
        editAccount={editAccount}
      />
      <AccountList
        accounts={data}
        onRemove={handleRemove}
        onEdit={handleEdit}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddNew}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 40,
    backgroundColor: '#0772B5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 32,
    textAlign: 'center',
    lineHeight: 40,
    marginLeft: 2,
  },
});