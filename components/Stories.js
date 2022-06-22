import { Image, View, StyleSheet, ScrollView, Text } from 'react-native';
import React from 'react';
import { USERS } from '../data/users';

const Stories = () => {
   return (
      <View style={{ marginBottom: 13 }}>
         <ScrollView horizontal showsHorizontalScrollIndicator={false} >
            {USERS.map((story, index) => (
               <View key={index} style={styles.storyContainer}>
                  <Image
                     source={{ uri: story.image }}
                     style={styles.story} />
                  <Text style={{ color: "white" }}>
                     {story.user.length > 11
                        ? story.user.slice(0, 10).toLowerCase() + '...'
                        : story.user.toLowerCase()}
                  </Text>
               </View>
            ))}
         </ScrollView>
      </View>
   )
}

const styles = StyleSheet.create({
   story: {
      borderRadius: 50,
      height: 80,
      width: 80,
      marginLeft: 10,
      borderWidth: 3,
      borderColor: "#FF8501",
   },
   storyContainer: {
      alignItems: "center",
      justifyContent: "center",
      alignItems: "center",
   }
})

export default Stories
