import styles from '../styles/TodayCounter.module.css'
import { useState, useEffect } from 'react'
import { authClient, dbClient } from '../firebase'
import { isTimestampToday } from '../utils'
import { DEFAULT_GOAL } from '../config'

export default (): JSX.Element => {
  const [userId, setUserId] = useState(undefined)
  const [count, setCount] = useState(0)
  const [, setCountListener] = useState(undefined)
  const [goal, setGoal] = useState(DEFAULT_GOAL)
  const [, setGoalListener] = useState(undefined)
  const [remaining, setRemaining] = useState(DEFAULT_GOAL)

  useEffect(() => {
    authClient.onAuthStateChanged((user) => {
      if (user !== null) {
        setUserId(user.uid)
      } else {
        setUserId(undefined)
      }
    })
  }, [])

  useEffect(() => {
    setGoalListener((unsub) => {
      if (unsub) unsub()
      if (userId)
        return dbClient
          .collection('users')
          .doc(userId)
          .onSnapshot((snap) =>
            setGoal((snap.exists && snap.data().goal) || DEFAULT_GOAL)
          )
    })
  }, [userId])

  useEffect(() => {
    setCountListener((unsub) => {
      if (unsub) unsub()
      if (userId)
        return dbClient
          .collection('questions')
          .where('author', '==', userId)
          .orderBy('created', 'desc')
          .limit(goal)
          .onSnapshot((snap) =>
            setCount(
              snap.docs
                .map((doc) => doc.data())
                .filter((question) => isTimestampToday(question.created)).length
            )
          )
    })
  }, [userId, goal])

  useEffect(() => {
    setRemaining(goal - count)
  }, [goal, count])

  return (
    <h2 className={styles.counter}>
      {remaining
        ? `${remaining} question${remaining !== 1 ? 's' : ''} left!`
        : "You've met your daily goal!  🎉"}
    </h2>
  )
}
