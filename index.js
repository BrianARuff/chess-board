window.addEventListener("DOMContentLoaded", () => {
  let turn = true;
  let piece = undefined;
  let sourceSquare = undefined;
  const squares = document.querySelectorAll("#square");
  const pieces = document.querySelectorAll("#piece");
  const whoseTurnIsIt = document.querySelector("#whoseTurnIsIt");
  const whiteCapturedPieces = document.querySelector("#whiteCapturedPieces");
  const blackCapturedPiieces = document.querySelector("#blackCapturedPieces");
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

  function swapTurn(element) {
    if (turn === true) {
      return turn = false;
    } else {
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
    const pieceImage = new Image();
    pieceImage.src = piece.currentSrc;
    pieceImage.alt = piece.alt;
    pieceImage.className = piece.className;
    return pieceImage;
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
            const source = findSquare(sourceSquare);
            if (source.children[0].className === "white" && e.target.className === "white") {
              console.log("Can't take own piece!");
              return turn = true;
            } else if (source.children[0].className === "white" && e.target.children.length === 0) {
              const source = findSquare(sourceSquare);
              const bishop1 = findPiece("B1");
              const bishop2 = findPiece("B2");
              const king1 = findPiece("K1");
              const rook1 = findPiece("R1");
              const destination = e.target;
              const f1 = findSquare("f1")
              const g1 = findSquare("g1");

              // White king movement logic including castle logic
              if (piece.dataset.piece === "K1") {
                let whiteKingSideCastle = true;
                for(let i = 0; i < moves.length; i++) {
                  
                  if ((moves[i].includes("e1,") || moves[i].includes(",e1") || moves[i].includes("h1,") || moves[i].includes("h1,")) && source.dataset.square === "e1" && destination.dataset.square === "g1") {
                    whitewhiteKingSideCastle = false;
                    return console.log("Invalid castle attempt, white king or rook4 has already moved");
                  }
                }
                if ((f1.children.length === 1 || g1.children.length === 1) && source.children[0].dataset.piece === "K1" && piece.dataset.piece === "K1" && destination.dataset.square === "g1") {
                  return console.log("Invalid Castle Attempt");
                } else if (f1.children.length === 0 && g1.children.length === 0 && source.children[0].dataset.piece === "K1" && piece.dataset.piece === "K1" && destination.dataset.square === "g1" && whiteKingSideCastle) {
                  console.log("Castle");
                  sourceSquare && e.target.dataset.square ? moves.push(sourceSquare + "," + e.target.dataset.square) : console.log("Move not added");
                  rook1.parentNode.removeChild(rook1);
                  f1.append(rook1);
                  king1.parentNode.removeChild(king1);
                  g1.append(king1);
                  swapTurn();
                  console.log(moves);
                  return;
                }
              }

              if (piece.dataset.piece.includes("B")) {
                if (e.target.parentNode.children.length === 1) {
                  const tempParent = e.target.parentNode;
                  e.target.parentNode.children[0].remove();
                  tempParent.append(piece);
                  sourceSquare && e.target.dataset.square ? moves.push(sourceSquare + "," + e.target.dataset.square) : console.log("Move not added");
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
            sourceSquare && e.target.dataset.square ? moves.push(sourceSquare + "," + e.target.dataset.square) : console.log("Move not added");
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
          const child = e.target.parentNode.children[0];
            const source = findSquare(sourceSquare);
            if (source.children[0].className === "black" && e.target.className === "black") {
              console.log("Can't take own piece!");
              return turn = false;
            } else if (source.children[0].className === "black" && e.target.children.length === 0) {
              const source = findSquare(sourceSquare);
              const rook3 = findPiece("R3");
              const g8 = findSquare("g8");
              const f8 = findSquare("f8");
              const king2 = findPiece('K2');
              const destination = e.target;

              // King movement logic including castle logic
              if (piece.dataset.piece === "K2") {
                const blackKingSideCastle = true;
                for(let i = 0; i < moves.length; i++) {
                  
                  if ((moves[i].includes("e8,") || moves[i].includes(",e8") || moves[i].includes("h8,") || moves[i].includes("h8,")) && source.dataset.square === "e8" && destination.dataset.square === "g8") {
                    blackKingSideCastle = false;
                    return console.log("Invalid castle attempt, white king or rook4 has already moved");
                  }
                }
                if ((f8.children.length === 1 || g8.children.length === 1) && source.children[0].dataset.piece === "K2" && piece.dataset.piece === "K2" && destination.dataset.square === "g8") {
                  return console.log("Invalid Castle Attempt");
                } else if (f8.children.length === 0 && g8.children.length === 0 && source.children[0].dataset.piece === "K2" && piece.dataset.piece === "K2" && destination.dataset.square === "g8" && blackKingSideCastle) {
                  console.log("Castle attempt!");
                  sourceSquare && e.target.dataset.square ? moves.push(sourceSquare + "," + e.target.dataset.square) : console.log("Move not added");
                  rook3.parentNode.removeChild(rook3);
                  f8.append(rook3);
                  king2.parentNode.removeChild(king2);
                  g8.append(king2);
                  swapTurn(element);
                }
              } else if (piece.dataset.piece.includes("B")) {
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

              if (piece.dataset.piece.includes("P")) {
              }
              // All other moves here...
              if ((e.target.dataset.square && e.target.children.length === 0) || (e.target.dataset.piece && e.target.parentNode.children.length === 0)) {
                e.target.append(piece);
                sourceSquare && e.target.dataset.square ? moves.push(sourceSquare + "," + e.target.dataset.square) : console.log("Move not added");
                swapTurn(element);
              } else if ((e.target.dataset.square && e.target.children.length === 0) || (e.target.dataset.piece && e.target.parentNode.children.length === 1)) {
                if (e.target.dataset.square && e.target.children.length === 0) {
                  const capturedPieceImage = createPieceImage(e.target);
                  blackCapturedPieces.appendChild(capturedPieceImage);
                  sourceSquare && e.target.dataset.square ? moves.push(sourceSquare + "," + e.target.dataset.square) : console.log("Move not added");
                  e.target.children[0].remove();
                  e.target.append(piece);
                  swapTurn();
                } else if (e.target.dataset.piece && e.target.parentNode.children.length === 1) {
                  sourceSquare && e.target.dataset.square ? moves.push(sourceSquare + "," + e.target.dataset.square) : console.log("Move not added");
                  const capturedPieceImage = createPieceImage(e.target);
                  blackCapturedPieces.appendChild(capturedPieceImage);
                  const tempParent = e.target.parentNode;
                  e.target.parentNode.children[0].remove();
                  tempParent.append(piece);
                  swapTurn();
                }
                
              }
          } else if (piece.classList[0] === "black" && child.classList[0] === "white") {
            const capturedPieceImage = createPieceImage(e.target);
            blackCapturedPieces.appendChild(capturedPieceImage);
            const tempParent = child.parentNode;
            sourceSquare && e.target.dataset.square ? moves.push(sourceSquare + "," + e.target.dataset.square) : console.log("Move not added");
            child.remove();
            tempParent.append(piece);
            swapTurn(element);
          }
        }
      }
      console.log(moves);
    });
  });
});