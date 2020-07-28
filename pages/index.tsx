import styles from '../styles/index.module.css'
import QuestionForm from '../components/QuestionForm'
import { RecentHistory } from '../components/QuestionHistory'
import TodayCounter from '../components/GoalProgress'
import LoginButton from '../components/buttons/LoginButton'
import FeedbackButton from '../components/buttons/FeedbackButton'
import Link from 'next/link'

export default (): JSX.Element => (
  <>
    <TodayCounter />
    <QuestionForm />
    <RecentHistory />

    <div className={styles.buttons}>
      <Link href="/history" passHref>
        <a>see all history</a>
      </Link>
      <LoginButton />
      <FeedbackButton />
    </div>
  </>
)
