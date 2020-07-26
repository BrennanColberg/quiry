import '../styles/index.css'
import { useEffect } from 'react'
import Head from 'next/head'
import { analyticsClient } from '../firebase'
import { AppProps } from 'next/app'

export default ({ Component, pageProps }: AppProps): JSX.Element => {
  useEffect(() => {
    analyticsClient.setAnalyticsCollectionEnabled(true)
  }, [])

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>Quiry Logger</title>
        <meta name="title" content="Quiry Logger" />
        <meta
          name="description"
          content="Ask questions to expand your mind! Write 50 questions per day."
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://metatags.io/" />
        <meta property="og:title" content="Quiry Logger" />
        <meta
          property="og:description"
          content="Ask questions to expand your mind! Write 50 questions per day."
        />

        {/* Twitter */}
        <meta
          property="twitter:url"
          content="https://quiry-logger.vercel.app"
        />
        <meta property="twitter:title" content="Quiry Logger" />
        <meta
          property="twitter:description"
          content="Ask questions to expand your mind! Write 50 questions per day."
        />
      </Head>
      <main>
        <Component {...pageProps} />
      </main>
    </>
  )
}
