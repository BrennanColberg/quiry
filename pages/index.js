import styles from "../styles/index.module.css";
import QuestionForm from "../components/QuestionForm";
import QuestionHistory from "../components/QuestionHistory";
import LoginButton from "../components/LoginButton";
import TodayCounter from "../components/TodayCounter";

export default function Home() {
	return (
		<main className={styles.main}>
			<TodayCounter />
			<QuestionForm />
			<QuestionHistory />
			<LoginButton />
		</main>
	);
}
