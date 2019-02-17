import React, { Component } from 'react'
import { View, Switch, StyleSheet } from 'react-native'

export default toggleSwitch = (props) => {
   return (
      <View style = {styles.container}>
        <Switch
            onValueChange = {props.toggleSwitch1}
            value = {props.switch1Value}
        />
      </View>
   )
}
const styles = StyleSheet.create ({
   container: {
      flex: 1,
      alignItems: 'flex-end',
      marginTop: 10
   }
})