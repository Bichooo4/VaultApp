import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';

interface PasswordStrengthMeterProps {
  password: string;
}

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password }) => {
  const [strength, setStrength] = useState(0);
  const [strengthText, setStrengthText] = useState('');

  const getProgressBarColor = (strength: number) => {
    if (strength === 100) {
      return '#00C781'; // Green color for level 4
    } else if (strength === 75) {
      return '#86C30D'; // Yellow-Green color for level 3
    } else if (strength === 50) {
      return '#F5A623'; // Orange color for level 2
    } else if (strength === 25) {
      return '#FF3B30'; // Red color for level 1
    } else {
      return '#d4d4d9'; // Default background color
    }
  };

  const getStrengthText = (strength: number) => {
    if (strength === 100) {
      return 'Secure'; // Level 4: Secure
    } else if (strength === 75) {
      return 'Strong'; // Level 3: Strong
    } else if (strength === 50) {
      return 'Normal'; // Level 2: Normal
    } else if (strength === 25) {
      return 'Weak'; // Level 1: Weak
    }
    return '';
  };

  const calculatePasswordStrength = (password: string) => {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
  
    if (password.length === 0) {
      return 0; // No password entered
    } else if (password.length < minLength) {
      return 25; // Level 1: Password length is less than minLength
    } else if (hasUppercase && hasLowercase && hasNumber && hasSpecialChar) {
      return 100; // Level 4: Password contains all required conditions
    } else if (
      (hasUppercase || hasLowercase) &&
      (hasNumber || hasSpecialChar)
    ) {
      return 75; // Level 3: Password contains at least 1 uppercase/lowercase character and 1 number/special character
    } else {
      return 50; // Level 2: Password contains at least minLength characters
    }
  };
  
  useEffect(() => {
    const newStrength = calculatePasswordStrength(password);
    setStrength(newStrength);
    setStrengthText(getStrengthText(newStrength));
  }, [password]);

  return (
    <View style={styles.container}>
      {password.length > 0 && (
        <View
          style={[
            styles.progressBar,
            { width: `${strength}%`, backgroundColor: getProgressBarColor(strength) },
          ]}
        />
      )}
      {password.length > 0 && (
        <Text style={styles.text}>{strengthText}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    marginBottom: 0,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#E5E5EA',
    borderRadius: 5,
    overflow: 'hidden',
  },
  text: {
    marginTop: 2,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft: 2,
  },
});

export default PasswordStrengthMeter;