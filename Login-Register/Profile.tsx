import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


type Props = {
  navigation: any;
};

interface NavIconProps {
  name: keyof typeof Ionicons.glyphMap;
  label: string;
  active?: boolean;
  onPress?: () => void;
}

const NavIcon = ({ name, label, active, onPress }: NavIconProps) => (
  <TouchableOpacity onPress={onPress} style={styles.navItem}>
    <Ionicons 
      name={name} 
      size={24} 
      color={active ? '#0F3C32' : '#9CA3AF'} 
    />
    <Text style={[styles.navLabel, active && styles.navLabelActive]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const InfoRow = ({ label, value, isBold = false }: { label: string, value: string, isBold?: boolean }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={[styles.infoValue, isBold && styles.infoValueBold]}>{value}</Text>
  </View>
);

// MAIN COMPONENT
export default function ProfileScreen({ navigation }: Props) {
  
  const handleLogout = () => {
    alert("Logging out...");
    navigation.navigate('Login'); 
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#0F3C32" />

      {/* GREEN HEADER SECTION */}
      <View style={styles.headerSection}>
        <View style={styles.topBar}>
        </View>
        
        
        <View style={styles.profileHeaderContent}>
          {/* Avatar Icon */}
          <View style={styles.avatarContainer}>
             <Ionicons name="person-circle-outline" size={80} color="#FFFFFF" />
          </View>
          
          <Text style={styles.userName}>Robert Dodong</Text>
          <Text style={styles.userEmail}>rob.dodong@example.com</Text>
        </View>
      </View>

      {/* BODY CONTENT  */}
      <View style={styles.bodyContainer}>
        
        {/* Info Card */}
        <View style={styles.card}>
          <InfoRow label="Address" value="Purok 5, Bayabas" isBold />
          <InfoRow label="Phone Number" value="+63 912 345 6789" isBold />
          <InfoRow label="Birth Date" value="2/26/2000" isBold />
          <InfoRow label="Verification Status" value="Verified" isBold />
          <InfoRow label="Member Since" value="2/6/2026" isBold />
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#EF4444" style={{ marginRight: 8 }} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

      </View>

      {/* BOTTOM NAVIGATION BAR */}
      <View style={styles.bottomNav}>
        <NavIcon 
          name="home-outline" 
          label="Home" 
          onPress={() => navigation.navigate('Home')} 
        />
        
        <NavIcon 
          name="add-circle-outline" 
          label="Book" 
          onPress={() => navigation.navigate('Booking')}
        />
        
        <NavIcon 
          name="document-text-outline" 
          label="Appointments" 
          onPress={() => navigation.navigate('Appointment')}
        />

        <NavIcon 
          name="newspaper-outline" 
          label="News" 
          onPress={() => navigation.navigate('Newscreen')} 
        />
         
        <NavIcon 
          name="person" 
          label="Profile" 
          active={true} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  
  headerSection: {
    backgroundColor: '#0F3C32', 
    paddingTop: 50, 
    paddingBottom: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  topBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  profileHeaderContent: {
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 8,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  userEmail: {
    fontSize: 12,
    color: '#D1D5DB', 
    marginTop: 2,
  },

  // BODY STYLES
  bodyContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 25,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1, 
    borderBottomColor: '#F3F4F6', 
  },
  infoLabel: {
    fontSize: 14,
    color: '#9CA3AF', 
  },
  infoValue: {
    fontSize: 14,
    color: '#111827', 
    textAlign: 'right',
  },
  infoValueBold: {
    fontWeight: '600',
  },

  // BUTTON STYLES 
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2', 
    borderWidth: 1,
    borderColor: '#FCA5A5', 
    paddingVertical: 12,
    borderRadius: 8,
  },
  logoutText: {
    color: '#EF4444', 
    fontWeight: '600',
    fontSize: 16,
  },

  // BOTTOM NAV STYLES 
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navLabel: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 4,
  },
  navLabelActive: {
    color: '#0F3C32',
    fontWeight: 'bold',
  },
});