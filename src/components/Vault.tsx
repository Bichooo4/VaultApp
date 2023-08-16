import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Modal, TextInput, Button, StyleSheet } from 'react-native';

interface VaultProps { }

export default function Vault() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAddNew = () => {
    setModalVisible(true);
  };

  const handleSave = () => {
    // Logic to save the email and password
    setModalVisible(false);
  };

  const handleClose = () => {
    setModalVisible(false);
    setEmail('');
    setPassword('');
  };

  return (
    <View style={styles.container}>
      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.label}>Enter Email:</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter Email"
              placeholderTextColor="#888"
            />

            <Text style={styles.label}>Enter Password:</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter Password"
              placeholderTextColor="#888"
              secureTextEntry
            />

            <View style={styles.buttonContainer}>
              <Button title="Save" onPress={handleSave} />
              <Button title="Close" onPress={handleClose} />
            </View>
          </View>
        </View>
      </Modal>

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
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
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