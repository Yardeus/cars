import Head from "next/head";
import styles from "../styles/Home.module.scss";
import Image from "next/image";

export function MainLayout({children, title = 'Cars'}) {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content="A selection of cars" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                {children}
            </main>


        </>
    )
}