import React, { useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!url) return;

    setLoading(true);
    setResult("");

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      setResult(`${data.prediction} (Confidence: ${data.confidence}%)`);
    } catch (error) {
      setResult("Error connecting to backend");
    }

    setLoading(false);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Phishing URL Detector</h1>

      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ padding: "10px", width: "300px" }}
      />

      <br /><br />

      <button onClick={handleCheck} style={{ padding: "10px 20px" }}>
        {loading ? "Checking..." : "Check"}
      </button>

      <br /><br />

      {result && <h3>{result}</h3>}
    </div>
  );
}

export default App;