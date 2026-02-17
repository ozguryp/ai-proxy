import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post("/ai", async (req, res) => {
  try {
    // OpenAI endpoint tek satır ve doğru
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",             // model belirt
        messages: req.body.messages // frontend’den gelen mesajlar
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI proxy error" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("AI Proxy running on port " + port));
