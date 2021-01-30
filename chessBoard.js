window.addEventListener("DOMContentLoaded", () => {
  let turn = true;
  let piece = undefined;
  let sourceSquare = undefined;
  const squares = document.querySelectorAll("#square");
  const whoseTurnIsIt = document.querySelector("#whoseTurnIsIt");
  const whiteCapturedPieces = document.querySelector("#whiteCapturedPieces");
  const blackCapturedPiieces = document.querySelector("#blackCapturedPieces");
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
      console.log(element);

      // check if piece was dropped on same square so you don't lose a turn...

      if (piece && piece.classList[0] === "white" && turn === true) {
        if (e.target.id && e.target.id === "square") {
          console.log("square found");

          const childPiece = e.target.children[0];
          if (!childPiece) {
            e.target.append(piece);
          }
          else if(piece.classList[0] === "white" && childPiece.classList[0] === "white" || piece.classList[0] === "black" && childPiece.classList[0] === "black") {
             console.log("can't take your own piece!");
          } else if ( piece.classList[0] === "white" && childPiece.classList[0] === "black" || piece.classList[0] === "black" && childPiece.classList[0] === "white") {
            console.log("opposite pieces on same sqaure", "deletion should occur here", "the attacking piece should be left where the defending piece was");
            const tempChildParent = childPiece.parentNode;
            whiteCapturedPieces.innerText += (childPiece.innerText + ", ");
            childPiece.remove();
            tempChildParent.append(piece);
          } else if (!childPiece) {
            console.log("no children found in this sqaure");
          } else if (piece.classList[0] === "white" && e.target.classList[0] === "black" 
            || piece.classList[0] === "black" && e.target.classList[0] === "white") {
              console.log("here")
          }
        } else if (piece.classList[0] === "white" && e.target.classList[0] === "black"
           || piece.classList[0] === "black" && e.target.classList[0] === "white") {
              const tempParent = e.target.parentNode;
              whiteCapturedPieces.innerText += (e.target.innerText + ", ");
              e.target.remove();
              tempParent.append(piece);
        }

        if (element.dataset.square === sourceSquare) {
          turn = true;
        } else {
          whoseTurnIsIt.innerText = "It's Black's Move"
          turn = false;
        }
      } else if (piece.classList[0] === "black" && turn === false) {

        if (e.target.id && e.target.id === "square") {
          console.log("square found")
          const childPiece = e.target.children[0];
          if (!childPiece) {
            e.target.append(piece);
          }
          else if(piece.classList[0] === "white" && childPiece.classList[0] === "white" || piece.classList[0] === "black" && childPiece.classList[0] === "black") {
             console.log("can't take your own piece!");
          } else if ( piece.classList[0] === "white" && childPiece.classList[0] === "black" || piece.classList[0] === "black" && childPiece.classList[0] === "white") {
            console.log("opposite pieces on same sqaure", "deletion should occur here", "the attacking piece should be left where the defending piece was");
            const tempChildParent = childPiece.parentNode;
            blackCapturedPiieces.innerText += (childPiece.innerText + ", ");
            childPiece.remove();
            tempChildParent.append(piece);
          } else if (!childPiece) {
            console.log("no children found in this sqaure");
          } else if (piece.classList[0] === "white" && e.target.classList[0] === "black" 
            || piece.classList[0] === "black" && e.target.classList[0] === "white") {
              console.log("here")
          }
        } else if (piece.classList[0] === "white" && e.target.classList[0] === "black"
           || piece.classList[0] === "black" && e.target.classList[0] === "white") {
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