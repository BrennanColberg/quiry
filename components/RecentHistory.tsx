import styles from '../styles/RecentHistory.module.scss'
import { useEffect, useState } from 'react'
import { authClient, dbClient } from '../firebase'
import useRecentAmount from '../hooks/useRecentAmount'
import Question from './Question'
import { questionsInDimensions } from '../utils'

export default (): JSX.Element => {
  const [userId, setUserId] = useState(undefined)
  const [questions, setQuestions] = useState([])
  const [, setQuestionsListener] = useState(undefined)
  const questionsVisible = useRecentAmount()
  const [questionsLoaded, setQuestionsLoaded] = useState<number>(
    questionsVisible * 3
  )

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
      if (!userId) return setQuestions([])
      return dbClient
        .collection('questions')
        .where('author', '==', userId)
        .orderBy('created', 'desc')
        .limit(questionsLoaded)
        .onSnapshot((snap) => {
          const newQuestions = snap.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
          setQuestions(newQuestions)
        })
    })
  }, [userId, questionsLoaded])

  async function measureScroll(event: React.UIEvent<HTMLElement>) {
    const scrollTop = event.currentTarget.scrollTop
    const width = event.currentTarget.clientWidth
    const viewHeight = event.currentTarget.clientHeight
    const questionsSeen = questionsInDimensions(width, scrollTop + viewHeight)

    // at any given time, load an extra two pages' worth of questions
    if (questionsLoaded - questionsSeen < questionsVisible)
      setQuestionsLoaded(questionsSeen + Math.min(questionsSeen, 50))
  }

  return (
    <div className={styles.recentHistory} onScroll={measureScroll}>
      <ul>
        {questions.map((question, i) => (
          <Question question={question} key={i} />
        ))}
      </ul>
    </div>
  )
}
