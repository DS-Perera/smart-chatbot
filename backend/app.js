const express = require('express');
const openai = require('openai');

// Replace 'YOUR_OPENAI_API_KEY' with your actual OpenAI API key
const apiKey = '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';

const app = express();
const port = 3000;

app.use(express.json());

app.post('/api/chat', async (req, res) => {
  try {
    const { userMessage } = req.body;

    const response = await openai.ChatCompletion.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a boy called Darshana Perera. And 26 years old who is working in hSenid Mobile Solutions.' },
        { role: 'user', content: userMessage },
      ],
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      key: apiKey, // Include the API key here
    });

    const assistantMessage = response.data.choices[0].message.content;

    res.json({ assistantMessage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
