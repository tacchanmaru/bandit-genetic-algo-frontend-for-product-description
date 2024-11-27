import { useState, useEffect } from "react";
import Agreement from "./components/Agreement";
import "./App.css";
// import ProductGrid from "./components/ProductGrid";
import ProductSelection from "./components/ProductSelection";
import ProductRating from "./components/ProductRating";
import { shuffleArray } from "./utils";
import { v4 as uuidv4 } from "uuid";
import Questionnaire from "./components/Questionnaire";
import { ref, runTransaction } from "firebase/database";
import { firebaseDb } from "./firebase";
import Explanation1 from "./components/Explanation1";
import Explanation2 from "./components/Explanation2";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import Check from "./components/Check";

export interface DisplayItemID {
  id: number;
}

function App() {
  const [userID, setUserID] = useState<string>("");
  const [pageNumber, setPageNumber] = useState(0);
  const [productID, setProductID] = useState(10);
  const [ratings, setRatings] = useState({});
  const [selectedItem, setSelectedItem] = useState(0);
  const [taskID, setTaskID] = useState(1);
  const [isIncremented, setIsIncremented] = useState(false);
  const [isTarget, setIsTarget] = useState(true);
  const [ratingList, setRatingList] = useState<number[]>([0, 1]);

  // const [disabledNext, setDisabledNext] = useState(true);
  const [withLabel, setWithLabel] = useState(false);

  // const [isExperiment, setIsExperiment] = useState(false);

  const [randomID, setRandomID] = useState<number>(1);

  const [isHuman, setIsHuman] = useState<null | boolean>(null);

  const search = useLocation().search;
  const query = queryString.parse(search);

  const generateRandomiD = () => {
    const number = Math.floor(1000 + Math.random() * 9000); // 4桁の乱数を生成 (1000-9999)
    setRandomID(number);
  };

  useEffect(() => {
    setRatingList(shuffleArray([0, 1]));
  }, []);

  useEffect(() => {
    console.log("fire");
    if (query["condition"] == "ai") {
      setIsHuman(false);
    } else if (query["condition"] == "human") {
      setIsHuman(true);
    }

    if (query["label"] == "true") {
      setWithLabel(true);
    } else if (query["label"] == "false") {
      setWithLabel(false);
    }

    generateRandomiD();
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

  useEffect(() => {
    console.log(isHuman);
    if (isIncremented == false) {
      if (isHuman === null) return; // 状態が未確定なら実行しない

      let accessCount = 0;

      runTransaction(
        ref(
          firebaseDb,
          "/access/" +
            (isHuman ? "human" : "ai") +
            "/" +
            (withLabel ? "withLabel" : "withoutLabel") +
            "/"
        ),
        (post) => {
          if (post) {
            post.accessCount++; // postが存在する場合、increment
          } else {
            post = { accessCount: 1 }; // postがnullの場合、新規作成
          }
          return post; // 更新されたデータを返す
        }
      ).then(function (snapshot) {
        const updatedPost = snapshot.snapshot.val();
        accessCount = updatedPost.accessCount;

        if (isHuman) {
          setProductID(accessCount % 39);
        } else {
          setProductID((accessCount % 42) + 101);
        }
        setIsIncremented(true);
      });
    }
  }, [isHuman, withLabel]); // isHumanが確定したときだけ実行

  // function setUserIDAndSend() {
  //   const updates = {};
  //   const dbRef = ref(firebaseDb);
  //   if (selectedItem == 4) {
  //     updates[`score/${String(taskID)}/${String(withLabel)}/AICount`] =
  //       increment(1);
  //   }
  //   updates[`score/${String(taskID)}/${String(withLabel)}/Count`] =
  //     increment(1);
  //   update(dbRef, updates);
  //   // firebase realtime databaseから、scoreのデータを取得するコードを以下に作成。scoreはscore/${String(taskID)}/${String(withLabel)}/AICount をscore/${String(taskID)}/${String(withLabel)}/Count で割ったもの

  //   // runTransaction(
  //   //   ref(firebaseDb, `score/${String(taskID)}/${String(withLabel)}`),
  //   //   (post) => {
  //   //     console.log(post);
  //   //     if (post) {
  //   //       console.log(post);
  //   //       if (selectedItem == 4) {
  //   //         updates[`score/${String(taskID)}/${String(withLabel)}/AICount`] = increment(1);
  //   //         post.AICount++;
  //   //       }
  //   //       post.Count++;
  //   //       setScore((post.AICount / post.Count) * 100);
  //   //     } else {
  //   //       console.log("else");
  //   //       set(ref(firebaseDb, `score/${String(taskID)}/${String(withLabel)}`), {
  //   //         AICount: selectedItem == 4 ? 1 : 0,
  //   //         Count: 1,
  //   //       });
  //   //     }
  //   //   }
  //   // );
  // }

  // const handleNextClick = () => {
  //   if (pageNumber === 3) {
  //     setUserIDAndSend();
  //   }
  //   setPageNumber(pageNumber + 1);
  //   // setDisabledNext(true);
  //   setSelectedItem(0);
  // };

  // const handlePrevClick = () => {
  //   setPageNumber(pageNumber - 1);
  //   setSelectedItem(0);
  // };

  const [displayItemIDLists, setDisplayItemIDLists] = useState<DisplayItemID[]>(
    [{ id: 1 }, { id: 4 }]
  );

  useEffect(() => {
    if (productID >= 99) {
      setTaskID(3);
      setDisplayItemIDLists(shuffleArray([{ id: 3 }, { id: 4 }]));
    } else {
      setDisplayItemIDLists(shuffleArray([{ id: 1 }, { id: 2 }, { id: 4 }]));
    }
  }, [productID]);

  const pageListGeneral = [
    <Agreement pageNumber={pageNumber} setPageNumber={setPageNumber} />,
    <Questionnaire
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      userID={userID}
      withLabel={withLabel}
      randomID={randomID}
      productID={productID}
      selectedItem={selectedItem}
      ratings={ratings}
      setIsTarget={setIsTarget}
    />,
    <Explanation1 pageNumber={pageNumber} setPageNumber={setPageNumber} />,
    <Explanation2
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      withLabel={withLabel}
    />,
  ];

  const pageListHuman = [
    <div
      style={{
        width: "100vw",
        margin: "auto",
      }}
    >
      <h1 style={{ paddingLeft: "48px" }}>
        Q1:
        あなたはこの商品を買いたいと思っています。2つの商品説明文を読み比べて、
        <b>購入したい方</b>の商品を選んでください。
      </h1>
      <ProductSelection
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        productID={productID}
        //displayItemIDListsのうち、1つめと2つ目の要素のリストをdisplayItemIDListsにセット
        displayItemIDLists={shuffleArray([
          displayItemIDLists[0],
          displayItemIDLists[1],
        ])}
        withLabel={withLabel}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        taskID={taskID}
        userID={userID}
      />
    </div>,
    <div
      style={{
        width: "100vw",
        margin: "auto",
      }}
    >
      <h1 style={{ paddingLeft: "48px" }}>
        Q2:
        あなたはこの商品を買いたいと思っています。2つの商品説明文を読み比べて、
        <b>購入したい方</b>の商品を選んでください。
      </h1>
      <ProductSelection
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        productID={productID}
        displayItemIDLists={shuffleArray([
          displayItemIDLists[0],
          displayItemIDLists[2],
        ])}
        withLabel={withLabel}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        taskID={taskID}
        userID={userID}
      />
    </div>,
    <div
      style={{
        width: "100vw",
        margin: "auto",
      }}
    >
      <h1 style={{ paddingLeft: "48px" }}>
        Q3:
        あなたはこの商品を買いたいと思っています。2つの商品説明文を読み比べて、
        <b>購入したい方</b>の商品を選んでください。
      </h1>
      <ProductSelection
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        productID={productID}
        displayItemIDLists={shuffleArray([
          displayItemIDLists[1],
          displayItemIDLists[2],
        ])}
        withLabel={withLabel}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        taskID={taskID}
        userID={userID}
      />
    </div>,
    <div
      style={{
        width: "100vw",
        margin: "auto",
      }}
    >
      <h1 style={{ paddingLeft: "48px" }}>
        Q4: 次の商品説明文は、どのぐらい<b>正直</b>
        に書かれていると感じますか？
      </h1>
      <ProductRating
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        productID={productID}
        displayItemID={displayItemIDLists[0]}
        withLabel={withLabel}
        ratings={ratings}
        setRatings={setRatings}
        userID={userID}
      />
    </div>,
    <div
      style={{
        width: "100vw",
        margin: "auto",
      }}
    >
      <h1 style={{ paddingLeft: "48px" }}>
        Q5: 次の商品説明文は、どのぐらい<b>正直</b>
        に書かれていると感じますか？
      </h1>
      <ProductRating
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        productID={productID}
        displayItemID={displayItemIDLists[1]}
        withLabel={withLabel}
        ratings={ratings}
        setRatings={setRatings}
        userID={userID}
      />
    </div>,
    <div
      style={{
        width: "100vw",
        margin: "auto",
      }}
    >
      <h1 style={{ paddingLeft: "48px" }}>
        Q6: 次の商品説明文は、どのぐらい<b>正直</b>
        に書かれていると感じますか？
      </h1>
      <ProductRating
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        productID={productID}
        displayItemID={displayItemIDLists[2]}
        withLabel={withLabel}
        ratings={ratings}
        setRatings={setRatings}
        userID={userID}
      />
    </div>,
  ];

  const pageListAI = [
    <div
      style={{
        width: "100vw",
        margin: "auto",
      }}
    >
      <h1 style={{ paddingLeft: "48px" }}>
        Q1:
        あなたはこの商品を買いたいと思っています。2つの商品説明文を読み比べて、
        <b>購入したい方</b>の商品を選んでください。
      </h1>
      <ProductSelection
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        productID={productID}
        displayItemIDLists={displayItemIDLists}
        withLabel={withLabel}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        taskID={taskID}
        userID={userID}
      />
    </div>,
    <div
      style={{
        width: "100vw",
        margin: "auto",
      }}
    >
      <h1 style={{ paddingLeft: "48px" }}>
        Q2: 次の商品説明文は、どのぐらい<b>正直</b>
        に書かれていると感じますか？
      </h1>
      <ProductRating
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        productID={productID}
        displayItemID={displayItemIDLists[ratingList[0]]}
        withLabel={withLabel}
        ratings={ratings}
        setRatings={setRatings}
        userID={userID}
      />
    </div>,
    <div
      style={{
        width: "100vw",
        margin: "auto",
      }}
    >
      <h1 style={{ paddingLeft: "48px" }}>
        Q3: 次の商品説明文は、どのぐらい<b>正直</b>
        に書かれていると感じますか？
      </h1>
      <ProductRating
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        productID={productID}
        displayItemID={displayItemIDLists[ratingList[1]]}
        withLabel={withLabel}
        ratings={ratings}
        setRatings={setRatings}
        userID={userID}
      />
    </div>,
  ];

  const pageListEnd = [
    <Check
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      productID={productID}
      userID={userID}
      withLabel={withLabel}
    />,
    <div style={{ width: "100vw", textAlign: "center" }}>
      <div style={{ maxWidth: "600px", margin: "auto", textAlign: "left" }}>
        <h1>実験は以上で終了です。</h1>
        <p style={{ fontSize: "24px" }}>
          以下のパスコードをYahooクラウドソージングに入力してください。
        </p>
        <p style={{ fontSize: "24px" }}>AM5m1WejO9</p>
        <p style={{ fontSize: "24px", color: "red" }}>
          【注意】Yahooクラウドソーシングにコードを入力するまで、このページを閉じないでください。
          <br />
          一度このページを閉じると、上記のコードは表示できません。
        </p>
      </div>
    </div>,
  ];

  // const pageList = [
  //   <Agreement pageNumber={pageNumber} setPageNumber={setPageNumber} />,
  //   <Questionnaire
  //     pageNumber={pageNumber}
  //     setPageNumber={setPageNumber}
  //     userID={userID}
  //     setDisabledNext={setDisabledNext}
  //     withLabel={withLabel}
  //     randomID={randomID}
  //     productID={productID}
  //     selectedItem={selectedItem}
  //     ratings={ratings}
  //   />,
  //   <Explanation1 pageNumber={pageNumber} setPageNumber={setPageNumber} />,
  //   // <div>
  //   //   <Instraction pageNumber={pageNumber} setPageNumber={setPageNumber} />
  //   // </div>,
  //   // <div style={{ maxWidth: "900px", margin: "auto" }}>
  //   //   <h1>1. 購入したい商品を一つ選んでください</h1>
  //   //   <ProductGrid
  //   //     pageNumber={pageNumber}
  //   //     setPageNumber={setPageNumber}
  //   //     setProductID={setProductID}
  //   //   />
  //   // </div>,
  //   <div
  //     style={{
  //       width: "100vw",
  //       margin: "auto",
  //     }}
  //   >
  //     <h1 style={{ paddingLeft: "48px" }}>
  //       あなたはこの商品を買いたいと思っています。2つの商品説明文を読み比べて、
  //       <b>購入したい方</b>の商品を選んでください。
  //     </h1>
  //     <ProductSelection
  //       pageNumber={pageNumber}
  //       setPageNumber={setPageNumber}
  //       productID={productID}
  //       displayItemIDLists={displayItemIDLists}
  //       setDisplayItemIDLists={setDisplayItemIDLists}
  //   //       withLabel={withLabel}
  //       selectedItem={selectedItem}
  //       setSelectedItem={setSelectedItem}
  //       taskID={taskID}
  //     />
  //   </div>,
  //   <div
  //     style={{
  //       width: "100vw",
  //       margin: "auto",
  //     }}
  //   >
  //     <h1 style={{ paddingLeft: "48px" }}>
  //       次の商品説明文は、どのぐらい<b>正直</b>
  //       に書かれていると感じますか？
  //     </h1>
  //     <ProductRating
  //       pageNumber={pageNumber}
  //       setPageNumber={setPageNumber}
  //       productID={productID}
  //       displayItemID={displayItemIDLists[0]}
  //   //       withLabel={withLabel}
  //       ratings={ratings}
  //       setRatings={setRatings}
  //     />
  //   </div>,
  //   <div
  //     style={{
  //       width: "100vw",
  //       margin: "auto",
  //     }}
  //   >
  //     <h1 style={{ paddingLeft: "48px" }}>
  //       次の商品説明文は、どのぐらい<b>正直</b>
  //       に書かれていると感じますか？
  //     </h1>
  //     <ProductRating
  //       pageNumber={pageNumber}
  //       setPageNumber={setPageNumber}
  //       productID={productID}
  //       displayItemID={displayItemIDLists[1]}
  //   //       withLabel={withLabel}
  //       ratings={ratings}
  //       setRatings={setRatings}
  //     />
  //   </div>,
  //   <div>
  //     <p>実験は以上で終了です。</p>
  //     <p>
  //       以下のパスコードをYahooクラウドソージングに入力した上で、このページを閉じてください。
  //     </p>
  //     <p>AM5m1WejO9</p>
  //     <Button
  //       variant="contained"
  //       color="primary"
  //       className=""
  //       onClick={() => window.close()}
  //       style={{ margin: "16px 0px" }}
  //     >
  //       ページを閉じる
  //     </Button>
  //   </div>,
  // ];

  return (
    <>
      <div className="App_small">
        <div style={{ maxWidth: "600px", margin: "auto", textAlign: "left" }}>
          <p style={{ fontSize: "24px" }}>
            お使いのブラウザの画面の横幅では、タスクを進めることができません。画面（解像度）の大きな端末でお試しください。
          </p>
        </div>
      </div>
      <div className="App">
        {/* <div>
          <Button
            className="nav-button left"
            onClick={handlePrevClick}
            style={{
              display: pageNumber >= 3 ? "block" : "none",
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
              display: pageNumber >= 3 ? "block" : "none",
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
        </div> */}
        {/* 以下のdivの中身は、pageNumber==0の時には非表示にする */}
        {/* <div style={{ display: pageNumber === 0 ? "none" : "block" }}>
          <MyAppBar
            pageNumber={pageNumber}
            endExperiment={() => {
              setPageNumber(0);
              setProductID(0);
              setRatings({});
              setSelectedItem(0);
              setTaskID(1);
              setDisabledNext(true);
              setWithLabel(false);
              setIsExperiment(false);
              setScore(0);
              setDisplayItemIDLists(shuffleArray([{ id: 1 }, { id: 4 }]));
            }}
          />
          <div style={{ height: "64px" }}></div>
        </div> */}
        {isTarget ? (
          <div
            className="App_contents"
            style={{
              // position: "absolute",
              // top: "64px",
              height: pageNumber === 0 ? "100vh" : "calc(100vh - 64px)",
              width: "100vw",
            }}
          >
            {
              pageListGeneral
                .concat(isHuman ? pageListHuman : pageListAI)
                .concat(pageListEnd)[pageNumber]
            }
          </div>
        ) : (
          <div style={{ width: "100vw" }}>
            <div
              style={{ maxWidth: "600px", margin: "auto", textAlign: "left" }}
            >
              <h1>実験は以上で終了です。</h1>
              <p style={{ fontSize: "24px" }}>
                本実験はフリマアプリの利用経験のある方を対象とさせていただいております。申し訳ございませんが、条件に合わないため、本実験を終了させていただきます。「ページを閉じる」または、ブラウザの×ボタンを押して、このページを閉じてください。
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
