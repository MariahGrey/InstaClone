import { Alert, StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Validator from 'email-validator';
import { firebase } from '../../firebase';

const LoginForm = ({ navigation }) => {

   const LoginFormSchema = Yup.object().shape({
      email: Yup.string().email().required('An email is required'),
      password: Yup.string().required().min(6, 'Your password must be at least 6 characters'),
   })

   const onLogin = async (email, password) => {
      try {
         await firebase.auth().signInWithEmailAndPassword(email, password);
         console.log("firebase login successful 🎉", email, password);
      } catch (error) {
         Alert.alert(
            'Uh Oh!',
            error.message + ' What would you like to do next?',
            [
               {
                  text: 'Try Again', onPress: () => console.log('Try Again Pressed'),
                  style: 'cancel'
               },
               { text: 'Sign Up', onPress: () => navigation.push('SignupScreen') }
            ]
         );
      }
   }

   return (
      <View style={styles.wrapper}>
         <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginFormSchema}
            onSubmit={(values) => {
               console.log("pressed");
               onLogin(values.email, values.password);
            }}
            validateOnMount={true}
         >
            {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
               <>
                  <View style={[styles.inputField,
                  { borderColor: values.email.length < 1 || Validator.validate(values.email) ? '#ccc' : 'red' }
                  ]}>
                     <TextInput
                        placeholder='Email'
                        placeholderTextColor='#444'
                        autoCapitalize='none'
                        keyboardType='email-address'
                        textContentType='emailAddress'
                        autoFocus={true}
                        autoCorrect={false}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                     />
                  </View>
                  <View style={[styles.inputField,
                  { borderColor: values.password.length >= 1 && values.password.length < 6 ? 'red' : '#ccc' }
                  ]}>
                     <TextInput
                        placeholder='Password'
                        placeholderTextColor='#444'
                        autoCapitalize='none'
                        textContentType='password'
                        autoCorrect={false}
                        secureTextEntry={true}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                     />
                  </View>
                  <View style={{
                     flexDirection: 'row',
                     justifyContent: 'flex-end',
                     marginBottom: 30,
                  }}>
                     <Text style={{
                        color: '#6BB0F5'
                     }}>
                        Forgot password?
                     </Text>
                  </View>
                  <Pressable
                     style={styles.button(isValid)}
                     onPress={handleSubmit}
                  >
                     <Text style={styles.buttonText}>Log in</Text>
                  </Pressable>

                  <View style={styles.signupContainer}>
                     <Text style={styles.signupText}>
                        Don't have an account?
                     </Text>
                     <Pressable style={styles.signupButton} onPress={() => navigation.push('SignupScreen')}>
                        <Text style={{ color: '#6BB0F5' }}>
                           {' '}Sign Up
                        </Text>
                     </Pressable>
                  </View>
               </>
            )}
         </Formik>
      </View >
   )
}

const styles = StyleSheet.create({
   wrapper: {
      marginTop: 80,
      width: '100%',
   },
   inputField: {
      marginBottom: 10,
      borderRadius: 4,
      padding: 15,
      backgroundColor: '#fafafa',
      borderWidth: 1,
      justifyContent: 'center',
   },
   button: (isValid) => ({
      backgroundColor: isValid ? '#0096f6' : '#9acaf7',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 42,
      borderRadius: 4,
   }),
   buttonText: {
      fontSize: 20,
      color: '#fff',
      fontWeight: '600',
   },
   signupContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 50,
      width: '100%',
   },
})

export default LoginForm
