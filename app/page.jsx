"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [isbn, setIsbn] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  // Load historik (endast i browser)
  useEffect(() => {
    const saved = localStorage.getItem("history");

    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  // Spara historik
  const save = (item) => {
    const updated = [item, ...history];
    setHistory(updated);

    if (typeof window !== "undefined") {
      localStorage.setItem("history", JSON.stringify(updated));
    }
  };

  // Beräkning (just nu placeholder)
  const calculate = () => {
    const marketPrice = 300; // senare kopplar vi API

    const payout = Math.round(marketPrice * 0.7);
    const profit = payout - Number(buyPrice);

    const item = {
      isbn,
      buyPrice: Number(buyPrice),
      marketPrice,
      payout,
      profit,
      date: new Date().toISOString()
    };

    setResult(item);
    save(item);
  };

  return (
    <div style={{ padding: 20, maxWidth: 500, margin: "auto" }}>
      <h1>📚 Book Flip Scanner</h1>

      <input
        placeholder="ISBN"
        value={isbn}
        onChange={(e) => setIsbn(e.target.value)}
        style={{ display: "block", marginBottom: 10 }}
      />

      <input
        placeholder="Inköpspris"
        value={buyPrice}
        onChange={(e) => setBuyPrice(e.target.value)}
        style={{ display: "block", marginBottom: 10 }}
      />

      <button onClick={calculate}>
        Värdera
      </button>

      {result && (
        <div style={{ marginTop: 20 }}>
          <p>💰 Utbetalning: {result.payout} kr</p>
          <p>📊 Vinst: {result.profit} kr</p>
          <p style={{ color: result.profit > 0 ? "green" : "red" }}>
            {result.profit > 0 ? "🟢 KÖP" : "🔴 HOPPA ÖVER"}
          </p>
        </div>
      )}

      <hr />

      <h3>Historik</h3>

      {history.map((h, i) => (
        <div key={i} style={{ borderBottom: "1px solid #ddd" }}>
          <p>{h.isbn}</p>
          <p>Vinst: {h.profit} kr</p>
        </div>
      ))}
    </div>
  );
}
