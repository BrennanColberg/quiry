import styles from "../styles/index.module.css";

import QuestionForm from "../components/QuestionForm";
import QuestionHistory from "../components/QuestionHistory";
import { useState } from "react";
import LoginButton from "../components/LoginButton";

export default function Home() {
	return (
		<main className={styles.main}>
			<LoginButton />
			<QuestionForm />
			<QuestionHistory />
		</main>
	);
}
