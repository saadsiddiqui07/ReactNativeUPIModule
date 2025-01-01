import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {RootNavigator} from './src/navigation/RootNavigator';
import styles from './src/styles/styles';

const App = () => {
  return (
    <NavigationContainer>
      <GestureHandlerRootView style={styles.container}>
        <BottomSheetModalProvider>
          <RootNavigator />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
};

export default App;
