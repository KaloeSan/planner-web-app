const auth = {
    currentUser: null,
    onAuthStateChanged: jest.fn(),
    signInWithPopup: jest.fn(),
    signOut: jest.fn()
  };
  
  const GoogleAuthProvider = jest.fn(() => ({
    addScope: jest.fn()
  }));
  
  const browserLocalPersistence = {};
  const indexedDBLocalPersistence = {};
  const initializeAuth = jest.fn(() => auth);
  
  export { 
    auth,
    GoogleAuthProvider,
    browserLocalPersistence,
    indexedDBLocalPersistence,
    initializeAuth
  };