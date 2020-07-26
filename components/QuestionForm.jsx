import styles from "../styles/QuestionForm.module.css";
import { useState, useEffect } from "react";
import { dbClient, authClient, analyticsClient } from "../firebase";
import { firestore } from "firebase/app";

export default () => {
	const [userId, setUserId] = useState(undefined);
	const [text, setText] = useState("");

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

	async function triggerSubmit(event) {
		event.preventDefault();

		const data = {
			created: firestore.Timestamp.now(),
			author: userId,
			text,
		};

		// check that the question is substantive, then clear field
		if (!text.trim()) return alert("Questions must have text!");
		setText("");

		// create anonymous session if necessary
		if (!data.author) {
			const { user } = await authClient.signInAnonymously();
			data.author = user.uid;
		}

		await dbClient.collection("questions").doc().set(data);
		analyticsClient.logEvent("create_question");
	}

	return (
		<form onSubmit={triggerSubmit} className={styles.form}>
			<input
				type="text"
				placeholder={"Why is the earth round?"}
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>
		</form>
	);
};
