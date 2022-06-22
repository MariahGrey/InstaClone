import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AddNewPost from '../components/NewPost/AddNewPost'

const NewPostScreen = ({ navigation }) => {
   return (
      <SafeAreaView style={styles.background}>
         <AddNewPost navigation={navigation} />
      </SafeAreaView>
   )
}

const styles = StyleSheet.create({
   background: {
      backgroundColor: "#000",
      flex: 1
   }
})

export default NewPostScreen
