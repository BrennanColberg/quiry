import styles from '../styles/index.module.css'
import QuestionForm from '../components/QuestionForm'
import RecentHistory from '../components/RecentHistory'
import TodayCounter from '../components/GoalProgress'
import LoginButton from '../components/buttons/LoginButton'
import FeedbackButton from '../components/buttons/FeedbackButton'

export default (): JSX.Element => (
  <>
    <TodayCounter />
    <QuestionForm />
    <RecentHistory />

    <div className={styles.buttons}>
      <LoginButton />
      <FeedbackButton />
    </div>
  </>
)
