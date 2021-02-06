window.addEventListener("DOMContentLoaded", () => {
  let turn = true;
  let piece = undefined;
  let sourceSquare = undefined;
  let blackKingSideCastle = true;
  let blackQueenSideCastle = true;
  let whiteKingSideCastle = true;
  let whiteQueenSideCastle = true;
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

  function playSound() {
    const sound = new Audio("/asmr_chess_sound_effect_2654871534326771175.mp3");
    sound.play();
    sound.addEventListener
  }

  function targetSquare(value) {
    return value.currentTarget.parentNode;
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
      playSound();
      return turn = false;
    } else {
      document.querySelector("#whoseTurnIsIt").innerText = "White's Turn";
      console.log(moves);
      playSound();
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
        if (e.currentTarget.id && e.currentTarget.id === "square" || (e.currentTarget.id && e.currentTarget.id === "piece")) {
          const child = e.currentTarget.children[0];
          const source = findSquare(sourceSquare);
          if (source.children[0].className === "white" && (e.currentTarget.children.length === 1 && e.currentTarget.children[0].className === "white")) {
            if (e.currentTarget.children[0].className === "white") {
              console.log("Can't take own piece!");
              return turn = true;
            }

          } else if (source.children[0].className === "white" && e.currentTarget.children.length === 0) {
            const source = findSquare(sourceSquare);
            const destination = e.currentTarget;

            // White king movement logic including castle logic
            if (piece.dataset.piece === "K1") {

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


              // Invalid castle attempt
              if (sourceSquare === "e1" && (f1.children.length === 1 || g1.children.length === 1) && source.children[0].dataset.piece === "K1" && piece.dataset.piece === "K1" && destination.dataset.square === "g1") {
                return console.log("Invalid Castle Attempt");
              } else if (sourceSquare === "e1" && f1.children.length === 0 && g1.children.length === 0 && source.children[0].dataset.piece === "K1" && piece.dataset.piece === "K1" && destination.dataset.square === "g1" && whiteKingSideCastle) {
                // Short side castle
                sourceSquare && e.currentTarget.dataset.square ? moves.push(sourceSquare + "," + e.currentTarget.dataset.square) : console.log("Move not added");
                rook1.parentNode.removeChild(rook1);
                f1.append(rook1);
                king1.parentNode.removeChild(king1);
                g1.append(king1);
                whiteKingSideCastle = false;
                swapTurn();
                console.log(moves);
                return;
              } else if (sourceSquare === "e1" && e.currentTarget.dataset.square === "c1" && (d1.children.length === 1 || c1.children.length === 1 || b1.children.length === 1) || !whiteQueenSideCastle) {
                console.log("illegal castle attempt");
                return;
              } else if (sourceSquare === "e1" && whiteQueenSideCastle && d1.children.length === 0 && c1.children.length === 0 && b1.children.length === 0) {
                // Long side castle
                d1.appendChild(rook2);
                c1.appendChild(king1);
                swapTurn();
                return;
              }
            }

            if (piece.dataset.piece.includes("B")) {
              if (piece.parentNode.dataset.color !== e.currentTarget.dataset.color) {
                return console.log("Can't leave own color");
              }
              if (e.currentTarget.parentNode.children.length === 1) {
                const tempParent = e.currentTarget.parentNode;
                e.currentTarget.parentNode.children[0].remove();
                tempParent.append(piece);
                sourceSquare && e.currentTarget.dataset.square ? moves.push(sourceSquare + "," + e.currentTarget.dataset.square) : console.log("Move not added");
                swapTurn();
                return;
              }
            }

            if (piece.dataset.piece.includes("P")) {
              if (piece.parentNode.dataset.square.includes("8")) {
                const img = new Image();
                img.srcset = "./45px-Chess_qlt45.svg.png"
                e.currentTarget.removeChild(piece);
                e.currentTarget.appendChild(img);
              }
            }

            // All other non capture moves here...
            if (e.currentTarget.children.length === 0) {
              sourceSquare && e.currentTarget.dataset.square ? moves.push(sourceSquare + "," + e.currentTarget.dataset.square) : console.log("Move not added");
              whiteCapturedPieces.append();
              e.currentTarget.append(piece);
              swapTurn();
              return
            } else if (e.currentTarget.children.length === 1) {
              sourceSquare && e.currentTarget.dataset.square ? moves.push(sourceSquare + "," + e.currentTarget.dataset.square) : console.log("Move not added");
              const capturedPieceImage = createPieceImage(piece.source);
              whiteCapturedPieces.appendChild(capturedPieceImage);
              e.currentTarget.children[0].remove();
              e.currentTarget.append(piece);
              swapTurn();
              return
            }

          } else if (piece.classList[0] === "white" && child.classList[0] === "black") {
            if (piece.dataset.piece.includes("P") && e.currentTarget.dataset.square.includes("8")) {
              const img = new Image();
              img.srcset = "./45px-Chess_qlt45.svg.png"
              img.alt = "white queen";
              img.dataset.piece = "Q";
              img.classList.add("white");
              whiteCapturedPieces.appendChild(e.currentTarget.children[0]);
              piece.remove();
              e.currentTarget.appendChild(img);
              playSound();
              swapTurn();
            } else {
              const capturedPieceImage = createPieceImage(e.currentTarget.children[0]);
              whiteCapturedPieces.appendChild(capturedPieceImage);
              const tempParent = e.currentTarget;
              sourceSquare && e.currentTarget.dataset.square ? moves.push(sourceSquare + "," + e.currentTarget.dataset.square) : console.log("Move not added");
              child.remove();
              tempParent.appendChild(piece);
              swapTurn();
            }
            return;
          }
        } else if (
          // All other captures by white
          piece.classList[0] === "white" && e.currentTarget.classList[0] === "black") {
          const capturedPieceImage = createPieceImage(e.currentTarget.children[0]);
          whiteCapturedPieces.appendChild(capturedPieceImage);
          const tempParent = e.currentTarget.parentNode;
          sourceSquare && e.currentTarget.dataset.square ? moves.push(sourceSquare + "," + e.currentTarget.dataset.square) : console.log("Move not added");
          console.log(capturedPieceImage);
          e.currentTarget.remove();
          tempParent.append(piece);
          swapTurn();
        }
      }
      // *** Black Piece Logic Here ***
      else if (turn === false && piece.classList[0] === "black") {
        if (e.currentTarget.id && e.currentTarget.id === "square" || e.currentTarget.children[0].classList[0] === "black" || e.currentTarget.children[0].id === "piece") {
          const source = findSquare(sourceSquare);
          if (e.currentTarget.children.length === 1 && source.children[0].className === "black" && e.currentTarget.children[0].className === "black") {
            console.log("Can't take own piece!");
            return turn = false;
          } else if (e.currentTarget.children.length === 0) {
            const source = findSquare(sourceSquare);
            const destination = e.currentTarget;

            // King movement logic including castle logic
            if (piece.dataset.piece === "K2") {
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

              // king side castling
              if ((sourceSquare === "e8" && f8.children.length === 1 || g8.children.length === 1) && destination.dataset.square === "g8") {
                return console.log("Invalid Castle Attempt");
              } else if (sourceSquare === "e8" && f8.children.length === 0 && g8.children.length === 0 && source.children[0].dataset.piece === "K2" && piece.dataset.piece === "K2" && destination.dataset.square === "g8" && blackKingSideCastle) {
                sourceSquare && e.currentTarget.dataset.square ? moves.push(sourceSquare + "," + e.currentTarget.dataset.square) : console.log("Move not added");
                f8.appendChild(rook3);
                g8.appendChild(king2);
                blackKingSideCastle = false;
                swapTurn();
                return
              }
              // queen side castling 
              else if (sourceSquare === "e8" && blackQueenSideCastle && d8.children.length === 0 && c8.children.length === 0 && b8.children.length === 0) {
                blackQueenSideCastle = false;
                d8.appendChild(rook4);
              } else if (!blackQueenSideCastle && ((d8.children.length === 1 || d8.children[0].datasource.piece !== "K2") || (c8.children.length || c8.children[0].datasource.piece !== "K2") === 1 || (b8.children.length === 1 || b8.children[0].datasource.piece !== "K2")) && sourceSquare === "e8" && e.currentTarget.dataset.square === "c8") {
                return console.log("invalid castling attempt");
              }
            }

            if (piece.dataset.piece.includes("B")) {
              if (piece.parentNode.dataset.color !== e.currentTarget.dataset.color) {
                return console.log("Can't leave own color");
              }
              if (e.currentTarget.parentNode.children.length === 1) {
                const capturedPieceImage = createPieceImage(e.currentTarget);
                blackCapturedPieces.appendChild(capturedPieceImage);
                sourceSquare && e.currentTarget.dataset.square ? moves.push(sourceSquare + "," + e.currentTarget.dataset.square) : console.log("Move not added");
                const tempParent = e.currentTarget.parentNode;
                e.currentTarget.parentNode.children[0].remove();
                tempParent.append(piece);
                swapTurn(element);
              }
            }

            if (piece.dataset.piece.includes("P")) {}

            // All other moves here...
            if (e.currentTarget.children.length === 0) {
              e.currentTarget.append(piece);
              sourceSquare && e.currentTarget.dataset.square ? moves.push(sourceSquare + "," + e.currentTarget.dataset.square) : console.log("Move not added");
              swapTurn(element);
              return;
            } else if (e.currentTarget.children.length === 1) {
              const capturedPieceImage = createPieceImage(e.currentTarget.children[0]);
              blackCapturedPieces.appendChild(capturedPieceImage);
              sourceSquare && e.currentTarget.dataset.square ? moves.push(sourceSquare + "," + e.currentTarget.dataset.square) : console.log("Move not added");
              e.currentTarget.children[0].remove();
              e.currentTarget.append(piece);
              swapTurn();
              return;
            }
          } else if (piece.className === "black" && e.currentTarget.children[0].className === "white") {
            if (piece.dataset.piece.includes("P") && e.currentTarget.dataset.square.includes("1")) {
              const img = new Image();
              img.srcset = "./45px-Chess_qdt45.svg.png"
              img.alt = "black queen";
              img.dataset.piece = "Q";
              img.classList.add("black");
              blackCapturedPieces.appendChild(e.currentTarget.children[0]);
              piece.remove();
              e.currentTarget.appendChild(img);
              playSound();
              swapTurn();
            } else {
              const capturedPieceImage = createPieceImage(e.currentTarget.children[0]);
              blackCapturedPieces.appendChild(capturedPieceImage);
              const tempParent = e.currentTarget;
              sourceSquare && e.currentTarget.dataset.square ? moves.push(sourceSquare + "," + e.currentTarget.dataset.square) : console.log("Move not added");
              e.currentTarget.children[0].remove();
              tempParent.append(piece);
              swapTurn(element);
            }
            return;
          }
        }
      }
    });
  });
});