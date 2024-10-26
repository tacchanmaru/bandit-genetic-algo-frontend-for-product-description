import { useEffect } from "react";
import PhoneApp from "./PhoneApp";
import Rating from "@mui/material/Rating";
import { DisplayItemID } from "../App";

type Props = {
  pageNumber: number;
  setPageNumber: (pageNumber: number) => void;
  productID: number;
  displayItemIDLists: DisplayItemID[];
  setDisplayItemIDLists: (displayItemIDLists: DisplayItemID[]) => void;
  setDisabledNext: (disabledNext: boolean) => void;
  withBadge: boolean;
  ratings: { [key: number]: number };
  setRatings: React.Dispatch<React.SetStateAction<{ [key: number]: number }>>;
};

const ProductRating: React.FC<Props> = (props) => {
  useEffect(() => {
    // ratingsのstateが更新されるたびに、console.logでratingsの中身を表示
    console.log(props.ratings);
  }, [props.ratings]);

  useEffect(() => {
    if (Object.keys(props.ratings).length === props.displayItemIDLists.length) {
      props.setDisabledNext(false);
    }
  }, [props, props.ratings]);

  // RatingのonChangeイベントのハンドラ
  const handleRatingChange = (
    event: React.SyntheticEvent,
    value: number,
    id: number
  ) => {
    console.log(event);
    props.setRatings((prevRatings: { [key: number]: number }) => ({
      ...prevRatings,
      [id]: value,
    }));
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        {props.displayItemIDLists.map((item) => (
          <div>
            <PhoneApp
              productID={props.productID}
              withBadge={props.withBadge}
              taskID={item.id}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "16px 16px",
                alignItems: "center",
              }}
            >
              <p style={{ margin: "0", textAlign: "center" }}>
                全く
                <br />
                正直でない
              </p>
              <Rating
                name="customized-10"
                defaultValue={2}
                max={10}
                onChange={(event, value) => {
                  if (value === null) return;
                  handleRatingChange(event, value, item.id);
                }}
              />
              <p style={{ margin: "0px 8px", textAlign: "center" }}>
                とても
                <br />
                正直である
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default ProductRating;
