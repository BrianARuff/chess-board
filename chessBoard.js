window.addEventListener("DOMContentLoaded", () => {

  let piece = undefined;
  let PieceOnSquareAlready;
  const squares = document.querySelectorAll("#square");

  squares.forEach((element, i) => {

    element.addEventListener("dragstart", e => {
      piece = e.target;
    });

    element.addEventListener("dragover", e => {
      e.preventDefault();
    });

    element.addEventListener("drop", e => {
      console.log("Drag drop");
      console.log(e);

      // Handle move made in the sqaure but not the piece
      if (e.target.id && e.target.id === "square") {
        console.log("square found")
        const childPiece = e.target.children[0];
        if (!childPiece) {
          return e.target.append(piece);
        }
        if (piece.classList[0] === "white" && childPiece.classList[0] === "white" || piece.classList[0] === "black" && childPiece.classList[0] === "black") {
           console.log("can't take your own piece!");
        } else if ( piece.classList[0] === "white" && childPiece.classList[0] === "black" || piece.classList[0] === "black" && childPiece.classList[0] === "white") {
          console.log("opposite pieces on same sqaure", "deletion should occur here", "the attacking piece should be left where the defending piece was");
          const tempChildParent = childPiece.parentNode;
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
            e.target.remove();
            tempParent.append(piece);
      }
    });
  });
});