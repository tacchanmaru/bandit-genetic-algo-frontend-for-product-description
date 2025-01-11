import React from "react";
import Radio from "@mui/material/Radio";

type Props = {
  displayItemID: { id: string };
  selectedValue: number;
  setSelectedValue: React.Dispatch<React.SetStateAction<number>>;
  setRatings: React.Dispatch<React.SetStateAction<{ [key: number]: number }>>;
};

const ValueInput: React.FC<Props> = (props) => {
  const valueList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const handleRatingChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    // console.log(event);
    props.setSelectedValue(Number((event.target as HTMLInputElement).value));
    props.setRatings((prevRatings: { [key: number]: number }) => ({
      ...prevRatings,
      [id]: Number((event.target as HTMLInputElement).value),
    }));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "auto",
        alignItems: "center",
        zIndex: 20,
      }}
    >
      <p style={{ margin: "0", textAlign: "center" }}>
        全く
        <br />
        信頼できない
      </p>
      {valueList.map((m, i) => (
        <Radio
          checked={props.selectedValue === m}
          // onChange={handleRadioChange}
          onChange={(event) => {
            handleRatingChange(event, props.displayItemID.id);
          }}
          value={m}
          id={String(i)}
          name="radio-buttons"
          inputProps={{ "aria-label": String(m) }}
          style={{ padding: "0px" }}
        />
      ))}
      {/* <Rating
                      name="customized-10"
                      defaultValue={0}
                      max={10}
                      onChange={(event, value) => {
                        if (value === null) return;
                        handleRatingChange(event, value, item.id);
                      }}
                    /> */}
      <p style={{ margin: "0px 8px", textAlign: "center" }}>
        極めて
        <br />
        信頼できる
      </p>
    </div>
  );
};

export default ValueInput;
