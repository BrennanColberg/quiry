import styles from "../styles/QuestionHistory.module.css";
import { useEffect, useState } from "react";
import { authClient, dbClient } from "../firebase";
import Question from "./Question";

export default () => {
	const [userId, setUserId] = useState(undefined);
	const [questions, setQuestions] = useState([]);
	const [, setQuestionsListener] = useState(undefined);

	// keep track of authenticated user
	useEffect(() => {
		authClient.onAuthStateChanged((user) => {
			if (user !== null) {
				setUserId(user.uid);
			} else {
				setUserId(undefined);
			}
		});
	}, []);

	// keep track of said user's questions
	useEffect(() => {
		setQuestionsListener((unsub) => {
			if (unsub) unsub();
			setQuestions([]);
			if (userId)
				return dbClient
					.collection("questions")
					.where("author", "==", userId)
					.orderBy("created", "desc")
					.onSnapshot((snap) =>
						setQuestions(
							snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
						)
					);
		});
	}, [userId]);

	return (
		<ul className={styles.list}>
			{questions.map((question, i) => (
				<Question question={question} key={i} />
			))}
		</ul>
	);
};
