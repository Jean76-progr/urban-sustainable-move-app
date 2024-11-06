import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
appId: 'com.urbansustainablemove.app',
appName: 'Urban Sustainable Move',
webDir: 'build',
server: {
androidScheme: 'https'
},
android: {
buildOptions: {
keystorePath: 'release.keystore',
keystoreAlias: 'key0',
keystorePassword: 'password',
keystoreKeyPassword: 'password',
releaseType: 'APK'
}
}
};

export default config;