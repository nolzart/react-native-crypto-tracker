import { ICrypto } from '../types/Coins';

type JSONResponse = {
    data?: Array<ICrypto>;
    errors?: Array<{ message: string }>;
};

class Http {
    get = async (url: string) => {
        try {
            const res = await fetch(url);
            const { data }: JSONResponse = await res.json();
            return data || [];
        } catch (err) {
            console.log('http get method err', err);
        }
    };

    post = async (url: string, body: any) => {
        let res = await fetch(url, {
            method: 'POST',
            body
        });

        const json = await res.json();

        return json;
    };
}

const instance = new Http();
export default instance;
