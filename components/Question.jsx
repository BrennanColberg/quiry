import styles from "../styles/Question.module.css";
import { useState, useEffect } from "react";
import classNames from "classnames";
import { dbClient } from "../firebase";

export default ({ question }) => {
	const { text, created, id } = question;
	const [hovered, setHovered] = useState(false);

	async function triggerDelete() {
		if (confirm(`Are you sure you want to delete "${text}"?`)) {
			await dbClient.collection("questions").doc(id).delete();
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
			})}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			<DeleteButton />
			{text}
		</li>
	);
};
