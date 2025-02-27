import { useState, useEffect } from "react";
import Agreement from "./components/Agreement";
import "./App.css";
// import ProductGrid from "./components/ProductGrid";
import ProductSelection from "./components/ProductSelection";
import ProductRating from "./components/ProductRating";
import { shuffleArray } from "./utils";
import { v4 as uuidv4 } from "uuid";
import Questionnaire from "./components/Questionnaire";
import Explanation1 from "./components/Explanation1";
import Explanation2 from "./components/Explanation2";
import Explanation from "./components/Explanation";
// import { useLocation } from "react-router-dom";
// import queryString from "query-string";
// import Check from "./components/LastCheck";
import InitCheck from "./components/InitCheck";
import Explanation3 from "./components/Explanation3";

export interface DisplayItemID {
  id: string;
}

function App() {
  const [userID, setUserID] = useState<string>("");
  const [pageNumber, setPageNumber] = useState(5);
  const [ratings, setRatings] = useState({});
  const [isTarget, setIsTarget] = useState(true);

  // const [disabledNext, setDisabledNext] = useState(true);

  // const [isExperiment, setIsExperiment] = useState(false);

  const [randomID, setRandomID] = useState<number>(1);

  // const search = useLocation().search;
  // const query = queryString.parse(search);

  const fontList = [
    "ab-kokoro-no2",
    "ab-kinmokusei-kuro",
    "ab-hiro",
    "noto-sans-cjk-jp",
    "ab-aotama",
    "ab-anzu",
    "ab-donmai",
    "ab-booing",
  ];

  const [displayFontPairList, setDisplayFontPairList] = useState<
    [string, string][]
  >([]);
  const [displayFontList, setDisplayFontList] = useState<string[]>([]);

  const generateFontPairs = (fonts: string[]): [string, string][] => {
    const pairs: [string, string][] = [];
    for (let i = 0; i < fonts.length; i++) {
      for (let j = i + 1; j < fonts.length; j++) {
        pairs.push(shuffleArray([fonts[i], fonts[j]]));
        // pairs.push([fonts[j], fonts[i]]); // 順序を入れ替えたペアも追加
      }
    }
    return pairs;
  };

  useEffect(() => {
    const pairs = generateFontPairs(fontList);
    const shuffledPairs = shuffleArray(pairs);
    const shuffledFonts = shuffleArray(fontList);
    setDisplayFontList(shuffledFonts);
    setDisplayFontPairList(shuffledPairs);
  }, []);

  const generateRandomiD = () => {
    const number = Math.floor(1000 + Math.random() * 9000); // 4桁の乱数を生成 (1000-9999)
    setRandomID(number);
  };

  useEffect(() => {
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

  const pageListGeneral = [
    <Agreement pageNumber={pageNumber} setPageNumber={setPageNumber} />,
    <Questionnaire
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      userID={userID}
      randomID={randomID}
      ratings={ratings}
      setIsTarget={setIsTarget}
    />,
    <Explanation1 pageNumber={pageNumber} setPageNumber={setPageNumber} />,
    <Explanation pageNumber={pageNumber} setPageNumber={setPageNumber} />,
    <InitCheck pageNumber={pageNumber} setPageNumber={setPageNumber} />,
  ];

  const pageListHumanA = displayFontPairList.map((pair, index) => (
    <div
      style={{
        width: "100vw",
        margin: "auto",
      }}
      key={index}
    >
      <h1 style={{ paddingLeft: "48px", paddingRight: "48px" }}>
        A-{index + 1}:
        あなたはこの商品を買いたいと思っています。2つの商品説明文を読み比べて、
        <b>購入したい方</b>の商品を選んでください。
      </h1>
      <ProductSelection
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        // displayItemIDListsのうち、1つめと2つ目の要素のリストをdisplayItemIDListsにセット
        displayItemIDLists={shuffleArray([{ id: pair[0] }, { id: pair[1] }])}
        userID={userID}
      />
    </div>
  ));

  const pageListHumanB = displayFontList.map((font, index) => (
    <div
      style={{
        width: "100vw",
        margin: "auto",
      }}
      key={index}
    >
      <h1 style={{ paddingLeft: "48px", paddingRight: "48px" }}>
        B-{index + 1}: フォントに着目をして商品説明文を読み、
        <u>
          <b>この商品の出品者はどのぐらい信頼できる人物だと思うか</b>
        </u>
        について、選択肢（９段階）の中から１つ、できるだけ早く判断してださい。
      </h1>
      <ProductRating
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        displayItemID={{ id: font }}
        ratings={ratings}
        setRatings={setRatings}
        userID={userID}
      />
    </div>
  ));

  const pageListEnd = [
    // <Check
    //   pageNumber={pageNumber}
    //   setPageNumber={setPageNumber}
    //   userID={userID}
    // />,
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

  return (
    <>
      <div className="App_small">
        <div style={{ maxWidth: "600px", margin: "auto", textAlign: "left" }}>
          <p style={{ fontSize: "24px" }}>
            お使いのブラウザの画面の横幅では、タスクを進めることができません。ウィンドウを最大化するか、画面（解像度）の大きな端末でお試しください。
          </p>
        </div>
      </div>
      <div className="App">
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
                .concat(pageListHumanA)
                .concat(
                  <Explanation3
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                  />,
                  <Explanation2
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                  />,
                  <InitCheck
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                  />
                )
                .concat(pageListHumanB)
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
