import React, {useEffect, useState} from 'react';
import { View, Text, Pressable, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'

import http from '../../libs/http'
import Colors from '../../res/colors'
import CoinsItem from './CoinsItem'
import { ICrypto } from '../../types/Coins'

type CoinsStackParamList = {
    Coins: undefined;
    CoinDetail: undefined;
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

    const [coins, setCoins] = useState<Array<ICrypto> | undefined>()
    const [loading, setLoading] = useState<Boolean>(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const data: Array<ICrypto> | undefined = await http.get('https://api.coinlore.net/api/tickers/');
            setCoins(data)
            setLoading(false)
        }

        fetchData()
    }, [])


    const handlePress = () => {
        console.log("go to details")
        props.navigation.navigate('CoinDetail')
    }

    return (
        <View style={styles.container}>
            {
                loading ? (
                        <ActivityIndicator color='#fff' size='large' style={styles.center}/>
                ): (
                    <FlatList 
                        data={coins}
                        renderItem={({item}) => <CoinsItem item={item} />}
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
    titleText: {
        color: Colors.white,
        textAlign: 'center',
    },
    btn: {
        padding: 8,
        backgroundColor: 'blue',
        borderRadius: 8,
        margin: 16
    },
    btnText: {
        color: Colors.white,
        textAlign: 'center'
    }
})

export default CoinsScreen;
