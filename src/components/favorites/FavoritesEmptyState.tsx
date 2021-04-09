import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const FavoritesEmptyState = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>You don't have any favorite yet</Text>
    </View>
  )
}

export default FavoritesEmptyState

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },

  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    alignSelf: 'center',
  }
})
