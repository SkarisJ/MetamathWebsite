from contextlib import _RedirectStream
from flask import Flask, jsonify, request
from flask_cors import CORS
import subprocess
import os

app = Flask(__name__)
CORS(app)

@app.route('/files')
def get_files():
    directory = os.getcwd()
    files = []
    for file in os.listdir(directory):
        if file.endswith('.log'):
            files.append(file)
    return files

@app.route('/upload', methods=['POST'])
def upload_file():
    # check if the post request has the file part
    if 'filenameCompile' not in request.files:
        return jsonify({'error': 'No file part in the request'})

    file = request.files['filenameCompile']
    metamath_exe_path = "./metamath/metamath.exe"
    base_name, _ = os.path.splitext(file.filename)

    if file:
        file.save(file.filename)
        subprocess.call([metamath_exe_path, f'read {file.filename}', f'open log {base_name}.log', 'show proof th1/lemmon/all', 'close log'])

if __name__ == '__main__':
    app.run(debug=True)