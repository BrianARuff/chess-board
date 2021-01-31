window.addEventListener("DOMContentLoaded", () => {
  let turn = true;
  let piece = undefined;
  let sourceSquare = undefined;
  const squares = document.querySelectorAll("#square");
  const whoseTurnIsIt = document.querySelector("#whoseTurnIsIt");
  const whiteCapturedPieces = document.querySelector("#whiteCapturedPieces");
  const blackCapturedPiieces = document.querySelector("#blackCapturedPieces");
  const moves = [];

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

      if (turn === true && (piece.classList[0] === "white" || (e.currentTarget.children && e.currentTarget.children[0].classList[0] === "white")) || e.currentTarget.children[0].square) {
        // If target is a square
        if (e.target.id && e.target.id === "square" || (e.currentTarget.children && e.currentTarget.children[0].classList[0] === "white")) {
          console.log("square found");

          const childPiece = e.target.children[0] || e.target;

          // If putting piece on empty square
          if (childPiece.classList.length === 0) {
            e.target.append(piece);
            moves.push(piece.dataset.piece + piece.parentNode.dataset.square + ", " + e.target.dataset.square);
          }

          if (!childPiece) {
            e.target.append(piece);
            moves.push(piece.dataset.piece + piece.parentNode.dataset.square + ", " + e.target.dataset.square);
          }
          else if (piece.classList[0] === "white" && childPiece.classList[0] === "white") {
            // Kingside Castling Logic for White
            if (piece.dataset.piece === "K1" && piece.parentNode.dataset.square === "e1" 
                && childPiece.parentNode.dataset.square === "g1" 
                && childPiece.parentNode.nextElementSibling.dataset.square === "h1" 
                && childPiece.parentNode.nextElementSibling.children[0].dataset.piece === "R1"
                && !piece.parentNode.nextElementSibling.children[0]) {
              console.log("King Side Castle Attempt")
            } else if (
              piece.dataset.piece === "K1" && piece.parentNode.dataset.square === "e1" 
                && childPiece.parentNode.dataset.square === "g1" 
                && childPiece.parentNode.nextElementSibling.dataset.square === "h1" 
                && childPiece.parentNode.nextElementSibling.children[0].dataset.piece === "R1"
                && piece.parentNode.nextElementSibling.children[0]
             ) {
               console.log("Invalid castling attempt. Something is on sqaure " + piece.parentNode.nextElementSibling.dataset.square)
             }
            else {
              console.log("can't take your own piece!");
              console.log("")
            }
          } else if (piece.classList[0] === "white" && childPiece.classList[0] === "black") {
            console.log("opposite pieces on same sqaure", "deletion should occur here", "the attacking piece should be left where the defending piece was");
            const tempChildParent = childPiece.parentNode;
            whiteCapturedPieces.innerText += (childPiece.innerText + ", ");
            childPiece.remove();
            tempChildParent.append(piece);
          } else if (piece.classList[0] === "white" && e.target.classList[0] === "black" ||
            piece.classList[0] === "black" && e.target.classList[0] === "white") {
            console.log("here")
          }
        } else if (piece.classList[0] === "white" && e.target.classList[0] === "black") {
          const tempParent = e.target.parentNode;
          whiteCapturedPieces.innerText += (e.target.innerText + ", ");
          e.target.remove();
          tempParent.append(piece);
        }

        if (element.dataset.square === sourceSquare || element.children[0].classList[0] === "white" && e.currentTarget.children[0].classList[0] === "white" ) {
          turn = true;
        } else {
          whoseTurnIsIt.innerText = "It's Black's Move"
          turn = false;
        }
        // Black Piece Logic Here
      } else if (piece && e.target && piece.classList[0] === "black" && turn === false) {

        if (e.target.id && e.target.id === "square" || e.currentTarget.children[0].classList[0] === "black") {
          console.log("square found")
          const childPiece = e.target.children[0];
          if (!childPiece) {
            e.target.append(piece);
          } else if (piece.classList[0] === "black" && childPiece.classList[0] === "black") {
            console.log("can't take your own piece!");
            // Castling logic for Black
          } else if (piece.classList[0] === "black" && childPiece.classList[0] === "white") {
            console.log("opposite pieces on same sqaure", "deletion should occur here", "the attacking piece should be left where the defending piece was");
            const tempChildParent = childPiece.parentNode;
            blackCapturedPiieces.innerText += (childPiece.innerText + ", ");
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
    });
  });
});