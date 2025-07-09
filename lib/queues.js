import { Queue } from 'bullmq';
import Redis from 'ioredis';

/**
 * Shared BullMQ queue for AI analysis jobs.
 */
export const connection = new Redis(process.env.REDIS_URL);
export const analysisQueue = new Queue('analysis', { connection });
