/**
 * Stub local LLM interface for small tasks (e.g. llama.cpp)
 * Replace with real integration as desired.
 */
export default {
  async chat(messages, _options) {
    // Simple echo placeholder
    const last = messages[messages.length - 1]?.content;
    return { choices: [{ message: { role: 'assistant', content: last || '' } }] };
  }
};
