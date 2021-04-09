import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Colors from '../../res/colors'

import Favorites from './FavoritesScreen'

const Stack = createStackNavigator()

const FavoritesStack = () => {
  return (
    <Stack.Navigator
    screenOptions={{
        headerStyle: {
            backgroundColor: Colors.blackPearl,
        },
        headerTintColor: Colors.white
    }}
    >
      <Stack.Screen 
        name='Favorites' 
        component={Favorites} 
      />
    </Stack.Navigator>
  )
}

export default FavoritesStack
