import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import "./style2.css";

const Finish = ({ handleRestart, showModal, bestScore, moves }) => {
  return (
    <div>
      <Dialog
        open={showModal}
        disableBackdropClick
        disableEscapeKeyDown
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <h2>Memory Game</h2>
        <DialogTitle id="alert-dialog-title">Congratulations!</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div class="scor">
              {" "}
              <p>You got {moves} moves.</p>Your best score is {bestScore}
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRestart} color="primary">
            <div class="restart"> Restart</div>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default Finish;
