import * as FlashMessage from 'react-native-flash-message';

import { storage, ref, getDownloadURL } from './firebase';

const showSuccessMsg = (message) => {
  FlashMessage.showMessage({
    message: message,
    type: 'success',
  });
};

const showInfoMsg = (message) => {
  FlashMessage.showMessage({
    message: message,
    type: 'info',
  });
};

const showWarningMsg = (message) => {
  FlashMessage.showMessage({
    message: message,
    type: 'warning',
  });
};

const getUserImageURL = async (userId) => {
  const storageRef = ref(storage, `userImages/${userId}`);
  return await getDownloadURL(ref(storage, storageRef)).catch((error) => {
    return null;
  });
};

const helpers = {
  showSuccessMsg,
  showInfoMsg,
  showWarningMsg,
  getUserImageURL,
};
export default helpers;
