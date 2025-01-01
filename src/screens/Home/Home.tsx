import React from 'react';
import {View, StatusBar, Button} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types/navigation';
import styles from '../../styles/styles';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Checkout'>;
};

export const Home = ({navigation}: Props) => {
  const handlePaymentNavigation = () => {
    navigation.navigate('Payment');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <Button title="Proceed to Payment" onPress={handlePaymentNavigation} />
    </View>
  );
};
