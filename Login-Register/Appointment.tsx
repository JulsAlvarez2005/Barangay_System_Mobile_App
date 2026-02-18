import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
  ScrollView
} from 'react-native';
import {
  Calendar,
  Clock,
  Home,
  PlusCircle,
  FileText,
  Newspaper,
  User,
} from 'lucide-react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type Props = {
  navigation: any; 
};

interface NavIconProps {
  name: React.ComponentProps<typeof Ionicons>['name']; 
  label: string;
  active?: boolean;
  onPress?: () => void; 
}

interface Appointment {
  id: string;
  serviceName: string;
  referenceNumber: string;
  date: string;      
  fullDate: string;   
  timeRange: string;
  status: 'Pending' | 'Completed' | 'Cancelled';
  purpose: string;    
  bookedDate: string; 
}

// Mock Data 
const APPOINTMENTS_DATA: Appointment[] = [
  {
    id: '1',
    serviceName: 'Barangay Clearance',
    referenceNumber: 'BC-2026-001',
    date: 'Feb 12, 2026',
    fullDate: 'Wednesday, February 12, 2026',
    timeRange: '1:00 PM - 4:00 PM',
    status: 'Pending',
    purpose: 'I need these for applying a job',
    bookedDate: '2/12/2026'
  },
  {
    id: '2',
    serviceName: 'Barangay Certificate',
    referenceNumber: 'BC-2026-002',
    date: 'Feb 14, 2026',
    fullDate: 'Friday, February 14, 2026',
    timeRange: '8:00 AM - 11:00 AM',
    status: 'Pending',
    purpose: 'School Requirement',
    bookedDate: '2/10/2026'
  },
];

// Sub-Component: Appointment Details Modal
const AppointmentDetailsModal = ({ 
  visible, 
  appointment, 
  onClose 
}: { 
  visible: boolean; 
  appointment: Appointment | null; 
  onClose: () => void; 
}) => {
  if (!appointment) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.modalBackdrop} />
        </TouchableWithoutFeedback>

        {/* Bottom Sheet Content */}
        <View style={styles.modalContent}>
          <View style={styles.dragHandleContainer}>
            <View style={styles.dragHandle} />
          </View>

          <Text style={styles.modalTitle}>Appointment Details</Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Service */}
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Service</Text>
              <Text style={styles.detailValue}>{appointment.serviceName}</Text>
            </View>

            {/* Date */}
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Date</Text>
              <Text style={styles.detailValue}>{appointment.fullDate}</Text>
            </View>

            {/* Time Slot CARDS */}
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Time Slot</Text>
              <Text style={styles.detailValue}>{appointment.timeRange}</Text>
            </View>

            {/* Purpose */}
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Purpose</Text>
              <Text style={styles.detailValue}>{appointment.purpose}</Text>
            </View>

            {/* Status */}
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Status</Text>
              <Text style={[styles.detailValue, { color: '#EAB308' }]}>
                {appointment.status}
              </Text>
            </View>

            {/* Booked Date */}
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Booked Date</Text>
              <Text style={styles.detailValue}>{appointment.bookedDate}</Text>
            </View>
          </ScrollView>

          <View style={styles.modalButtonsContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel Appointment</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
        
      </View>
    </Modal>
  );
};


// Sub-Component: Appointment Card 
const AppointmentCard = ({ 
  item, 
  onPress 
}: { 
  item: Appointment, 
  onPress: (item: Appointment) => void 
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.serviceName}>{item.serviceName}</Text>
        <Text style={styles.statusText}>{item.status}</Text>
      </View>

      <Text style={styles.referenceText}>Ref: {item.referenceNumber}</Text>

      <View style={styles.dateTimeRow}>
        <View style={styles.iconTextContainer}>
          <Calendar size={16} color="#6B7280" />
          <Text style={styles.dateTimeText}>{item.date}</Text>
        </View>
        <View style={[styles.iconTextContainer, { marginLeft: 16 }]}>
          <Clock size={16} color="#6B7280" />
          <Text style={styles.dateTimeText}>{item.timeRange}</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.viewDetailsButton}
        onPress={() => onPress(item)}
      >
        <Text style={styles.viewDetailsText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );
};

// Sub-Component: Bottom Tab Item
const BottomTabItem = ({ 
  icon: Icon, 
  label, 
  isActive = false 
}: { 
  icon: any, 
  label: string, 
  isActive?: boolean 
}) => (
  <TouchableOpacity style={styles.tabItem}>
    <Icon 
      size={24} 
      color={isActive ? '#0F3C32' : '#9CA3AF'} 
      strokeWidth={isActive ? 2.5 : 2}
    />
    <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
      {label}
    </Text>
  </TouchableOpacity>
);

export default function AppointmentScreen ({ navigation }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const handleViewDetails = (item: Appointment) => {
    setSelectedAppointment(item);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedAppointment(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F3C32" />
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>My Appointments</Text>
        <Text style={styles.headerSubtitle}>Track your service requests</Text>
      </View>

      <FlatList
        data={APPOINTMENTS_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AppointmentCard item={item} onPress={handleViewDetails} />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* BOTTOM NAVIGATION */}
      <View style={styles.bottomNav}>
        <NavIcon 
            name="home" 
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
            active 
        />

        <NavIcon 
            name="newspaper-outline" 
            label="News" 
            onPress={() => navigation.navigate('Newscreen')} 
        />
         
        <NavIcon 
            name="person-outline" 
            label="Profile" 
            onPress={() => navigation.navigate('Profile')} 
        />
      </View>

      <AppointmentDetailsModal 
        visible={modalVisible}
        appointment={selectedAppointment}
        onClose={handleCloseModal}
      />
    </SafeAreaView>
  );
}

const NavIcon: React.FC<NavIconProps> = ({ name, label, active = false, onPress }) => (
  <TouchableOpacity style={styles.navItem} activeOpacity={0.7} onPress={onPress}>
    <Ionicons name={name} size={24} color={active ? "#0F3C2F" : "#999"} />
    <Text style={[styles.navLabel, active && styles.navLabelActive]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  headerContainer: {
    backgroundColor: '#0F3C32',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#D1D5DB',
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#EAB308',
  },
  referenceText: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 12,
  },
  dateTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateTimeText: {
    fontSize: 13,
    color: '#4B5563',
    marginLeft: 6,
  },
  viewDetailsButton: {
    borderWidth: 1,
    borderColor: '#0F3C32',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  viewDetailsText: {
    color: '#0F3C32',
    fontWeight: '600',
    fontSize: 14,
  },

  // Navigation
  bottomNavContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 4,
    color: '#9CA3AF',
  },
  tabLabelActive: {
    color: '#0F3C32',
    fontWeight: '600',
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalBackdrop: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
    maxHeight: '80%', 
  },
  dragHandleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  dragHandle: {
    width: 48,
    height: 5,
    backgroundColor: '#E5E7EB',
    borderRadius: 2.5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 24,
  },
  detailItem: {
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 12,
    color: '#9CA3AF', 
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#EF4444',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  cancelButtonText: {
    color: '#EF4444', 
    fontWeight: '600',
    fontSize: 14,
  },
  closeButton: {
    flex: 1,
    backgroundColor: '#0F3C32', 
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
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