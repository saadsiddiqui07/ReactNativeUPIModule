import {NativeModules} from 'react-native';
import {UPIApp} from '../types/upi';

const {UPIAppsModule} = NativeModules;

export const getUPIApps = async (): Promise<UPIApp[]> => {
  try {
    return await UPIAppsModule.getUPIApps();
  } catch (error) {
    console.error('Error fetching UPI apps:', error);
    return [];
  }
};
