import { Open_Sans } from "next/font/google";
import "@/styles/globals.scss";

const openSans = Open_Sans({
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  return (
    <main className={openSans.className}>
      <Component {...pageProps} />
    </main>
  );
}
