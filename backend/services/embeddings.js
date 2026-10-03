const OpenAI = require("openai");
require("dotenv").config();

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

async function getEmbedding(text) {
  const response = await client.embeddings.create({
    model: "nvidia/nemotron-3-embed-1b:free",
    input: text,
  });

  return response.data[0].embedding;
}

module.exports = getEmbedding;