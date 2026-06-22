import { useState } from "react";
import API from "../services/api";

function CropPrediction() {

  const [price,setPrice] =
    useState("");

  const [result,setResult] =
    useState(null);

  const predict = async () => {

    const res =
      await API.post(
        "/prediction",
        {
          currentPrice: price,
        }
      );

    setResult(res.data);
  };

  return (
    <div className="p-6">

      <h2>
        🌾 Crop Price Prediction
      </h2>

      <input
        type="number"
        value={price}
        onChange={(e)=>
          setPrice(e.target.value)
        }
      />

      <button onClick={predict}>
        Predict
      </button>

      {result && (

        <div>

          <p>
            Current:
            ₹{result.currentPrice}
          </p>

          <p>
            Next Month:
            ₹{result.predictedPrice}
          </p>

          <p>
            Growth:
            +{result.growth}%
          </p>

        </div>

      )}

    </div>
  );
}

export default CropPrediction;