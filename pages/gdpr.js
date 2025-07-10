import { useState } from 'react';
import Head from 'next/head';
import { useUser } from '@clerk/nextjs';
import ProtectedPage from '../components/ProtectedPage';

function GDPRPage() {
  const { user } = useUser();
  const [exportData, setExportData] = useState(null);
  const [status, setStatus] = useState('');

  const handleExport = async () => {
    setStatus('Exporting...');
    const res = await fetch('/api/gdpr/export');
    if (res.ok) {
      const data = await res.json();
      setExportData(data);
      setStatus('Export successful');
    } else {
      setStatus('Export failed');
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete all your data?')) return;
    setStatus('Deleting...');
    const res = await fetch('/api/gdpr/delete', { method: 'DELETE' });
    if (res.ok) {
      setStatus('All data deleted');
      setExportData(null);
    } else {
      setStatus('Deletion failed');
    }
  };

  if (!user) return <p className="p-6">Please sign in to manage your data.</p>;

  return (
    <>
      <Head>
        <title>GDPR Data Management</title>
      </Head>
      <main className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">GDPR Data Export & Delete</h1>
        <div className="flex space-x-4 mb-4">
          <button onClick={handleExport} className="btn btn-primary">Export My Data</button>
          <button onClick={handleDelete} className="btn btn-outline">Delete My Data</button>
        </div>
        {status && <p className="mb-4">{status}</p>}
        {exportData && (
          <pre className="bg-gray-800 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(exportData, null, 2)}
          </pre>
        )}
      </main>
    </>
  );
}
export default ProtectedPage(GDPRPage);
