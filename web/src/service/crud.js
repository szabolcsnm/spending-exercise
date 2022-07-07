import {database} from '../config/firebase';
import {ref, set, push, update, remove, onValue} from 'firebase/database';

/* Create Spending */
export function createSpending(endpoint, dataObject) {
  const refData = ref(database, endpoint);
  const newRefData = push(refData);
  return set(newRefData, dataObject);
}

/* Read Spending */
export function readSpending(endpoint, callback) {
  const refdata = ref(database, endpoint);
  return onValue(refdata, callback);
}

/* Update Spending */
export function updateSpending(endpoint, key, dataObject) {
  const refData = ref(database, `${endpoint}/${key}`);
  return update(refData, dataObject);
}

/* Delete Spending */
export function deleteSpending(endpoint, key) {
  const refData = ref(database, `${endpoint}/${key}`);
  return remove(refData);
}
