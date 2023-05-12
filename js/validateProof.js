var clearButton = document.getElementById('clearingResults');
var clearingButton = document.getElementById('clearingResults2');
var file_input = document.getElementById('fileInput');
var file_input2 = document.getElementById('fileInputCompile');
var information2 = document.getElementById('information2');
const form = document.getElementById("compile_file");
document.getElementById("configuration").style.visibility = "hidden";

clearButton.addEventListener('click', function(){
  $("#information").empty();
  file_input.value = null;
});

clearingButton.addEventListener('click', function(){
  $("#information2").empty();
  file_input2.value = null;
});

document.addEventListener("DOMContentLoaded", (event) => {
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Cancel the default action
    submitForm();
  });
});

function submitForm(){
  const formData = new FormData(form);
  fetch('http://localhost:5000/upload', {
    method: 'POST',
    body: formData,
  })
  .then(response => response.text())
  .then(data => {
    var p = document.createElement('p');
    p.setAttribute('id','results2');
    p.append(data);
    information2.appendChild(information2);
  })
  .catch(error => {
      console.error(error);
  });
}