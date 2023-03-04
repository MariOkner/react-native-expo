import * as FlashMessage from 'react-native-flash-message';

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

const helpers = {
  showSuccessMsg,
  showInfoMsg,
  showWarningMsg,
};
export default helpers;
