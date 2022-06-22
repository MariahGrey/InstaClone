import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LoginForm from '../components/LoginScreen/LoginForm'

const InstagramLogo = 'https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Instagram_colored_svg_1-512.png'

const LoginScreen = ({ navigation }) => (
   <View style={styles.container}>
      <View style={styles.logoContainer}>
         <Image source={{ uri: InstagramLogo }} style={styles.logo} />
         <LoginForm navigation={navigation} />

      </View>
   </View>
)

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: 50,
      paddingHorizontal: 12,
   },
   logoContainer: {
      alignItems: 'center',
      marginTop: 60,
   },
   logo: {
      height: 100,
      width: 100,
   }
})

export default LoginScreen
