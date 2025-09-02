
type RootStackParamsList = {
  Login: undefined;
  RoughScreen: undefined;
  SplashScreen: undefined;
  MainScreen: undefined
};

type RootStackParamList = keyof RootStackParamsList;

export const RootStackScreens: { [K in RootStackParamList]: K } = {
  Login: 'Login',
  RoughScreen: 'RoughScreen',
  SplashScreen: 'SplashScreen',
  MainScreen: 'MainScreen'
};