import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  StatusBar 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Props = {
  navigation: any; 
};

interface NavIconProps {
  name: React.ComponentProps<typeof Ionicons>['name']; 
  label: string;
  active?: boolean;
  onPress?: () => void; 
}


const ResidentDashboard: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F3C2F" />
      
      {/* HEADER SECTION */}
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <View style={styles.avatarPlaceholder}>
             <Ionicons name="person-outline" size={30} color="#fff" />
          </View>
          <View>
            <Text style={styles.welcomeText}>Welcome, Robert!</Text>
            <Text style={styles.residentText}>Barangay Bayabas Resident</Text>
          </View>
        </View>
      </View>

      {/* MAIN SCROLL CONTENT */}
      <ScrollView 
        style={styles.contentContainer} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }} 
      >
        
        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionRow}>
            
          {/* "Book Now" Button */}
          <TouchableOpacity 
            style={styles.bookNowButton} 
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Booking')} 
          >
            <View style={styles.iconCircleWhite}>
               <Ionicons name="add" size={24} color="#0F3C2F" />
            </View>
            <Text style={styles.bookNowText}>Book Now</Text>
          </TouchableOpacity>

          {/* My Requests Button */}
          <TouchableOpacity style={styles.myRequestsButton} onPress={() => navigation.navigate('Appointment')} activeOpacity={0.8}>
            <View style={styles.iconCircleOutline}>
               <Ionicons name="document-text-outline" size={24} color="#333" />
            </View>
            <Text style={styles.myRequestsText}>My Requests</Text>
          </TouchableOpacity>
        </View>

        {/* Available Services */}
        <Text style={styles.sectionTitle}>Available Services</Text>
        <TouchableOpacity style={styles.card} activeOpacity={0.7}>
          <View style={styles.cardIconContainer}>
             <Ionicons name="document-text-outline" size={28} color="#333" />
          </View>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>Barangay Clearance</Text>
            <Text style={styles.cardSubtitle}>
              Required for various transactions and employment
            </Text>
          </View>
        </TouchableOpacity>

        {/* Recent Announcements */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Recent Announcements</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Appointment')}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.card} activeOpacity={0.7}>
          <View style={styles.cardIconContainer}>
             <Ionicons name="megaphone-outline" size={28} color="#333" />
          </View>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>Community Clean-Up Drive</Text>
            <Text style={styles.cardSubtitle}>
              Join us this Saturday for our monthly clean-up activity
            </Text>
            <Text style={styles.timestampText}>2 days ago</Text>
          </View>
        </TouchableOpacity>

      </ScrollView>

      {/* BOTTOM NAVIGATION */}
      <View style={styles.bottomNav}>
        <NavIcon name="home" label="Home" active />
        
        {/* Bottom tab  */}
        <NavIcon 
            name="add-circle-outline" 
            label="Book" 
            onPress={() => navigation.navigate('Booking')}
        />
        
        <NavIcon name="document-text-outline" label="Appointments" 
         onPress={() => navigation.navigate('Appointment')} />

        <NavIcon name="newspaper-outline" label="News" 
         onPress={() => navigation.navigate('Newscreen')} />
         
        <NavIcon name="person-outline" label="Profile" 
         onPress={() => navigation.navigate('Profile')} />
         
      </View>

    </SafeAreaView>
  );
}


const NavIcon: React.FC<NavIconProps> = ({ name, label, active = false, onPress }) => (
  <TouchableOpacity style={styles.navItem} activeOpacity={0.7} onPress={onPress}>
    <Ionicons name={name} size={24} color={active ? "#0F3C2F" : "#999"} />
    <Text style={[styles.navLabel, active && styles.navLabelActive]}>{label}</Text>
  </TouchableOpacity>
);

export default ResidentDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  
  // Header
  header: {
    backgroundColor: '#0F3C2F',
    paddingTop: 40, 
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  welcomeText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  residentText: {
    color: '#D1D5DB',
    fontSize: 14,
  },

  // Content
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 15,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 10,
  },
  viewAllText: {
    color: '#0F3C2F',
    fontWeight: '600',
    fontSize: 14,
  },

  // Actions
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  bookNowButton: {
    flex: 0.48,
    backgroundColor: '#0F3C2F',
    borderRadius: 12,
    paddingVertical: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  myRequestsButton: {
    flex: 0.48,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  iconCircleWhite: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconCircleOutline: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  bookNowText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  myRequestsText: {
    color: '#111',
    fontWeight: 'bold',
    fontSize: 16,
  },

  // Cards
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardIconContainer: {
    marginRight: 15,
    marginTop: 2,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  timestampText: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
  },

  // Navigation
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: 'center',
  },
  navLabel: {
    fontSize: 10,
    color: '#999',
    marginTop: 4,
  },
  navLabelActive: {
    color: '#0F3C2F',
    fontWeight: 'bold',
  },
});