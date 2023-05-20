from js import document, FileReader
from pyodide.ffi import create_proxy
from mmverify import main

htmlDiv = document.getElementById("information"); 

def handleFileSelect():
    file_event = create_proxy(process_file)
    e = document.getElementById("fileInput")
    e.addEventListener("change", file_event, False)
                
def read_complete(event):
    p3 = document.createElement('p');
    p3.setAttribute('id','results');
    p3.append("Vyksta tikrinimas...");
    htmlDiv.append(p3);

    try:
        main(event.target.result)
        result = "programa validi"
    except Exception as e:
        p5 = document.createElement('p');
        p5.setAttribute('id','results');
        p5.append('ERROR: ' + str(e.args[0]));
        htmlDiv.append(p5);
        result = "programa nevalidi"
    finally:
        p4 = document.createElement('p');
        p4.setAttribute('id','results');
        p4.append("Tikrinimas baigtas. Rezultatas - " + result);
        htmlDiv.append(p4);
               
def process_file(event):
    file_list = document.getElementById("fileInput").files
    for f in file_list:
        p2 = document.createElement('p');
        p2.setAttribute('id','results');
        p2.append("Failas: " + f.name + " nuskaitytas sėkmingai");
        htmlDiv.append(p2);
        reader = FileReader.new()
        onload_event = create_proxy(read_complete)
        reader.onload = onload_event
        reader.readAsText(f)

handleFileSelect();