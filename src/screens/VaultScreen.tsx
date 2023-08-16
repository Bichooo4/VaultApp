import React from 'react';
import { View, Text, Button } from 'react-native';
import Vault from '../components/Vault';

interface VaultScreenProps {
  navigation: any;
}

const VaultScreen: React.FC<VaultScreenProps> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Vault />
    </View>
  );
};

export default VaultScreen;
