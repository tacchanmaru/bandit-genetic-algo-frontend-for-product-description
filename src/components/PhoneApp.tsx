import React from "react";
import { formatTextWithLineBreaks } from "../utils";

type Props = {
  taskID: string;
};

const PhoneApp: React.FC<Props> = (props) => {
  // const [product, setProduct] = useState(products[0]);
  const text = `【商品名】
シンプル無地トートバッグ

【サイズ】
約30cm×35cm（持ち手含まず）

【特徴】
  ・ナチュラルな生成りカラー
  ・丈夫なキャンバス素材
  ・エコバッグや普段使いに最適

【状態】
新品未使用

【注意事項】
  ・自宅保管のため、気になる方はご遠慮ください
  ・折りたたんで発送いたします`;
  const photoURL = "itemPhoto.jpg";

  return (
    <>
      <div
        style={{
          // border: "2px solid",
          boxShadow: "0 10px 25px 0 rgba(0, 0, 0, .2)",
          width: "430px",
          // height: "600px",
          margin: "12px 36px",
          backgroundColor: "white",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <div>
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                margin: "0px",
              }}
            >
              <img
                src={photoURL}
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "300px",
                  margin: "auto",
                  objectFit: "contain",
                }}
                alt="preview"
              />
            </div>
            <div style={{ padding: "0 16px" }}>
              <p
                style={{
                  fontWeight: "700",
                  color: "#333",
                  fontSize: "17px",
                  fontFamily:
                    "Helvetica Neue, Arial, Hiragino Kaku Gothic ProN, Hiragino Sans, Meiryo, sans-serif",
                  padding: 0,
                  marginTop: "16px",
                }}
              >
                シンプル無地トートバッグ
              </p>
              <div>
                <p
                  style={{
                    fontWeight: "700",
                    color: "#666",
                    fontSize: "17px",
                    fontFamily:
                      "Helvetica Neue, Arial, Hiragino Kaku Gothic ProN, Hiragino Sans, Meiryo, sans-serif",
                    padding: 0,
                    marginTop: "16px",
                  }}
                >
                  商品の説明
                </p>
                <div style={{ position: "relative", width: "100%" }}>
                  <p
                    style={{
                      fontWeight: "400",
                      color: "#333",
                      fontSize: "15px",
                      padding: 0,
                      marginTop: "16px",
                    }}
                  >
                    {formatTextWithLineBreaks(text)}
                  </p>
                </div>
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default PhoneApp;
