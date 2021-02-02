window.addEventListener("DOMContentLoaded", () => {
  let turn = true;
  let piece = undefined;
  let sourceSquare = undefined;
  const squares = document.querySelectorAll("#square");
  const pieces = document.querySelectorAll("#piece");
  const whiteCapturedPieces = document.querySelector("#whiteCapturedPieces");
  const blackCapturedPieces = document.querySelector("#blackCapturedPieces");
  const moves = [];
  const king1 = findPiece("K1");
  const king2 = findPiece('K2');
  const bishop1 = findPiece("B1");
  const bishop2 = findPiece("B2");
  const rook1 = findPiece("R1");
  const rook2 = findPiece("R2");
  const rook3 = findPiece("R3");
  const rook4 = findPiece("R4");
  const g8 = findSquare("g8");
  const f8 = findSquare("f8");
  const d8 = findSquare("d8");
  const c8 = findSquare("c8");
  const b8 = findSquare("b8");
  const a8 = findSquare("a8");
  const f1 = findSquare("f1")
  const g1 = findSquare("g1");
  const d1 = findSquare("d1");
  const c1 = findSquare("c1");
  const b1 = findSquare("b1");
  const a1 = findSquare("a1");

  function targetSquare(value) {
    return value.target.parentNode;
  }

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

  function swapTurn() {
    if (turn === true) {
      document.querySelector("#whoseTurnIsIt").innerText = "Black's Turn";
      console.log(moves);
      return turn = false;
    } else {
      document.querySelector("#whoseTurnIsIt").innerText = "White's Turn";
      console.log(moves);
      return turn = true;
    }
  }

  function isPiece(element) {
    if (element.dataset.piece) {
      return true;
    } else {
      return false;
    }
  }

  function isSquare(element) {
    if (element.dataset.square) {
      return true;
    } else {
      return false;
    }
  }

  function createPieceImage(piece) {
    if (piece) {
      const pieceImage = new Image();
      pieceImage.src = piece.currentSrc;
      pieceImage.alt = piece.alt;
      pieceImage.className = piece.className;
      return pieceImage;
    }
    return;
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
          const child = e.target.children[0] || e.target;
          const source = findSquare(sourceSquare);
          if (source.children[0].className === "white" && e.target.className === "white") {
            console.log("Can't take own piece!");
            return turn = true;
          } else if (source.children[0].className === "white" && e.target.children.length === 0) {
            const source = findSquare(sourceSquare);
            const destination = e.target;

            // White king movement logic including castle logic
            if (piece.dataset.piece === "K1") {
              let whiteKingSideCastle = true;
              let whiteQueenSideCastle = true;

              // check for invalid castling on king side

                if ((moves.includes("e1,") || moves.includes(",e1") || moves.includes("h1,") || moves.includes("h1,")) && source.dataset.square === "e1" && destination.dataset.square === "g1") {
                  whitewhiteKingSideCastle = false;
                  return console.log("Invalid castle attempt, white king or rook4 has already moved");
                }

              // check for invalid castling on queen side

                if ((moves.includes("e1,") || moves.includes("e1,") || moves.includes("a1,") || moves.includes(",a1")) && king1.parentNode.dataset.square !== "e1") {
                  whiteQueenSideCastle = false;
                  return console.log("Invalid castle attempt, the white king or rook has already moved");
                }


              // invalid castle attempt
              if ((f1.children.length === 1 || g1.children.length === 1) && source.children[0].dataset.piece === "K1" && piece.dataset.piece === "K1" && destination.dataset.square === "g1") {
                return console.log("Invalid Castle Attempt");
              } else if (f1.children.length === 0 && g1.children.length === 0 && source.children[0].dataset.piece === "K1" && piece.dataset.piece === "K1" && destination.dataset.square === "g1" && whiteKingSideCastle) {
                // Short side castle
                console.log("Castle");
                sourceSquare && e.target.parentNode.dataset.square ? moves.push(sourceSquare + "," + e.target.parentNode.dataset.square) : console.log("Move not added");
                rook1.parentNode.removeChild(rook1);
                f1.append(rook1);
                king1.parentNode.removeChild(king1);
                g1.append(king1);
                swapTurn();
                console.log(moves);
                return;
              } else if (sourceSquare === "e1" && e.target.dataset.square === "c1" && (d1.children.length === 1 || c1.children.length === 1 || b1.children.length === 1) || !whiteQueenSideCastle) {
                console.log("illegal castle attempt");
                return;
              } else if (whiteQueenSideCastle && d1.children.length === 0 && c1.children.length === 0 && b1.children.length === 0) {
                // Long side castle
                d1.appendChild(rook2);
                c1.appendChild(king1);
                swapTurn();
                return;
              }
            }

            if (piece.dataset.piece.includes("B")) {
              if (e.target.parentNode.children.length === 1) {
                const tempParent = e.target.parentNode;
                e.target.parentNode.children[0].remove();
                tempParent.append(piece);
                sourceSquare && e.target.parentNode.dataset.square ? moves.push(sourceSquare + "," + e.target.parentNode.dataset.square) : console.log("Move not added");
                swapTurn();
                return;
              }
            }

            if (piece.dataset.piece.includes("P")) {

            }

            // All other moves here...
            if (e.target.children.length === 0) {
              sourceSquare && e.target.dataset.square ? moves.push(sourceSquare + "," + e.target.dataset.square) : console.log("Move not added");
              whiteCapturedPieces.append();
              e.target.append(piece);
              swapTurn();
            } else if (e.target.children.length === 1) {
              sourceSquare && e.target.dataset.square ? moves.push(sourceSquare + "," + e.target.dataset.square) : console.log("Move not added");
              const capturedPieceImage = createPieceImage(piece.source);
              console.log(capturedPieceImage);
              e.target.children[0].remove();
              e.target.append(piece);
              swapTurn();
            }

          } else if (piece.classList[0] === "white" && child.classList[0] === "black") {
            const tempParent = child.parentNode;
            whiteCapturedPieces.innerText += (child.innerText + ", ");
            sourceSquare && e.target.parentNode.dataset.square ? moves.push(sourceSquare + "," + e.target.parentNode.dataset.square) : console.log("Move not added");
            child.remove();
            tempParent.append(piece);
            swapTurn()
          } else if (piece.classList[0] === "black" && e.target.classList[0] === "white" ||
            piece.classList[0] === "white" && e.target.classList[0] === "black") {
            console.log("61")
          }
        } else if (
          // All other captures by white
          piece.classList[0] === "white" && e.target.classList[0] === "black") {
          const capturedPieceImage = createPieceImage(e.target);
          whiteCapturedPieces.appendChild(capturedPieceImage);
          const tempParent = e.target.parentNode;
          sourceSquare && e.target.dataset.square ? moves.push(sourceSquare + "," + e.target.dataset.square) : console.log("Move not added");
          console.log(capturedPieceImage);
          e.target.remove();
          tempParent.append(piece);
          swapTurn();
        }
      }
      // *** Black Piece Logic Here ***
      else if (turn === false && piece.classList[0] === "black") {
        if (e.target.id && e.target.id === "square" || e.currentTarget.children[0].classList[0] === "black" || e.target.id === "piece") {
          const source = findSquare(sourceSquare);
          if (e.target.parentNode.children.length === 1 && source.children[0].className === "black" && e.target.className === "black") {
            console.log("Can't take own piece!");
            return turn = false;
          } else if (e.target.children.length === 0) {
            const source = findSquare(sourceSquare);
            const destination = e.target;

            // King movement logic including castle logic
            if (piece.dataset.piece === "K2") {
              let blackKingSideCastle = true;
              let blackQueenSideCastle = true;

              // check for invalid castling  on king side

                if ((moves.includes("e8,") || moves.includes(",e8") || moves.includes("h8,") || moves.includes("h8,")) && source.dataset.square === "e8" && destination.dataset.square === "g8") {
                  blackKingSideCastle = false;
                  return console.log("Invalid castle attempt, white king or rook4 has already moved");
                }

              // check for invalid castling on queen side
                if ((moves.includes("e8,") || moves.includes("e8,") || moves.includes("a8,") || moves.includes(",a8"))) {
                  blackQueenSideCastle = false;
                  return console.log("Invalid castle attempt, the white king or rook has already moved");
                }

              // castling logic
              if ((f8.children.length === 1 || g8.children.length === 1) && destination.dataset.square === "g8") {
                return console.log("Invalid Castle Attempt");
              } else if (f8.children.length === 0 && g8.children.length === 0 && source.children[0].dataset.piece === "K2" && piece.dataset.piece === "K2" && destination.dataset.square === "g8" && blackKingSideCastle) {
                console.log("Castle attempt!");
                sourceSquare && e.target.dataset.square ? moves.push(sourceSquare + "," + e.target.dataset.square) : console.log("Move not added");
                rook3.parentNode.removeChild(rook3);
                f8.append(rook3);
                king2.parentNode.removeChild(king2);
                g8.append(king2);
                swapTurn(element);
              } else if (blackQueenSideCastle && d8.children.length === 0 && c8.children.length === 0 && b8.children.length === 0) {
                console.log("black king can castle queen side");
                d8.appendChild(rook4);
              } else if (!blackQueenSideCastle || (d8.children.length === 1 || c8.children.length === 1 || b8.children.length === 1) && sourceSquare === "e8" && e.target.dataset.square === "c8") {
                return console.log("invalid castling attempt");
              }
            }

            if (piece.dataset.piece.includes("B")) {
              if (e.target.parentNode.children.length === 1) {
                const capturedPieceImage = createPieceImage(e.target);
                blackCapturedPieces.appendChild(capturedPieceImage);
                sourceSquare && e.target.dataset.square ? moves.push(sourceSquare + "," + e.target.dataset.square) : console.log("Move not added");
                const tempParent = e.target.parentNode;
                e.target.parentNode.children[0].remove();
                tempParent.append(piece);
                swapTurn(element);
              }
            }

            if (piece.dataset.piece.includes("P")) {}

            // All other moves here...
            if (e.target.children.length === 0) {
              e.currentTarget.append(piece);
              sourceSquare && e.currentTarget.dataset.square ? moves.push(sourceSquare + "," + e.currentTarget.dataset.square) : console.log("Move not added");
              swapTurn(element);
              return;
            } else if (e.target.parentNode.children.length === 1) {
                const capturedPieceImage = createPieceImage(e.target);
                blackCapturedPieces.appendChild(capturedPieceImage);
                sourceSquare && e.target.parentNode.dataset.square ? moves.push(sourceSquare + "," + e.target.parentNode.dataset.square) : console.log("Move not added");
                e.target.parentNode.children[0].remove();
                e.currentTarget.append(piece);
                swapTurn();
                return;
            }
          } else if (piece.className === "black" && e.target.className === "white") {
            const capturedPieceImage = createPieceImage(e.target);
            blackCapturedPieces.appendChild(capturedPieceImage);
            const tempParent = e.target.parentNode;
            sourceSquare && e.target.dataset.square ? moves.push(sourceSquare + "," + e.target.dataset.square) : console.log("Move not added");
            e.target.remove();
            tempParent.append(piece);
            swapTurn(element);
          }
        }
      }
    });
  });
});