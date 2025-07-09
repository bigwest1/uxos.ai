import { NextApiRequest, NextApiResponse } from 'next';
import { analysisQueue } from '../../../lib/queues';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  const { steps } = req.body;
  if (!Array.isArray(steps)) {
    return res.status(400).json({ error: 'Invalid steps' });
  }
  let job;
  try {
    job = await analysisQueue.add('flow-analysis', { steps });
  } catch (err) {
    return res.status(503).json({ error: 'Queue unavailable, please retry later' });
  }
  res.status(200).json({ jobId: job.id });
}
