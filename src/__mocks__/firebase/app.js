const initializeApp = jest.fn(() => ({
    name: '[DEFAULT]',
    automaticDataCollectionEnabled: false
  }));
  
  export { initializeApp };