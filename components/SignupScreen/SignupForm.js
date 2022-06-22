import { Alert, StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Validator from 'email-validator';
import { firebase, db } from '../../firebase';

const SignupForm = ({ navigation }) => {

   const SignupFormSchema = Yup.object().shape({
      email: Yup.string().email().required('An email is required'),
      username: Yup.string().required().min(2, 'Your username must be at least 2 characters'),
      password: Yup.string().required().min(6, 'Your password must be at least 6 characters'),
   })

   const getRandomProfilePicture = async () => {
      const response = await fetch('https://randomuser.me/api/')
      const data = await response.json()
      return data.results[0].picture.large;
   }

   const onSignup = async (email, password, username) => {
      try {
         const authUser = await firebase.auth().createUserWithEmailAndPassword(email, password);
         console.log("Firebase user created successfully 🎉", email, password);
         db.collection('users')
            .doc(authUser.user.email)
            .set({
               owner_uid: authUser.user.uid,
               username: username,
               email: authUser.user.email,
               profile_picture: await getRandomProfilePicture(),
               created_at: firebase.firestore.FieldValue.serverTimestamp(),
            })
      } catch (error) {
         Alert.alert(
            'Uh Oh!',
            error.message + ' What would you like to do next?',
            [
               {
                  text: 'Try Again', onPress: () => console.log('Try Again Pressed'),
                  style: 'cancel'
               },
               { text: 'Log In', onPress: () => navigation.push('LoginScreen') }
            ]
         );
      }
   }

   return (
      <View style={styles.wrapper}>
         <Formik
            initialValues={{ email: '', username: '', password: '' }}
            validationSchema={SignupFormSchema}
            onSubmit={(values) => {
               onSignup(values.email, values.password, values.username);
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
                  { borderColor: values.username.length > 1 || values.username.length === 0 ? '#ccc' : 'red' }
                  ]}>
                     <TextInput
                        placeholder='Username'
                        placeholderTextColor='#444'
                        autoCapitalize='none'
                        textContentType='username'
                        autoCorrect={false}
                        onChangeText={handleChange('username')}
                        onBlur={handleBlur('username')}
                        value={values.username}
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
                  <Pressable
                     style={styles.button(isValid)}
                     onPress={handleSubmit}
                  >
                     <Text style={styles.buttonText}>Sign Up</Text>
                  </Pressable>

                  <View style={styles.signupContainer}>
                     <Text style={styles.signupText}>
                        Already have an account?
                     </Text>
                     <Pressable style={styles.signupButton} onPress={() => navigation.push('LoginScreen')}>
                        <Text style={{ color: '#6BB0F5' }}>
                           {' '}Log In
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

export default SignupForm
