import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";

type Props = {
  endExperiment: () => void;
  pageNumber: number;
};

const MyAppBar: React.FC<Props> = (props) => {
  return (
    <div>
      <AppBar position="fixed" style={{ background: "#ff333f" }}>
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            style={{ color: "white", fontWeight: "bold" }}
          >
            AIを使った未来のフリマアプリを体験しよう！
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            {props.pageNumber !== 0 && (
              <Button
                variant="text"
                style={{
                  color: "white",
                }}
                className=""
                onClick={() => {
                  props.endExperiment();
                }}
              >
                実験をやめる
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MyAppBar;
