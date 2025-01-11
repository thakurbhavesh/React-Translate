const express = require('express');
const cors = require('cors');
const { translate } = require('google-translate-api-x');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Enable CORS for React frontend
app.use(express.json()); // Parse JSON request bodies

// Translation endpoint
app.post('/translate', async (req, res) => {
  const { text, targetLanguage } = req.body;

  if (!text || !targetLanguage) {
    return res.status(400).json({ error: 'Text and target language are required.' });
  }

  try {
    const result = await translate(text, { to: targetLanguage });
    res.json({ translatedText: result.text });
  } catch (error) {
    console.error('Translation error:', error);
    res.status(500).json({ error: 'Translation failed. Please try again.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});