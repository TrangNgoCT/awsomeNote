import AsyncStorage from '@react-native-async-storage/async-storage';

enum StoreKeys {
  ACCESS_TOKEN = 'NOTE_APP_TOKEN',
  REFRESH_TOKEN = 'NOTE_APP_RF_TOKEN',
}

type TokenStorage = {
  value: string;
  key: StoreKeys.ACCESS_TOKEN;
};

type RefreshTokenStorage = {
  value: string;
  key: StoreKeys.REFRESH_TOKEN;
};

type StoreData = TokenStorage | RefreshTokenStorage;

const storeData = async (storeData: StoreData) => {
  try {
    if (typeof storeData.value === 'object') {
      const jsonValue = JSON.stringify(storeData.value);
      await AsyncStorage.setItem(storeData.key, jsonValue);
    } else {
      await AsyncStorage.setItem(storeData.key, storeData.value);
    }
  } catch (e) {
    // saving error
  }
};

const getAccessToken = async () => {
  try {
    const value = await AsyncStorage.getItem(StoreKeys.ACCESS_TOKEN);
    return value || undefined;
  } catch (e) {
    // error reading value
  }
};

const removeAccessToken = async () => {
  try {
    await AsyncStorage.removeItem(StoreKeys.ACCESS_TOKEN);
  } catch (e) {
    // remove error
  }
};

// const getDataTypeObject = async (key: StoreKeys) => {
//   try {
//     const jsonValue = await AsyncStorage.getItem(key);
//     return jsonValue != null ? JSON.parse(jsonValue) : null;
//   } catch (e) {
//     // error reading value
//   }
// };

export { storeData, getAccessToken, removeAccessToken, StoreKeys };
export type { TokenStorage, RefreshTokenStorage };
