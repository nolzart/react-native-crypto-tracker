import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Colors from '../../res/colors'

import FavoriteEmptyState from './FavoritesEmptyState'

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState<Array<any>>([])
  return (
    <View style={styles.container}>
      {
        favorites.length === 0 && <FavoriteEmptyState />
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
