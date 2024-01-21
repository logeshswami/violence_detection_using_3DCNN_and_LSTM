from flask import Flask, request, jsonify   
import cv2
import numpy as np
from tensorflow.keras.models import load_model
from flask_cors import CORS
from flask_cors import cross_origin



md = load_model('mdl_presentation.h5')

app = Flask(__name__)

#CORS(app)
CORS(app, resources={r'/analyze': {'origins': 'http://127.0.0.1:8080'}})
num_frames=16
print("started")

print("befor analyze")
@app.route('/analyze', methods=['POST'])
@cross_origin()



def analyze():
    print("in analyze")
    file = request.files['video']
    print(file.filename)
    
    video = cv2.VideoCapture(file.filename)


    fram = np.zeros((num_frames, 128, 128, 3), dtype=np.float32)

    for j in range(num_frames):
        ret, fra = video.read()

        fra= cv2.resize(fra, (128, 128))
        fra = np.array(fra, dtype=np.float64) / 255.0
        fram[j] = fra
        cv2.imshow("fra",fra)

    sele = np.expand_dims(fram, axis=0) 

    mn = np.mean(sele)
    st= np.std(sele)

    sele = (sele - mn) / st
    print(sele.shape)
    y_pred = md.predict(sele)
    print(y_pred)
    #print(sele)
    pred = np.round(y_pred)
    print(pred)
    if(pred == 0):
        predection=0
        print("non violent")
    elif(pred ==1):
        predection=1
        print("violent")

                
        
        
        
    
        

    return jsonify({'prediction': predection})

if __name__ == '__main__':
    app.run(debug=True)
