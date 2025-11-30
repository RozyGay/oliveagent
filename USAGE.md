# OliveAgent - Quick Start Guide

## About OliveAgent

OliveAgent is a free, local, open-source AI app builder. Build web applications using natural language with your choice of AI models.

## Key Features

### 🆓 All Features Free
- No subscription required
- All advanced features included
- Bring your own AI API keys

### 🤖 Multi-Model Support
Choose from multiple AI providers:
- **OpenAI** - GPT-4, GPT-5 series
- **Anthropic** - Claude 4.5, Claude 4
- **Google** - Gemini 2.5 Pro, Gemini Flash
- **Cody AI** - 45+ models including latest GPT and o-series
- **OpenRouter** - Access to various open-source models
- **xAI** - Grok 4, Grok 3
- **Local Models** - Ollama, LM Studio

### ⚡ Advanced Features (All Free)
- **Turbo Models** - Fast open-source frontier models
- **Super Value** - Cost-effective model options
- **Smart Context** - Up to 5x cost savings
- **Turbo Edits V2** - 4-10x faster code generation
- **Web Search** - Enhanced AI responses with web data

## Getting Started

### 1. Download and Install

See `run.md` for detailed installation instructions.

### 2. Configure AI Provider

1. Open OliveAgent
2. Navigate to **Settings** → **Providers**
3. Choose a provider (e.g., OpenAI, Cody AI)
4. Add your API key
5. Select your preferred model

### 3. Create Your First App

1. Click **New App** on the home page
2. Describe what you want to build in natural language
3. OliveAgent will generate a complete web application
4. Preview and edit in real-time
5. Deploy to Vercel when ready

## Using Cody AI

Cody AI is a new provider with extensive model selection:

### Setup
1. Go to **Settings** → **Providers** → **Cody AI**
2. Enter your Cody API key
3. Choose from 45+ available models

### Available Model Families
- GPT-3.5, GPT-4 series
- GPT-5 series (including Pro, Mini, Nano variants)
- GPT-5.1 series
- o1, o3 reasoning models
- GPT-4.1 series

All Cody models use `temperature=1` for optimal code generation.

## Tips for Best Results

### Writing Good Prompts
- Be specific about what you want
- Describe the UI/UX in detail
- Mention any specific frameworks or libraries
- Include example data or workflows

### Example Prompts
```
Create a todo list app with drag and drop, dark mode,
and local storage persistence.
```

```
Build a weather dashboard that shows current conditions
and 5-day forecast using a weather API.
```

```
Make a recipe finder with search, filters, and favorites.
Use a card-based layout with images.
```

### Using Context
- Attach files for context (designs, data, examples)
- Reference existing code or features
- Mention specific component libraries (e.g., Tailwind, shadcn/ui)

## Advanced Features

### Smart Context Mode
Automatically optimizes token usage by:
- Intelligent file selection
- Relevant code extraction
- Context window management

**Modes:**
- **Balanced** - Good mix of context and cost
- **Conservative** - Minimal context, lowest cost
- **Deep** - Maximum context for complex tasks

### Turbo Edits
Enable fast code generation with streaming edits:
1. Go to **Settings** → **Features**
2. Enable **Turbo Edits V2**
3. Experience 4-10x faster code updates

### Integrations

#### GitHub
- Link repositories
- Push code directly
- Create branches

#### Vercel
- One-click deployment
- Automatic preview URLs
- Production deployments

#### Supabase
- Database setup
- Function deployment
- Migration management

#### Neon
- PostgreSQL database
- Branch management
- Connection strings

## Keyboard Shortcuts

- `Cmd/Ctrl + K` - Quick model switch
- `Cmd/Ctrl + Enter` - Send message
- `Cmd/Ctrl + /` - Command palette
- `Cmd/Ctrl + N` - New app
- `Cmd/Ctrl + ,` - Settings

## Troubleshooting

### No API Key Error
- Go to Settings → Providers
- Add your API key for the selected provider
- Ensure the key is valid and has credits

### Build Errors
- Check the Problems tab in the preview panel
- Review console output for specific errors
- Try regenerating with more specific instructions

### Model Not Responding
- Check your internet connection
- Verify API key is valid
- Try a different model
- Check provider status page

## Getting Help

### Documentation
- Full docs in the `docs/` folder
- In-app help available via Help button
- Community guides and examples

### Community
- Reddit: [r/oliveagentbuilders](https://www.reddit.com/r/oliveagentbuilders/)
- GitHub: Report issues and contribute
- Discord: Join our community (link in app)

## Best Practices

### Cost Management
- Use free-tier models for testing
- Enable Smart Context for cost savings
- Start with smaller models, scale up as needed
- Monitor token usage in the token bar

### Development Workflow
1. Start with a clear project description
2. Build incrementally with follow-up prompts
3. Use version history to track changes
4. Test thoroughly before deploying
5. Link to GitHub for version control

### Security
- Review generated code for security issues
- Use the built-in security review feature
- Keep dependencies updated
- Don't commit API keys to repositories

## Next Steps

- Explore the template library
- Try different AI models
- Join the community
- Share your creations
- Contribute to the project

---

**Happy Building with OliveAgent!**

For detailed build instructions and technical documentation, see `run.md` and the `docs/` folder.
