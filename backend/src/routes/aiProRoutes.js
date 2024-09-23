const express = require('express');
const OpenAI = require('openai');
const AiDeck = require('../models/aiDeckModel'); // AiDeck model for AI-generated decks
const router = express.Router();

const systemPrompt = `
You are a flashcard creator. You take in text and create multiple flashcards from it. Make sure to create exactly 10 flashcards.
Both front and back should be one sentence long. Return only the JSON and nothing else. The front should be in the form of a question and the back should be its answer.
You should return in the following JSON format:
{
  "flashcards":[
    {
      "front": "Front of the card",
      "back": "Back of the card",
      "flip": false
    }
  ]
}
`;

// Route to generate flashcards using OpenAI API
router.post('/generate', async (req, res) => {
  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY,
    defaultHeaders: {
      "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL,
      "X-Title": process.env.NEXT_PUBLIC_SITE_NAME,
    }
  });
  
  try {
    const { text, userId } = req.body;  // Assuming both text and userId are provided

    if (!text || text.trim() === '') {
      return res.status(400).json({ error: 'Input text is required to generate flashcards.' });
    }

    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: text },
      ],
      model: 'meta-llama/llama-3.1-8b-instruct:free',
      response_format: { type: 'json_object' },
    });
    
    const flashcards = JSON.parse(completion.choices[0].message.content);
    
    // Return the generated flashcards as a JSON response
    res.status(200).json(flashcards.flashcards);

  } catch (error) {
    console.error('Error generating flashcards:', error);
    res.status(500).json({ error: 'Failed to generate flashcards' });
  }
});

// Route to save the generated deck into AiDeck collection
router.post('/saveDeck', async (req, res) => {
  const { setName, cards, userId } = req.body;
  console.log('Received data:', { setName, cards, userId });
  if (!setName || !cards || cards.length === 0) {
    return res.status(400).json({ error: 'Deck name and cards are required' });
  }

  try {
    const newDeck = new AiDeck({
      deckName: setName,
      cards,
      owner: userId,
    });

    await newDeck.save();
    res.status(201).json({ message: 'Deck saved successfully', deck: newDeck });
  } catch (error) {
    console.error('Error saving deck:', error);
    res.status(500).json({ error: 'Failed to save deck' });
  }
});

// Route to get saved decks
router.get('/aidecks/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const decks = await AiDeck.find({ owner: userId });
    res.status(200).json(decks);
  } catch (error) {
    console.error('Error fetching decks:', error);
    res.status(500).json({ error: 'Failed to fetch decks' });
  }
});

// get cards for a specific deck
router.get('/aideck/:deckId', async (req, res) => {
  const { deckId } = req.params;

  try {
    const deck = await AiDeck.findById(deckId);
    res.status(200).json(deck);
  } catch (error) {
    console.error('Error fetching deck:', error);
    res.status(500).json({ error: 'Failed to fetch deck' });
  }
});
module.exports = router;
