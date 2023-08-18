import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

interface Account {
  id: string;
  platform: string;
  email: string;
  password: string;
}

interface AccountListProps {
  accounts: Account[];
  onRemove: (id: string) => void;
}

const AccountList: React.FC<AccountListProps> = ({ accounts, onRemove }) => {
  return (
    <View style={styles.container}>
      {accounts.map((account, index) => (
        <View key={index} style={styles.accountContainer}>
          <View style={styles.box}>
            <Text style={styles.label}>Platform:</Text>
            <Text>{account.platform}</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.label}>Email:</Text>
            <Text>{account.email}</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.label}>Password:</Text>
            <Text>{account.password}</Text>
          </View>
          <View style={styles.box}>
            <Button
              title="Remove"
              onPress={() => onRemove(account.id)}
            />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  accountContainer: {
    width: '100%',
    marginVertical: 5,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    borderRadius: 5,
  },
  box: {
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
  },
});

export default AccountList;