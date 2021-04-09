import React, {useEffect, useState} from 'react';
import { 
    View, 
    StyleSheet, 
    FlatList, 
    ActivityIndicator, 
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'

import Colors from '../../res/colors'
import CoinsItem from './CoinsItem'
import { ICrypto } from '../../types/Coins'
import CoinsSearch from './CoinsSearch'

type CoinsStackParamList = {
    Coins: undefined;
    CoinDetail: { coin: ICrypto };
};

type CoinsScreenRouteProp = RouteProp<CoinsStackParamList, 'Coins'>

type CoinsScreenNavigationProp = StackNavigationProp<
    CoinsStackParamList,
    'Coins'
>

interface Props {
    navigation: CoinsScreenNavigationProp,
    route: CoinsScreenRouteProp,
}

const CoinsScreen: React.FC<Props>  = (props) => {

    const [coins, setCoins] = useState<Array<ICrypto>>([])
    const [allCoins, setAllCoins] = useState<Array<ICrypto>>([])
    const [loading, setLoading] = useState<Boolean>(false)

    useEffect(() => {
        const unsubscribe = async () => {
            setLoading(true)
            await getCoins()
            setLoading(false)
        }

        unsubscribe()
    }, [])

    const getCoins = async () => {
        const res = await fetch('https://api.coinlore.net/api/tickers/');
        const { data }: { data: Array<ICrypto> } = await res.json();
        setAllCoins(data)
        setCoins(data);
    }

    const handleSearch = (query: string) => {
        const coinsFiltered = allCoins.filter(coin => 
                coin.name.toLowerCase().includes(query.toLowerCase()) || 
                coin.symbol.toLowerCase().includes(query.toLowerCase())
            )

        setCoins(coinsFiltered)
    }

    const handlePress = (coin: ICrypto) => {
        props.navigation.navigate('CoinDetail', {coin})
    }

    return (
        <View style={styles.container}>
            <CoinsSearch handleSearch={handleSearch} />
            {
                loading ? (
                        <ActivityIndicator color='#fff' size='large' style={styles.center}/>
                ): (
                    <FlatList 
                        data={coins}
                        renderItem={({item}) => 
                            <CoinsItem 
                                item={item} 
                                onPress={() => handlePress(item)}
                            />
                        }
                    />
                )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.charade,
        padding: 5
    },
    center: {
        flex: 1,
        justifyContent: 'center',
    },
})

export default CoinsScreen;
