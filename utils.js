export function isTimestampToday(timestamp) {
	const timestampDate = timestamp.toDate();
	const now = new Date();
	return timestampDate.toLocaleDateString() === now.toLocaleDateString();
}
