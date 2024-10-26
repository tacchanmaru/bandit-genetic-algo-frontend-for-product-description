import React, { useEffect, useState } from "react";
import { products } from "../data/Products";
import { formatTextWithLineBreaks } from "../utils";

type Props = {
  productID: number;
  withBadge: boolean;
  taskID: number;
};

const PhoneApp: React.FC<Props> = (props) => {
  const [product, setProduct] = useState(products[0]);
  const [text, setText] = useState("");

  useEffect(() => {
    const product = products.find((p) => p.id === props.productID);
    if (product !== undefined) {
      setProduct(product);
      if (props.taskID === 1) {
        setText(product.text1);
      } else if (props.taskID === 2) {
        setText(product.text2);
      } else if (props.taskID === 3) {
        setText(product.text3);
      } else if (props.taskID === 4) {
        setText(product.text4);
      }
    }
  }, [props.productID, props.taskID]);

  return (
    <>
      <div
        style={{
          // border: "2px solid",
          boxShadow: "0 10px 25px 0 rgba(0, 0, 0, .2)",
          width: "430px",
          height: "600px",
          margin: "12px 36px",
          backgroundColor: "white",
          borderRadius: "8px",
          overflow: "scroll",
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
                src={product.imageUrl}
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
                {product.title}
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
                      fontFamily:
                        "Helvetica Neue, Arial, Hiragino Kaku Gothic ProN, Hiragino Sans, Meiryo, sans-serif",
                      padding: 0,
                      marginTop: "16px",
                    }}
                  >
                    {formatTextWithLineBreaks(text)}
                  </p>

                  {props.withBadge && (
                    <>
                      <div style={{ height: "48px" }}></div>
                      <div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          right: 0,
                          padding: "8px",
                          color: "gray",
                        }}
                      >
                        {props.taskID === 1
                          ? "この文章は人間が書きました"
                          : props.taskID === 2 || props.taskID === 3
                          ? "この文章はAIと一緒に書きました"
                          : props.taskID === 4
                          ? "この文章はAIによって書かれました"
                          : ""}
                      </div>
                    </>
                  )}
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
