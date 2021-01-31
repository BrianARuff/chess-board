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
    for(let i = 0; i < pieces.length; i++){
      if (pieceName === pieces[i].dataset.piece) {
        return pieces[i];
      }
    }
  }

  function findSquare(squareName) {
    for(let i = 0; i < pieces.length; i++) {
      if (squareName === pieces[i].parentNode.dataset.square) {
        return pieces[i].parentNode;
      }
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

      // check if piece was dropped on same square so you don't lose a turn...
      if (turn === true) {
        if (piece.classList[0] === "white" || e.currentTarget.children && e.currentTarget.children[0].classList[0] === "white" || e.currentTarget.children[0].square) {
          // If target is a square
          if (e.target.id && e.target.id === "square" || (e.currentTarget.children && e.currentTarget.children[0].classList[0] === "white")) {
            console.log("square found");
  
            const childPiece = e.target.children[0] || e.target;
  
            // If trying to castle king side for white
            const whiteking = findPiece("K1");
            const whiteKingSource = findSquare(sourceSquare);
            const whiteKingDestination = findSquare(e.target.parentNode.dataset.square);
            const g1 = findSquare("g1");
            const f1 = findSquare("f1");

            if (whiteKingSource.dataset.square === "e1" && whiteKingDestination.dataset.square === "g1" 
              && g1.childElementCount === 0 && f1.childElementCount === 0) {
              moves.push(moves.push(sourceSquare + "," + e.target.dataset.square));
              e.target.append(whiteking);
            } else if (e.target.dataset.piece !== "K1" && findSquare(sourceSquare).children[0].dataset.piece !== "K1") {
              moves.push(sourceSquare + "," + e.target.dataset.square);
              e.target.append(piece);
            } else {
              return
            }
  
            if (!childPiece) {
              moves.push(sourceSquare + "," + e.target.dataset.square);
              e.target.append(piece);
            }
            else if (piece.classList[0] === "white" && childPiece.classList[0] === "white" || childPiece.children[0].classList[0] === "white") {
              // Kingside Castling Logic for White
              if (piece.dataset.piece === "K1" && piece.parentNode.dataset.square === "e1" 
              && (childPiece.parentNode.dataset.square === "g1" || childPiece.dataset.square === "g1")
              && (childPiece.parentNode.nextElementSibling.dataset.square === "h1" || childPiece.nextElementSibling.dataset.square === "h1")
              && (childPiece.parentNode.nextElementSibling.children[0].dataset.piece === "R1" || childPiece.nextElementSibling.children[0].dataset.piece === "R1")
              && (piece.parentNode.nextElementSibling.children[0]
              || piece.parentNode.nextElementSibling.nextElementSibling.children[0])) {
                console.log(`Invalid castling attempt. Something is on sqaure ${piece.parentNode.nextElementSibling.square || 'f1'} or ${piece.parentNode.nextElementSibling.nextElementSibling.dataset.square || 'g1'}`)
                 return turn = true
              } else if (
                piece.dataset.piece === "K1" && (piece.parentNode.dataset.square === "e1" || sourceSquare === "e1") 
                  && (childPiece.parentNode.dataset.square === "g1" || piece.parentNode.dataset.square === "g1")
                  && childPiece.nextElementSibling.dataset.square === "h1" 
                  && childPiece.nextElementSibling.children[0].dataset.piece === "R1"
                  && piece.parentNode.nextElementSibling.children[0]
               ) {
                console.log("King Side Castle Attempt")
               }
            } else if (piece.classList[0] === "white" && childPiece.classList[0] === "black") {
              console.log("opposite pieces on same sqaure", "deletion should occur here", "the attacking piece should be left where the defending piece was");
              const tempChildParent = childPiece.parentNode;
              whiteCapturedPieces.innerText += (childPiece.innerText + ", ");
              moves.push(sourceSquare + "," + e.target.dataset.square);
              childPiece.remove();
              tempChildParent.append(piece);
            } else if (e.target.classList[0] && piece.classList[0] === "white" && e.target.classList[0] === "black") {
              console.log("line 95??")
            }
          }
      } else if (turn === false) {

      }
      
       if (piece.classList[0] === "white" && e.target.classList[0] === "black") {
          const tempParent = e.target.parentNode;
          whiteCapturedPieces.innerText += (e.target.innerText + ", ");
          moves.push(sourceSquare + "," + e.target.dataset.square);
          e.target.remove();
          tempParent.append(piece);
        }

        if (element.dataset.square === sourceSquare && element.children[0].classList[0] === "white" && e.currentTarget.children[0].classList[0] === "white" ) {
          turn = true;
        } else {
          whoseTurnIsIt.innerText = "It's Black's Move"
          turn = false;
        }
        // *** Black Piece Logic Here ***
      } else if (turn === false && piece.classList[0] === "black") { 
        if (e.target.id && e.target.id === "square" || e.currentTarget.children[0].classList[0] === "black") {
          console.log("square found")
          const childPiece = e.target.children[0];
          if (!childPiece) {
            moves.push(sourceSquare + "," + e.target.dataset.square);
            e.target.append(piece);
          } else if (piece.classList[0] === "black" && childPiece.classList[0] === "black") {
            console.log("can't take your own piece!");
            // Castling logic for Black
          } else if (piece.classList[0] === "black" && childPiece.classList[0] === "white") {
            console.log("opposite pieces on same sqaure", "deletion should occur here", "the attacking piece should be left where the defending piece was");
            const tempChildParent = childPiece.parentNode;
            blackCapturedPiieces.innerText += (childPiece.innerText + ", ");
            moves.push(sourceSquare + "," + e.target.dataset.square);
            childPiece.remove();
            tempChildParent.append(piece);
          } else if (!childPiece) {
            console.log("no children found in this sqaure");
          } else if (piece.classList[0] === "white" && e.target.classList[0] === "black" ||
            piece.classList[0] === "black" && e.target.classList[0] === "white") {
            console.log("here")
          }
        } else if (piece.classList[0] === "white" && e.target.classList[0] === "black" ||
          piece.classList[0] === "black" && e.target.classList[0] === "white") {
          const tempParent = e.target.parentNode;
          blackCapturedPiieces.innerText += (e.target.innerText + ", ");
          moves.push(sourceSquare + "," + e.target.dataset.square);
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
