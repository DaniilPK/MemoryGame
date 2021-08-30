import React, { useEffect, useRef, useState } from "react";
import uniqueCardsArray from "./data.js";
import uniqueCardsArray2 from "./data2.js";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import { Col, Container, Row } from "react-bootstrap";
import Card from "./components/Card";
import Finish from "./components/Finish/index.js";
//import Autoriz from "./components/Autoriz";
import "./App.css";

let XXcad = 1;
let icols = 1;
function swap(array, i, j) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}
function shuffleCards(array) {
  const length = array.length;
  for (let i = length; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    const currentIndex = i - 1;
    swap(array, currentIndex, randomIndex);
  }
  return array;
}

const App = () => {
  const [cards, setCards] = useState(() =>
    shuffleCards(uniqueCardsArray.concat(uniqueCardsArray))
  );

  const [cards2, setCards2] = useState(() =>
    shuffleCards(uniqueCardsArray2.concat(uniqueCardsArray2))
  );
  const [openCards, setOpencards] = useState([]);
  const [matchedCards, setMatchedcards] = useState({});
  const [moves, setMoves] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
  const [bestScore, setBestScore] = useState(
    JSON.parse(localStorage.getItem("bestScore")) || Number.POSITIVE_INFINITY
  );

  const five = () => {
    return (XXcad = 0), handleRestart();

    console.log("0");
  };
  const nine = () => {
    return (XXcad = 1), handleRestart();

    console.log("1");
  };
  const timeout = useRef(null);

  const disable = () => {
    setShouldDisableAllCards(true);
  };

  const enable = () => {
    setShouldDisableAllCards(false);
  };

  const checkCompletion = () => {
    if (XXcad === 1) {
      if (Object.keys(matchedCards).length === uniqueCardsArray.length) {
        setShowModal(true);
        const highScore = Math.min(moves, bestScore);
        setBestScore(highScore);
        localStorage.setItem(highScore, highScore);
      }
    } else if (XXcad === 0) {
      if (Object.keys(matchedCards).length === uniqueCardsArray2.length) {
        setShowModal(true);
        const highScore = Math.min(moves, bestScore);
        setBestScore(highScore);
        localStorage.setItem(highScore, highScore);
      }
    }
  };

  const evaluate = () => {
    const [first, second] = openCards;
    enable();
    if (XXcad === 1) {
      if (cards[first].type === cards[second].type) {
        setMatchedcards((prev) => ({ ...prev, [cards[first].type]: true }));
        setOpencards([]);
        return;
      }
    } else if (XXcad === 0) {
      if (cards2[first].type === cards2[second].type) {
        setMatchedcards((prev) => ({ ...prev, [cards2[first].type]: true }));
        setOpencards([]);
        return;
      }
    }
    timeout.current = setTimeout(() => {
      setOpencards([]);
    }, 500);
  };

  const handleCardClick = (index) => {
    if (openCards.length === 1) {
      setOpencards((prev) => [...prev, index]);
      setMoves((moves) => moves + 1);
      disable();
    } else {
      clearTimeout(timeout.current);
      setOpencards([index]);
    }
  };
  useEffect(() => {
    let timeout = null;
    if (openCards.length === 2) {
      timeout = setTimeout(evaluate, 300);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [openCards]);

  useEffect(() => {
    checkCompletion();
  }, [matchedCards]);

  const checkIsFlipped = (index) => {
    return openCards.includes(index);
  };
  const checkIsInactive = (card) => {
    return Boolean(matchedCards[card.type]);
  };
  const handleRestart = () => {
    setMatchedcards({});
    setOpencards([]);
    setShowModal(false);
    setMoves(0);
    setShouldDisableAllCards(false);

    setCards(shuffleCards(uniqueCardsArray.concat(uniqueCardsArray)));
    setCards2(shuffleCards(uniqueCardsArray2.concat(uniqueCardsArray2)));
  };
  const ChengStyle = () => {
    //console.log(icols)
    if (icols === 0) {
      var divNode = document.createElement("div");
      divNode.innerHTML = "<br><style>body { background: #4d4d4d; }</style>";
      document.body.appendChild(divNode);
      var divNode = document.createElement("div");
      divNode.innerHTML = "<br><style>button { color: white; }</style>";
      document.body.appendChild(divNode);
      icols++;
    } else if (icols === 1) {
      var divNode = document.createElement("div");
      divNode.innerHTML = "<br><style>body { background: white; }</style>";
      document.body.appendChild(divNode);
      var divNode = document.createElement("div");
      divNode.innerHTML = "<br><style>button { color: black; }</style>";
      document.body.appendChild(divNode);
      icols--;
    }
  };
  if (XXcad === 0) {
    console.log(XXcad);
    return (
      <div>
        <div class="divbut">
          <button onClick={five} class="but">
            {" "}
            5x
          </button>
          <button onClick={nine} class="but">
            {" "}
            9x
          </button>
          <input type="checkbox" id="myCheck" onClick={ChengStyle}></input>
          {/*Временно убрал, потому что не нужна, но полностью работает
      (дизайн и так норм по моему мнению)
      */}
        </div>
        <Header
          bestScore={bestScore}
          moves={moves}
          handleRestart={handleRestart}
          five={five}
          nine={nine}
        />
        <Container>
          <Row>
            {cards2.map((card, index) => {
              return (
                <Col xs={6} md={3} lg={2}>
                  <Card
                    key={index}
                    card={card}
                    index={index}
                    isDisabled={shouldDisableAllCards}
                    isInactive={checkIsInactive(card)}
                    isFlipped={checkIsFlipped(index)}
                    onClick={handleCardClick}
                  />
                </Col>
              );
            })}
          </Row>
        </Container>
        <Finish
          showModal={showModal}
          moves={moves}
          bestScore={bestScore}
          handleRestart={handleRestart}
        />
      </div>
    );
  } else if (XXcad === 1) {
    console.log(XXcad);
    return (
      <div>
        <div class="divbut">
          <button onClick={five} class="but">
            {" "}
            5x
          </button>
          <button onClick={nine} class="but">
            {" "}
            9x
          </button>
          <input type="checkbox" id="myCheck" onClick={ChengStyle}></input>
        </div>
        <Header
          bestScore={bestScore}
          moves={moves}
          handleRestart={handleRestart}
        />
        <Container>
          <Row>
            {cards.map((card, index) => {
              return (
                <Col xs={6} md={3} lg={2}>
                  <Card
                    key={index}
                    card={card}
                    index={index}
                    isDisabled={shouldDisableAllCards}
                    isInactive={checkIsInactive(card)}
                    isFlipped={checkIsFlipped(index)}
                    onClick={handleCardClick}
                  />
                </Col>
              );
            })}
          </Row>
        </Container>
        <Finish
          showModal={showModal}
          moves={moves}
          bestScore={bestScore}
          handleRestart={handleRestart}
        />
      </div>
    );
  }
};

export default App;
