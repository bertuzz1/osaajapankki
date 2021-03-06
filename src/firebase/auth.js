import { firebase } from './firebase'

const db = firebase.firestore()

db.settings({
  timestampsInSnapshots: true
})

export const signUpWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider()
  firebase.auth().signInWithPopup(provider).then((result) => {
    console.log(result)
  }).catch(err => { 
      console.log('sign-in failed', err)
    })
}

export const signUpWithEmailAndPassword = (email, pass) => {
  firebase.auth().signInWithEmailAndPassword(email, pass).then(result => {
    console.log(result)
  })
}

export const signOut = () => { firebase.auth().signOut() }