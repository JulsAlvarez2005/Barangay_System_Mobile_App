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
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import {
  Megaphone,
  Calendar,
  Home,
  PlusCircle,
  FileText,
  Newspaper,
  User,
  X,
} from 'lucide-react-native';
import Ionicons from '@expo/vector-icons/build/Ionicons';

type Props = {
  navigation: any; 
};

interface NavIconProps {
  name: React.ComponentProps<typeof Ionicons>['name']; 
  label: string;
  active?: boolean;
  onPress?: () => void; 
}

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  fullContent: string;
  date: string;
  formattedDate: string;
}

// Sample data only for display 
const NEWS_DATA: NewsItem[] = [
  {
    id: '1',
    title: 'Barangay Office Holiday Schedule',
    summary: 'The Barangay Office will be closed on January 25, 2026 in observance of a special non-working holiday. Regular operations will resume on January 26, 2026.',
    fullContent: 'The Barangay Office will be closed on January 25, 2026 in observance of a special non-working holiday declared by the national government.\n\nPlease be advised that all transaction processing, clearance issuances, and scheduled hearings will be suspended on this date.\n\nRegular operations will resume on January 26, 2026, at 8:00 AM. For emergency concerns, the Barangay Peacekeeping Action Team (BPAT) will remain operational 24/7.',
    date: 'Jan 20, 2026',
    formattedDate: 'Posted on January 20, 2026',
  },
  {
    id: '2',
    title: 'Medical Mission & Free Checkup',
    summary: 'Join us for the annual Barangay Medical Mission this coming Saturday at the Covered Court. Free checkups and medicines available.',
    fullContent: 'We are inviting all residents to our Annual Medical Mission.\n\nServices include:\n- Free Medical Consultation\n- Dental Check-up\n- Distribution of Vitamins and Medicines\n\nVenue: Barangay Covered Court\nTime: 8:00 AM - 3:00 PM\n\nPlease bring your valid ID for registration.',
    date: 'Jan 18, 2026',
    formattedDate: 'Posted on January 18, 2026',
  },
];

const NewsDetailsModal = ({
  visible,
  newsItem,
  onClose,
}: {
  visible: boolean;
  newsItem: NewsItem | null;
  onClose: () => void;
}) => {
  if (!newsItem) return null;

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

        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <View style={styles.dragHandle} />
            <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Title */}
            <Text style={styles.modalTitle}>{newsItem.title}</Text>

            {/* Date */}
            <View style={styles.modalDateRow}>
              <Calendar size={16} color="#6B7280" />
              <Text style={styles.modalDateText}>{newsItem.formattedDate}</Text>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Full Content */}
            <Text style={styles.modalBodyText}>{newsItem.fullContent}</Text>
          </ScrollView>

          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close Article</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const NewsCard = ({
  item,
  onPress,
}: {
  item: NewsItem;
  onPress: (item: NewsItem) => void;
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.cardHeaderRow}>
          <Megaphone size={24} color="#111827" style={styles.cardIcon} />
          <Text style={styles.cardTitle}>{item.title}</Text>
        </View>

        <Text style={styles.cardSummary}>{item.summary}</Text>

        <View style={styles.dateRow}>
          <Calendar size={16} color="#6B7280" />
          <Text style={styles.dateText}>{item.formattedDate}</Text>
        </View>

        <TouchableOpacity
          style={styles.readMoreContainer}
          onPress={() => onPress(item)}
        >
          <Text style={styles.readMoreText}>Read More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const BottomTabItem = ({
  icon: Icon,
  label,
  isActive = false,
}: {
  icon: any;
  label: string;
  isActive?: boolean;
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

export default function NewsScreen ({ navigation }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  const handleReadMore = (item: NewsItem) => {
    setSelectedNews(item);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedNews(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F3C32" />

      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Announcements</Text>
        <Text style={styles.headerSubtitle}>Stay updated with barangay news</Text>
      </View>

      <FlatList
        data={NEWS_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NewsCard item={item} onPress={handleReadMore} />
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
            onPress={() => navigation.navigate('Appointment')} 
        />

        <NavIcon 
            name="newspaper-outline" 
            label="News" 
            active 
        />
         
        <NavIcon 
            name="person-outline" 
            label="Profile" 
            onPress={() => navigation.navigate('Profile')} 
        />
      </View>

      {/* Read More */}
      <NewsDetailsModal
        visible={modalVisible}
        newsItem={selectedNews}
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
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  cardContent: {
    padding: 16,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cardIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  cardTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    lineHeight: 22,
  },
  cardSummary: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dateText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 6,
  },
  readMoreContainer: {
    alignItems: 'flex-end',
    marginTop: 4,
  },
  readMoreText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },

  // Bottom Navigation Styles
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
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  dragHandle: {
    width: 48,
    height: 5,
    backgroundColor: '#E5E7EB',
    borderRadius: 2.5,
  },
  closeIcon: {
    position: 'absolute',
    right: 0,
    top: -10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  modalDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalDateText: {
    fontSize: 13,
    color: '#6B7280',
    marginLeft: 6,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginBottom: 16,
  },
  modalBodyText: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 24,
    marginBottom: 24,
  },
  closeButton: {
    backgroundColor: '#0F3C32',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
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