const crypto = require("crypto");

const { loadModel, predict } = require("../services/inference");
const storeData = require('../services/storeData');


const postPredictHandler = async (request, h) => {
  const { image } = request.payload;
  const maxImageSize = 1000000; // max image size 1mb

  // condition oversize image
  if (!image || image.length > maxImageSize) {
    return h
      .response({
        status: "fail",
        message: "Payload content length greater than maximum allowed: 1000000",
      })
      .code(413);
  }

  try {
    const model = await loadModel();
    const id = crypto.randomUUID();
    const { result, suggestion } = await predict(model, image);
    const createdAt = new Date().toISOString();
    const data = {
      id,
      result,
      suggestion,
      createdAt,
    };

    await storeData(id, data);
    
    return h
      .response({
        status: "success",
        message: "Model is predicted successfully",
        data
      })
      .code(201);
  } catch (error) {
    console.error(error.message);

    return h
      .response({
        status: "fail",
        message: "Terjadi kesalahan dalam melakukan prediksi",
      })
      .code(400);
  }
};

module.exports = postPredictHandler;