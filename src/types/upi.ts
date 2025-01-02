export interface UPIAppModule {
  getUPIApps(): Promise<UPIApp[]>;
  initiateUPIPayment(
    packageName: string,
    upiId: string,
    amount: string,
    note: string,
  ): Promise<boolean>;
}

export interface UPIApp {
  packageName: string;
  appName: string;
  appIcon: string;
}

// Extend the NativeModules interface
declare module 'react-native' {
  interface NativeModulesStatic {
    UPIAppsModule: UPIAppModule;
  }
}
