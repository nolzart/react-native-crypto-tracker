import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, SectionList, FlatList, ActivityIndicator, Pressable, Alert } from 'react-native'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

import { ICrypto } from '../../types/Coins'
import { IMarket } from '../../types/Markets';
import Colors from '../../res/colors'
import CoinDetailItem from './CoinDetailItem'
import storage from '../../libs/storage';

type CoinDetailsStackParamList = {
    CoinDetails: { coin: ICrypto };
};

type CoinsScreenNavigationProp = StackNavigationProp<
    CoinDetailsStackParamList,
    'CoinDetails'
>

type CoinsScreenRouteProp = RouteProp<CoinDetailsStackParamList, 'CoinDetails'>

interface Props {
    navigation: CoinsScreenNavigationProp;
    route: CoinsScreenRouteProp;
}
type SectionListItem = {
    title: string;
    data: Array<string | number>;
}

const CoinDetailScreen: React.FC<Props> = (props) => {
    const [coin, setCoin] = useState<ICrypto | null>(null)
    const [markets, setMarkets] = useState<Array<IMarket> | null>(null)
    const [loading, setLoading] = useState(false)
    const [isFavorite, setIsFavorite] = useState(false)

    useEffect(() => {
        const { coin: coinParam } = props.route.params
        props.navigation.setOptions({ title: coinParam.symbol })

        const fetchData = async () => {
            await getMarkets(coinParam.id);
            await checkFavorite(coinParam.id);
            setLoading(true);
        }

        if (coinParam) {
            fetchData();
            setCoin(coinParam);
        }
    }, [])

    const toggleFavorite = () => {
        if (!isFavorite) addFavorite();
        else removeFavorite();
    }

    const addFavorite = async () => {
        const val = JSON.stringify(coin);
        const key = `favorite-${coin?.id}`

        const result: boolean = await storage.set(key, val);
        if (result) setIsFavorite(true);
    }

    const removeFavorite = () => {
        Alert.alert('Remove favorite', 'Are you sure?', [
            {
                text: 'cancel',
                onPress: () => { },
                style: 'cancel'
            },
            {
                text: 'remove',
                onPress: async () => {
                    const key = `favorite-${coin?.id}`
                    const result: boolean = await storage.remove(key);
                    if (result) setIsFavorite(false);
                },
                style: 'destructive'
            }
        ])
    }

    const checkFavorite = async (id: string) => {
        const key = `favorite-${id}`;
        const result = await storage.get(key);
        if (result === true) setIsFavorite(true);
    }

    const getSymbolIcon = (name: string): string | undefined => {
        if (name) {
            const nameFormatted = name.toLowerCase().replace(' ', '-');
            return `https://c1.coinlore.com/img/25x25/${nameFormatted}.png`;
        }
    }

    const getSectionData = (coin: ICrypto): Array<SectionListItem> => {
        const sections = [
            {
                title: 'Market Cap',
                data: [coin?.market_cap_usd || '']
            },
            {
                title: 'Volume 24h',
                data: [coin?.volume24 || 0]
            },
            {
                title: 'Change 24h',
                data: [`${coin?.percent_change_24h}%` || '']
            },
        ]

        return sections;
    }

    const getMarkets = async (coinId: string) => {
        try {
            const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`
            const res = await fetch(url);
            const data: Array<IMarket> = await res.json();
            setMarkets(data || []);
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <View style={styles.container}>
            {
                !loading
                    ? <ActivityIndicator color='#fff' size='large' style={styles.loader} />
                    : (
                        <View>
                            <View style={styles.subHeader}>
                                <View style={styles.row}>
                                    <Image
                                        style={styles.img}
                                        source={{ uri: getSymbolIcon(coin?.name || '') }}
                                    />
                                    <Text style={styles.titleText}> {coin?.name} </Text>
                                </View>
                                <Pressable
                                    style={[
                                        styles.btnFavorite,
                                        isFavorite
                                            ? styles.btnFavoriteRemove
                                            : styles.btnFavoriteAdd
                                    ]}
                                    onPress={toggleFavorite}>
                                    <Text style={styles.btnFavoriteText}>
                                        {isFavorite
                                            ? 'Remove from favorites'
                                            : 'Add to favorites'
                                        }
                                    </Text>
                                </Pressable>
                            </View>
                            <SectionList
                                keyExtractor={(_, index) => index.toString()}
                                sections={getSectionData(coin as ICrypto)}
                                style={styles.section}
                                renderItem={({ item }) =>
                                    <View style={styles.sectionItem}>
                                        <Text style={styles.itemText}>{item}</Text>
                                    </View>
                                }
                                renderSectionHeader={({ section }) =>
                                    <View style={styles.sectionHeader}>
                                        <Text style={styles.sectionText}>{section.title}</Text>
                                    </View>
                                }
                            />
                            <Text> Markets </Text>
                            <FlatList
                                horizontal={true}
                                style={styles.list}
                                data={markets}
                                keyExtractor={(_, index) => index.toString()}
                                renderItem={({ item }) => <CoinDetailItem item={item} />}
                            />
                        </View>
                    )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.charade,
        flex: 1,
        paddingHorizontal: 10,
        marginRight: 6
    },
    loader: {
        justifyContent: 'center',
        flex: 1,
    },
    row: {
        flexDirection: 'row',
    },
    subHeader: {
        backgroundColor: 'rgba(0,0,0, .1)',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    titleText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        marginRight: 8,
    },
    img: {
        width: 25,
        height: 25
    },
    sectionHeader: {
        backgroundColor: 'rgba(0,0,0, .2)',
        padding: 8,
    },
    sectionItem: {
        padding: 8
    },
    section: {
        maxHeight: 220
    },
    list: {
        maxHeight: 100
    },
    itemText: {
        color: '#fff',
        fontSize: 14
    },
    sectionText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold'
    },
    btnFavorite: {
        padding: 8,
        borderRadius: 8,
    },
    btnFavoriteText: {
        color: Colors.white,
    },
    btnFavoriteAdd: {
        backgroundColor: Colors.picton
    },
    btnFavoriteRemove: {
        backgroundColor: Colors.carmine
    }
})

export default CoinDetailScreen
