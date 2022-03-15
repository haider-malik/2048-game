import Head from 'next/head';
import '../styles/globals.css';
import '../styles/gameOver.css';

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>2048</title>
			</Head>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
