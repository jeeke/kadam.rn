module.exports = (config, options = {}) => {
  return {
    ...config,
    ios: {
      ...config.ios,
      podfile: `
        ${config.ios.podfile || ''}
        $RNFirebaseAsStaticFramework = true
        pod 'Firebase', :modular_headers => true
        pod 'FirebaseCore', :modular_headers => true
        pod 'FirebaseCoreInternal', :modular_headers => true
        pod 'GoogleUtilities', :modular_headers => true
      `
    }
  };
};