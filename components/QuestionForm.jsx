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
		const oldText = text;
		setText("");
		if (!userId) return alert("Please log in to log questions.");
		if (!oldText.trim()) return alert("Questions must have text!");
		await dbClient.collection("questions").doc().set({
			created: firestore.Timestamp.now(),
			author: userId,
			text: oldText,
		});
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
