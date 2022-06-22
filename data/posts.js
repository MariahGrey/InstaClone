import { USERS } from './users';

export const POSTS = [
   {
      imageURL: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
      user: USERS[0].user,
      likes: 1234,
      caption: 'This is a super long caption to test multiline comment if you can make it look cool that is always better.',
      profile_picture: USERS[0].image,
      comments: [
         {
            user: 'Juan',
            comment: 'This is a super long comment to test multiline comment if you can make it look cool that is always better'
         },
         {
            user: 'Elias',
            comment: 'This is not a comment'
         }
      ]
   }, 
   {
      imageURL: 'https://i.ibb.co/7vyystb/IMG-6752.jpg',
      user: USERS[1].user,
      likes: 125,
      caption: 'This is a caption',
      profile_picture: USERS[1].image,
      comments: []
   },
   {
      imageURL: 'https://scontent-sea1-1.xx.fbcdn.net/v/t1.6435-9/193173969_3917813408272945_5362633691628908295_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=730e14&_nc_ohc=rdl7wKBKPf8AX-vHmTA&_nc_ht=scontent-sea1-1.xx&oh=00_AT9cTX7dahgehWS4gDkBbpRuUep58N-aF4DsXbWz5knYXA&oe=62BD9F1D',
      user: USERS[2].user,
      likes: 15,
      caption: 'This is a caption',
      profile_picture: USERS[2].image,
      comments: [
         {
            user: 'Juan',
            comment: 'This is a comment'
         }
      ]
   },
   {
      imageURL: 'https://scontent-sea1-1.xx.fbcdn.net/v/t1.6435-9/183392888_3842476642473289_8236202458056354449_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=730e14&_nc_ohc=087KfGNdzZYAX9o0IsR&_nc_oc=AQmfyXsoyQPCS2CiOrum3hgSKVTQ15a08QE_3epygMInyES-3LoPadxrs0tuG1Ckkic&_nc_ht=scontent-sea1-1.xx&oh=00_AT9UHpLVti1ugd9cfrXO4buYZLcYQRDM_m5K9tDrraFLHg&oe=62BC1F6A',
      user: USERS[3].user,
      likes: 5,
      caption: 'This is a caption',
      profile_picture: USERS[3].image,
      comments: [
         {
            user: 'Juan',
            comment: 'This is a comment'
         },
         {
            user: 'Elias',
            comment: 'This is not a comment'
         }
      ]
   },
   {
      imageURL: 'https://scontent-sea1-1.xx.fbcdn.net/v/t1.6435-9/181805722_3839104476143839_5537626574410534533_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=nFK0E3FNsGsAX_8xhvZ&tn=auh1jNipERe-bZ8c&_nc_ht=scontent-sea1-1.xx&oh=00_AT8PStHDYnI0BJBaDlBaSVgEsy9n2fSh8Hu-g_3AvSqzFw&oe=62BF139A',
      user: USERS[4].user,
      likes: 1675,
      caption: 'This is a caption',
      profile_picture: USERS[4].image,
      comments: [
         {
            user: 'Juan',
            comment: 'This is a comment'
         },
         {
            user: 'Elias',
            comment: 'This is not a comment'
         }
      ]
   },
   {
      imageURL: 'https://scontent-sea1-1.xx.fbcdn.net/v/t1.6435-9/181569118_1131137894058990_1513847184582065990_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=B8zJ9bP5gYoAX-8QjrR&_nc_ht=scontent-sea1-1.xx&oh=00_AT8v7cuo7AyeEblTFhLZJXgfuR57cFa31ObR7pAKmVkUJQ&oe=62BE89CC',
      user: USERS[5].user,
      likes: 4500,
      caption: 'This is a caption',
      profile_picture: USERS[5].image,
      comments: [
         {
            user: 'Juan',
            comment: 'This is a comment'
         },
         {
            user: 'Elias',
            comment: 'This is not a comment'
         }
      ]
   },
]
