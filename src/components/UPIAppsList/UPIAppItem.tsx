import React from 'react';
import {TouchableOpacity, Image, View, Text} from 'react-native';
import {UPIApp} from '../../types/upi';
import styles from '../../styles/styles';

interface Props {
  item: UPIApp;
  onPress: () => void;
}

export const UPIAppItem = ({item, onPress}: Props) => (
  <TouchableOpacity
    style={styles.appItem}
    activeOpacity={0.6}
    onPress={onPress}>
    <Image
      source={{
        uri: `data:image/png;base64,${item.appIcon}`,
      }}
      style={styles.appIcon}
    />
    <View>
      <Text style={styles.appName}>{item.appName}</Text>
      <Text style={styles.packageName}>{item.packageName}</Text>
    </View>
  </TouchableOpacity>
);
