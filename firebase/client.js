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
const db = firebase.firestore()
const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, photoURL, email, uid } = user

  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid,
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

export const addTweetet = ({ avatar, content, img, userId, userName }) => {
  return db.collection("tweetet").add({
    avatar,
    content,
    img,
    userId,
    userName,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  })
}

export const fetchLatestTweetet = () => {
  return db
    .collection("tweetet")
    .orderBy("createdAt", "desc")
    .get()
    .then(({ docs }) => {
      return docs.map((doc) => {
        const data = doc.data()
        const id = doc.id
        const { createdAt } = data

        return {
          ...data,
          id,
          createdAt: +createdAt.toDate(),
        }
      })
    })
}

export const uploadImage = (file) => {
  const ref = firebase.storage().ref(`images/${file.name}`)
  const task = ref.put(file)
  return task
}
