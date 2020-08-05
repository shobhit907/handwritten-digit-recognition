import numpy as np
from tensorflow.keras.preprocessing.image import load_img,img_to_array
from tensorflow.keras.models import load_model

# load and prepare the image
def load_image(filename):
    # load the image
    img = load_img(filename, color_mode="grayscale", target_size=(28, 28))
    # convert to array
    img = img_to_array(img)
    # print(img)
    # print(img.shape)
    # img=np.invert(img)
    # reshape into a single sample with 1 channel
    img = img.reshape((1, 28, 28, 1))
    # prepare pixel data
    img = img.astype(float)
    img = img / 255.0
    return img
 
 # load an image and predict the class
def predict(filename):
    # load the image
    img = load_image(filename)
    # load model
    model = load_model('cnn_model_fold1.h5')
    # predict the class
    digit = model.predict_classes(img)[0]
    digit_prob=model.predict(img)
    # print(digit)
    print(digit_prob[0])
    return [list(digit_prob[0]),digit]
#     print(digit[0])