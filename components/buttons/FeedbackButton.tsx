import { dbClient, authClient, analyticsClient } from '../../firebase'
import { firestore } from 'firebase/app'
import { useState, useEffect } from 'react'

export default ({ text }: { text: string }): JSX.Element => {
  const [userId, setUserId] = useState(undefined)

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

  async function triggerCollectFeedback() {
    const data = {
      feedback: prompt('What is your feedback?'),
      created: firestore.Timestamp.now(),
      button: text,
      userId,
    }
    if (!data.feedback?.trim()) return
    await dbClient.collection('feedback').doc().set(data)
    analyticsClient.logEvent('submit_feedback')
  }

  return <button onClick={triggerCollectFeedback}>{text}</button>
}
