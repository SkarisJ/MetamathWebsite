var toggler = document.getElementsByClassName ('caret');
var container = document.getElementById ('chart');
var myUl = document.getElementById ('myUL');
var proof = document.getElementById ('proof');
var infoDiv = document.getElementById ('infoDiv');
var i;
let chartData = [];
let numbers = [];
let expressions = [];
let dependencies = [];
let counter = 0;
let stringLength = 20;
function containsNumber (str) {
  return /\d/.test (str);
}

function readTextFile (file) {
  var rawFile = new XMLHttpRequest ();
  rawFile.open ('GET', file, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        var lines = rawFile.responseText.split ('\n');
        const numberedLines = lines.filter (lines => lines.match (/^\d+/));

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
          expressions.push (line.substring (25, line.length));
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
}

function draw (proofNo) {
  proof.innerHTML = 'Įrodymas';

  if (proofNo === 1 || proofNo === 2) {
    infoDiv.innerHTML = `
    <div class = "axiomsDiv"> 
    <h2 id="axioms">Aksiomos</h2>
    <ul id="axiomsUl">
    <li class = "axiomsCaret">( a -> ( b -> a ) )</li>
    <li class = "axiomsCaret">( ( a -> ( b -> c ) ) -> ( ( a -> b ) -> ( a -> c ) ) )</li>
    </ul>
    </div>`;
  } else if (proofNo === 3) {
    infoDiv.innerHTML = `
    <div class = "axiomsDiv"> 
    <h2 id="axioms">Aksiomos</h2>
    <ul id="axiomsUl">
    <li class = "axiomsCaret">( a -> ( b -> a ) )</li>
    </ul>
    </div>`;
  }

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
      text: 'Įrodymas',
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

  if (option.text == '( a -> a )') {
    myUl.innerHTML = '';
    container.innerHTML = '';
    proof.innerHTML = '';
    infoDiv.innerHTML = '';
    chartData = [];
    numbers = [];
    expressions = [];
    dependencies = [];
    counter = 0;
    readTextFile ('metamath/prove1.log');
    draw (1);
  } else if (option.text == '( ( a -> a ) -> ( a -> a ) )') {
    myUl.innerHTML = '';
    container.innerHTML = '';
    proof.innerHTML = '';
    infoDiv.innerHTML = '';
    chartData = [];
    numbers = [];
    expressions = [];
    dependencies = [];
    counter = 0;
    readTextFile ('metamath/prove2.log');
    draw (2);
  } else if (option.text == '( a -> ( a -> a ) )') {
    myUl.innerHTML = '';
    container.innerHTML = '';
    proof.innerHTML = '';
    infoDiv.innerHTML = '';
    chartData = [];
    numbers = [];
    expressions = [];
    dependencies = [];
    counter = 0;
    readTextFile ('metamath/simpleProof.log');
    draw (3);
  } else {
    myUl.innerHTML = '';
    container.innerHTML = '';
    proof.innerHTML = '';
    infoDiv.innerHTML = '';
    chartData = [];
    numbers = [];
    expressions = [];
    dependencies = [];
    counter = 0;
  }
}
