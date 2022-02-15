import styles from "./../styles/globals.css"
import Head from "next/head";
import SSRProvider from 'react-bootstrap/SSRProvider'

function MyApp({Component, pageProps}) {
    return (
        <SSRProvider>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
            </Head>
            <Component {...pageProps} />
        </SSRProvider>
    )
}

export default MyApp
