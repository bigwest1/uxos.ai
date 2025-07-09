/**
 * Hybrid LLM router: use a lightweight local model for short prompts
 * and OpenAI for longer or more complex requests.
 */
import { OpenAI } from 'openai';
import localLlm from './localLlm';

export async function callAppropriateModel(messages, options = {}) {
  const last = messages[messages.length - 1]?.content || '';
  const wordCount = last.split(/\s+/).length;
  if (wordCount < 100) {
    // local LLM for small tasks
    return localLlm.chat(messages, options);
  }
  // fallback to OpenAI GPT-4 for larger prompts
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  return openai.chat.completions.create({ model: process.env.OPENAI_PRIMARY_MODEL || 'gpt-4', messages, ...options });
}
