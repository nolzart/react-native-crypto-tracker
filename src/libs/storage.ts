import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage {
    static instance = new Storage();

    set = async (key: string, value: string) => {
        try {
            await AsyncStorage.setItem(key, value);
            return true;
        } catch (error) {
            console.log('err set item', error);
            throw Error('Error set item')
        }
    };

    get = async (key: any) => {
        try {
            const result = await AsyncStorage.getItem(key);
            return result !== null;
        } catch (error) {
            console.log('err get item', error);
            throw Error('Error get item')
        }
    };

    remove = async (key: any) => {
        try {
            await AsyncStorage.removeItem(key);
            return true;
        } catch (error) {
            console.log('err remove item', error);
            throw Error('Error remove item')
        }
    };

    getKeys = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            return keys;
        } catch (error) {
            console.log('err get all keys', error);
            throw Error('Error get all keys')
        }
    }

    getAll = async (keys: Array<string>) => {
        try {
            const result = await AsyncStorage.multiGet(keys);
            return result
        } catch (error) {
            console.log('err get all keys', error);
            throw Error('Error get all items')
        }
    }
}

export default Storage.instance;
