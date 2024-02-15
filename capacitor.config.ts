import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.race.fanatic',
  appName: 'Race Fanatic',
  webDir: 'www',
  server: {
    androidScheme: 'https',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      // launchAutoHide: true,
      launchFadeOutDuration: 3000,
      backgroundColor: '#0d0d0d',
      // androidSplashResourceName: "splash",
      // androidScaleType: "CENTER_CROP",
      showSpinner: false,
      // androidSpinnerStyle: 'large',
      // iosSpinnerStyle: 'small',
      // spinnerColor: '#999999',
      splashFullScreen: true,
      splashImmersive: true,
      layoutName: 'splash_screen',
      // useDialog: true,
    },
  },
};

export default config;
