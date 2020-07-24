import styles from "../styles/QuestionForm.module.css";
import { useState, useEffect } from "react";
import { dbClient, authClient } from "../firebase";
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
		setText("");
		if (userId) {
			await dbClient.collection("questions").doc().set({
				created: firestore.Timestamp.now(),
				author: userId,
				text,
			});
		} else alert("Please log in to log questions.");
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
