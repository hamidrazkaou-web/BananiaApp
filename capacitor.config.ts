import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mentalreverb.banania',
  appName: 'Banania',
  webDir: 'www',
  bundledWebRuntime: false,
  android: {
    allowMixedContent: true
  },
  server: {
    androidScheme: 'https'
  }
};

export default config;
