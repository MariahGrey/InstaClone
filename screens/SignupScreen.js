import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import SignupForm from '../components/SignupScreen/SignupForm'

const InstagramLogo = 'https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Instagram_colored_svg_1-512.png'

const SignupScreen = ({ navigation }) => (
   <View style={styles.container}>
      <View style={styles.logoContainer}>
         <Image source={{ uri: InstagramLogo }} style={styles.logo} />
         <SignupForm navigation={navigation} />
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

export default SignupScreen
