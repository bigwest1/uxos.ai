import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

/**
 * DecisionLab: Monte Carlo revenue simulation based on user parameters.
 */
export default function DecisionLab() {
  const [price, setPrice] = useState(10);
  const [conversion, setConversion] = useState(0.1);
  const [traffic, setTraffic] = useState(1000);
  const [iterations, setIterations] = useState(1000);
  const [data, setData] = useState(null);

  const runSimulation = () => {
    const results = [];
    for (let i = 0; i < iterations; i++) {
      const conv = Math.random() < conversion ? 1 : 0;
      const sales = Array.from({ length: traffic }).reduce((acc) => acc + (Math.random() < conversion ? 1 : 0), 0);
      results.push(sales * price);
    }
    const bins = 10;
    const max = Math.max(...results);
    const step = max / bins;
    const counts = Array(bins).fill(0);
    results.forEach((v) => {
      const idx = Math.min(Math.floor(v / step), bins - 1);
      counts[idx]++;
    });
    setData({
      labels: counts.map((_, i) => `${Math.round(i * step)}-${Math.round((i + 1) * step)}`),
      datasets: [{ label: 'Revenue Distribution', data: counts, backgroundColor: 'rgba(75,192,192,0.6)' }]
    });
  };

  return (
    <section className="mx-auto max-w-4xl p-6 bg-white rounded-lg shadow space-y-4">
      <h2 className="text-2xl font-bold">Quantum Revenue Simulator</h2>
      <div className="grid grid-cols-2 gap-4">
        <label>Price ($): <input type="number" value={price} onChange={e=>setPrice(+e.target.value)} className="mt-1 p-1 border rounded w-full"/></label>
        <label>Conversion Rate: <input type="number" step="0.01" value={conversion} onChange={e=>setConversion(+e.target.value)} className="mt-1 p-1 border rounded w-full"/></label>
        <label>Traffic Volume: <input type="number" value={traffic} onChange={e=>setTraffic(+e.target.value)} className="mt-1 p-1 border rounded w-full"/></label>
        <label>Iterations: <input type="number" value={iterations} onChange={e=>setIterations(+e.target.value)} className="mt-1 p-1 border rounded w-full"/></label>
      </div>
      <button onClick={runSimulation} className="btn btn-primary">Run Simulation</button>
      {data && <Bar data={data} />}
    </section>
  );
}
