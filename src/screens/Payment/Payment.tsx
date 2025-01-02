import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  NativeModules,
} from 'react-native';
import {UPIApp} from '../../types/upi';
import {getUPIApps} from '../../services/upiService';
import {UPIAppItem} from '../../components/UPIAppsList/UPIAppItem';
import styles from '../../styles/styles';
import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';
import {AMOUNT, NOTE, UPI_ID} from './const';

const {UPIAppsModule} = NativeModules;

export const Payment = () => {
  const [upiApps, setUpiApps] = useState<UPIApp[]>([]);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [selectedUPIApp, setSelectedUPIApp] = useState<UPIApp | null>(null);

  useEffect(() => {
    fetchUPIApps();
  }, []);

  const fetchUPIApps = async () => {
    const apps = await getUPIApps();
    setUpiApps(apps);
  };

  const handleUPIAppSelection = (item: UPIApp) => {
    // Handle UPI app selection here
    setSelectedUPIApp(item);
    bottomSheetModalRef.current?.present();
  };

  const handlePaymentConfirmation = async () => {
    if (selectedUPIApp) {
      try {
        await UPIAppsModule.initiateUPIPayment(
          selectedUPIApp.packageName,
          UPI_ID,
          AMOUNT.toString(),
          NOTE,
        );
        bottomSheetModalRef.current?.dismiss();
      } catch (error) {
        console.error('Payment initiation failed:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={upiApps}
        renderItem={({item}) => (
          <UPIAppItem item={item} onPress={() => handleUPIAppSelection(item)} />
        )}
        keyExtractor={item => item.packageName}
        contentContainerStyle={styles.listContainer}
      />
      <BottomSheetModal
        ref={bottomSheetModalRef}
        containerStyle={styles.modalContainer}>
        <BottomSheetView style={styles.modalContent}>
          {/* please add the selected UPI image here */}
          <Image
            source={{
              uri: `data:image/png;base64,${selectedUPIApp?.appIcon}`,
            }}
            style={styles.selectedUPIAppImage}
          />
          <Text style={styles.confirmText}>
            Confirm your payment with {selectedUPIApp?.appName} of Rs. 100 to
            React Native open source?
          </Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => bottomSheetModalRef.current?.dismiss()}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handlePaymentConfirmation}>
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
};
