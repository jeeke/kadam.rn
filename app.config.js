const versionNumber = "1.0.0";
const versionCode = 1


const environmentConfig = {
  development: {
    name: "Kadam Dev",
    baseURL: '',
    package: "com.kadam.dev",
    environment: "development",
  },
  production: {
    name: "Kadam",
    baseURL: '',
    package: 'com.kadam',
    environment: "production",
  },
  uat: {
    name: "Kadam",
    baseURL: '',
    package: 'com.kadam',
    environment: "uat",
  }
}

const environment = process.env.ENVIRONMENT || 'development'
const selectedEnvironment = environmentConfig[environment];

export default {
  expo: {
    splash: {
      resizeMode: "contain",
      backgroundColor: "#000000"
    },
    name: selectedEnvironment.name,
    slug: "kadam",
    owner: "kadam_guru",
    version: versionNumber,
    runtimeVersion: versionNumber,
    orientation: "portrait",
    icon: "./assets/images/adaptive-icon.png",
    scheme: "kadam",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    jsEngine: "hermes",
    ios: {
      newArchEnabled: true,
      supportsTablet: false,
      bundleIdentifier: selectedEnvironment.package,
      buildNumber: versionNumber,
      googleServicesFile: `./src/firebase/${environment}/GoogleService-Info.plist`

    },
    android: {
      newArchEnabled: true,
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
      },
      package: selectedEnvironment.package,
      versionCode,
      permissions: [
        "ACCESS_NETWORK_STATE",
      ],
      googleServicesFile: `./src/firebase/${environment}/google-services.json`
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/adaptive-icon.png"
    },
    plugins: [
      [
        "@react-native-firebase/app",
        {
          ios: {
            googleServicesFile: `./src/firebase/${environment}/GoogleService-Info.plist`
          },
          android: {
            googleServicesFile: `./src/firebase/${environment}/google-services.json`
          }
        }
      ],
      "expo-secure-store",
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/adaptive-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#000000",
        },
      ],
      [
        "expo-build-properties",
        {
          android: {
            enableProguardInReleaseBuilds: true,
            enableShrinkResourcesInReleaseBuilds: true
          }
        }
      ],
      "expo-font",
      [
        "expo-build-properties",
        {
          "ios": {
            "useFrameworks": "static",
          }
        }
      ],
      [
        "./withFixedFirebase.js"
      ]
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      baseURL: selectedEnvironment.baseURL,
      environment: selectedEnvironment.environment,
      eas: {
        projectId: "424bd4dc-c6df-42d4-b22a-053ffff20e15"
      },
    },
    backgroundColor: '#000000',
    updates: {
      url: selectedEnvironment.updateUrl,
      fallbackToCacheTimeout: 10000,
    },
  },

}