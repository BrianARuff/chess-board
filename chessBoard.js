console.log('chess');

window.addEventListener("DOMContentLoaded", () => {

  let piece = undefined;
  let PieceOnSquareAlready;
  const squares = document.querySelectorAll("#square");

  squares.forEach((element, i) => {

    element.addEventListener("dragstart", e => {
      console.log(e.target);
      piece = e.target;
    });

    element.addEventListener("dragend", e => {
      console.log("Drag end");
    })

    element.addEventListener("dragover", e => {
      e.preventDefault();
    });

    element.addEventListener("drop", e => {
      console.log("Drag drop");
      console.log(e);
      // Take the opponets piece.
      console.log(piece.classList[0], e.target.classList[0], e.target.children);
       if (piece.classList[0] === "white" && e.target.classList[0] === "white" || piece.classList[0] === "white" && e.target.children[0].classList[0] === "white" || piece.classList[0] === "black" && e.target.classList[0] === "black" || piece.classList[0] === "black" && e.target.children[0].classList[0] === "black" ) {
        console.log("you can't take your own piece!")
        return
      }
      
      if (piece.classList[0] === "white" && e.target.classList[0] === "black") {
        console.log("match found")
        return
      }

      e.target.append(piece);
    });
  });
});