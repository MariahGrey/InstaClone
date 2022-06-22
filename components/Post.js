import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Divider } from 'react-native-elements'
import { db, firebase } from '../firebase'

const Post = ({ post }) => {
   const handleLike = post => {
      const currentLikeStatus = !post.likes_by_users.includes(firebase.auth().currentUser.email)

      db.collection('users')
         .doc(post.owner_email)
         .collection('posts')
         .update({
            likes_by_users: currentLikeStatus
               ? firebase.firestore.FieldValue.arrayUnion(
                  firebase.auth().currentUser.email)
               : firebase.firestore.FieldValue.arrayRemove(
                  firebase.auth().currentUser.email)
         })
         .then(() => {
            console.log('Successfully updated likes_by_users')
         })
         .catch(err => {
            console.log('Error updating likes_by_users -> ', err)
         })
   }

   return (
      <View style={{ marginBottom: 30 }}>
         <Divider width={1} orientation="vertical" />
         <PostHeader post={post} />
         <PostImage post={post} />
         <View style={{ marginHorizontal: 15, marginTop: 10 }}>
            <PostFooter post={post} handleLike={handleLike} />
            <Likes post={post} />
            <Caption post={post} />
            <CommentSection post={post} />
            <Comments post={post} />
         </View>
      </View>
   )
}

const PostHeader = ({ post }) => (
   <View style={styles.postContainer}>
      <View style={styles.wrapper}>
         <Image source={{ uri: post.profile_picture }} style={styles.story} />
         <Text style={styles.postText}>{post.user}</Text>
      </View>

      <Text style={styles.postTextHeavy}>...</Text>
   </View>
)

const PostImage = ({ post }) => (
   <View style={{ width: "100%", height: 450 }}>
      <Image
         source={{ uri: post.imageURL }}
         style={styles.postImage}
      />
   </View>
)

const PostFooter = ({ handleLike, post }) => (
   <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <View style={styles.leftFooterIconsContainer}>
         <TouchableOpacity onPress={() => handleLike(post)}>
            <Image style={styles.footerIcon} source={{ uri: postFooterIcons[0].imageURL }} />
         </TouchableOpacity>
         <Icon imgStyle={styles.footerIcon} imgURL={postFooterIcons[1].imageURL} />
         <Icon imgStyle={[styles.footerIcon, styles.shareIcon]} imgURL={postFooterIcons[2].imageURL} />
      </View>
      <Icon imgStyle={styles.footerIcon} imgURL={postFooterIcons[3].imageURL} />
   </View>
)

const Likes = ({ post }) => (
   <View style={{ flexDirection: "row", marginTop: 4 }}>
      <Text style={styles.likeText}>{post.likes_by_users.length.toLocaleString('en')} likes</Text>
   </View>
)

const Icon = ({ imgStyle, imgURL }) => (
   <TouchableOpacity>
      <Image source={{ uri: imgURL }} style={imgStyle} />
   </TouchableOpacity>
)

const Caption = ({ post }) => (
   <View style={{ marginTop: 5, flexDirection: "row" }}>
      <Text style={{ color: "white" }}>
         <Text style={{ fontWeight: "600" }}>{post.user}</Text>
         <Text>{" "}{post.caption}</Text>
      </Text>
   </View>
)

const CommentSection = ({ post }) => (
   <View style={{ marginTop: 5 }}>
      {!!post?.comments.length && (
         <Text style={{ color: "gray" }}>
            View{' '}
            {post.comments.length > 1 ? 'all' : ''}{' '}
            {post.comments.length}{' '}
            {post.comments.length > 1 ? 'comments' : 'comment'}
         </Text>
      )}
   </View>
)

const Comments = ({ post }) => (
   <>
      {post.comments.map((comment, index) => (
         <View key={index} style={{ marginTop: 5 }}>
            <Text style={{ color: "white" }}>
               <Text style={{ fontWeight: "600" }}>{comment.user}</Text>
               {' '}{comment.comment}
            </Text>
         </View>
      ))}
   </>
)

const postFooterIcons = [
   {
      name: 'Like',
      imageURL: 'https://img.icons8.com/ios-glyphs/60/ffffff/undefined/hearts.png',
      likedimageURL: 'https://img.icons8.com/ios-glyphs/60/fa314a/undefined/like--v1.png',
   },
   {
      name: 'Comment',
      imageURL: 'https://img.icons8.com/material-outlined/60/ffffff/undefined/filled-topic.png',
   },
   {
      name: 'Share',
      imageURL: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/undefined/sent.png',
   },
   {
      name: 'Save',
      imageURL: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/undefined/bookmark-ribbon--v1.png',
   },
]

const styles = StyleSheet.create({
   postContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      margin: 5,
   },
   story: {
      borderRadius: 50,
      height: 35,
      width: 35,
      marginLeft: 6,
      borderWidth: 1.5,
      borderColor: "#FF8501",
   },
   wrapper: {
      flexDirection: "row", alignItems: "center"
   },
   postText: {
      color: "white",
      marginLeft: 5,
      fontWeight: "700"
   },
   postTextHeavy: {
      color: "white",
      fontWeight: "900"
   },
   postImage: {
      height: "100%",
      resizeMode: "cover",
   },
   footerIcon: {
      width: 33,
      height: 33,
   },
   leftFooterIconsContainer: {
      flexDirection: "row",
      width: "32%",
      justifyContent: "space-between",
   },
   shareIcon: {
      transform: [{ rotate: "320deg" }],
      marginTop: -3,
   },
   likeText: {
      color: "white",
      fontWeight: "600",
   }
})

export default Post;
