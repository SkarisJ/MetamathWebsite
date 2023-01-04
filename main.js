var toggler = document.getElementsByClassName ('caret');
var container = document.getElementById ('chart');
var myUl = document.getElementById ('myUL');
var i;
let chartData = [];
let numbers = [];
let expressions = [];
let dependencies = [];
let counter = 0;

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
function draw () {
  var li = document.createElement ('li');
  li.setAttribute ('class', 'caret');
  li.appendChild (
    document.createTextNode (
      numbers[counter].concat (' ', expressions[counter])
    )
  );
  myUl.appendChild (li);
  chartData.push (['' + numbers[counter] + '', '' + numbers[counter] + '']);
  drawGraph ();
}

function update () {
  var select = document.getElementById ('prove');
  var option = select.options[select.selectedIndex];

  if (option.text == '( a -> a )') {
    myUl.innerHTML = '';
    container.innerHTML = '';
    chartData = [];
    numbers = [];
    expressions = [];
    dependencies = [];
    counter = 0;
    readTextFile ('metamath/prove1.log');
    draw ();
  } else if (option.text == '( ( a -> a ) -> ( a -> a ) )') {
    myUl.innerHTML = '';
    container.innerHTML = '';
    chartData = [];
    numbers = [];
    expressions = [];
    dependencies = [];
    counter = 0;
    readTextFile ('metamath/prove2.log');
    draw ();
  } else {
    myUl.innerHTML = '';
    container.innerHTML = '';
    chartData = [];
    numbers = [];
    expressions = [];
    dependencies = [];
    counter = 0;
  }
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
        chartData.push ([
          '' + numbers[counter] + '',
          '' + numbers[depend] + '',
        ]);
      }
    } else {
      chartData.push (['' + numbers[counter] + '', '' + numbers[counter] + '']);
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
      color: 'black',
    },
    plotOptions: {
      networkgraph: {
        keys: ['from', 'to'],
        color: 'green',
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
        },
        data: chartData,
      },
    ],
  });
}
