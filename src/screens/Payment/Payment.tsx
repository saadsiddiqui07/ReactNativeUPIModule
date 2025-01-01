import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import {UPIApp} from '../../types/upi';
import {getUPIApps} from '../../services/upiService';
import {UPIAppItem} from '../../components/UPIAppsList/UPIAppItem';
import styles from '../../styles/styles';

export const Payment = () => {
  const [upiApps, setUpiApps] = useState<UPIApp[]>([]);

  useEffect(() => {
    fetchUPIApps();
  }, []);

  const fetchUPIApps = async () => {
    const apps = await getUPIApps();
    setUpiApps(apps);
  };

  const handleUPIAppSelection = (item: UPIApp) => {
    // Handle UPI app selection here
    console.log('UPI app selected', item.appName);
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
    </View>
  );
};
