import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Mulish } from "@next/font/google";

const mul = Mulish({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
	return (
		<main className={mul.className}>
			<Component {...pageProps} />
		</main>
	)
}
