import { callAppropriateModel } from '../../lib/llmRouter';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  const { description, style } = req.body;
  if (!description || typeof description !== 'string') {
    return res.status(400).json({ error: 'Invalid description' });
  }
  try {
    const messages = [
      {
        role: 'system',
        content: `You are the Quantum UX AI App Studio. Generate a JSON blueprint for a micro-app based on description and style. Include appName, primaryColor, logoUrl placeholder, pages [{ name, mermaidFlow }], onboardingSteps, and monetizationOptions. Return valid JSON only.`,
      },
      { role: 'user', content: JSON.stringify({ description, style }) },
    ];
    const resp = await callAppropriateModel(messages, { model: process.env.OPENAI_PRIMARY_MODEL });
    const blueprint = JSON.parse(resp.choices?.[0]?.message?.content || '{}');
    return res.status(200).json({ blueprint });
  } catch (err) {
    console.error('app-generate error', err);
    return res.status(500).json({ error: 'App generation failed' });
  }
}
