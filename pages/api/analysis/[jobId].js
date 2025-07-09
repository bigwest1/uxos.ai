import { NextApiRequest, NextApiResponse } from 'next';
import { analysisQueue } from '../../../lib/queues';

export default async function handler(req, res) {
  const { jobId } = req.query;
  const job = await analysisQueue.getJob(jobId);
  if (!job) return res.status(404).json({ error: 'Job not found' });
  const state = await job.getState();
  const progress = await job.progress;
  const result = job.returnvalue || null;
  res.status(200).json({ state, progress, result });
}
