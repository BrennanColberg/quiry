import { useState, useEffect } from 'react'
import { authClient, dbClient, analyticsClient } from '../../firebase'
import { auth, firestore } from 'firebase/app'

export default (): JSX.Element => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    authClient.onAuthStateChanged((newUser) => setUser(newUser))
  }, [])

  async function triggerLogin() {
    const provider = new auth.GoogleAuthProvider()

    if (authClient.currentUser === null) {
      // need to create user from scratch
      await authClient.signInWithPopup(provider)
    } else if (authClient.currentUser.isAnonymous) {
      // need to link anon user with google login
      try {
        await authClient.currentUser.linkWithPopup(provider)
      } catch {
        return alert('This account is already in use!')
      }
    } else return // user already logged in

    // create user database entry if it doesn't exist yet
    const ref = dbClient.collection('users').doc(authClient.currentUser.uid)
    const userSnap = await ref.get()
    if (!userSnap.exists) await ref.set({ created: firestore.Timestamp.now() })

    // record login
    analyticsClient.logEvent('login')
  }

  async function triggerLogout() {
    await authClient.signOut()
    analyticsClient.logEvent('logout')
  }

  return (
    <>
      {user !== null && <button onClick={triggerLogout}>Logout</button>}
      {(user === null || user.isAnonymous) && (
        <button onClick={triggerLogin}>
          {user === null ? 'Login' : 'Save your History'}
        </button>
      )}
    </>
  )
}
