import { useState, useEffect } from 'react'
import { authClient, dbClient } from '../firebase'
import { getISODate } from '../utils'
import { DEFAULT_GOAL_INCREMENT } from '../config'
import ProgressBar from './ProgressBar'

// goals increase in increments of "goal"
// split goal => goalIncrement, goalMultiplier

export default (): JSX.Element => {
  const [userId, setUserId] = useState(undefined)
  const [, setGoalIncrementListener] = useState(undefined)
  const [, setCountListener] = useState(undefined)

  const [goalIncrement, setGoalIncrement] = useState(DEFAULT_GOAL_INCREMENT)
  const [goalMultiplier, setGoalMultiplier] = useState(1)
  const [goal, setGoal] = useState(goalIncrement * goalMultiplier)
  const [count, setCount] = useState(0)

  /**
   * Keeps track of the current user.
   */
  useEffect(() => {
    authClient.onAuthStateChanged((user) => {
      if (user !== null) {
        setUserId(user.uid)
      } else {
        setUserId(undefined)
      }
    })
  }, [])

  /**
   * Keeps track of the current user's custom goal increment.
   */
  useEffect(() => {
    setGoalIncrementListener((unsub) => {
      if (unsub) unsub()
      if (userId)
        return dbClient
          .collection('users')
          .doc(userId)
          .onSnapshot((snap) => {
            setGoalIncrement(
              (snap.exists && snap.data().goal) || DEFAULT_GOAL_INCREMENT
            )
            setGoalMultiplier(1)
          })
    })
  }, [userId])

  /**
   * Keeps count accurate (# of questions asked today)
   */
  useEffect(() => {
    setCountListener((unsub) => {
      if (unsub) unsub()
      if (userId)
        return dbClient
          .collection('users')
          .doc(userId)
          .collection('days')
          .doc(getISODate())
          .onSnapshot((snap) => setCount(snap.data()?.asked || 0))
    })
  }, [userId, goal])

  useEffect(() => {
    setGoalMultiplier(Math.ceil(count / goalIncrement))
  }, [count, goalIncrement])

  useEffect(() => {
    setGoal(goalIncrement * goalMultiplier)
  }, [goalIncrement, goalMultiplier])

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>
        You've asked {count} questions today; try for {goal}!
      </h2>
      <ProgressBar
        bars={[
          { progress: count / goal, color: 'gray' },
          {
            progress: ((goalMultiplier - 1) * goalIncrement) / goal,
            color: 'chartreuse',
          },
        ]}
      />
    </div>
  )
}
