import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCqnZaW1U0Rs6vMOnN50ZBbDRkpeQVxNW0',
  authDomain: 'dev-meetup-7053e.firebaseapp.com',
  databaseURL: 'https://dev-meetup-7053e.firebaseio.com',
  projectId: 'dev-meetup-7053e',
  storageBucket: 'dev-meetup-7053e.appspot.com',
  appId: '1:797484407591:web:18d8dac018738e84896702',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

db.enablePersistence()
  .catch(err => console.log(`Firebase persistence error: ${err.code}`));

const usersCollection = db.collection('users');
const songsCollection = db.collection('songs');
const commentsCollection = db.collection('comments');

export {
  auth, db, storage, usersCollection, songsCollection, commentsCollection,
}
