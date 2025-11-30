# 🚀 OliveAgent - Build and Run Guide

> **OliveAgent** is a free, local, open-source AI app builder powered by multiple AI models. This guide will help you compile and run the application on Windows.

---

## 📋 Prerequisites

### Required Software

1. **Node.js** (version 20 or higher)
   - Download from: https://nodejs.org/
   - Choose the LTS (Long Term Support) version
   - During installation, make sure to check the box that says "Automatically install the necessary tools"

2. **Git** (for cloning the repository)
   - Download from: https://git-scm.com/download/win
   - Use default settings during installation

3. **Visual Studio Build Tools** (required for native modules)
   - Download from: https://visualstudio.microsoft.com/downloads/
   - Select "Desktop development with C++" workload
   - Or install via npm: `npm install --global windows-build-tools`

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/oliveagent/oliveagent.git
cd oliveagent
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required dependencies including Electron, React, and other libraries.

### 3. Environment Setup (Optional)

Create a `.env` file in the root directory if you want to configure API keys:

```env
OPENAI_API_KEY=your_openai_key_here
ANTHROPIC_API_KEY=your_anthropic_key_here
GEMINI_API_KEY=your_google_key_here
CODY_API_KEY=your_cody_key_here
```

## Development Mode

To run the application in development mode:

```bash
npm start
```

This will:
- Compile TypeScript files
- Start the Electron app
- Enable hot-reload for faster development

## Building for Production

### Build the Application

To create a production build:

```bash
npm run make
```

This command will:
- Clean previous builds
- Compile all source files
- Package the application
- Create installers in the `out/make` directory

### Available Distributables

After running `npm run make`, you'll find the following in the `out/make` directory:

- **`squirrel.windows/`** - Windows installer (.exe)
- **`zip/`** - Portable ZIP archive

### Installing the Built Application

1. Navigate to `out/make/squirrel.windows/`
2. Run the `.exe` installer
3. Follow the installation wizard
4. Launch OliveAgent from your Start Menu

## Project Scripts

```bash
npm start              # Run in development mode
npm run make           # Build production version
npm run package        # Package without creating installers
npm run publish        # Publish release (requires configuration)
npm test               # Run test suite
npm run lint           # Check code quality
npm run prettier       # Format code
```

## Troubleshooting

### Node.js Version Issues

If you encounter errors about Node.js version:
```bash
node --version  # Should be 20.x or higher
```

Update Node.js if needed from https://nodejs.org/

### Build Errors on Windows

If you get native module compilation errors:
```bash
npm install --global windows-build-tools
npm rebuild
```

### Permission Errors

Run your terminal/command prompt as Administrator if you encounter permission issues.

### Missing Dependencies

If modules are missing:
```bash
npm clean-install
```

## Features

- **Multi-Model Support**: OpenAI, Anthropic, Google, Cody AI, and more
- **Local Development**: Run apps directly in the IDE
- **Version Control**: Built-in Git integration
- **Database Integration**: Supabase and Neon support
- **Deployment**: One-click Vercel deployment
- **Security Review**: Automated security scanning

## Getting Help

- Documentation: Check the `docs/` folder
- Issues: Open an issue on GitHub
- Community: Join our community discussions

## License

MIT License - see LICENSE file for details

## System Requirements

- **OS**: Windows 10 or later (64-bit)
- **RAM**: 4 GB minimum, 8 GB recommended
- **Storage**: 500 MB for application + space for generated projects
- **Internet**: Required for AI model access

## Additional Configuration

### Using Custom AI Providers

1. Open OliveAgent
2. Go to Settings → Providers
3. Add your API keys for desired providers
4. Select your preferred model

### Cody AI Configuration

Cody AI is a built-in provider with access to multiple models:
- API URL: `http://34.28.145.62:4000/v1`
- Add your Cody API key in Settings → Providers → Cody AI
- Available models include GPT-4, GPT-5, and o-series models

All Cody AI models use temperature=1 for optimal code generation.

---

**Happy coding with OliveAgent!**
