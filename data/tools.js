// Example tool data with Heroicons
import {
  BoltIcon,
  UserIcon,
  ChartBarIcon,
  ChatBubbleLeftEllipsisIcon,
} from '@heroicons/react/24/outline';

export const tools = [
  {
    id: 'flow',
    title: 'UX Flow Hacker',
    description: 'Analyze and optimize user flows with AI.',
    icon: BoltIcon,
  },
  {
    id: 'chat',
    title: 'AI Chat',
    description: 'Open-ended chat with AI memory and streaming responses.',
    icon: ChatBubbleLeftEllipsisIcon,
  },
  {
    id: 'persona',
    title: 'Persona Reactor',
    description: 'Generate personas from real customer data.',
    icon: UserIcon,
  },
  {
    id: 'patterns',
    title: 'UX Pattern Miner',
    description: 'Discover winning patterns in top apps.',
    icon: ChartBarIcon,
  },
];
