import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import Colors from '../../res/colors'
import storage from '../../libs/storage'
import FavoriteEmptyState from './FavoritesEmptyState'
import { ICrypto } from '../../types/Coins'
import CoinsItem from '../coins/CoinsItem'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

type FavoritesStackParamList = {
  Favorites: {},
  CoinDetail: { coin: ICrypto };
};

type FavoritesNavigationProp = StackNavigationProp<
  FavoritesStackParamList,
  'Favorites'
>

type CoinsScreenRouteProp = RouteProp<FavoritesStackParamList, 'Favorites'>

interface Props {
  navigation: FavoritesNavigationProp;
  route: CoinsScreenRouteProp;
}


const FavoritesScreen = (props: Props) => {
  const [favorites, setFavorites] = useState<Array<ICrypto>>([])

  const getFavorites = async () => {
    const keys = await storage.getKeys()
    if (keys) {
      const filteredKeys = keys.filter(key => key.startsWith('favorite-'))
      const results = await storage.getAll(filteredKeys);

      const favorites: Array<ICrypto> = results.map(
        result => JSON.parse(result[1] as string)
      );

      setFavorites(favorites);
    }
  }

  useEffect(() => {
    props.navigation.addListener('focus', getFavorites);
  }, [])

  const handlePress = (coin: ICrypto) => {
    props.navigation.navigate('CoinDetail', { coin })
  }

  return (
    <View style={styles.container}>
      {
        favorites.length === 0
          ? <FavoriteEmptyState />
          : null
      }
      {
        favorites.length > 0 &&
        <FlatList
          renderItem={({ item }) =>
            <CoinsItem
              item={item}
              onPress={() => handlePress(item)}
            />
          }
          data={favorites}
        />
      }
    </View>
  )
}

export default FavoritesScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade,
  }
})
