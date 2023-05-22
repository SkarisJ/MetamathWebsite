var toggler = document.getElementsByClassName ('caret');
var container = document.getElementById ('chart');
var myUl = document.getElementById ('myUL');
var proof = document.getElementById ('proof');
var select = document.getElementById('prove');
var popup = document.getElementById("myPopup");
var button = document.getElementById("popup-button");
var i;
let chartData = [];
let numbers = [];
let expressions = [];
let dependencies = [];
let counter = 0;
let stringLength = 20;
let constants = [];
let variables = [];
let hypothesis = [];
let axioms = [];

document.addEventListener("DOMContentLoaded", (event) => {
  fetch('/files')
  .then(response => response.json())
  .then(files => {
    files.forEach(file => {
      const option = document.createElement('option');
      option.text = file;
      select.add(option);
    });
  });
});

function containsNumber (str) {
  return /^\s*\d+/.test (str);
}

function readTextFile (file) {
  var rawFile = new XMLHttpRequest ();
  rawFile.open ('GET', file, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        var lines = rawFile.responseText.split ('\n');
        const numberedLines = lines.filter (lines => lines.match (/^\s*\d+/));
        numberedLines.forEach (line => {
          const oneLine = line.split (' ');

          if (containsNumber (line.substring (2, 14))) {
            dependencies.push (
              line
                .substring (2, 14)
                .replace ('wi', '')
                .replace ('m', '')
                .replace ('a2', '')
                .replace ('a1', '')
                .trim ()
            );
          } else {
            dependencies.push ('');
          }
          
          expressions.push (line.substring (23, line.length).replace('-',''));
          oneLine.forEach (element => {
            if (!isNaN (element) && element != '') {
              numbers.push (element);
            }
          });
        });
      }
    }
  };
  rawFile.send (null);
  if (expressions.length > 0) {
    readOriginalFile (file.replace('.log','.mm'));
    draw ();
  }
}

function readOriginalFile(file){
  var rawFile = new XMLHttpRequest ();
  rawFile.open ('GET', file, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        var lines = rawFile.responseText.split ('\n');
        const filteredConstants = lines.filter(line => line.includes('$c'));
        filteredConstants.forEach (line => {
           const regex = /\$c\s(.+?)\s\$/;
           const matches = line.match(regex);
           const extractedText = matches[1];
           const arr = extractedText.split(" ");
           arr.forEach(element =>{
            if(element != ''){
            constants.push(element)
            }
           })
        });
        const filteredVariables = lines.filter(line => line.includes('$v'));
        filteredVariables.forEach (line => {
          const regex = /\$v\s(.+?)\s\$/;
          const matches = line.match(regex);
          const extractedText = matches[1];
          const arr = extractedText.split(" ");

           arr.forEach(element =>{
            if(element != ''){
              variables.push(element)
            }
           })
        });
        const filteredHypothesis = lines.filter(line => (line.includes('$f') || line.includes('$e')) && !line.includes('min') && !line.includes('maj'));
        filteredHypothesis.forEach (line => {
         const regex = /\$f\s(.+?)\s\$/;
         const regex2 = /\$e\s(.+?)\s\$/;
         const matches = line.match(regex) || line.match(regex2);
         const extractedText = matches[1];
         hypothesis.push(extractedText)
        });
        const filteredAxioms = lines.filter(line => line.includes('$a') && line.includes('|-') && !line.includes('mp'));
        filteredAxioms.forEach (line => {
         const regex = /\|-\s(.+?)\s\$/;
         const matches = line.match(regex);
         const extractedText = matches[1];
         axioms.push(extractedText)
        });
      }
    }
  };
  rawFile.send (null);
}
function draw () {
  if (constants.length > 0){
    var h3 = document.createElement('h3');
    h3.setAttribute('class','pop');
    h3.innerHTML = 'Konstantos: ';
    popup.appendChild(h3);
    var ul = document.createElement('ul');
    ul.setAttribute('class','pop');
    constants.forEach(constant =>{
      var li = document.createElement('li');
      li.setAttribute('class','axiomsCaret');
      li.innerHTML = constant;
      ul.appendChild(li);
    });
    popup.appendChild(ul);
  }

  if (variables.length > 0){
    var h3 = document.createElement('h3');
    h3.setAttribute('class','pop');
    h3.innerHTML = 'Kintamieji: ';
    popup.appendChild(h3);
    var ul = document.createElement('ul');
    ul.setAttribute('class','pop');

    variables.forEach(variable =>{
      var li = document.createElement('li');
      li.setAttribute('class','axiomsCaret');
      li.innerHTML = variable;
      ul.appendChild(li);
    });
    popup.appendChild(ul);
  }

  if (hypothesis.length > 0){
    var h3 = document.createElement('h3');
    h3.setAttribute('class','pop');
    h3.innerHTML = 'Hipotezės: ';
    popup.appendChild(h3);
    var ul = document.createElement('ul');
    ul.setAttribute('class','pop');

    hypothesis.forEach(hypothes =>{
      var li = document.createElement('li');
      li.setAttribute('class','axiomsCaret');
      li.innerHTML = hypothes;
      ul.appendChild(li);
    });
    popup.appendChild(ul);
  }

  if (axioms.length > 0){
    var h3 = document.createElement('h3');
    h3.setAttribute('class','pop');
    h3.innerHTML = 'Aksiomos: ';
    popup.appendChild(h3);
    var ul = document.createElement('ul');
    ul.setAttribute('class','pop');
    
    axioms.forEach(axiom =>{
      var li = document.createElement('li');
      li.setAttribute('class','axiomsCaret');
      li.innerHTML = axiom;
      ul.appendChild(li);
    });
    popup.appendChild(ul);
  }
  proof.innerHTML = 'Įrodymo rezultatas';
  var li = document.createElement ('li');
  li.setAttribute ('class', 'caret');
  li.appendChild (
    document.createTextNode (
      numbers[counter].concat (' ', expressions[counter])
    )
  );
  myUl.appendChild (li);
  var expression = numbers[counter].concat (' ', expressions[counter]);
  if (expression.length > stringLength) {
    expression = expression.substring (0, stringLength).concat ('...');
  }
  chartData.push (['' + expression + '', '' + expression + '']);
  drawGraph ();
}

myUl.addEventListener ('click', function () {
  counter++;
  if (counter < expressions.length) {
    var newLi = document.createElement ('li');
    newLi.setAttribute ('class', 'caret');
    newLi.appendChild (
      document.createTextNode (
        numbers[counter].concat (' ', expressions[counter])
      )
    );
    myUl.appendChild (newLi);

    if (dependencies[counter] != '') {
      const arr = dependencies[counter].split (',');

      for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].replace ('a1', '').trim ();
      }
      for (let i = 0; i < arr.length; i++) {
        var depend = Number (numbers[Number (arr[i]) - 1] - 1);
        var expression1 = numbers[counter].concat (' ', expressions[counter]);
        var expression2 = numbers[depend].concat (' ', expressions[depend]);
        if (expression1.length > stringLength) {
          expression1 = expression1.substring (0, stringLength).concat ('...');
        }
        if (expression2.length > stringLength) {
          expression2 = expression2.substring (0, stringLength).concat ('...');
        }

        chartData.push (['' + expression1 + '', '' + expression2 + '']);
      }
    } else {
      var expression3 = numbers[counter].concat (' ', expressions[counter]);

      if (expression3.length > stringLength) {
        expression3 = expression3.substring (0, stringLength).concat ('...');
      }
      chartData.push (['' + expression3 + '', '' + expression3 + '']);
    }
    drawGraph ();
  }
});

function drawGraph () {
  container.innerHTML = '';
  Highcharts.chart ('chart', {
    chart: {
      type: 'networkgraph',
      marginTop: 80,
      marginLeft: 90,
      backgroundColor: 'transparent',
    },
    title: {
      text: 'Grafinis įrodymas',
      style: {
        color: '#333333',
      },
    },
    plotOptions: {
      networkgraph: {
        keys: ['from', 'to'],
        color: '#7ace7a',
        link: {
          color: 'black',
        },
      },
    },
    series: [
      {
        marker: {
          radius: 30,
        },
        dataLabels: {
          enabled: true,
          linkFormat: '',
          allowOverlap: false,
          style:{
            fontSize:20,
          }
        },
        data: chartData,
      },
    ],
  });
}

function update () {
  var select = document.getElementById ('prove');
  var option = select.options[select.selectedIndex];

  if(option.text != 'Pasirinkti..'){
    myUl.innerHTML = '';
    container.innerHTML = '';
    proof.innerHTML = '';
    chartData = [];
    numbers = [];
    expressions = [];
    dependencies = [];
    constants = [];
    variables=[];
    hypothesis = [];
    axioms = [];
    counter = 0;
    $(".pop").empty();
    $(".axiomsCaret").empty();
    readTextFile ('./' + option.text);
  }
  else{
    myUl.innerHTML = '';
    container.innerHTML = '';
    proof.innerHTML = '';
    chartData = [];
    numbers = [];
    expressions = [];
    dependencies = [];
    constants = [];
    variables=[];
    hypothesis = [];
    axioms = [];
    counter = 0;
    $(".pop").empty();
    $(".axiomsCaret").empty();
  }
}

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

document.addEventListener("keydown", function(event) {
  if (event.keyCode === 27 || event.which === 27) {
    popup.style.display = "none";
  }
});

// When the user clicks anywhere outside of the popup, close it
window.onclick = function(event) {
  if (event.target == popup) {
    popup.style.display = "none";
  }
}
