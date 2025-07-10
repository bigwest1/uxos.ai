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
        content: `You are a master-level UX designer. Given the user flow steps, produce a JSON object with:
1) summary: a bullet list of friction points and design rationale,
2) mermaidFlow: a mermaid.js syntax flowchart of the improved steps,
3) improvedSteps: an array of refined flow steps with detailed descriptions,
4) abIdeas: top 3 A/B test ideas with hypothesis and metrics.
Ensure JSON parsable output only.`,
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
