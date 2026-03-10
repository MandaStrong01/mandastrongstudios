# Anthropic API Direct Integration

Your app now calls the Anthropic API directly from the browser - no proxy needed!

## Setup Instructions

1. **Get your Anthropic API key:**
   - Go to https://console.anthropic.com/
   - Create an account or sign in
   - Navigate to API Keys
   - Create a new API key

2. **Add your API key to `.env`:**
   ```
   VITE_ANTHROPIC_API_KEY=sk-ant-your-key-here
   ```

3. **That's it!** The Agent Grok help desk will now use real Claude AI responses.

## How It Works

- **AgentGrokHelpDesk component** calls Anthropic API directly from the browser
- Uses `claude-3-5-sonnet-20241022` model
- No backend proxy required
- `dangerouslyAllowBrowser: true` flag enables client-side API calls

## Security Note

⚠️ **Important:** Client-side API calls expose your API key in the browser. This is acceptable for:
- Personal projects
- Internal tools
- Demos and prototypes

For production apps with public users, consider:
- Using a backend proxy
- Implementing rate limiting
- Rotating keys regularly

## Testing

1. Start the dev server: `npm run dev`
2. Navigate to the Agent Grok help desk
3. Ask a question
4. Claude will respond with real AI-generated answers!

## Features

- Real-time Claude AI responses
- Conversation history
- Loading states
- Error handling
- Max 1024 tokens per response
