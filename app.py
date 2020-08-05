from flask import Flask,render_template,request
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
        # img = Image.open('uploadedImg.png')
        # img = img.convert("RGBA")
        # datas = img.getdata()

        # newData = []
        # for item in datas:
        #     if item[0] == 255 and item[1] == 255 and item[2] == 255:
        #         newData.append((255, 255, 255, 0))
        #     else:
        #         if item[0] > 150:
        #             newData.append((0, 0, 0, 255))
        #         else:
        #             newData.append(item)
        #             print(item)


        # img.putdata(newData)
        # img.save("open_science_logo_transparent.png", "PNG")
        return makePrediction.predict(filename)
    else:
        return "Invalid"

if __name__=='__main__':
    app.run(debug=True)