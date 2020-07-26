import { dbClient, authClient, analyticsClient } from '../../firebase'
import { firestore } from 'firebase/app'
import { useState, useEffect } from 'react'

export default (): JSX.Element => {
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
      contact: prompt('How can we contact you?'),
      created: firestore.Timestamp.now(),
      feedback: prompt('What is your feedback?'),
      name: prompt('What is your name?'),
      userId,
    }
    Object.keys(data).forEach((key) => {
      if (!data[key]) delete data[key]
    })
    if (Object.keys(data).length > 0) {
      await dbClient.collection('feedback').doc().set(data)
      analyticsClient.logEvent('submit_feedback')
    }
  }

  return <button onClick={triggerCollectFeedback}>Give Feedback!</button>
}
