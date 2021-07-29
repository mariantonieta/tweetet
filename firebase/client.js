import firebase from "firebase"
const firebaseConfig = {
  apiKey: "AIzaSyBImChVM_zigN-JSmUsZqS1L23ifjzXa-k",
  authDomain: "tweetet-2bcb9.firebaseapp.com",
  projectId: "tweetet-2bcb9",
  storageBucket: "tweetet-2bcb9.appspot.com",
  messagingSenderId: "131204563847",
  appId: "1:131204563847:web:e74d64792501fe3f8b0922",
  measurementId: "G-DD7KE1GM7S",
}

!firebase.apps.length && firebase.initializeApp(firebaseConfig)

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, photoURL, email } = user

  return {
    avatar: photoURL,
    username: displayName,
    email,
  }
}

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null

    onChange(normalizedUser)
  })
}

export const loginWithGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider()
  return firebase.auth().signInWithPopup(githubProvider)
}
