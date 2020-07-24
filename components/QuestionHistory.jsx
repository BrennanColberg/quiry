import { useEffect, useState } from "react";
import { authClient, dbClient } from "../firebase";

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
						setQuestions(snap.docs.map((doc) => doc.data()))
					);
		});
	}, [userId]);

	return (
		<ul>
			{questions.map(({ text }, i) => (
				<li key={i}>{text}</li>
			))}
		</ul>
	);
};
