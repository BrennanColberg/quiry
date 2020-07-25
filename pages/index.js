import styles from "../styles/index.module.css";
import QuestionForm from "../components/QuestionForm";
import QuestionHistory from "../components/QuestionHistory";
import TodayCounter from "../components/TodayCounter";
import LoginButton from "../components/buttons/LoginButton";
import FeedbackButton from "../components/buttons/FeedbackButton";

export default () => (
	<main className={styles.main}>
		<div className={styles.buttons}>
			<LoginButton />
			<FeedbackButton />
		</div>
		<TodayCounter />
		<QuestionForm />
		<QuestionHistory />
	</main>
);
