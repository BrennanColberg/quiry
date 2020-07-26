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
    const data = {}
    data.feedback = prompt('What is your feedback?')
    data.name = prompt('What is your name?')
    data.contact = prompt('How can we contact you?')
    Object.keys(data).forEach((key) => {
      if (!data[key]) delete data[key]
    })
    if (Object.keys(data).length > 0) {
      if (userId) data.userId = userId
      data.created = firestore.Timestamp.now()
      await dbClient.collection('feedback').doc().set(data)
      analyticsClient.logEvent('submit_feedback')
    }
  }

  return <button onClick={triggerCollectFeedback}>Give Feedback!</button>
}
