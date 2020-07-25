import { useState, useEffect } from "react";
import { authClient, dbClient, analyticsClient } from "../../firebase";
import { auth, firestore } from "firebase/app";

const authProvider = new auth.GoogleAuthProvider();

export default () => {
	const [loggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
		authClient.onAuthStateChanged((user) => setLoggedIn(user === null));
	}, []);

	async function triggerLogin() {
		const { user } = await authClient.signInWithPopup(authProvider);
		if (user !== null) {
			const ref = dbClient.collection("users").doc(user.uid);
			const userSnap = await ref.get();
			if (!userSnap.exists) {
				await ref.set({ created: firestore.Timestamp.now() });
			}
			analyticsClient.logEvent("login");
		}
	}

	async function triggerLogout() {
		await authClient.signOut();
		analyticsClient.logEvent("logout");
	}

	if (loggedIn) return <button onClick={triggerLogin}>Login via Google</button>;
	else return <button onClick={triggerLogout}>Logout</button>;
};
