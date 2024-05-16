require('dotenv').config();

const tf = require("@tensorflow/tfjs-node");

async function loadModel() {
  try {
    const model = await tf.loadGraphModel(process.env.MODEL_URL);
    console.log("Model loaded successfully");
    return model;
  } catch (error) {
    console.error("Error loading model:", error);
    throw error;
  }
}

async function predict(model, imageBuffer) {
  try {
    const tensor = tf.node
      .decodeJpeg(imageBuffer)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat();

    const prediction = await model.predict(tensor).data();
    const result = prediction[0] > 0.5 ? "Cancer" : "Non-cancer";
    const suggestion =
      result === "Cancer"
        ? "Indikasi Penyakit Cancer, Segera periksa ke dokter!"
        : "Bukan penyakit cancer, tetap jaga kesehatan";

    return { result, suggestion };
  } catch (error) {
    console.error("Error during prediction:", error);
    throw error;
  }
}

module.exports = { loadModel, predict };
