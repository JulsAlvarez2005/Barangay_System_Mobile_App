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

type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

interface Props {
  navigation: RegisterScreenNavigationProp;
}

const COLORS = {
  primaryGreen: '#1B4130', 
  buttonGreen: '#11392B',
  lightGrayBg: '#F2F3F7',
  white: '#FFFFFF',
  textGray: '#8F92A1',
  placeholderText: '#C1C1C1',
};

export default function RegisterScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthDate, setBirthDate] = useState(''); 

  const handleRegister = () => {
    if (!name || !email || !password || !address || !phoneNumber || !birthDate) {
      Alert.alert('Missing Fields', 'Please fill in all details to continue.');
      return;
    }

    const newUserId = 'user_' + Date.now();
    console.log("Account Created!");
    console.log("User ID:", newUserId);
    console.log("Details:", { name, email, address, phoneNumber, birthDate });

    Alert.alert('Success', `Account Created! \nYour Member ID is: ${newUserId}`, [
      { text: "OK", onPress: () => navigation.navigate('Login') }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false} showsVerticalScrollIndicator={false}>
          
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Feather name="arrow-left" size={24} color={COLORS.white} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Create Account</Text>
          </View>

          <View style={styles.bottomSection}>
             <Text style={styles.subHeader}>Join Barangay System</Text>
             <Text style={styles.desc}>Fill in your details to get started.</Text>

             {/* Full Name */}
             <Text style={styles.label}>Full Name</Text>
             <View style={styles.inputWrapper}>
               <Feather name="user" size={20} color={COLORS.placeholderText} style={styles.inputIcon} />
               <TextInput 
                 style={styles.textInput} 
                 placeholder="Juan Dela Cruz" 
                 placeholderTextColor={COLORS.placeholderText} 
                 value={name} 
                 onChangeText={setName} 
               />
             </View>

             {/* Phone Number */}
             <Text style={styles.label}>Phone Number</Text>
             <View style={styles.inputWrapper}>
               <Feather name="phone" size={20} color={COLORS.placeholderText} style={styles.inputIcon} />
               <TextInput 
                 style={styles.textInput} 
                 placeholder="0912 345 6789" 
                 placeholderTextColor={COLORS.placeholderText} 
                 keyboardType="phone-pad"
                 value={phoneNumber} 
                 onChangeText={setPhoneNumber} 
               />
             </View>

             {/* Birthdate */}
             <Text style={styles.label}>Birth Date</Text>
             <View style={styles.inputWrapper}>
               <Feather name="calendar" size={20} color={COLORS.placeholderText} style={styles.inputIcon} />
               <TextInput 
                 style={styles.textInput} 
                 placeholder="MM/DD/YYYY" 
                 placeholderTextColor={COLORS.placeholderText} 
                 value={birthDate} 
                 onChangeText={setBirthDate} 
               />
             </View>

             {/* Address */}
             <Text style={styles.label}>Address (Purok, Barangay)</Text>
             <View style={styles.inputWrapper}>
               <Feather name="map-pin" size={20} color={COLORS.placeholderText} style={styles.inputIcon} />
               <TextInput 
                 style={styles.textInput} 
                 placeholder="Purok 5, Bayabas, Toril" 
                 placeholderTextColor={COLORS.placeholderText} 
                 value={address} 
                 onChangeText={setAddress} 
               />
             </View>

             {/* Email */}
             <Text style={styles.label}>Email Address</Text>
             <View style={styles.inputWrapper}>
               <Feather name="mail" size={20} color={COLORS.placeholderText} style={styles.inputIcon} />
               <TextInput 
                 style={styles.textInput} 
                 placeholder="juan@gmail.com" 
                 placeholderTextColor={COLORS.placeholderText} 
                 keyboardType="email-address" 
                 autoCapitalize="none" 
                 value={email} 
                 onChangeText={setEmail} 
               />
             </View>

             {/* Password */}
             <Text style={styles.label}>Password</Text>
             <View style={styles.inputWrapper}>
               <Feather name="lock" size={20} color={COLORS.placeholderText} style={styles.inputIcon} />
               <TextInput 
                 style={styles.textInput} 
                 placeholder="Create a password" 
                 placeholderTextColor={COLORS.placeholderText} 
                 secureTextEntry={true} 
                 value={password} 
                 onChangeText={setPassword} 
               />
             </View>

             {/* Register Button */}
             <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
               <Text style={styles.buttonText}>Sign Up</Text>
             </TouchableOpacity>
             
             {/* Login Link */}
             <View style={styles.loginLinkContainer}>
                <Text style={styles.textGray}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.linkGreen}>Login</Text>
                </TouchableOpacity>
             </View>

             <View style={{height: 50}} /> 
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
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 20, 
    paddingTop: 10 
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
    flex: 1, 
    backgroundColor: COLORS.white, 
    borderTopLeftRadius: 35, 
    borderTopRightRadius: 35, 
    paddingHorizontal: 25, 
    paddingTop: 30, 
    marginTop: 10 
  },
  subHeader: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: COLORS.primaryGreen, 
    marginBottom: 5 
  },
  desc: { 
    color: COLORS.textGray, 
    marginBottom: 20 
  },
  label: { 
    color: '#333', 
    fontSize: 15, 
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
    height: 50 
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
  registerButton: { 
    backgroundColor: COLORS.buttonGreen, 
    height: 55, borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 30, 
    marginBottom: 20 
  },
  buttonText: { 
    color: COLORS.white, 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  loginLinkContainer: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    marginBottom: 30 
  },
  textGray: {
     color: COLORS.textGray 
    },
  linkGreen: { 
    color: COLORS.buttonGreen, 
    fontWeight: 'bold' 
  },
});