var paragraphDiv = document.getElementById ('file');
var myForm = document.getElementById ('input_text');
var counter = 0;

document.addEventListener("DOMContentLoaded", (event) => {
  const data = JSON.parse (sessionStorage.getItem ('myData') || '[]');
  data.forEach (line => {
    counter++;
    var newP = document.createElement ('p');
    newP.append(counter + ' |');
    newP.append(' ');
    newP.append(line);
    paragraphDiv.appendChild (newP);
  });
});

myForm.addEventListener ('submit', event => {
  event.preventDefault ();

  // Save the data to Local Storage
  const data = JSON.parse (sessionStorage.getItem ('myData') || '[]');
  if (myForm.elements['input'].value != '') {
    counter++;
    data.push (myForm.elements['input'].value);
    sessionStorage.setItem ('myData', JSON.stringify (data));

    var newP = document.createElement ('p');
    newP.append(counter + ' |');
    newP.append(' ');
    newP.append(myForm.elements['input'].value);
    paragraphDiv.appendChild (newP);
    myForm.elements['input'].value = '';
  }
});

function clearData () {
  sessionStorage.clear ();
  counter = 0;
  alert ('Visa informacija ištrinta');
  paragraphDiv.innerHTML = '';
}

function downloadData () {
  const data = JSON.parse (sessionStorage.getItem ('myData') || '[]');

  // Create a plain text string with each line of text separated by a newline character
  let text = '';
  data.forEach (line => {
    text += `${line}\n`;
  });

  // Create a Blob object from the text string
  const file = new Blob ([text], {type: 'text/plain;charset=utf-8;'});

  sessionStorage.setItem ('myFile', URL.createObjectURL (file));

  // Create a temporary link to the Blob and click on it to trigger a file download
  const downloadLink = document.createElement ('a');
  downloadLink.href = URL.createObjectURL (file);
  downloadLink.download = 'myFile.mm';

  // Programmatically trigger a click on the download link
  document.body.appendChild (downloadLink);
  downloadLink.click ();
  document.body.removeChild (downloadLink);
}