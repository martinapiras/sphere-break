import Head from "next/head";
import { useRouter } from "next/router";
import { BsChevronLeft } from "react-icons/bs";
import styles from "@/styles/Rules.module.scss";

export default function Rules() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Rules</title>
        <meta
          name="description"
          content="Straight from Spira, Final Fantasy X-2's minigame Sphere Break, now playable on your browser!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <div className={`${styles.Rules} col-12`}>
        <div
          className={styles.icon}
          onClick={() => router.push("/")}
          title="Back to homepage"
        >
          <BsChevronLeft />
        </div>
        <h1 className={styles.title}>Rules</h1>
        <h2 className={styles.subtitle}>What is Sphere Break?</h2>
        <p>
          Sphere Break is a minigame featured in the videogame Final Fantasy
          X-2. The goal is to use the coins on the board to score enough points
          to reach a predetermined Quota.
        </p>
        <p>
          The game ends when the player reaches the Quota set at the beginning
          of the game. The player loses if the Quota is not reached before the
          end of the last turn or if the timer reaches 0.
        </p>
        <h2>How to play</h2>
        <p>
          Before starting the game, the player will be asked to choose the
          number of turns, the amount of seconds per turn and a Quota to reach.
          Afterward, the game will generate a 4x4 board of coins with a Core
          Sphere in the center. The number inside the Core Sphere is called{" "}
          <span className={styles.bold}>Core Number</span> and will change at
          the beginning of every turn. To proceed to the next turn, the player
          must add up the numbers on the 16 coins until a multiple of the Core
          Number is reached (<span className={styles.bold}>Core Break</span>)
          before the time ends. The timer is reset at the start of each turn.
        </p>
        <h3>Coins</h3>
        <p>
          There are two types of Coins, each numbered from 1 to 9:{" "}
          <span className={styles.bold}>Entry Coins</span> (bronze-colored) and{" "}
          <span className={styles.bold}>Border Coins</span> (silver-colored).
        </p>
        <p>
          At the start of each turn, the player must first select one of the 4
          Entry Coins. They are then free to select other Coins until the sum of
          their numbers reaches a <span className={styles.bold}>multiple</span>{" "}
          of the Core Number.
        </p>
        <p>
          When a Core Break is reached, the player is granted an amount of Quota
          equal to the number of{" "}
          <span className={styles.bold}>Border Coins</span> used in that turn.
        </p>
        <p>
          At the start of the following turn, used Border Coins disappear and
          the number on the remaining Border Coins goes up by 1. Meanwhile,
          Entry Coins will never change in value and will never disappear. If a
          Border Coin had a 9 during the previous turn, it will disappear even
          if it was not used. Border Coins will sometimes reappear on the board
          as the game goes on.
        </p>
        <h3>Echoes</h3>
        <p>
          There are two types of <span className={styles.bold}>Echoes</span>{" "}
          that will grant the player additional points:{" "}
          <span className={styles.bold}>Coin Count Echo</span> and{" "}
          <span className={styles.bold}>Multiplier Echo</span>.
        </p>
        <h4>Coin Count Echo</h4>
        <p>
          To reach a <span className={styles.bold}>Coin Count Echo</span>, the
          player must use the same{" "}
          <span className={styles.bold}>number of Coins</span> in multiple
          consecutive turns. The extra Quota is then calculated as follows:{" "}
        </p>
        <p className={styles.formula}>
          <var>number of Border Coins used</var> * <var>Coin Count Echo</var>
        </p>
        <p>
          The Coin Count Echo goes up by 1 every time the player uses the same
          number of Coins as in the previous turn and is reset to 0 if the
          number of coins changes.
        </p>
        <h4>Multiplier Echo</h4>
        <p>
          To reach a <span className={styles.bold}>Multiplier Echo</span>, the
          player must reach a Core Break using the same{" "}
          <span className={styles.bold}>multiplier</span> of the Core Number in
          multiple consecutive turns (i.e., reaching a 4 when the Core Number is
          2 and a 6 when the Core Number is 3; both are equal to the Core Number
          multiplied by 2). The extra Quota is calculated as follows:{" "}
        </p>
        <p className={styles.formula}>
          <var>multiplier</var> * <var>Multiplier Echo</var>
        </p>
        <p>
          The Multiplier Echo goes up by 1 every time the player uses the same
          multiplier as in the previous turn and is reset to 0 if the multiplier
          changes.
        </p>
        <p>
          Multiplier Echoes and Coin Count Echoes stack, so at the end of each
          turn, the total Quota added to the player&apos;s score is calculated
          as follows:{" "}
        </p>
        <p className={`${styles.formula} ${styles.long}`}>
          <var>number of Border Coins used</var> +{" "}
          <var>number of Border Coins used</var> * <var>Coin Count Echo</var> +{" "}
          <var>multiplier</var> * <var>Multiplier Echo</var>
        </p>
        <p>
          Use Echoes to your advantage to rack up a huge number of points in no
          time!
        </p>
        <h2>Have fun!</h2>
      </div>
    </>
  );
}
