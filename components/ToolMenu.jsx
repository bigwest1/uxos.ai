// Responsive grid menu displaying all available tools
import React from 'react';
import ToolCard from './ToolCard';
import { tools } from '../data/tools';

export default function ToolMenu() {
  return (
    <div className="grid grid-cols-2 gap-6">
     {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  );
}