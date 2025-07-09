import client from 'prom-client';

/**
 * Expose Prometheus metrics for observability.
 */
export default async function handler(req, res) {
  res.setHeader('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
}
