var clearButton = document.getElementById('clearingResults');
var clearingButton = document.getElementById('clearingResults2');
var file_input = document.getElementById('fileInput');
var file_input2 = document.getElementById('fileInputCompile');

document.getElementById("configuration").style.visibility = "hidden";

clearButton.addEventListener('click', function(){
  $("#information").empty();
  file_input.value = null;
});

clearingButton.addEventListener('click', function(){
  $("#information2").empty();
  file_input2.value = null;
});