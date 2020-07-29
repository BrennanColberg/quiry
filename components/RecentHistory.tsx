import styles from '../styles/RecentHistory.module.scss'
import { useEffect, useState } from 'react'
import { authClient, dbClient } from '../firebase'
import useRecentAmount from '../hooks/useRecentAmount'
import Question from './Question'

export default (): JSX.Element => {
  const [userId, setUserId] = useState(undefined)
  const [questions, setQuestions] = useState([])
  const [, setQuestionsListener] = useState(undefined)
  const recentAmount = useRecentAmount()

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

  // keep track of said user's questions
  useEffect(() => {
    setQuestionsListener((unsub) => {
      if (unsub) unsub()
      setQuestions([])
      if (userId)
        return dbClient
          .collection('questions')
          .where('author', '==', userId)
          .orderBy('created', 'desc')
          .limit(recentAmount * 2)
          .onSnapshot((snap) =>
            setQuestions(
              snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            )
          )
    })
  }, [userId, recentAmount])

  return (
    <div className={styles.recentHistory}>
      <ul>
        {questions.map((question, i) => (
          <Question question={question} key={i} />
        ))}
      </ul>
    </div>
  )
}
