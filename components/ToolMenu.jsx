// Responsive grid menu displaying all available tools
import React from 'react';
import ToolCard from './ToolCard';
import { tools } from '../data/tools';

export default function ToolMenu() {
  return (
    <div className="grid grid-cols-2 gap-6">
      {tools.map((tool) => {
        // Here is where you add it:
        const Icon = tool.icon;

        return (
          <div key={tool.name} className="p-4 border rounded flex items-center space-x-4">
            {/* Render the icon */}
            <Icon className="h-6 w-6 text-blue-600" aria-hidden="true" />
            <div>
              <div className="font-bold">{tool.name}</div>
              <div className="text-sm text-gray-500">{tool.description}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}