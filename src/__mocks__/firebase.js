export const auth = {
  currentUser: null,
  onAuthStateChanged: jest.fn(),
  signInWithPopup: jest.fn(),
  signOut: jest.fn()
};

export const googleProvider = {
  addScope: jest.fn()
};

export const db = {
  collection: jest.fn()
};

export const initializeApp = jest.fn();
export const initializeAuth = jest.fn(() => auth);
export const GoogleAuthProvider = jest.fn(() => googleProvider);
export const getFirestore = jest.fn(() => db);