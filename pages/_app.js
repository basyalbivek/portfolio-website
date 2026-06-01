import '../styles/globals.css'
import { AnimatePresence } from 'framer-motion'
import Head from 'next/head'

export default function App({ Component, pageProps, router }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Multidisciplinary engineer & developer — portfolio and blog." />
        <meta name="keywords" content="engineering, IoT, web development, portfolio, projects" />
      </Head>
      <AnimatePresence mode="wait">
        <Component {...pageProps} key={router.asPath} />
      </AnimatePresence>
    </>
  )
}
