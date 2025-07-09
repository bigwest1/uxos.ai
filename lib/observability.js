/**
 * Metrics for LLM usage: latency and errors.
 */
import client from 'prom-client';

export const llmLatency = new client.Histogram({
  name: 'llm_latency_ms',
  help: 'LLM call latency in ms',
  buckets: [50, 100, 250, 500, 1000, 2000]
});

export const llmErrors = new client.Counter({
  name: 'llm_errors_total',
  help: 'Total LLM errors'
});

/**
 * Wrap a promise-returning function to track metrics.
 */
export async function withMetrics(fn, ...args) {
  const end = llmLatency.startTimer();
  try {
    return await fn(...args);
  } catch (err) {
    llmErrors.inc();
    throw err;
  } finally {
    end();
  }
}
