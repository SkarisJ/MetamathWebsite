var clearButton = document.getElementById('clearingResults');
var file_input = document.getElementById('fileInput');
var file_input2 = document.getElementById('fileInputCompile');
var form = document.getElementById("compile_file");
document.getElementById("configuration").style.visibility = "hidden";

clearButton.addEventListener('click', function(){
  $("#information").empty();
  file_input.value = null;
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  submitForm();
});

function submitForm(){
  const formData = new FormData(form);
  fetch('http://localhost:5000/upload', {
    method: 'POST',
    body: formData,
  })
  .then(response => response.text())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
      console.error(error);
  });
}