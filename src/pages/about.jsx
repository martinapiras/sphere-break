import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { BsChevronLeft } from "react-icons/bs";

import styles from "@/styles/About.module.scss";

export default function About() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>About</title>
        <meta
          name="description"
          content="Straight from Spira, Final Fantasy X-2's minigame Sphere Break, now playable on your browser!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <div className={styles.About}>
        <div
          className={styles.icon}
          onClick={() => router.push("/")}
          title="Back to homepage"
        >
          <BsChevronLeft />
        </div>
        <h1>About</h1>
        <p>
          The aim of this project was to recreate a beloved game of my
          childhood, Sphere Break from Final Fantasy X-2.
        </p>
        <p>
          This app is entirely built in React with the NextJS framework. You can
          access the source code on GitHub{" "}
          <Link
            href="https://github.com/martinapiras/sphere-break"
            target="_blank"
            title="Sphere Break by martinapiras on GitHub"
          >
            here
          </Link>
          . Feel free to fork the repository and make your own tweaks!
        </p>
        <p>
          The backgrounds for the coins and boards were drawn by me, so feel
          free to use them, but please give credit and link back to this site
          and/or to the original repository on GitHub.
        </p>
        <ul className={styles.list}>
          Tech stack:{" "}
          <li>
            <Link href="https://react.dev/" target="_blank" title="React">
              React
            </Link>
          </li>
          <li>
            <Link href="https://nextjs.org/" target="_blank" title="NextJS">
              NextJS
            </Link>
          </li>
          <li>
            <Link href="https://sass-lang.com/" target="_blank" title="SASS">
              SASS
            </Link>
          </li>
        </ul>
        <ul className={styles.list}>
          Libraries:{" "}
          <li>
            <Link
              href="https://react-icons.github.io/react-icons/"
              target="_blank"
              title="React Icons"
            >
              React Icons
            </Link>
          </li>
          <li>
            <Link
              href="https://www.npmjs.com/package/react-confetti"
              target="_blank"
              title="React Confetti"
            >
              React Confetti
            </Link>
          </li>
        </ul>
        <p>
          Game font:{" "}
          <Link
            href="https://www.dafont.com/press-start.font"
            target="_blank"
            title="Press Start on dafont.com"
          >
            Press Start
          </Link>{" "}
          by Codeman38
        </p>
        <p>
          Favicon by{" "}
          <Link href="https://www.svgrepo.com" target="_blank" title="SVG Repo">
            SVG Repo
          </Link>
        </p>
      </div>
    </>
  );
}
