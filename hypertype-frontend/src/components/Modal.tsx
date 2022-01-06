import React from "react";
import axios from "../util/axios";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

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
        .post("/scores", newScore)
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

  render() {
    return (
      <div className="popup">
        <div className="popup\_inner">
          <p>
            You typed {this.state.wpm} words per minute with an overall accuracy
            of {this.state.acc}% !
          </p>
          <Box m={3}>
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
              Publish to Leaderboard
            </Button>
          </Box>
        </div>
      </div>
    );
  }
}

export default Popup;
