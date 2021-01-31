window.addEventListener("DOMContentLoaded", () => {
  let turn = true;
  let piece = undefined;
  let sourceSquare = undefined;
  const squares = document.querySelectorAll("#square");
  const pieces = document.querySelectorAll("#piece");
  const whoseTurnIsIt = document.querySelector("#whoseTurnIsIt");
  const whiteCapturedPieces = Array.from(document.querySelector("#whiteCapturedPieces"));
  const blackCapturedPiieces = Array.from(document.querySelector("#blackCapturedPieces"));
  const moves = [];

  function findPiece(pieceName) {
    for (let i = 0; i < pieces.length; i++) {
      if (pieceName === pieces[i].dataset.piece) {
        return pieces[i];
      }
    }
  }

  function findSquare(squareName) {
    for (let i = 0; i < 64; i++) {
      if (squareName === square[i].dataset.square) {
        return square[i];
      }
    }
  }

  function blacksTurn(element) {
    if (element.dataset.square === sourceSquare) {
      return turn = true;
    } else {
      whoseTurnIsIt.innerText = "It's Black's Move"
      return turn = false;
    }
  }

  function whitesTurn(element) {
    if (element.dataset.square === sourceSquare) {
      return turn = false;
    } else {
      whoseTurnIsIt.innerText = "It's Black's Move"
      return turn = true;
    }
  }

  squares.forEach((element) => {

    element.addEventListener("dragstart", e => {
      piece = e.target;
      sourceSquare = e.currentTarget.dataset.square;
    });

    element.addEventListener("dragover", e => {
      e.preventDefault();
    });

    element.addEventListener("drop", e => {
      console.log("Drag drop");

      // White Piece Logic Here
      if (turn === true && piece.classList[0] === "white") {
        if (e.target.id && e.target.id === "square" || e.currentTarget.children[0].classList[0] === "white") {
          const child = e.target.children[0];
          if (!child) {
            const source = findSquare(sourceSquare);
            const tempPiece = findPiece(source.children[0].dataset.piece);
            if (source.children[0].className === "white" && e.target.className === "white") {
              console.log("Can't take own piece!");
              return turn = true;
            } else if (source.children[0].className === "white" && e.target.children.length === 0) {
              const source = findPiece(sourceSquare);
              const bishop1 = findPiece("B1");
              const bishop2 = findPiece("B2");
              const destination = e.target;
              // Light squared white bishop stay on it's own color logic
              if ((piece.dataset.piece === "B1") && destination.dataset.color === "light") {
                console.log("Bishop Move");
                sourceSquare && e.target.dataset.square ? moves.push(sourceSquare + "," + e.target.dataset.square) : console.log("Move not added");
                e.target.append(tempPiece);
                blacksTurn(element);
              } else if (piece.dataset.piece === "B1" && !destination.dataset.color) {
                return console.log(`Bishop must stay on the ${bishop1.parentNode.dataset.color} squares.`);
              }
              // dark sqaured white bishop stay on it's own color logic
              if ((piece.dataset.piece === "B2") && !destination.dataset.color) {
                console.log("Bishop Move");
                sourceSquare && e.target.dataset.square ? moves.push(sourceSquare + "," + e.target.dataset.square) : console.log("Move not added");
                e.target.append(tempPiece);
              } else if (piece.dataset.piece === "B2" && destination.dataset.color === "light") {
                console.log(`Bishop must stay on the dark squares.`);
              } else if (!piece.dataset.piece.includes("B")) {
                sourceSquare && e.target.dataset.square ? moves.push(sourceSquare + "," + e.target.dataset.square) : console.log("Move not added");
                e.target.append(tempPiece);
              }
            }
          } else if (piece.classList[0] === "white" && child.classList[0] === "black") {
            console.log("opposite pieces on same sqaure", "deletion should occur here", "the attacking piece should be left where the defending piece was");
            const tempChildParent = child.parentNode;
            whiteCapturedPieces.innerText += (child.innerText + ", ");
            sourceSquare && e.target.dataset.square ? moves.push(sourceSquare + "," + e.target.dataset.square) : console.log("Move not added");
            child.remove();
            tempChildParent.append(piece);
          } else if (piece.classList[0] === "black" && e.target.classList[0] === "white" ||
            piece.classList[0] === "white" && e.target.classList[0] === "black") {
            console.log("61")
          }
        } else if (piece.classList[0] === "black" && e.target.classList[0] === "white" ||
          piece.classList[0] === "white" && e.target.classList[0] === "black") {
          const tempParent = e.target.parentNode;
          whiteCapturedPieces.innerText += (e.target.innerText + ", ");
          sourceSquare && e.target.dataset.square ? moves.push(sourceSquare + "," + e.target.dataset.square) : console.log("Move not added");
          e.target.remove();
          tempParent.append(piece);
        }

        if (element.dataset.square === sourceSquare) {
          turn = true;
        } else {
          whoseTurnIsIt.innerText = "It's Black's Move"
          turn = false;
        }
      }
      // *** Black Piece Logic Here ***
      else if (turn === false && piece.classList[0] === "black") {
        if (e.target.id && e.target.id === "square" || e.currentTarget.children[0].classList[0] === "black") {
          const child = e.target.children[0];
          if (!child) {
            const source = findSquare(sourceSquare);
            const tempPiece = findPiece(source.children[0].dataset.piece);
            if (source.children[0].className === "black" && e.target.className === "black") {
              console.log("Can't take own piece!");
              return turn = false;
            } else if (source.children[0].className === "black" && e.target.children.length === 0) {
              const source = findPiece(sourceSquare);
              const bishop3 = findPiece("B3");
              const bishop4 = findPiece("B4");
              const destination = e.target;
              // Light squared black bishop stay on it's own color logic
              if ((piece.dataset.piece === "B4") && destination.dataset.color === "light") {
                console.log("Bishop Move");
                sourceSquare && e.target.dataset.square ? moves.push(sourceSquare + "," + e.target.dataset.square) : console.log("Move not added");
                e.target.append(tempPiece);
                whitesTurn(element);
              } else if (piece.dataset.piece === "B4" && !destination.dataset.color) {
                return console.log(`Bishop must stay on the ${bishop4.parentNode.dataset.color} squares.`);
              }
              // dark sqaured black bishop stay on it's own color logic
              if ((piece.dataset.piece === "B3") && !destination.dataset.color) {
                console.log("Bishop Move");
                sourceSquare && e.target.dataset.square ? moves.push(sourceSquare + "," + e.target.dataset.square) : console.log("Move not added");
                e.target.append(tempPiece);
                whitesTurn(element)
              } else if (piece.dataset.piece === "B3" && destination.dataset.color === "light") {
                return console.log(`Bishop must stay on the dark squares.`);
              } else if (!piece.dataset.piece.includes("B")) {
                sourceSquare && e.target.dataset.square ? moves.push(sourceSquare + "," + e.target.dataset.square) : console.log("Move not added");
                e.target.append(tempPiece);
              }
            }
          } else if (piece.classList[0] === "black" && child.classList[0] === "white") {
            console.log("opposite pieces on same sqaure", "deletion should occur here", "the attacking piece should be left where the defending piece was");
            const tempChildParent = child.parentNode;
            blackCapturedPiieces.innerText += (child.innerText + ", ");
            sourceSquare && e.target.dataset.square ? moves.push(sourceSquare + "," + e.target.dataset.square) : console.log("Move not added");
            child.remove();
            tempChildParent.append(piece);
          } else if (piece.classList[0] === "white" && e.target.classList[0] === "black" ||
            piece.classList[0] === "black" && e.target.classList[0] === "white") {
            console.log("here")
          }
        } else if (piece.classList[0] === "white" && e.target.classList[0] === "black" ||
          piece.classList[0] === "black" && e.target.classList[0] === "white") {
          const tempParent = e.target.parentNode;
          blackCapturedPiieces.innerText += (e.target.innerText + ", ");
          sourceSquare && e.target.dataset.square ? moves.push(sourceSquare + "," + e.target.dataset.square) : console.log("Move not added");
          e.target.remove();
          tempParent.append(piece);
        }

        if (element.dataset.square === sourceSquare) {
          turn = false;
        } else {
          whoseTurnIsIt.innerText = "It's White's Move"
          turn = true;
        }
      }
      console.log(moves);
    });
  });
});