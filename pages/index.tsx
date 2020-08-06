import styles from '../styles/index.module.css'
import QuestionForm from '../components/QuestionForm'
import RecentHistory from '../components/RecentHistory'
import TodayCounter from '../components/GoalProgress'
import LoginButton from '../components/buttons/LoginButton'
import FeedbackButton from '../components/buttons/FeedbackButton'
import RandomImage from '../components/RandomImage'

export default (): JSX.Element => (
  <>
    <RandomImage />
    <TodayCounter />
    <QuestionForm />
    <RecentHistory />

    <div className={styles.buttons}>
      <LoginButton />
      <FeedbackButton text="Report a bug" />
      <FeedbackButton text="Request a feature" />
    </div>
  </>
)
