import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Modal 
} from 'react-native';
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

export default function RateUsScreen({ navigation }: Props) {
  const [answers, setAnswers] = useState({
    q1: 5, q2: 5, q3: 5, q4: 5, q5: 5,
  });

  const [overallRating, setOverallRating] = useState(0);
  const [suggestions, setSuggestions] = useState('');
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);

  const handleAnswerSelect = (questionKey: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionKey]: value }));
  };

  const handleSubmit = () => {
    if (overallRating === 0) {
      Alert.alert('Missing field', 'Please rate your overall experience.');
      return;
    }
    if (suggestions.length < 10) {
      Alert.alert('More detail needed', 'Please provide at least 10 characters in your suggestions.');
      return;
    }
    setSuccessModalVisible(true);
  };

  const handleOkay = () => {
    setSuccessModalVisible(false);
    navigation.navigate('Appointment'); 
  };

  const renderQuestion = (questionNumber: number, text: string, questionKey: keyof typeof answers) => (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>{questionNumber}. {text}</Text>
      <View style={styles.radioGroup}>
        {[1, 2, 3, 4, 5].map((num) => {
          const isSelected = answers[questionKey] === num;
          return (
            <TouchableOpacity 
              key={num} 
              style={styles.radioButton}
              onPress={() => handleAnswerSelect(questionKey, num)}
            >
              <Ionicons 
                name={isSelected ? "radio-button-on" : "radio-button-off"} 
                size={20} 
                color={isSelected ? "#2563EB" : "#9CA3AF"} 
              />
              <Text style={styles.radioText}>{num}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0F3C32" />
      <View style={styles.topGreenBar} />

      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.pageTitle}>My Appointments</Text>
          <Text style={styles.pageSubtitle}>Track your service requests</Text>

          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Appointment')}>
            <Ionicons name="arrow-back" size={20} color="#111827" />
            <Text style={styles.backButtonText}>Back to My Appointments</Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Client Satisfaction</Text>
          <Text style={styles.sectionSubtitle}>We value your opinion. Help us improve our services</Text>

          <View style={styles.legendCard}>
            <Text style={styles.legendTitle}>Ratings</Text>
            <Text style={styles.legendText}>5 - Very Satisfied</Text>
            <Text style={styles.legendText}>4 - Satisfied</Text>
            <Text style={styles.legendText}>3 - Neutral</Text>
            <Text style={styles.legendText}>2 - Dissatisfied</Text>
            <Text style={styles.legendText}>1 - Very dissatisfied</Text>
          </View>

          {renderQuestion(1, "How satisfied are you with the quality of service provided?", "q1")}
          {renderQuestion(2, "How professional and courteous was the staff?", "q2")}
          {renderQuestion(3, "Was the appointment process smooth and efficient?", "q3")}
          {renderQuestion(4, "How satisfied are you with the facilities and cleanliness?", "q4")}
          {renderQuestion(5, "Would you recommend our barangay services to others?", "q5")}

          <View style={styles.overallContainer}>
            <Text style={styles.overallText}>How would you rate your overall experience? <Text style={styles.asterisk}>*</Text></Text>
            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => setOverallRating(star)}>
                  <Ionicons 
                    name={star <= overallRating ? "star" : "star-outline"} 
                    size={32} 
                    color="#4B5563" 
                    style={styles.starIcon}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.suggestionsContainer}>
            <Text style={styles.suggestionsTitle}>Suggestions <Text style={styles.asterisk}>*</Text></Text>
            <TextInput
              style={styles.textInput}
              placeholder="Please share your thoughts, suggestions, or concerns..."
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={5}
              textAlignVertical="top"
              value={suggestions}
              onChangeText={setSuggestions}
            />
            <Text style={styles.charCount}>Minimum 10 characters ({suggestions.length}/10)</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoBoxTitle}>Your feedback matters!</Text>
            <Text style={styles.infoBoxText}>
              We review all feedback to continuously improve our services. Your input helps us serve the community better.
            </Text>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit Feedback</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.bottomNav}>
        <NavIcon name="home" label="Home" onPress={() => navigation.navigate('Home')} />
        <NavIcon name="add-circle-outline" label="Book" onPress={() => navigation.navigate('Booking')} />
        <NavIcon name="document-text-outline" label="Appointments" active onPress={() => navigation.navigate('Appointment')} />
        <NavIcon name="newspaper-outline" label="News" onPress={() => navigation.navigate('Newscreen')} />
        <NavIcon name="person-outline" label="Profile" onPress={() => navigation.navigate('Profile')} />
      </View>

      {/* Success Bottom Sheet! */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isSuccessModalVisible}
        onRequestClose={() => setSuccessModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.bottomSheet}>
            <View style={styles.dragHandle} />
            
            <Ionicons name="checkmark-circle" size={60} color="#0F3C32" style={styles.successIcon} />
            
            <Text style={styles.successTitle}>Thank You!</Text>
            <Text style={styles.successMessage}>
              You have successfully submitted your feedback.
            </Text>

            <TouchableOpacity style={styles.okayButton} onPress={handleOkay}>
              <Text style={styles.okayButtonText}>Okay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
  safeArea: { 
    flex: 1, 
    backgroundColor: '#F9FAFB' 
},
  topGreenBar: { 
    backgroundColor: '#0F3C32', 
    height: Platform.OS === 'ios' ? 44 : 0 
},
  container: { 
    flex: 1 
},
  scrollContent: { 
    padding: 20, 
    paddingBottom: 100 
},
  pageTitle: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#111827' 
},
  pageSubtitle: { 
    fontSize: 14, 
    color: '#6B7280', 
    marginBottom: 20 
},
  backButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 24 
},
  backButtonText: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#111827', 
    marginLeft: 8 
},
  sectionTitle: { fontSize: 18, 
    fontWeight: 'bold', 
    color: '#111827', 
    marginBottom: 4 
},
  sectionSubtitle: { 
    fontSize: 12, 
    color: '#6B7280', 
    marginBottom: 20 
},
  legendCard: { 
    backgroundColor: '#FFFFFF', 
    borderRadius: 8, 
    padding: 16, 
    borderWidth: 1, 
    borderColor: '#E5E7EB', 
    marginBottom: 24 
},
  legendTitle: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#111827', 
    marginBottom: 10 
},
  legendText: { 
    fontSize: 12, 
    color: '#374151', 
    marginBottom: 4 
},
  questionContainer: { 
    marginBottom: 24 
},
  questionText: { 
    fontSize: 14, 
    color: '#111827', 
    marginBottom: 12, 
    lineHeight: 20 
},
  radioGroup: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    flexWrap: 'wrap', 
    gap: 16 
},
  radioButton: { 
    flexDirection: 'row', 
    alignItems: 'center' 
},
  radioText: { 
    marginLeft: 6, 
    fontSize: 14, 
    color: '#374151' 
},
  overallContainer: { 
    marginBottom: 24 
},
  overallText: { 
    fontSize: 14, 
    color: '#111827', 
    marginBottom: 12 
},
  asterisk: { 
    color: '#EF4444' 
},
  starsRow: { 
    flexDirection: 'row', 
    gap: 8 
},
  starIcon: { 
    marginRight: 4 
},
  suggestionsContainer: { 
    marginBottom: 24 
},
  suggestionsTitle: { 
    fontSize: 14, 
    color: '#111827', 
    marginBottom: 12 
},
  textInput: { 
    backgroundColor: '#FFFFFF', 
    borderWidth: 1, 
    borderColor: '#D1D5DB', 
    borderRadius: 8, 
    padding: 12, 
    fontSize: 14, 
    color: '#111827', 
    height: 100 
},
  charCount: { 
    fontSize: 10, 
    color: '#9CA3AF', 
    marginTop: 6 
},
  infoBox: { 
    backgroundColor: '#EFF6FF', 
    borderWidth: 1, 
    borderColor: '#BFDBFE', 
    borderRadius: 8, 
    padding: 16, 
    marginBottom: 24 
},
  infoBoxTitle: { 
    fontSize: 14, 
    fontWeight: 'bold', 
    color: '#1E3A8A', 
    marginBottom: 4 
},
  infoBoxText: { 
    fontSize: 12, 
    color: '#1E3A8A', 
    lineHeight: 18 
},
  submitButton: { 
    backgroundColor: '#0F3C32', 
    borderRadius: 8, 
    paddingVertical: 14, 
    alignItems: 'center', 
    marginBottom: 20
},
  submitButtonText: { 
    color: '#FFFFFF', 
    fontSize: 16, 
    fontWeight: 'bold' 
},
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
    right: 0 
},
  navItem: { 
    alignItems: 'center' 
},
  navLabel: { 
    fontSize: 10, 
    color: '#999', 
    marginTop: 4 
},
  navLabelActive: { 
    color: '#0F3C2F', 
    fontWeight: 'bold' 
},
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    alignItems: 'center',
  },
  dragHandle: {
    width: 48,
    height: 5,
    backgroundColor: '#E5E7EB',
    borderRadius: 2.5,
    marginBottom: 20,
  },
  successIcon: {
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  successMessage: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
  },
  okayButton: {
    backgroundColor: '#0F3C32',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  okayButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});