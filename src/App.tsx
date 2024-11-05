import { useState, useEffect } from "react";
import Agreement from "./components/Agreement";
import "./App.css";
import MyAppBar from "./components/MyAppBar";
import ProductGrid from "./components/ProductGrid";
import ProductSelection from "./components/ProductSelection";
import ProductRating from "./components/ProductRating";
import ResultPage from "./components/ResultPage";
// import Instraction from "./components/Instraction";
import { Button } from "@mui/material";
import { motion } from "framer-motion";
import { shuffleArray } from "./utils";
import { v4 as uuidv4 } from "uuid";
import Questionnaire from "./components/Questionnaire";
import { ref, increment, update, get } from "firebase/database";
import { firebaseDb } from "./firebase";
import PR from "./components/PR";

export interface DisplayItemID {
  id: number;
}

function App() {
  const [userID, setUserID] = useState<string>("");

  useEffect(() => {
    let userID = localStorage.getItem("userID");
    if (userID == null) {
      userID = uuidv4();
      if (userID !== null) {
        localStorage.setItem("userID", userID);
        setUserID(userID);
      }
    } else {
      setUserID(userID);
    }
  }, []);
  const [pageNumber, setPageNumber] = useState(0);
  const [productID, setProductID] = useState(0);
  const [ratings, setRatings] = useState({});
  const [selectedItem, setSelectedItem] = useState(0);
  const [taskID, setTaskID] = useState(1);

  const [isMoved, setIsMoved] = useState(false);
  const [disabledNext, setDisabledNext] = useState(true);
  const [withBadge, setWithBadge] = useState(false);

  const [isExperiment, setIsExperiment] = useState(false);

  const [randomID, setRandomID] = useState<number>(1);

  const [score, setScore] = useState(0);

  const generateRandomiD = () => {
    const number = Math.floor(1000 + Math.random() * 9000); // 4桁の乱数を生成 (1000-9999)
    setRandomID(number);
  };

  async function getScore(taskID, withBadge) {
    try {
      // 参照パスの指定
      const aiCountRef = ref(
        firebaseDb,
        `score/${String(taskID)}/${String(withBadge)}/AICount`
      );
      const countRef = ref(
        firebaseDb,
        `score/${String(taskID)}/${String(withBadge)}/Count`
      );

      // AICountの取得
      const aiCountSnapshot = await get(aiCountRef);
      const aiCount = aiCountSnapshot.exists() ? aiCountSnapshot.val() : null;

      // Countの取得
      const countSnapshot = await get(countRef);
      const count = countSnapshot.exists() ? countSnapshot.val() : null;

      if (aiCount === null || count === null) {
        console.log("AICountまたはCountの値が見つかりませんでした");
        return 50;
      }

      // スコアの計算
      const score = (aiCount / count) * 100;
      console.log(`Score: ${score}`);
      return score;
    } catch (error) {
      console.error("データの取得または計算中にエラーが発生しました:", error);
      return 50;
    }
  }

  useEffect(() => {
    // 非同期関数を作成して、データをフェッチ
    const fetchScore = async () => {
      const result = await getScore(taskID, withBadge);
      setScore(result); // 結果を setScore にセット
      console.log(result);
    };

    fetchScore(); // 非同期関数を呼び出す
  }, [taskID, withBadge, pageNumber]); // taskID や withBadge が変わったときのみ再度呼び出し

  function setUserIDAndSend() {
    const updates = {};
    const dbRef = ref(firebaseDb);
    if (selectedItem == 4) {
      updates[`score/${String(taskID)}/${String(withBadge)}/AICount`] =
        increment(1);
    }
    updates[`score/${String(taskID)}/${String(withBadge)}/Count`] =
      increment(1);
    update(dbRef, updates);
    // firebase realtime databaseから、scoreのデータを取得するコードを以下に作成。scoreはscore/${String(taskID)}/${String(withBadge)}/AICount をscore/${String(taskID)}/${String(withBadge)}/Count で割ったもの

    // runTransaction(
    //   ref(firebaseDb, `score/${String(taskID)}/${String(withBadge)}`),
    //   (post) => {
    //     console.log(post);
    //     if (post) {
    //       console.log(post);
    //       if (selectedItem == 4) {
    //         updates[`score/${String(taskID)}/${String(withBadge)}/AICount`] = increment(1);
    //         post.AICount++;
    //       }
    //       post.Count++;
    //       setScore((post.AICount / post.Count) * 100);
    //     } else {
    //       console.log("else");
    //       set(ref(firebaseDb, `score/${String(taskID)}/${String(withBadge)}`), {
    //         AICount: selectedItem == 4 ? 1 : 0,
    //         Count: 1,
    //       });
    //     }
    //   }
    // );
  }

  const handleClick = () => {
    generateRandomiD();
    setWithBadge(Math.random() < 0.5 ? true : false);
    setIsMoved(true);
    setIsExperiment(true);
    setTimeout(() => {
      setPageNumber(pageNumber + 1);
      setIsMoved(false);
    }, 800);
  };

  const handleNextClick = () => {
    if (pageNumber === 3) {
      setUserIDAndSend();
    }
    if (isExperiment == false && pageNumber == 4) {
      setPageNumber(pageNumber + 2);
    } else {
      setPageNumber(pageNumber + 1);
      setDisabledNext(true);
    }
  };

  const handlePrevClick = () => {
    setPageNumber(pageNumber - 1);
  };

  const [displayItemIDLists, setDisplayItemIDLists] = useState<DisplayItemID[]>(
    [{ id: 1 }, { id: 4 }]
  );

  useEffect(() => {
    if (productID >= 99) {
      setTaskID(3);
      setDisplayItemIDLists(shuffleArray([{ id: 3 }, { id: 4 }]));
    } else {
      const taskID = Math.random() < 0.5 ? 1 : 2;
      setTaskID(taskID);
      setDisplayItemIDLists(shuffleArray([{ id: taskID }, { id: 4 }]));
    }
  }, [productID]);

  const pageList = [
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: isMoved ? "-100vh" : 0 }}
      transition={{ duration: 0.8 }}
      style={{
        backgroundColor: "#ff333f", // Red background
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        position: "relative",
        zIndex: 100,
      }}
    >
      <p
        style={{
          color: "#fff",
          textAlign: "center",
          marginBottom: "20px",
          fontSize: "48px",
          fontWeight: "bold",
        }}
      >
        AIを使った未来のフリマアプリを体験しよう！
      </p>
      <p
        style={{
          color: "#fff",
          textAlign: "center",
          marginBottom: "20px",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        未来のフリマアプリでは、AIを使って自動的に商品を出品できるようになるかも？
        <br />
        この実験で表示されている商品説明文には、AIを使って書かれたものも含まれています。
        <br />
        どの商品を買いたいと思いますか？
        <br />
        <br />
      </p>
      <Button
        onClick={handleClick}
        variant="contained"
        style={{
          backgroundColor: "white",
          color: "#ff333f",
          fontSize: "24px",
          fontWeight: "bold",
          margin: "16px",
        }}
      >
        実験をはじめる（18歳以上の方のみ）
      </Button>
      <Button
        onClick={() => {
          setWithBadge(Math.random() < 0.5 ? true : false);
          setIsMoved(true);
          setTimeout(() => {
            setPageNumber(pageNumber + 2);
            setIsMoved(false);
          }, 800);
        }}
        variant="contained"
        style={{
          backgroundColor: "white",
          color: "#ff333f",
          fontSize: "24px",
          fontWeight: "bold",
          margin: "16px",
        }}
      >
        体験してみる（18歳未満の方）
      </Button>
    </motion.div>,
    <Agreement pageNumber={pageNumber} setPageNumber={setPageNumber} />,
    // <div>
    //   <Instraction pageNumber={pageNumber} setPageNumber={setPageNumber} />
    // </div>,
    <div style={{ maxWidth: "900px", margin: "auto" }}>
      <h1>1. 購入したい商品を一つ選んでください</h1>
      <ProductGrid
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        setProductID={setProductID}
      />
    </div>,
    <div
      style={{
        width: "100vw",
        margin: "auto",
        position: "fixed",
        top: "64px",
      }}
    >
      <h1 style={{ paddingLeft: "48px" }}>
        2. 商品説明文を読み比べて、購入したい方の商品を選んでください
      </h1>
      <ProductSelection
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        productID={productID}
        displayItemIDLists={displayItemIDLists}
        setDisplayItemIDLists={setDisplayItemIDLists}
        setDisabledNext={setDisabledNext}
        withBadge={withBadge}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        taskID={taskID}
      />
    </div>,
    <div
      style={{
        width: "100vw",
        margin: "auto",
        position: "fixed",
        top: "64px",
      }}
    >
      <h1 style={{ paddingLeft: "48px" }}>
        3. それぞれの商品説明文は、どのぐらい正直に書かれていると感じましたか
      </h1>
      <ProductRating
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        productID={productID}
        displayItemIDLists={displayItemIDLists}
        setDisplayItemIDLists={setDisplayItemIDLists}
        setDisabledNext={setDisabledNext}
        withBadge={withBadge}
        ratings={ratings}
        setRatings={setRatings}
      />
    </div>,
    <Questionnaire
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      userID={userID}
      setDisabledNext={setDisabledNext}
      withBadge={withBadge}
      randomID={randomID}
      productID={productID}
      selectedItem={selectedItem}
      ratings={ratings}
    />,
    <ResultPage score={score} selectedItem={selectedItem} taskID={taskID} />,
    <PR
      endExperiment={() => {
        setPageNumber(0);
        setProductID(0);
        setRatings({});
        setSelectedItem(0);
        setTaskID(1);
        setDisabledNext(true);
        setWithBadge(false);
        setIsExperiment(false);
        setScore(0);
        setDisplayItemIDLists(shuffleArray([{ id: 1 }, { id: 4 }]));
      }}
    />,
  ];

  return (
    <>
      <div>
        <Button
          className="nav-button left"
          onClick={handlePrevClick}
          style={{
            display: pageNumber >= 3 && pageNumber < 5 ? "block" : "none",
            zIndex: 100,
          }}
        >
          ＜<br />
          前に戻る
        </Button>
        <Button
          className="nav-button right"
          onClick={handleNextClick}
          disabled={disabledNext}
          style={{
            display:
              (pageNumber >= 3 && pageNumber < 5) || pageNumber > 5
                ? "block"
                : "none",
            zIndex: 100,
          }}
        >
          ＞<br />
          次に進む
        </Button>
        <p
          className="id"
          style={{ display: pageNumber >= 2 ? "block" : "none" }}
        >
          id: {randomID}
        </p>
      </div>
      <div className="App">
        {/* 以下のdivの中身は、pageNumber==0の時には非表示にする */}
        <div style={{ display: pageNumber === 0 ? "none" : "block" }}>
          <MyAppBar
            pageNumber={pageNumber}
            endExperiment={() => {
              setPageNumber(0);
              setProductID(0);
              setRatings({});
              setSelectedItem(0);
              setTaskID(1);
              setDisabledNext(true);
              setWithBadge(false);
              setIsExperiment(false);
              setScore(0);
              setDisplayItemIDLists(shuffleArray([{ id: 1 }, { id: 4 }]));
            }}
          />
          <div style={{ height: "64px" }}></div>
        </div>
        <div
          className="App_contents"
          style={{
            // position: "absolute",
            // top: "64px",
            height: pageNumber === 0 ? "100vh" : "calc(100vh - 64px)",
            width: "100vw",
          }}
        >
          {pageList[pageNumber]}
        </div>
      </div>
    </>
  );
}

export default App;
