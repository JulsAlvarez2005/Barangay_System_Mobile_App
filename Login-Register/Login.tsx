import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App'; 

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;


interface Props {
  navigation: LoginScreenNavigationProp;
}

const COLORS = {
  primaryGreen: '#1B4130', 
  buttonGreen: '#11392B',
  lightGrayBg: '#F2F3F7',
  white: '#FFFFFF',
  textGray: '#8F92A1',
  placeholderText: '#C1C1C1',
};


export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    navigation.replace('Home'); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
          
          <View style={styles.topSection}>
            <View style={styles.logoContainer}>
              <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
            </View>
            <Text style={styles.appTitle}>Barangay Appointment System</Text>
          </View>

          <View style={styles.bottomSection}>
            <View style={styles.dragHandleCenter}><View style={styles.dragHandle} /></View>
            
            <View style={styles.formContainer}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputWrapper}>
                <Feather name="mail" size={20} color={COLORS.placeholderText} style={styles.inputIcon} />
                <TextInput 
                  style={styles.textInput} 
                  placeholder="johndoe@example.com" 
                  placeholderTextColor={COLORS.placeholderText}
                  value={email} 
                  onChangeText={setEmail}
                  keyboardType="email-address" 
                  autoCapitalize="none"        
                />
              </View>

              <Text style={styles.label}>Password</Text>
              <View style={styles.inputWrapper}>
                <Feather name="lock" size={20} color={COLORS.placeholderText} style={styles.inputIcon} />
                <TextInput 
                  style={styles.textInput} 
                  placeholder="*********" 
                  placeholderTextColor={COLORS.placeholderText}
                  secureTextEntry={true}
                  value={password} 
                  onChangeText={setPassword}
                />
              </View>

              <TouchableOpacity style={styles.forgotPasswordContainer} onPress={() => navigation.navigate('ForgotPassword')}>
                 <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
                <Text style={styles.signInButtonText}>Sign In</Text>
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
    flex: 1, backgroundColor: COLORS.primaryGreen 
  },
  topSection: { 
    flex: 2.5, 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingBottom: 30 
  },
  logoContainer: { 
    marginBottom: 20 
  },
  logo: { 
    width: 140, 
    height: 144 
  },
  appTitle: { 
    color: COLORS.white, 
    fontSize: 18, 
    fontWeight: '500' 
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
  formContainer: { 
    flex: 1 
  },
  label: { 
    color: '#333', 
    fontSize: 16, 
    fontWeight: '500', 
    marginBottom: 8, 
    marginTop: 10 
  },
  inputWrapper: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: COLORS.lightGrayBg, 
    borderRadius: 12, 
    paddingHorizontal: 15, 
    height: 55 
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
  forgotPasswordContainer: { 
    alignItems: 'flex-end', 
    marginTop: 15, 
    marginBottom: 30 
  },
  forgotPasswordText: { 
    color: COLORS.buttonGreen, fontWeight: '600' 
  },
  signInButton: { 
    backgroundColor: COLORS.buttonGreen, 
    height: 55, 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 25 
  },
  signInButtonText: { 
    color: COLORS.white, 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  registerContainer: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    marginBottom: 20 
  },
  registerText: { 
    color: COLORS.textGray, 
    fontSize: 15 
  },
  registerLinkBold: { 
    color: COLORS.buttonGreen, 
    fontWeight: 'bold', 
    fontSize: 15 
  },
});