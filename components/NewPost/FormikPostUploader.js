import { Image, StyleSheet, TextInput, Text, View, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Divider } from 'react-native-elements';
import validUrl from 'valid-url';
import { db, firebase } from '../../firebase';

const PLACEHOLDER_IMG = 'http://placehold.jp/150x150.png';

const uploadPostSchema = Yup.object().shape({
   imageURL: Yup.string().url().required('A URL is required'),
   caption: Yup.string().max(2200, 'Caption has reached the character limit')
})

const FormikPostUploader = ({ navigation }) => {
   const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG);
   const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null);

   const getUserName = () => {
      const user = firebase.auth().currentUser
      const unsubscribe = db.collection('users')
         .where('owner_uid', '==', user.uid)
         .limit(1)
         .onSnapshot(snapshot => snapshot.docs.map(doc => setCurrentLoggedInUser({
            username: doc.data().username,
            profile_picture: doc.data().profile_picture,
         })))

      return unsubscribe;
   }

   useEffect(() => {
      getUserName();
   }, [])

   const uploadPostToFirebase = async (imageURL, caption) => {
      const unsubscribe = db
         .collection('users')
         .doc(firebase.auth().currentUser.email)
         .collection('posts')
         .add({
            imageURL: imageURL,
            user: currentLoggedInUser.username,
            profile_picture: currentLoggedInUser.profile_picture,
            caption: caption,
            created_at: firebase.firestore.FieldValue.serverTimestamp(),
            likes: 0,
            likes_by_users: [],
            comments: [],
         })
         .then(() => navigation.goBack())

      return unsubscribe;
   }

   return (
      <Formik
         initialValues={{ caption: '', imageURL: '' }}
         onSubmit={(values) => {
            uploadPostToFirebase(values.imageURL, values.caption);
         }}
         validationSchema={uploadPostSchema}
         validateOnMount={true}
      >
         {({ handleBlur, handleChange, handleSubmit, values, errors, isValid }) => (
            <>
               <View style={{ margin: 20, justifyContent: "space-between", flexDirection: "row" }}>
                  <Image source={{
                     uri: validUrl.isUri(thumbnailUrl) ? thumbnailUrl : PLACEHOLDER_IMG
                  }}
                     style={styles.image}
                  />

                  <View style={{ flex: 1, marginLeft: 12 }}>
                     <TextInput
                        placeholder="Write a caption..."
                        placeholderTextColor="gray"
                        multiline={true}
                        style={{
                           color: "white",
                           fontSize: 20,
                        }}
                        onChangeText={handleChange('caption')}
                        onBlur={handleBlur('caption')}
                        value={values.caption}
                     />
                  </View>
               </View>
               <Divider width={0.2} orientation='vertical' />
               <TextInput
                  onChange={(e) => setThumbnailUrl(e.nativeEvent.text)}
                  placeholder="Enter Image URL..."
                  placeholderTextColor="gray"
                  style={{
                     color: "white",
                     fontSize: 18,
                  }}
                  onChangeText={handleChange('imageURL')}
                  onBlur={handleBlur('imageURL')}
                  value={values.imageURL}
                  autoCorrect={false}
               />
               {errors.imageURL && (
                  <Text style={{ fontSize: 10, color: 'red' }}>{errors.imageURL}</Text>
               )}

               <Button onPress={handleSubmit} title="Share" disabled={!isValid} />
            </>
         )}

      </Formik >
   )
}

const styles = StyleSheet.create({
   image: {
      width: 100,
      height: 100,
   }
})

export default FormikPostUploader
