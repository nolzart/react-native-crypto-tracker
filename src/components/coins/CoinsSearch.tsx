import React, { useState } from 'react'
import { View, TextInput, StyleSheet, Platform } from 'react-native'
import Colors from '../../res/colors'

interface Props {
  handleSearch: (query: string) => void
}

const CoinsSearch: React.FC<Props> = ({ handleSearch }) => {
  const [query, setQuery] = useState<string>('')
  
  const onChange = (query: string) => {
    setQuery(query)
    handleSearch(query)
  }

  return (
    <View>
      <TextInput
      style={[
        styles.textInput, 
        Platform.OS === 'ios' 
        ? styles.inputTextIOS 
        : styles.inputTextAndroid
      ]} 
        value={query} 
        onChangeText={onChange}
        placeholderTextColor='#fff'
        placeholder='Search coin'
      />
    </View>
  )
}


const styles = StyleSheet.create({
  textInput: {
    height: 46,
    backgroundColor: Colors.charade,
    color: Colors.white,
    paddingHorizontal: 16,
  },
  inputTextAndroid: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.zircon,
  },
  inputTextIOS: {
    margin: 8,
    borderRadius: 8,
  }
})
export default CoinsSearch

