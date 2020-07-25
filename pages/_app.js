import { useEffect } from "react";
import Head from "next/head";
import { analyticsClient } from "../firebase";

export default ({ Component, pageProps }) => {
	useEffect(() => {
		analyticsClient.setAnalyticsCollectionEnabled(true);
	}, []);

	return (
		<>
			<Head>
				<title>Quiry Logger</title>
			</Head>
			<Component {...pageProps} />
		</>
	);
};
