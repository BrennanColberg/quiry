import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBc76egQ5UNV18SsNDY6l2_0zr2nWIlMCI',
  authDomain: 'quiry-logger.firebaseapp.com',
  databaseURL: 'https://quiry-logger.firebaseio.com',
  projectId: 'quiry-logger',
  storageBucket: 'quiry-logger.appspot.com',
  messagingSenderId: '735431265200',
  appId: '1:735431265200:web:1b873015d97b19303be475',
  measurementId: 'G-S0WX22MJLH',
}

if (firebase.apps.length === 0) firebase.initializeApp(firebaseConfig)

export const analyticsClient =
  typeof window === 'undefined' ? null : firebase.analytics()
export const authClient = firebase.auth()
export const dbClient = firebase.firestore()
