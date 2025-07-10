import { callAppropriateModel } from '../../lib/llmRouter';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  const { data } = req.body;
  if (typeof data !== 'string') {
    return res.status(400).json({ error: 'Invalid data' });
  }
  try {
    const messages = [
      { role: 'system', content: 'Extract UX patterns from descriptions.' },
      { role: 'user', content: data },
    ];
    const resp = await callAppropriateModel(messages, { model: process.env.OPENAI_PRIMARY_MODEL });
    return res.status(200).json({ result: resp.choices?.[0]?.message?.content });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Pattern mining failed' });
  }
}
