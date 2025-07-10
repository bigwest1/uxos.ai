import { callAppropriateModel } from '../../../lib/llmRouter';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  const { steps } = req.body;
  if (!Array.isArray(steps)) {
    return res.status(400).json({ error: 'Invalid steps array' });
  }
  try {
    const messages = [
      {
        role: 'system',
        content:
          'Analyze these user flow steps. Provide: 1) summary of friction points; 2) step insights with rating; 3) improved steps; 4) A/B test ideas.',
      },
      { role: 'user', content: JSON.stringify(steps) },
    ];
    const resp = await callAppropriateModel(messages, { model: process.env.OPENAI_PRIMARY_MODEL });
    const content = resp.choices?.[0]?.message?.content || '';
    const result = JSON.parse(content);
    return res.status(200).json({ result });
  } catch (err) {
    console.error('analysis error', err);
    return res.status(500).json({ error: 'Analysis failed' });
  }
}
