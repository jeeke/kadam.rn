
type RootStackParamsList = {
  Login: undefined;
  RoughScreen: undefined;
  SplashScreen: undefined;
  MainScreen: undefined
  LanguageSelectorScreen: undefined
  Video: undefined
  CategoryScreen: undefined
};

type RootStackParamList = keyof RootStackParamsList;

export const RootStackScreens: { [K in RootStackParamList]: K } = {
  Login: 'Login',
  RoughScreen: 'RoughScreen',
  SplashScreen: 'SplashScreen',
  MainScreen: 'MainScreen', 
  LanguageSelectorScreen: 'LanguageSelectorScreen',
  Video: 'Video', 
  CategoryScreen:'CategoryScreen'
};