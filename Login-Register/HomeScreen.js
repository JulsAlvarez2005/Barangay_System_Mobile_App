import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';


const COLORS = {
  primaryGreen: '#1B4130', 
  activeBg: '#e9e6e6b3',     
  activeText: '#1B4130',   
  inactiveText: '#FFFFFF', 
  bgColor: '#f8f8f8',  
  white: '#FFFFFF',    
};


// --- Placeholder Screens for Tabs ---
function OverviewScreen() {
  return (
    <SafeAreaView style={styles.contentContainer}>
      {/* Custom Header with Profile */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Barangay Appointment System</Text>
        <View style={styles.profileContainer}>
          <Image 
            // Profile of USER
            source={{ uri: 'https://i.pravatar.cc/100?img=3' }} 
            style={styles.avatar}
          />
        </View>
      </View>
      
      <ScrollView style={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Overview Dashboard</Text>
        {/* Add your dashboard charts, stats, etc... here */}
        <View style={styles.placeholderCard}><Text>Recent Activity</Text></View>
        <View style={styles.placeholderCard}><Text>Upcoming Appointments</Text></View>
      </ScrollView>
    </SafeAreaView>
  );
}

function BookAppointmentScreen() {
  return (<View style={styles.centerContainer}><Text>Book Appointment Screen</Text></View>);
}

function MyAppointmentsScreen() {
  return (<View style={styles.centerContainer}><Text>My Appointments Screen</Text></View>);
}

function AnnouncementScreen() {
  return (<View style={styles.centerContainer}><Text>Announcement Screen</Text></View>);
}

function FeedbackScreen() {
  return (<View style={styles.centerContainer}><Text>Feedback Screen</Text></View>);
}


const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, 
        tabBarStyle: {
          backgroundColor: COLORS.primaryGreen,
          borderTopWidth: 0,
          height: Platform.OS === 'ios' ? 95 : 70, 
          paddingBottom: Platform.OS === 'ios' ? 30 : 10, 
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: -5, 
        },
        tabBarActiveTintColor: COLORS.white,
        tabBarInactiveTintColor: COLORS.inactiveText,
        
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let IconComponent = Feather; 

          if (route.name === 'Overview') {
            iconName = 'grid';
          } else if (route.name === 'Book') {
            iconName = 'plus-circle';
          } else if (route.name === 'Appointments') {
            iconName = 'file-text';
          } else if (route.name === 'Announcement') {
            IconComponent = Ionicons;
            iconName = 'megaphone-outline';
          } else if (route.name === 'Feedback') {
            IconComponent = MaterialCommunityIcons;
            iconName = 'message-alert-outline';
          }

          return (
            <View style={[
              styles.tabIconContainer, 
              focused ? styles.tabIconActive : null
            ]}>
              <IconComponent name={iconName} size={22} color={color} />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Overview" component={OverviewScreen} options={{ title: 'Overview' }}/>
      <Tab.Screen name="Book" component={BookAppointmentScreen} options={{ title: 'Book' }}/>
      <Tab.Screen name="Appointments" component={MyAppointmentsScreen} options={{ title: 'Appointment' }}/>
      <Tab.Screen name="Announcement" component={AnnouncementScreen} options={{ title: 'News' }}/>
      <Tab.Screen name="Feedback" component={FeedbackScreen} options={{ title: 'Feedback' }}/>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: COLORS.bgColor,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: COLORS.primaryGreen,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    marginRight: 1,
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  scrollContent: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primaryGreen,
    marginBottom: 15,
  },
  placeholderCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.bgColor,
  },
  tabIconContainer: {
    padding: 1, 
    borderRadius: 10, 
    marginBottom: 4, 
  },
  tabIconActive: {
    backgroundColor: COLORS.activeBg, 
  },
});