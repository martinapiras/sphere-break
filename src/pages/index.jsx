import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "@uidotdev/usehooks";
import localFont from "next/font/local";

import Head from "next/head";
import Link from "next/link";
import Button from "@/components/Button";
import Coin from "@/components/Coin";
import Input from "@/components/Input";

import { shuffle, isSelected } from "@/utils/fn";

import styles from "@/styles/Home.module.scss";

const PressStart = localFont({ src: "../assets/fonts/prstartk.ttf" });

const blankEntryCoins = [];
const blankBorderCoins = [];
const numbers = [];

// creates blank entry coins
for (let i = 1; i <= 4; i++) {
  blankEntryCoins.push({ id: i, value: "", selected: false });
}

// creates blank border coins
for (let i = 1; i <= 12; i++) {
  blankBorderCoins.push({ id: i, value: "", selected: false });
}

// values for entry coins
for (let i = 1; i <= 9; i++) {
  numbers.push(i);
}

let trueSum;
let trueCoinNumber = 0;
let trueBrdCoinsNumber = 0;
let trueQuota = 0;
let lastSelected = 0;
let multiplier = 0;
let trueCoinEcho = 0;
let trueMultEcho = 0;
let newCoreNumber;
let points = 0;
let n;

let random;
let newCoins = [];
let initialValues = [];
let turnsInput;
let timeInput;
let quotaInput;

export default function Home() {
  const window = useWindowSize();

  const [entryCoins, setEntryCoins] = useState([...blankEntryCoins]);
  const [borderCoins, setBorderCoins] = useState([...blankBorderCoins]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [coreNumber, setCoreNumber] = useState("");
  const [turn, setTurn] = useState(0);
  const [maxTurns, setMaxTurns] = useState(10);
  const [quota, setQuota] = useState(0);
  const [maxQuota, setMaxQuota] = useState(15);
  const [time, setTime] = useState(0);
  const [maxTime, setMaxTime] = useState(60);
  const [coinNumber, setCoinNumber] = useState(0);
  const [sum, setSum] = useState(0);
  const [coinEcho, setCoinEcho] = useState(0);
  const [prevCoinNumber, setPrevCoinNumber] = useState(0);
  const [multEcho, setMultEcho] = useState(0);
  const [prevMult, setPrevMult] = useState(0);
  const [timer, setTimer] = useState(false);
  const [multiples, setMultiples] = useState([]);
  const [brdCoinsNumber, setBrdCoinsNumber] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const countdown = () => setTime((prev) => prev - 1);

  // starts countdown when game starts
  useEffect(() => {
    let timerId;

    if (timer) {
      timerId = setInterval(countdown, 1000);
    }

    return () => clearInterval(timerId);
  }, [timer, time]);

  const startGame = () => {
    setShowResults(false);
    setIsPlaying(true);
    shuffle(numbers);
    for (let i = 1; i <= 12; i++) {
      initialValues.push(Math.floor(Math.random() * (10 - 1) + 1));
    }

    setTurn(1);
    setTime(maxTime);
    setTimer(true);

    newCoreNumber = Math.floor(Math.random() * (10 - 1) + 1);
    setCoreNumber(newCoreNumber);
    setMultiples([newCoreNumber * 1, newCoreNumber * 2, newCoreNumber * 3]);

    setEntryCoins(
      entryCoins.map((coin) => ({
        ...coin,
        value: numbers[coin.id],
        disabled: false,
        selected: false,
      }))
    );

    setBorderCoins(
      borderCoins.map((coin) => ({
        ...coin,
        value: initialValues[coin.id - 1],
        initialValue: initialValues[coin.id - 1],
        disabled: false,
        selected: false,
      }))
    );
  };

  const newTurn = () => {
    if (turn === maxTurns) {
      alert("You lost");
      clearGame();
    } else {
      setTurn((prev) => prev + 1);
      setTime(maxTime);

      if (turn >= 4) {
        random = Math.floor(Math.random() * (11 - 3) + 3);
        newCoins = [];

        for (let i = 1; i <= random; i++) {
          newCoins.push(Math.floor(Math.random() * (10 - 1) + 1));
        }

        setBorderCoins(
          borderCoins.map((coin) => {
            if (!coin.value && newCoins.find((number) => number === coin.id)) {
              return {
                ...coin,
                value: Math.floor(Math.random() * (10 - 1) + 1),
                selected: false,
                disabled: false,
              };
            } else if (
              coin.value === 9 ||
              !coin.value ||
              coin.selected ||
              coin.id === lastSelected.id
            ) {
              return { ...coin, value: "", selected: false, disabled: true };
            } else
              return {
                ...coin,
                value: parseInt(coin.value + 1),
                selected: false,
              };
          })
        );
      } else {
        setBorderCoins(
          borderCoins.map((coin) => {
            if (
              coin.value === 9 ||
              !coin.value ||
              coin.selected ||
              coin.id === lastSelected.id
            ) {
              return {
                ...coin,
                value: "",
                selected: false,
                disabled: true,
              };
            } else
              return {
                ...coin,
                value: parseInt(coin.value + 1),
                selected: false,
              };
          })
        );
      }

      setEntryCoins(entryCoins.map((coin) => ({ ...coin, selected: false })));

      newCoreNumber = Math.floor(Math.random() * (10 - 1) + 1);
      setCoreNumber(newCoreNumber);
      setMultiples([newCoreNumber * 1, newCoreNumber * 2, newCoreNumber * 3]);
      setCoinNumber(0);
      setBrdCoinsNumber(0);
      setSum(0);
      trueBrdCoinsNumber = 0;
    }
  };

  const addBorderCoin = (coin, id) => {
    if (!coin.disabled && !coin.selected && isSelected(entryCoins)) {
      setBorderCoins(
        borderCoins.map((coin) => {
          if (coin.id === id) {
            return { ...coin, selected: true };
          } else return coin;
        })
      );
      setCoinNumber((prev) => prev + 1);
      setSum((prev) => prev + coin.value);
      trueSum = sum + coin.value;

      n = parseInt(trueSum / coreNumber);
      setMultiples([
        coreNumber * (n + 1),
        coreNumber * (n + 2),
        coreNumber * (n + 3),
      ]);

      setBrdCoinsNumber((prev) => prev + 1);
      trueBrdCoinsNumber = brdCoinsNumber + 1;
      trueCoinNumber = coinNumber + 1;
      lastSelected = coin;

      if (trueSum % coreNumber === 0) {
        multiplier = trueSum / coreNumber;

        if (multiplier === prevMult && turn > 1) {
          setMultEcho((prev) => prev + 1);
          trueMultEcho = multEcho + 1;
        } else {
          setMultEcho(0);
          trueMultEcho = 0;
        }

        if (trueCoinNumber === prevCoinNumber && turn > 1) {
          setCoinEcho((prev) => prev + 1);
          trueCoinEcho = coinEcho + 1;
        } else {
          setCoinEcho(0);
          trueCoinEcho = 0;
        }

        points =
          trueBrdCoinsNumber +
          multiplier * trueMultEcho +
          trueBrdCoinsNumber * trueCoinEcho;
        trueQuota = quota + points;
        setPrevMult(multiplier);
        setPrevCoinNumber(trueCoinNumber);
        setQuota((prev) => prev + points);
        alert("Core break");

        if (trueQuota < maxQuota) {
          newTurn();
        } else {
          alert("You won!");
          winGame();
        }
      }
    }
  };

  const addEntryCoin = (coin, id) => {
    if (!coin.disabled && !coin.selected) {
      setEntryCoins(
        entryCoins.map((coin) => {
          if (coin.id === id) {
            return { ...coin, selected: true };
          } else return coin;
        })
      );
      setCoinNumber((prev) => prev + 1);
      trueCoinNumber = coinNumber + 1;

      setSum((prev) => prev + coin.value);
      trueSum = sum + coin.value;
      n = parseInt(trueSum / coreNumber);
      setMultiples([
        coreNumber * (n + 1),
        coreNumber * (n + 2),
        coreNumber * (n + 3),
      ]);

      if (trueSum % coreNumber === 0) {
        multiplier = trueSum / coreNumber;

        if (multiplier === prevMult && turn > 1) {
          setMultEcho((prev) => prev + 1);
          trueMultEcho = multEcho + 1;
        } else {
          setMultEcho(0);
          trueMultEcho = 0;
        }

        if (trueCoinNumber === prevCoinNumber && turn > 1) {
          setCoinEcho((prev) => prev + 1);
          trueCoinEcho = coinEcho + 1;
        } else {
          setCoinEcho(0);
          trueCoinEcho = 0;
        }

        points =
          brdCoinsNumber +
          multiplier * trueMultEcho +
          brdCoinsNumber * trueCoinEcho;

        trueQuota = quota + points;
        setQuota((prev) => prev + points);
        setPrevMult(multiplier);
        setPrevCoinNumber(trueCoinNumber);
        alert("Core break");

        if (trueQuota < maxQuota) {
          newTurn();
        } else {
          alert("You won!");
          winGame();
        }
      }
    }
  };

  const winGame = () => {
    setShowResults(true);
    setTimer(false);
    setBorderCoins(borderCoins.map((coin) => ({ ...coin, disabled: true })));
    setEntryCoins(entryCoins.map((coin) => ({ ...coin, disabled: true })));
  };

  const clearGame = () => {
    setIsPlaying(false);
    setEntryCoins([...blankEntryCoins]);
    setBorderCoins([...blankBorderCoins]);
    setCoreNumber("");
    setTurn(0);
    setMaxTurns(10);
    setQuota(0);
    setMaxQuota(15);
    setMaxTime(60);
    setCoinNumber(0);
    setBrdCoinsNumber(0);
    setSum(0);
    setCoinEcho(0);
    setPrevCoinNumber(0);
    setMultEcho(0);
    setPrevMult(0);
    setTimer(false);
    setShowResults(false);

    trueCoinNumber = 0;
    trueBrdCoinsNumber = 0;
    trueQuota = 0;
    lastSelected = 0;
    multiplier = 0;
    trueCoinEcho = 0;
    trueMultEcho = 0;
    points = 0;
    newCoins = [];
    initialValues = [];
  };

  if (timer && time === 0) {
    alert("Time's up! You lost!");
    clearGame();
  }

  // ends the game if the player runs out of coins
  if (
    !borderCoins.find((coin) => coin.value && !coin.selected) &&
    !entryCoins.find((coin) => !coin.selected) &&
    trueSum % coreNumber !== 0
  ) {
    alert("You ran out of coins! You lost!");
    clearGame();
  }

  return (
    <>
      <Head>
        <title>Sphere Break</title>
        <meta
          name="description"
          content="Straight from Spira, Final Fantasy X-2's minigame Sphere Break, now playable on your browser!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <div className={styles.Home}>
        <h1 className={styles.title}>Sphere Break</h1>
        {isPlaying ? (
          <div className={`${styles.gameArea} col-12`}>
            <div
              className={`${styles.gameData} ${PressStart.className} col-5 col-xs-12`}
            >
              <div className={`${styles.settings} col-12`}>
                <p>
                  Turn: {turn}/{maxTurns}
                </p>
                <p>
                  Time: <span className={styles.time}>{time}</span>
                </p>
                <p>
                  Quota: <span className={styles.quota}>{quota}</span>/
                  {maxQuota}
                </p>
              </div>
              <div className={`${styles.turnInfo} col-12`}>
                <p>
                  Sum: <span className={styles.sum}>{sum}</span>
                </p>
                <div className={styles.multPar}>
                  <p>Break Multiples:</p>
                  <p className={styles.multiples}>
                    {multiples.map((multiple) => (
                      <span key={multiple} className="col-xs-4">
                        {multiple}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
              <div className={`${styles.comboInfo} col-12`}>
                <p className={styles.comboName}>
                  Last Coin Count: {prevCoinNumber}
                </p>
                <p>Echo: x{coinEcho}</p>
                <p>Coin Count: {coinNumber}</p>
                <hr className={styles.line} />
                <p className={styles.comboName}>Multiplier: {prevMult}</p>
                <p>Echo: x{multEcho}</p>
              </div>
            </div>
            <div className={`${styles.table} col-5 col-xs-12`}>
              <div className={styles.row}>
                {borderCoins
                  .filter((coin) => coin.id <= 4)
                  .map((coin) => (
                    <Coin
                      key={coin.id}
                      type="border"
                      value={coin.value}
                      onClick={() => addBorderCoin(coin, coin.id)}
                      selected={coin.selected}
                      disabled={coin.disabled}
                    />
                  ))}
              </div>
              <div className={styles.row}>
                <Coin
                  value={borderCoins[4].value}
                  type="border"
                  onClick={() =>
                    addBorderCoin(borderCoins[4], borderCoins[4].id)
                  }
                  selected={borderCoins[4].selected}
                  disabled={borderCoins[4].disabled}
                />
                {entryCoins
                  .filter((coin) => coin.id <= 2)
                  .map((coin) => (
                    <Coin
                      type="entry"
                      value={coin.value}
                      key={coin.id}
                      onClick={() => addEntryCoin(coin, coin.id)}
                      selected={coin.selected}
                      disabled={coin.disabled}
                    />
                  ))}
                <Coin
                  value={borderCoins[5].value}
                  type="border"
                  onClick={() =>
                    addBorderCoin(borderCoins[5], borderCoins[5].id)
                  }
                  selected={borderCoins[5].selected}
                  disabled={borderCoins[5].disabled}
                />
              </div>
              <div className={styles.row}>
                <Coin
                  value={borderCoins[6].value}
                  type="border"
                  onClick={() =>
                    addBorderCoin(borderCoins[6], borderCoins[6].id)
                  }
                  selected={borderCoins[6].selected}
                  disabled={borderCoins[6].disabled}
                />
                {entryCoins
                  .filter((coin) => coin.id > 2)
                  .map((coin) => (
                    <Coin
                      type="entry"
                      value={coin.value}
                      key={coin.id}
                      onClick={() => addEntryCoin(coin, coin.id)}
                      selected={coin.selected}
                      disabled={coin.disabled}
                    />
                  ))}
                <Coin
                  value={borderCoins[7].value}
                  type="border"
                  onClick={() =>
                    addBorderCoin(borderCoins[7], borderCoins[7].id)
                  }
                  selected={borderCoins[7].selected}
                  disabled={borderCoins[7].disabled}
                />
              </div>
              <div className={styles.row}>
                {borderCoins
                  .filter((coin) => coin.id > 8)
                  .map((coin) => (
                    <Coin
                      key={coin.id}
                      type="border"
                      value={coin.value}
                      onClick={() => addBorderCoin(coin, coin.id)}
                      selected={coin.selected}
                      disabled={coin.disabled}
                    />
                  ))}
              </div>
              <Coin type="core" value={coreNumber} />
            </div>
            {showResults ? (
              <div className={styles.ButtonContainer}>
                <Button onClick={clearGame} content="Play again" />
              </div>
            ) : (
              <div className={styles.ButtonContainer}>
                <Button onClick={clearGame} content="Quit" />
              </div>
            )}
          </div>
        ) : (
          <>
            <div className={styles.gameArea}>
              <div
                className={`${styles.dataInputs} ${PressStart.className} col-xs-12 col-5`}
              >
                <div className={`${styles.dataInput} col-xs-12`}>
                  <label htmlFor="turns">Number of turns: </label>
                  <Input
                    type="number"
                    value={maxTurns}
                    onChange={(e) => {
                      turnsInput = parseInt(e.target.value);
                      setMaxTurns(parseInt(e.target.value));
                    }}
                    id="turns"
                  />
                </div>
                <div className={`${styles.dataInput} col-xs-12`}>
                  <label htmlFor="time">Seconds per turn: </label>
                  <Input
                    type="number"
                    value={maxTime}
                    onChange={(e) => {
                      timeInput = parseInt(e.target.value);
                      setMaxTime(parseInt(e.target.value));
                    }}
                    id="time"
                  />
                </div>
                <div className={`${styles.dataInput} col-xs-12`}>
                  <label htmlFor="quota">Quota: </label>
                  <Input
                    type="number"
                    value={maxQuota}
                    onChange={(e) => {
                      quotaInput = parseInt(e.target.value);
                      setMaxQuota(parseInt(e.target.value));
                    }}
                    id="quota"
                  />
                </div>
              </div>
              <div className={`${styles.table} col-5 col-xs-12`}>
                <div className={styles.row}>
                  {blankBorderCoins
                    .filter((coin) => coin.id <= 4)
                    .map((coin) => (
                      <Coin key={coin.id} type="border" value={coin.value} />
                    ))}
                </div>
                <div className={styles.row}>
                  <Coin value={blankBorderCoins[4].value} type="border" />
                  {blankEntryCoins
                    .filter((coin) => coin.id <= 2)
                    .map((coin) => (
                      <Coin type="entry" value={coin.value} key={coin.id} />
                    ))}
                  <Coin value={blankBorderCoins[5].value} type="border" />
                </div>
                <div className={styles.row}>
                  <Coin value={blankBorderCoins[6].value} type="border" />
                  {blankEntryCoins
                    .filter((coin) => coin.id > 2)
                    .map((coin) => (
                      <Coin type="entry" value={coin.value} key={coin.id} />
                    ))}
                  <Coin value={blankBorderCoins[7].value} type="border" />
                </div>
                <div className={styles.row}>
                  {blankBorderCoins
                    .filter((coin) => coin.id > 8)
                    .map((coin) => (
                      <Coin key={coin.id} type="border" value={coin.value} />
                    ))}
                </div>
                <Coin type="core" value={coreNumber} />
              </div>
              <div className={styles.ButtonWrapper}>
                <Button onClick={startGame} content="New game" />
              </div>
            </div>
            <p className={`${styles.rules} col-12`}>
              <Link href="/rules" title="Rules">
                Need help? Read the rules here!
              </Link>
            </p>
            <footer className={`${styles.footer} col-12`}>
              <Link href="/about" title="About">
                About
              </Link>
            </footer>
          </>
        )}
        {showResults && (
          <Confetti width={window.width} heigth={window.height} opacity={0.5} />
        )}
      </div>
    </>
  );
}
