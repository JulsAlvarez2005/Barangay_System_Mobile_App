import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App'; 

type ForgotPasswordNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ForgotPassword'>;

interface Props {
  navigation: ForgotPasswordNavigationProp;
}

const COLORS = {
  primaryGreen: '#1B4130', 
  buttonGreen: '#11392B',
  lightGrayBg: '#F2F3F7',
  white: '#FFFFFF',
  textGray: '#8F92A1',
  placeholderText: '#C1C1C1',
};

export default function ForgotPasswordScreen({ navigation }: Props) {
  const [contactInfo, setContactInfo] = useState('');

  const handleResetPassword = () => {
    if (!contactInfo) {
      Alert.alert('Error', 'Please enter your email or phone number.');
      return;
    }
  
    Alert.alert(
      'Request Sent', 
      `If an account exists for ${contactInfo}, you will receive a reset link/code shortly.`,
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
          
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Feather name="arrow-left" size={24} color={COLORS.white} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Reset Password</Text>
          </View>

          <View style={styles.bottomSection}>
            <View style={styles.dragHandleCenter}><View style={styles.dragHandle} /></View>
            
            <View style={styles.contentContainer}>
              <Text style={styles.title}>Forgot Password?</Text>
              <Text style={styles.subtitle}>
                Enter your email address or phone number to retrieve your password.
              </Text>

              <Text style={styles.label}>Email or Phone Number</Text>
              <View style={styles.inputWrapper}>
                <Feather name="at-sign" size={20} color={COLORS.placeholderText} style={styles.inputIcon} />
                <TextInput 
                  style={styles.textInput} 
                  placeholder="e.g. juan@gmail.com or 0912..." 
                  placeholderTextColor={COLORS.placeholderText}
                  value={contactInfo} 
                  onChangeText={setContactInfo}
                  autoCapitalize="none"
                />
              </View>

              <TouchableOpacity style={styles.sendButton} onPress={handleResetPassword}>
                <Text style={styles.sendButtonText}>Send Reset Link</Text>
              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.primaryGreen 
  },
  header: { 
    flex: 1,
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 20, 
    paddingTop: 10,
    maxHeight: 100,
  },
  backButton: { 
    padding: 5 
  },
  headerTitle: { 
    color: COLORS.white, 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginLeft: 15 
  },
  bottomSection: { 
    flex: 4, 
    backgroundColor: COLORS.white, 
    borderTopLeftRadius: 35, 
    borderTopRightRadius: 35, 
    paddingHorizontal: 25, 
    paddingTop: 15 
  },
  dragHandleCenter: { 
    alignItems: 'center', 
    marginBottom: 20 
  },
  dragHandle: { 
    width: 40, 
    height: 4, 
    backgroundColor: '#E0E0E0', 
    borderRadius: 10 
  },
  contentContainer: {
    flex: 1,
    paddingTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.buttonGreen,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textGray,
    marginBottom: 30,
    lineHeight: 22,
  },
  label: { 
    color: '#333', 
    fontSize: 16, 
    fontWeight: '500', 
    marginBottom: 8 
  },
  inputWrapper: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: COLORS.lightGrayBg, 
    borderRadius: 12, 
    paddingHorizontal: 15, 
    height: 55,
    marginBottom: 30,
  },
  inputIcon: { 
    marginRight: 10 
  },
  textInput: {
    flex: 1, 
    color: '#333', 
    fontSize: 16, 
    height: '100%' 
  },
  sendButton: { 
    backgroundColor: COLORS.buttonGreen, 
    height: 55, 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  sendButtonText: { 
    color: COLORS.white, 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
});