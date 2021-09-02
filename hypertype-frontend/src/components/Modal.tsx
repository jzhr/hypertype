import React from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { blue, green } from "@material-ui/core/colors";

type Props = {
  wpm: number;
  cpm: number;
  acc: number;
  closePopup(): void;
};

class Popup extends React.Component<Props> {
  state = {
    // Creating deep copies of the props
    wpm: JSON.parse(JSON.stringify(this.props.wpm)),
    cpm: JSON.parse(JSON.stringify(this.props.cpm)),
    acc: JSON.parse(JSON.stringify(this.props.acc)),
  };

  // Function to add new scores to db
  addScore = () => {
    const newScore = { score: this.state.cpm };

    if (newScore && newScore.score.length > 0) {
      axios
        .post("/api/scores", newScore)
        .then((res) => {
          if (res.data) {
            console.log("Added new score");
          }
        })
        .catch((err) => console.log(err));
    } else {
      console.log("Input field required");
    }

    this.props.closePopup();
  };

  theme = createMuiTheme({
    palette: {
      primary: blue,
      secondary: green,
    },
  });

  render() {
    return (
      <ThemeProvider theme={this.theme}>
        <div className="popup">
          <div className="popup\_inner">
            <h1>
              {this.state.wpm} WPM, {this.state.cpm} CPM, {this.state.acc}% ACC
            </h1>
            <Box display="inline" m={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={this.props.closePopup}
              >
                Try Again
              </Button>
            </Box>
            <Box display="inline" m={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => this.addScore()}
              >
                Add to Leaderboard
              </Button>
            </Box>
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

export default Popup;
