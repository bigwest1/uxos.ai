#!/usr/bin/env node
/**
 * Worker process consuming analysisQueue jobs for flow analysis.
 */
import { Worker } from 'bullmq';
import { connection } from '../lib/queues';
import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

import { withMetrics } from '../lib/observability';
import { callAppropriateModel } from '../lib/llmRouter';

new Worker(
  'analysis',
  async (job) => {
    const { steps } = job.data;
    await job.updateProgress(20);
    const prompt = [
      { role: 'system', content: 'Analyze these steps for friction and improvements.' },
      { role: 'user', content: JSON.stringify(steps) },
    ];
    // Call local or OpenAI based on length, with metrics
    const resp = await withMetrics(
      () => callAppropriateModel(prompt, { model: process.env.OPENAI_PRIMARY_MODEL })
    );
    const content = resp.choices?.[0]?.message?.content || '{}';
    const result = JSON.parse(content);
    await job.updateProgress(100);
    return result;
  },
  { connection }
);
