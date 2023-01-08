import * as FlashMessage from "react-native-flash-message";

const showWarning = (message) => {
  FlashMessage.showMessage({
    message: message,
    type: "warning",
  });
};

const helpers = {
  showWarning,
};
export default helpers;
