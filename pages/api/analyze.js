import { OpenAI } from 'openai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end('Method Not Allowed');
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Missing OpenAI key' });
  }

  const { steps } = req.body || {};
  if (!steps) {
    return res.status(400).json({ error: 'Missing steps' });
  }

  try {
    const openai = new OpenAI({ apiKey });
    const messages = [
      {
        role: 'system',
        content:
          'You are a senior UX analyst. Review each step and suggest improvements.',
      },
      { role: 'user', content: JSON.stringify(steps) },
    ];

    const stream = await openai.chat.completions.create({
      model: 'gpt-4',
      messages,
      stream: true,
    });

    res.writeHead(200, {
      'Content-Type': 'text/plain; charset=utf-8',
      'Transfer-Encoding': 'chunked',
    });

    for await (const chunk of stream) {
      const content = chunk.choices?.[0]?.delta?.content;
      if (content) res.write(content);
    }

    res.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to analyze' });
  }
}
