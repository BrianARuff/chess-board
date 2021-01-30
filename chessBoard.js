console.log('chess');

window.addEventListener("DOMContentLoaded", () => {
  
  let piece = undefined;
  const squares = document.querySelectorAll("#square");

  squares.forEach((element, i) => {
    
    element.addEventListener("dragstart", e => {
      console.log(e.target);
      piece = e.target;
    })

    element.addEventListener("dragover", e => {
      e.preventDefault();
    });

    element.addEventListener("drop", e => {
      console.log("Drag drop");
      e.target.append(piece);
    });
  });
});