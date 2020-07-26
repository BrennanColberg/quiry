import styles from '../styles/index.module.css'
import QuestionForm from '../components/QuestionForm'
import { RecentHistory } from '../components/QuestionHistory'
import TodayCounter from '../components/TodayCounter'
import LoginButton from '../components/buttons/LoginButton'
import FeedbackButton from '../components/buttons/FeedbackButton'
import Link from 'next/link'

export default (): JSX.Element => (
  <>
    <div className={styles.buttons}>
      <LoginButton />
      <FeedbackButton />
    </div>
    <TodayCounter />
    <QuestionForm />
    <RecentHistory />
    <Link href="/history" passHref>
      <a>see all history</a>
    </Link>
  </>
)
