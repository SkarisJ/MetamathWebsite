var popup = document.getElementById("myPopup");
var button = document.getElementById("popup-button2");


function openPopup() {
    if (popup.innerHTML.trim() === '') {
      return;
    }
    popup.style.display = "block";
  }
  
  // When the user clicks on the close button, hide the popup
  var close = document.getElementsByClassName("close")[0];
  close.onclick = function() {
    popup.style.display = "none";
  }
  
  // When the user clicks anywhere outside of the popup, close it
  window.onclick = function(event) {
    if (event.target == popup) {
      popup.style.display = "none";
    }
  }