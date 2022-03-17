import Head from 'next/head';
import '../styles/globals.css';
import '../styles/gameOver.css';
import '../styles/info.css';

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>2048</title>
				<meta name="author" content="Haider Malik" />
				<meta
					name="keywords"
					content="2048 game 2048game 2048-game game2048 brain games interesting games"
				/>
				<meta
					name="description"
					content="A fully functional brain storming game which will definitely make you an addict."
				/>
				<link rel="icon" type="image/x-icon" href="/icon.svg"></link>
			</Head>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
