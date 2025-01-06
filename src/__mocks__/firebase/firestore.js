const collection = jest.fn();
const doc = jest.fn();
const addDoc = jest.fn();
const updateDoc = jest.fn();
const deleteDoc = jest.fn();
const query = jest.fn();
const where = jest.fn();
const orderBy = jest.fn();
const serverTimestamp = jest.fn();
const Timestamp = {
  fromDate: jest.fn(),
  now: jest.fn()
};

const db = {
  collection,
  doc
};

const getFirestore = jest.fn(() => db);

export {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp,
  getFirestore
};