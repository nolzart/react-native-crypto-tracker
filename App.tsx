import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Image } from 'react-native'
import CoinsStack from './src/components/coins/CoinsStack'
import FavoritesStack from './src/components/favorites/FavoritesStack'
import Colors from './src/res/colors'

const Tabs = createBottomTabNavigator()

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        tabBarOptions={{
          inactiveTintColor: '#fefefe',
          style: {
            height: 50,
            paddingTop: 5,
            backgroundColor: Colors.blackPearl
          }
        }}
      >  
        <Tabs.Screen
          name='Coins'
          component={CoinsStack}
          options={{
            tabBarIcon: ({ size, color }) => 
            <Image 
              style={{
                tintColor: color,
                width: size,
                height: size,
              }}
              source={ require('./assets/bank.png')} 
            />
          }}
        />
        <Tabs.Screen
          name='Favorites'
          component={FavoritesStack}
          options={{
            tabBarIcon: ({ size, color }) => 
            <Image 
              style={{
                tintColor: color,
                width: size,
                height: size,
              }}
              source={ require('./assets/star.png')} 
            />
          }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
}

export default App

