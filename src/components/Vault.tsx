import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';
import AccountList from './AccountList';
import ModalComponent from './ModalComponent';
import { v4 as uuidv4 } from 'uuid';

interface VaultProps {}

export default function Vault() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [account, setAccount] = useState('');
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDataFromFile = async () => {
      const folderPath = `${FileSystem.documentDirectory}Private/`;
      const filePath = `${folderPath}userData.txt`;

      try {
        const fileContent = await FileSystem.readAsStringAsync(filePath);
        const userData = JSON.parse(fileContent);
        setData(userData);
      } catch (error) {
        console.log('Error loading data from file:', error);
      }
    };

    loadDataFromFile();
  }, []);

  useEffect(() => {
    console.log('Data:', data);
    saveDataToFile();
  }, [data]);

  const handleAddNew = () => {
    setModalVisible(true);
  };

  const handleEdit = (index: number) => {
    setModalVisible(true);
    setAccount(data[index].platform);
    setEmail(data[index].email);
    setPassword(data[index].password);
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

    const newAccount = {
      id: uuidv4(),
      platform: account,
      email,
      password,
    };

    setData((prevData) => [...prevData, newAccount]);

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

  const saveDataToFile = async () => {
    const folderPath = `${FileSystem.documentDirectory}Private/`;
    const filePath = `${folderPath}userData.txt`;

    try {
      await FileSystem.makeDirectoryAsync(folderPath, { intermediates: true });
      await FileSystem.writeAsStringAsync(filePath, JSON.stringify(data));
    } catch (error) {
      console.log('Error saving data to file:', error);
    }
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
      />
      <AccountList accounts={data} onRemove={handleRemove} />
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

