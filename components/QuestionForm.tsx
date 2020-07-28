import styles from '../styles/QuestionForm.module.css'
import { useState, useEffect } from 'react'
import { dbClient, authClient, analyticsClient } from '../firebase'
import { firestore } from 'firebase/app'
import { getISODate } from '../utils'

export default (): JSX.Element => {
  const [userId, setUserId] = useState(undefined)
  const [text, setText] = useState('')

  // keep track of authenticated user
  useEffect(() => {
    authClient.onAuthStateChanged((user) => {
      if (user !== null) {
        setUserId(user.uid)
      } else {
        setUserId(undefined)
      }
    })
  }, [])

  async function triggerSubmit(event) {
    event.preventDefault()

    const data = {
      created: firestore.Timestamp.now(),
      author: userId,
      text,
    }

    // check that the question is substantive, then clear field
    if (!text.trim()) return alert('Questions must have text!')
    setText('')

    // create anonymous session if necessary
    if (!data.author) {
      const { user } = await authClient.signInAnonymously()
      data.author = user.uid
    }

    await dbClient.collection('questions').doc().set(data)
    await dbClient
      .collection('users')
      .doc(data.author)
      .collection('days')
      .doc(getISODate())
      .set({ asked: firestore.FieldValue.increment(1) }, { merge: true })
    analyticsClient.logEvent('create_question')
  }

  return (
    <form onSubmit={triggerSubmit} className={styles.form}>
      <input
        aria-label="Enter a question"
        type="text"
        placeholder={'Why is the earth round?'}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </form>
  )
}
