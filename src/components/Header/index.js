import React from "react";
import "./style3.css";
import { Container } from "react-bootstrap";
import { FaRedo } from "react-icons/fa";

const Header = ({ bestScore, moves, handleRestart }) => {
  return (
    <div>
      <div>
        <h1>Memory Game</h1>
      </div>
      <Container>
        <div className="sub-header">
          <div className="moves">
            <span className="bold">Moves:</span>
            {moves}
          </div>
          <div className="reshuffle">
            <button onClick={handleRestart}>
              <FaRedo />
            </button>
          </div>
          {localStorage.getItem("bestScore") && (
            <div className="high-score">
              <span>Score:</span> {bestScore}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Header;
