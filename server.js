// server.js
require("dotenv").config({ path: ".env.server" });
const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

const GH_REPO = "GHESandbox/194426_QBE";
// For testing - replace with your actual token
const GH_TOKEN = process.env.GH_TOKEN || "your_github_token_here";

if (!GH_TOKEN || GH_TOKEN === "your_github_token_here") {
  console.warn("WARNING: Using placeholder token. Set GH_TOKEN environment variable with your actual GitHub token.");
}

app.post("/api/push-data", async (req, res) => {
  try {
    const { ucs } = req.body;
    if (!Array.isArray(ucs)) return res.status(400).json({ error: "ucs array required" });

    const apiRes = await fetch(`https://api.github.com/repos/${GH_REPO}/dispatches`, {
      method: "POST",
      headers: {
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
        Authorization: `token ${GH_TOKEN}`,
      },
      body: JSON.stringify({
        event_type: "sync-data",
        client_payload: { ucs },
      }),
    });

    if (!apiRes.ok) {
      const text = await apiRes.text();
      return res.status(apiRes.status).json({ error: "GitHub dispatch failed", detail: text });
    }

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", detail: err.message });
  }
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Node API running on http://localhost:${PORT}`));
