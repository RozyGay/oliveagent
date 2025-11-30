# OliveAgent Rebranding Changelog

## Major Changes

### 1. Rebranding: Dyad → OliveAgent

All references to "Dyad" have been renamed to "OliveAgent" across the codebase:
- Application name and branding
- Package names (`@dyad-sh` → `@oliveagent`)
- File names and component names
- Environment variables (`DYAD_*` → `OLIVEAGENT_*`)
- URLs and domain references (`dyad.sh` → `oliveagent.sh`)

### 2. New AI Provider: Cody AI

Added built-in support for Cody AI provider:
- **API URL**: `http://34.28.145.62:4000/v1`
- **Authentication**: Requires user-provided API key
- **Models**: 45+ models including GPT-4, GPT-5, o-series, and more
- **Temperature**: All models use temperature=1 for optimal code generation

Available Cody AI models include:
- GPT-4 series (gpt-4, gpt-4-turbo, gpt-4o variants)
- GPT-5 series (gpt-5, gpt-5-mini, gpt-5-nano, gpt-5-pro)
- GPT-5.1 series
- o-series (o1, o3, o3-mini)
- GPT-4.1 series
- GPT-3.5-turbo variants

### 3. OliveAgent Pro Features - Now Free for All

All previously "Pro-only" features are now available to everyone:
- Turbo Models (fast open-source frontier models)
- Super Value Models (cost-effective models)
- Smart Context Mode (up to 5x cost savings)
- Turbo Edits V2 (4-10x faster code generation)
- Web Search capabilities
- Lazy Edits Mode

Functions that previously checked for Pro status now return `true` by default:
- `isOliveAgentProEnabled()` - Always returns `true`
- `hasOliveAgentProKey()` - Always returns `true`

## Technical Details

### Updated Files

#### Core Configuration
- `package.json` - Updated name and productName
- `src/lib/schemas.ts` - Added "cody" provider, made Pro features free
- `src/ipc/shared/language_model_constants.ts` - Added Cody models and configuration
- `src/ipc/utils/get_model_client.ts` - Added Cody provider handler

#### Renamed Files
- `packages/@dyad-sh/` → `packages/@oliveagent/`
- `src/ipc/utils/dyad_tag_parser.ts` → `src/ipc/utils/oliveagent_tag_parser.ts`
- `worker/dyad-shim.js` → `worker/oliveagent-shim.js`
- `worker/dyad-component-selector-client.js` → `worker/oliveagent-component-selector-client.js`
- `scaffold/src/components/made-with-dyad.tsx` → `scaffold/src/components/made-with-oliveagent.tsx`
- `src/components/DyadProSuccessDialog.tsx` → `src/components/OliveAgentProSuccessDialog.tsx`

#### Updated Components
- All UI components updated with OliveAgent branding
- Pro banners and dialogs updated
- Settings pages updated with new branding

### Environment Variables

Updated environment variable names:
- `DYAD_ENGINE_URL` → `OLIVEAGENT_ENGINE_URL`
- `DYAD_PRO_API_KEY` → `OLIVEAGENT_PRO_API_KEY`

New environment variable:
- `CODY_API_KEY` - For Cody AI provider

## Migration Notes

### For Users
- No action required - existing settings will continue to work
- All Pro features are now available without API key
- New Cody AI provider available in Settings → Providers

### For Developers
- Update any external integrations to use "oliveagent" instead of "dyad"
- Update environment variables in your deployment configs
- Package names in `node_modules` updated to `@oliveagent/*`

## Build Instructions

See `run.md` for detailed build and installation instructions for Windows.

## Breaking Changes

- Package namespace changed from `@dyad-sh` to `@oliveagent`
- Deep link protocol changed from `dyad://` to `oliveagent://`
- API gateway prefix changed from `dyad/` to `oliveagent/`

## Credits

OliveAgent is the rebranded version of Dyad, continuing its mission to provide a free, local, open-source AI app builder for everyone.
