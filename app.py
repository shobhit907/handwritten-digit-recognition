from flask import Flask,render_template,request,jsonify
import base64,re,os,io
import makePrediction
from PIL import Image

app=Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html')

@app.route('/predict/',methods=["POST"])
def predict_digit():
    if(request.method=="POST"):
        print("Received post request");  
        imgString=request.form['image-data']
        # print(imgString)
        imgData=base64.b64decode(imgString)
        # print(imgData)
        filename="uploadedImg.png"
        with open(filename,"wb") as f:
            f.write(imgData)
        prediction=makePrediction.predict(filename)
        content={
            'class':int(prediction[1]),
            'probabilities':[round(float(p*100),2) for p in prediction[0]]
        }
        return jsonify(content)
    else:
        return "Invalid"

if __name__=='__main__':
    app.run(debug=True)