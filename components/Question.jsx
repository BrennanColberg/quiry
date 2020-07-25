import styles from "../styles/Question.module.scss";
import { useState } from "react";
import classNames from "classnames";
import { dbClient, analyticsClient } from "../firebase";
import { isTimestampToday } from "../utils";

export default ({ question }) => {
	const [hovered, setHovered] = useState(false);

	async function triggerDelete() {
		if (confirm(`Are you sure you want to delete "${question.text}"?`)) {
			await dbClient.collection("questions").doc(question.id).delete();
			analyticsClient.logEvent("delete_question");
		}
	}

	const DeleteButton = () => (
		<span onClick={triggerDelete} className={styles.delete}>
			❌
		</span>
	);

	return (
		<li
			className={classNames(styles.question, {
				[styles.hovered]: hovered,
				[styles.today]: isTimestampToday(question.created),
			})}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			<DeleteButton />
			{question.text}
		</li>
	);
};
