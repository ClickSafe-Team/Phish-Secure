import React, { useState } from "react";

const Home = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const formatConfidence = (value) => {
    if (value === undefined || value === null) return "N/A";
    const numeric = Number(value);
    if (Number.isNaN(numeric)) return String(value);
    return numeric > 1
      ? `${numeric.toFixed(2)}%`
      : `${(numeric * 100).toFixed(2)}%`;
  };

  const handleScan = async (e) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setResult(null);
    setError("");

    try {
      const response = await fetch("/predict/api/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const status =
        data.prediction === "Legitimate" ? "Safe" : "Phishing Detected";
      const confidence = formatConfidence(data.Confidence);

      setResult({
        status,
        confidence,
        url: data.url || url,
      });
    } catch (err) {
      console.error(err);
      setError(
        "Unable to scan URL. Please make sure the backend is running and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="header">
        <h1>ClickSafe</h1>
        <p>Advanced Machine Learning Phishing Detection</p>
      </header>

      <main className="main-content">
        <form onSubmit={handleScan} className="search-box">
          <input
            type="url"
            placeholder="Paste a suspicious URL here (e.g., http://example.com)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="url-input"
          />
          <button type="submit" className="scan-button" disabled={loading}>
            {loading ? "Analyzing..." : "Scan Link"}
          </button>
        </form>

        {error && <p className="text-danger">{error}</p>}

        {result && (
          <div className="results-card">
            <h2
              className={result.status === "Safe" ? "text-safe" : "text-danger"}
            >
              {result.status}
            </h2>
            <div className="features-grid">
              <p>
                <strong>Scanned URL:</strong> {result.url}
              </p>
              <p>
                <strong>Confidence Score:</strong> {result.confidence}
              </p>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default Home;
