console.log('chess');

window.addEventListener("DOMContentLoaded", () => {
  
  const circle = document.querySelector("#circle");
  const squares = document.querySelectorAll("#square");


  circle.addEventListener("dragstart", e => {
    // Add different types of drag data
  });

  squares.forEach(element => {
    element.addEventListener("dragover", e => {
      e.preventDefault();
    })
    element.addEventListener("drop", e => {
      console.log("Drag drop");
      e.currentTarget.append(circle);
    });
  });
});