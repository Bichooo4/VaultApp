import { useState } from 'react';
import { StyleSheet, Text, View, Switch, SafeAreaView } from 'react-native';
import MyKeyboard from '../components/MyKeyboard';
import { StatusBar } from 'expo-status-bar';
import { ThemeContext } from '../context/ThemeContext';
import { myColors } from '../styles/colors';


interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={theme}>
      <SafeAreaView style={theme === 'light' ? styles.container : [styles.container, { backgroundColor: '#000000' }]}>
        <StatusBar style="auto" />
        <Switch
          value={theme === 'light'}
          onValueChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          style={styles.switchButton}
        />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <MyKeyboard navigation={navigation} />
        </View>
      </SafeAreaView>
    </ThemeContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myColors.light,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  switchButton: {
    margin: '7%',
  },
});

export default HomeScreen;