import React, { useState } from 'react';
import { 
  StyleSheet, View, Text, SafeAreaView, TouchableOpacity, 
  ScrollView, StatusBar, Modal, Dimensions, LayoutAnimation, 
  Platform, UIManager, TextInput
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width } = Dimensions.get('window');

export default function BookingFlow({ navigation }: any) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState(14);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [purpose, setPurpose] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  
  const nextStep = (step: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCurrentStep(step);
  };

  // STEP 1: SERVICE SELECTION 
  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.sectionTitle}>Select Service Type</Text>
      <Text style={styles.sectionSubtitle}>Choose the barangay service you need</Text>
      
      {['Barangay Clearance', 'Barangay Certificate', 'Business Clearance', 'Blotter Report', 'Cedula'].map((service) => (
        <TouchableOpacity 
          key={service} 
          style={[styles.serviceCard, selectedService === service && styles.activeCard]} 
          onPress={() => {
            setSelectedService(service);
            nextStep(2);
          }}
        >
          <View style={styles.cardIcon}>
             <Ionicons name="document-text-outline" size={24} color="#111" />
          </View>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>{service}</Text>
            <Text style={styles.cardPrice}>₱30</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  // STEP 2: DATE SELECTION 
  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <TouchableOpacity style={styles.backButton} onPress={() => nextStep(1)}>
        <Ionicons name="arrow-back" size={20} color="#111" />
        <Text style={styles.backButtonText}>Back to Service Selection</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Select Date</Text>
      <Text style={styles.sectionSubtitle}>Choose your preferred appointment date</Text>
      
      <View style={styles.calendarWrapper}>
        <View style={styles.calendarHeader}>
          <TouchableOpacity style={styles.arrowBtn}><Ionicons name="chevron-back" size={20} /></TouchableOpacity>
          <Text style={styles.monthLabel}>January 2026</Text>
          <TouchableOpacity style={styles.arrowBtn}><Ionicons name="chevron-forward" size={20} /></TouchableOpacity>
        </View>

        <View style={styles.weekHeader}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <Text key={d} style={styles.weekText}>{d}</Text>)}
        </View>

        <View style={styles.daysGrid}>
           {[...Array(31)].map((_, i) => (
             <TouchableOpacity 
               key={i} 
               style={[styles.dayCell, selectedDay === i+1 && styles.selectedDayCell]}
               onPress={() => setSelectedDay(i+1)}
             >
               <Text style={[styles.dayText, selectedDay === i+1 && styles.selectedDayText]}>{i + 1}</Text>
             </TouchableOpacity>
           ))}
        </View>
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={() => nextStep(3)}>
        <Text style={styles.primaryButtonText}>Next: Select Time</Text>
      </TouchableOpacity>
    </View>
  );

  // STEP 3: TIME SELECTION
  const renderStep3 = () => (
    <View style={styles.stepContainer}>

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => nextStep(2)}>
        <Ionicons name="arrow-back" size={20} color="#111" />
        <Text style={styles.backButtonText}>Back to Date Selection</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Select Time Slot</Text>
      <Text style={styles.sectionSubtitle}>Choose your preferred time</Text>

      {/* Date Preview Card */}
      <View style={styles.miniCalendarCard}>
        <View style={styles.calendarHeaderSmall}>
            <View style={styles.row}>
                <TouchableOpacity style={styles.smallArrow}><Ionicons name="chevron-back" size={16} /></TouchableOpacity>
                <TouchableOpacity style={styles.smallArrow}><Ionicons name="chevron-back" size={16} /></TouchableOpacity>
            </View>
            <Text style={styles.miniMonthText}>January 2026</Text>
            <View style={styles.row}>
                <TouchableOpacity style={styles.smallArrow}><Ionicons name="chevron-forward" size={16} /></TouchableOpacity>
                <TouchableOpacity style={styles.smallArrow}><Ionicons name="chevron-forward" size={16} /></TouchableOpacity>
            </View>
        </View>
        <Text style={styles.dateDetailText}>Date: Thursday, January 29, 2026</Text>
      </View>

      {/* Morning Session Card */}
      <View style={styles.sessionCard}>
        <View style={styles.sessionHeaderRow}>
            <View style={styles.row}>
                <Ionicons name="time-outline" size={24} color="#111" />
                <View style={styles.sessionTextGap}>
                    <Text style={styles.sessionTitleText}>Morning Session</Text>
                    <Text style={styles.sessionSubText}>8:00 AM - 11:00 AM</Text>
                </View>
            </View>
            <Text style={styles.slotsText}>10/10 slots</Text>
        </View>
        <TouchableOpacity 
            style={[styles.sessionButton, selectedSession === 'morning' && styles.sessionButtonSelected]}
            onPress={() => setSelectedSession('morning')}
        >
            <Text style={styles.sessionButtonText}>Select Morning</Text>
        </TouchableOpacity>
      </View>

      {/* Afternoon Session Card */}
      <View style={styles.sessionCard}>
        <View style={styles.sessionHeaderRow}>
            <View style={styles.row}>
                <Ionicons name="sunny-outline" size={24} color="#111" />
                <View style={styles.sessionTextGap}>
                    <Text style={styles.sessionTitleText}>Afternoon Session</Text>
                    <Text style={styles.sessionSubText}>1:00 PM - 4:00 PM</Text>
                </View>
            </View>
            <Text style={styles.slotsText}>8/10 slots</Text>
        </View>
        <TouchableOpacity 
            style={[styles.sessionButton, selectedSession === 'afternoon' && styles.sessionButtonSelected]}
            onPress={() => setSelectedSession('afternoon')}
        >
            <Text style={styles.sessionButtonText}>Select Afternoon</Text>
        </TouchableOpacity>
      </View>

      {/* Footer Next Button */}
      <TouchableOpacity 
        style={[styles.primaryButton, !selectedSession && {opacity: 0.5}]} 
        disabled={!selectedSession}
        onPress={() => nextStep(4)}
      >
        <Text style={styles.primaryButtonText}>Next: Review Details</Text>
      </TouchableOpacity>
    </View>
  );

// STEP 4: DETAILS 
   const renderStep4 = () => (
    <View style={styles.stepContainer}>

      {/* Navigation */}
      <TouchableOpacity style={styles.backButton} onPress={() => nextStep(3)}>
        <Ionicons name="arrow-back" size={22} color="#111" />
        <Text style={styles.backButtonText}>Back to Time Selection</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Appointment Details</Text>
      <Text style={styles.sectionSubtitle}>Provide additional information</Text>

      {/* Summary Box */}
      <View style={styles.summaryBox}>
        <Text style={styles.summaryText}>
          <Text style={styles.summaryLabel}>Service: </Text>Barangay Clearance
        </Text>
        <Text style={styles.summaryText}>
          <Text style={styles.summaryLabel}>Date: </Text>Thursday, January 29, 2026
        </Text>
        <Text style={styles.summaryText}>
          <Text style={styles.summaryLabel}>Time: </Text>Afternoon Session
        </Text>
      </View>

      {/* Input Section */}
      <Text style={styles.inputLabel}>
        Purpose / Description <Text style={{color: 'red'}}>*</Text>
      </Text>
      <View style={styles.textAreaContainer}>
        <TextInput
          style={styles.textArea}
          placeholder="Please provide details about why you need this service (minimum 10 characters)"
          placeholderTextColor="#999"
          multiline={true}
          numberOfLines={6}
          textAlignVertical="top"
          value={purpose}
          onChangeText={setPurpose}
        />
      </View>

      <Text style={styles.charCount}>{purpose.length}/10 minimum characters</Text>

      {/* Important Reminders */}
      <View style={styles.remindersBox}>
        <Text style={styles.remindersTitle}>Important Reminders:</Text>
        <View style={styles.bulletItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Your appointment will be subject to admin approval</Text>
        </View>

        <View style={styles.bulletItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Please arrive 10 minutes before your scheduled time</Text>
        </View>

        <View style={styles.bulletItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Bring valid ID and required documents</Text>
        </View>

        <View style={styles.bulletItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>You will receive a notification once your request is processed</Text>
        </View>
      </View>

      {/* Final Button */}
      <TouchableOpacity 
        style={[styles.primaryButton, purpose.length < 10 && {opacity: 0.6}]} 
        onPress={() => nextStep(5)}
        disabled={purpose.length < 10}>
        <Text style={styles.primaryButtonText}>Continue to Confirmation</Text>
      </TouchableOpacity>
    </View>
  );


  // STEP 5: CONFIRMATION
  const renderStep5 = () => (
    <View style={styles.stepContainer}>

      {/* Navigation */}
      <TouchableOpacity style={styles.backButton} onPress={() => nextStep(4)}>
        <Ionicons name="arrow-back" size={22} color="#111" />
        <Text style={styles.backButtonText}>Back to Details</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Confirm Appointment</Text>
      <Text style={styles.sectionSubtitle}>Please review your appointment details</Text>

      {/* Confirmation Receipt Box */}
      <View style={styles.confirmationBox}>
        <View style={styles.confirmRow}>
          <Text style={styles.confirmLabel}>Service:</Text>
          <Text style={styles.confirmValue}>Barangay Clearance</Text>
        </View>
        
        <View style={styles.confirmRow}>
          <Text style={styles.confirmLabel}>Date:</Text>
          <Text style={styles.confirmValue}>Thursday, January 29, 2026</Text>
        </View>

        <View style={styles.confirmRow}>
          <Text style={styles.confirmLabel}>Time:</Text>
          <Text style={styles.confirmValue}>Afternoon Session</Text>
        </View>

        <View style={styles.confirmRow}>
          <Text style={styles.confirmLabel}>Purpose:</Text>
          <Text style={styles.confirmValue}>{purpose || "Not specified"}</Text>
        </View>
      </View>

      <Text style={styles.disclaimerText}>
        By confirming, you agree that all information provided is accurate and you will follow the barangay's appointment protocols.
      </Text>

      {/* Action Buttons */}
      <View style={styles.buttonRow}>

        <TouchableOpacity 
          style={styles.editButton} 
          onPress={() => nextStep(4)}>
          <Text style={styles.editButtonText}>Edit Details</Text>
        </TouchableOpacity>

        <TouchableOpacity 
           style={styles.confirmButton} 
           onPress={() => setShowSuccess(true)}>
           <Text style={styles.confirmButtonText}>Confirm Booking</Text>
        </TouchableOpacity>

      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F3C2F" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Book an Appointment</Text>
        <Text style={styles.headerSubtitle}>Schedule your barangay service request</Text>
      </View>

      {/* STEPPER (indicator for success steps) */}
      <View style={styles.stepperContainer}>
        {[1, 2, 3, 4, 5].map((step, index) => (
          <React.Fragment key={step}>
            <View style={styles.stepItem}>
              <View style={[styles.stepCircle, currentStep >= step ? styles.stepActive : styles.stepInactive]}>
                <Text style={{color: currentStep >= step ? '#fff' : '#666'}}>{step}</Text>
              </View>

              <Text style={[styles.stepLabel, currentStep >= step ? styles.labelActive : styles.labelInactive]}>
                {['Services', 'Date', 'Time', 'Details', 'Confirm'][index]}
              </Text>
            </View>

            {index < 4 && (
              <View style={[styles.stepLine, currentStep > step ? styles.lineActive : styles.lineInactive]} />
            )}
          </React.Fragment>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
        {currentStep === 5 && renderStep5()}
      </ScrollView>

      {/* BOTTOM SHEET! */}
       <Modal
        animationType="slide"
        transparent={true}
        visible={showSuccess}
        onRequestClose={() => setShowSuccess(false)}>
        
        <View style={styles.bottomSheetOverlay}>
        <View style={styles.bottomSheetContainer}>

      {/* Decorative Handle Bar */}
      <View style={styles.dragHandle} />

      {/* Success Icon */}
      <View style={styles.successCircleLarge}>
        <Ionicons name="checkmark" size={50} color="#0F3C2F" />
      </View>

      <Text style={styles.bottomSheetTitle}>Appointment Submitted!</Text>
      <Text style={styles.bottomSheetSubtitle}>
        Your appointment request has been submitted successfully. 
        You will receive a notification once it is reviewed by the barangay staff.
      </Text>

      {/* Action Buttons */}
      <TouchableOpacity 
        style={styles.actionButtonPrimary} 
        onPress={() => {
          setShowSuccess(false);
          navigation.navigate('Home');
        }}
      >
        <Text style={styles.actionButtonPrimaryText}>View my Appointments</Text>
      </TouchableOpacity>

    </View>
  </View>
</Modal>

    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  // BASE LAYOUT 
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
},
  header: { 
    backgroundColor: '#0F3C2F', 
    padding: 25, 
    paddingTop: 40 
},
  headerTitle: { 
    color: '#fff', 
    fontSize: 24, 
    fontWeight: 'bold' 
},
  headerSubtitle: { 
    color: '#A7C0B8', 
    fontSize: 14, 
    marginTop: 5 
},
  
  // STEPPER 
  stepperContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingVertical: 25, 
    paddingHorizontal: 15, 
    borderBottomWidth: 1, 
    borderBottomColor: '#F0F0F0' 
},
  stepItem: { 
    alignItems: 'center', 
    zIndex: 2 
},
  stepCircle: { 
    width: 32, 
    height: 32, 
    borderRadius: 16, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 5 
},
  stepActive: { 
    backgroundColor: '#0F3C2F'
},
  stepInactive: { 
    backgroundColor: '#E5E7EB' 
},
  stepLabel: { 
    fontSize: 10, 
    position: 'absolute', 
    top: 38, 
    width: 60, 
    textAlign: 'center' 
},
  labelActive: { 
    color: '#0F3C2F', 
    fontWeight: 'bold' 
},
  labelInactive: { 
    color: '#999' 
},
  stepLine: { 
    flex: 0.15, 
    height: 2, 
    marginHorizontal: -10, 
    marginTop: -20, 
    zIndex: 1 
},
  lineActive: { 
    backgroundColor: '#0F3C2F' 
},
  lineInactive: { 
    backgroundColor: '#E5E7EB' 
},

  // CONTENT AREA 
  scrollContent: { 
    padding: 20, 
    paddingTop: 30 
},
  stepContainer: { 
    width: '100%' 
},
  sectionTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#111', 
    marginBottom: 5 
},
  sectionSubtitle: { 
    fontSize: 14, 
    color: '#666', 
    marginBottom: 20 
},

  // STEP 1 
  serviceCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 18, 
    borderRadius: 12, 
    borderWidth: 1, 
    borderColor: '#E5E7EB', 
    marginBottom: 12, 
    backgroundColor: '#fff' 
},
  activeCard: { 
    borderColor: '#0F3C2F', 
    backgroundColor: '#F0F9F6' 
},
  cardIcon: { 
    marginRight: 15 
},
  cardTextContainer: { 
    flex: 1 
},
  cardTitle: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#111' 
},
  cardPrice: { 
    fontSize: 12, 
    color: '#888', 
    marginTop: 2 
},

  // STEP 2
  backButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 20 
},
  backButtonText: { 
    marginLeft: 10, 
    fontWeight: '600', 
    fontSize: 15 
},
  calendarWrapper: { 
    marginTop: 10 
},
  calendarHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 20 
},
  monthLabel: { 
    fontSize: 18, 
    fontWeight: 'bold' 
},
  arrowBtn: { 
    padding: 8, 
    borderWidth: 1, 
    borderColor: '#EEE', 
    borderRadius: 8 
},
  weekHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-around',
    marginBottom: 10 
},
  weekText: { 
    color: '#0F3C2F', 
    fontWeight: '700', 
    width: (width - 40) / 7, 
    textAlign: 'center' 
},
  daysGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap' 
},
  dayCell: { 
    width: (width - 40) / 7, 
    height: 50, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginVertical: 2 
},
  dayText: { 
    fontSize: 16, 
    color: '#333' 
},
  selectedDayCell: { 
    backgroundColor: '#Bbf7D0', 
    borderRadius: 10 
},
  selectedDayText: { 
    color: '#0F3C2F', 
    fontWeight: 'bold' 
},

  // STEP 3 
  miniCalendarCard: { 
    backgroundColor: '#EEF2FF',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#C7D2FE',
    marginBottom: 20,
  },
  calendarHeaderSmall: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  row: { 
    flexDirection: 'row', 
    alignItems: 'center' 
},
  smallArrow: { 
    padding: 4, 
    marginHorizontal: 2 
},
  miniMonthText: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#111' 
},
  dateDetailText: { 
    fontSize: 14, 
    color: '#1E40AF', 
    fontWeight: '600' 
},
  sessionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 15,
  },
  sessionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  sessionTextGap: { 
    marginLeft: 15 
},
  sessionTitleText: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#111' 
},
  sessionSubText: { 
    fontSize: 14, 
    color: '#666', 
    marginTop: 4 
},
  slotsText: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#111' 
},
  sessionButton: {
    backgroundColor: '#0F3C2F',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  sessionButtonSelected: {
    backgroundColor: '#059669',
  },
  sessionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },

  // STEP 4 
  summaryBox: {
    backgroundColor: '#EEF2FF',
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: '#C7D2FE',
    marginBottom: 25,
  },
  summaryText: {
    fontSize: 15,
    color: '#3730A3',
    marginBottom: 4,
  },
  summaryLabel: {
    fontWeight: 'bold',
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F3C2F',
    marginBottom: 10,
  },
  textAreaContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#999',
    padding: 12,
    minHeight: 120,
  },
  textArea: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  charCount: {
    fontSize: 12,
    color: '#666',
    marginTop: 6,
    marginBottom: 20,
  },
  remindersBox: {
    backgroundColor: '#EEF2FF',
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: '#C7D2FE',
    marginBottom: 30,
  },
  remindersTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#3730A3',
    marginBottom: 8,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 4,
    paddingRight: 10,
  },
  bullet: {
    fontSize: 14,
    color: '#3730A3',
    marginRight: 8,
  },
  bulletText: {
    fontSize: 13,
    color: '#3730A3',
    lineHeight: 18,
    flex: 1,
  },


  // STEP 5 
  confirmationBox: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  confirmRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  confirmLabel: {
    fontSize: 15,
    color: '#666',
    fontWeight: '500',
  },
  confirmValue: {
    fontSize: 15,
    color: '#111',
    fontWeight: 'bold',
    textAlign: 'right',
    flex: 1,
    marginLeft: 20,
  },
  disclaimerText: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    marginRight: 10,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#374151',
    fontWeight: 'bold',
    fontSize: 16,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#0F3C2F',
    paddingVertical: 16,
    borderRadius: 10,
    marginLeft: 10,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

// BOTTOM SHEET 
  bottomSheetOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)', 
    justifyContent: 'flex-end', 
  },
  bottomSheetContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 25,
    paddingBottom: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  dragHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    marginBottom: 20,
  },
  successCircleLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: '#0F3C2F',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  bottomSheetTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 10,
  },
  bottomSheetSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 30,
    paddingHorizontal: 15,
  },
  actionButtonPrimary: {
    backgroundColor: '#0F3C2F',
    width: '100%',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  actionButtonPrimaryText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  actionButtonSecondary: {
    width: '100%',
    padding: 15,
    alignItems: 'center',
  },
  actionButtonSecondaryText: {
    color: '#0F3C2F',
    fontWeight: '600',
    fontSize: 15,
  },

  // GLOBAL BUTTONS
  primaryButton: { 
    backgroundColor: '#0F3C2F', 
    padding: 18, 
    borderRadius: 12, 
    marginTop: 30, 
    alignItems: 'center' 
},
  primaryButtonText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16 
}
});