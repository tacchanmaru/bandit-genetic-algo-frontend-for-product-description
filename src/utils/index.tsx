import React from "react";

export const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

export const formatTextWithLineBreaks = (text: string) => {
  return text.split("\n").map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));
};
