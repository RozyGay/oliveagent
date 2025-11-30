import { LanguageModel } from "../ipc_types";

export const PROVIDERS_THAT_SUPPORT_THINKING: (keyof typeof MODEL_OPTIONS)[] = [
  "google",
  "vertex",
  "auto",
];

export interface ModelOption {
  name: string;
  displayName: string;
  description: string;
  dollarSigns?: number;
  temperature?: number;
  tag?: string;
  tagColor?: string;
  maxOutputTokens?: number;
  contextWindow?: number;
}

export const MODEL_OPTIONS: Record<string, ModelOption[]> = {
  openai: [
    // https://platform.openai.com/docs/models/gpt-5.1
    {
      name: "gpt-5.1",
      displayName: "GPT 5.1",
      description:
        "OpenAI's flagship model- smarter, faster, and more conversational",
      // Technically it's 128k but OpenAI errors if you set max_tokens instead of max_completion_tokens
      maxOutputTokens: undefined,
      contextWindow: 400_000,
      // Requires temperature to be default value (1)
      temperature: 1,
      dollarSigns: 3,
    },
    // https://platform.openai.com/docs/models/gpt-5.1-codex
    {
      name: "gpt-5.1-codex",
      displayName: "GPT 5.1 Codex",
      description: "OpenAI's advanced coding workflows",
      // Technically it's 128k but OpenAI errors if you set max_tokens instead of max_completion_tokens
      maxOutputTokens: undefined,
      contextWindow: 400_000,
      // Requires temperature to be default value (1)
      temperature: 1,
      dollarSigns: 3,
    },
    // https://platform.openai.com/docs/models/gpt-5.1-codex-mini
    {
      name: "gpt-5.1-codex-mini",
      displayName: "GPT 5.1 Codex Mini",
      description: "OpenAI's compact and efficient coding model",
      // Technically it's 128k but OpenAI errors if you set max_tokens instead of max_completion_tokens
      maxOutputTokens: undefined,
      contextWindow: 400_000,
      // Requires temperature to be default value (1)
      temperature: 1,
      dollarSigns: 2,
    },

    // https://platform.openai.com/docs/models/gpt-5
    {
      name: "gpt-5",
      displayName: "GPT 5",
      description: "OpenAI's flagship model",
      // Technically it's 128k but OpenAI errors if you set max_tokens instead of max_completion_tokens
      maxOutputTokens: undefined,
      contextWindow: 400_000,
      // Requires temperature to be default value (1)
      temperature: 1,
      dollarSigns: 3,
    },
    // https://platform.openai.com/docs/models/gpt-5-codex
    {
      name: "gpt-5-codex",
      displayName: "GPT 5 Codex",
      description: "OpenAI's flagship model optimized for coding",
      // Technically it's 128k but OpenAI errors if you set max_tokens instead of max_completion_tokens
      maxOutputTokens: undefined,
      contextWindow: 400_000,
      // Requires temperature to be default value (1)
      temperature: 1,
      dollarSigns: 3,
    },
    // https://platform.openai.com/docs/models/gpt-5-mini
    {
      name: "gpt-5-mini",
      displayName: "GPT 5 Mini",
      description: "OpenAI's lightweight, but intelligent model",
      // Technically it's 128k but OpenAI errors if you set max_tokens instead of max_completion_tokens
      maxOutputTokens: undefined,
      contextWindow: 400_000,
      // Requires temperature to be default value (1)
      temperature: 1,
      dollarSigns: 2,
    },
    // https://platform.openai.com/docs/models/gpt-5-nano
    {
      name: "gpt-5-nano",
      displayName: "GPT 5 Nano",
      description: "Fastest, most cost-efficient version of GPT-5",
      // Technically it's 128k but OpenAI errors if you set max_tokens instead of max_completion_tokens
      maxOutputTokens: undefined,
      contextWindow: 400_000,
      // Requires temperature to be default value (1)
      temperature: 1,
      dollarSigns: 1,
    },
    // https://platform.openai.com/docs/models/o4-mini
    {
      name: "o4-mini",
      displayName: "o4 mini",
      description: "Reasoning model",
      // Technically the max output tokens is 100k, *however* if the user has a lot of input tokens,
      // then setting a high max output token will cause the request to fail because
      // the max output tokens is *included* in the context window limit.
      maxOutputTokens: 32_000,
      contextWindow: 200_000,
      temperature: 0,
      dollarSigns: 2,
    },
  ],
  // https://docs.anthropic.com/en/docs/about-claude/models/all-models#model-comparison-table
  anthropic: [
    {
      name: "claude-sonnet-4-5-20250929",
      displayName: "Claude 4.5 Sonnet",
      description:
        "Anthropic's best model for coding (note: >200k tokens is very expensive!)",
      // Set to 32k since context window is 1M tokens
      maxOutputTokens: 32_000,
      contextWindow: 1_000_000,
      temperature: 0,
      dollarSigns: 5,
    },
    {
      name: "claude-sonnet-4-20250514",
      displayName: "Claude 4 Sonnet",
      description: "Excellent coder (note: >200k tokens is very expensive!)",
      // Set to 32k since context window is 1M tokens
      maxOutputTokens: 32_000,
      contextWindow: 1_000_000,
      temperature: 0,
      dollarSigns: 5,
    },
    {
      name: "claude-3-7-sonnet-latest",
      displayName: "Claude 3.7 Sonnet",
      description: "Excellent coder",
      // Technically the max output tokens is 64k, *however* if the user has a lot of input tokens,
      // then setting a high max output token will cause the request to fail because
      // the max output tokens is *included* in the context window limit, see:
      // https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking#max-tokens-and-context-window-size-with-extended-thinking
      maxOutputTokens: 16_000,
      contextWindow: 200_000,
      temperature: 0,
      dollarSigns: 4,
    },
    {
      name: "claude-3-5-sonnet-20241022",
      displayName: "Claude 3.5 Sonnet",
      description: "Good coder, excellent at following instructions",
      maxOutputTokens: 8_000,
      contextWindow: 200_000,
      temperature: 0,
      dollarSigns: 4,
    },
    {
      name: "claude-3-5-haiku-20241022",
      displayName: "Claude 3.5 Haiku",
      description: "Lightweight coder",
      maxOutputTokens: 8_000,
      contextWindow: 200_000,
      temperature: 0,
      dollarSigns: 2,
    },
  ],
  google: [
    // https://ai.google.dev/gemini-api/docs/models#gemini-3-pro
    {
      name: "gemini-3-pro-preview",
      displayName: "Gemini 3 Pro (Preview)",
      description: "Google's latest Gemini model",
      // See Flash 2.5 comment below (go 1 below just to be safe, even though it seems OK now).
      maxOutputTokens: 65_536 - 1,
      // Gemini context window = input token + output token
      contextWindow: 1_048_576,
      temperature: 1.0,
      dollarSigns: 4,
    },
    // https://ai.google.dev/gemini-api/docs/models#gemini-2.5-pro-preview-03-25
    {
      name: "gemini-2.5-pro",
      displayName: "Gemini 2.5 Pro",
      description: "Google's Gemini 2.5 Pro model",
      // See Flash 2.5 comment below (go 1 below just to be safe, even though it seems OK now).
      maxOutputTokens: 65_536 - 1,
      // Gemini context window = input token + output token
      contextWindow: 1_048_576,
      temperature: 0,
      dollarSigns: 3,
    },
    // https://ai.google.dev/gemini-api/docs/models#gemini-2.5-flash-preview
    {
      name: "gemini-flash-latest",
      displayName: "Gemini 2.5 Flash",
      description: "Google's Gemini 2.5 Flash model (free tier available)",
      // Weirdly for Vertex AI, the output token limit is *exclusive* of the stated limit.
      maxOutputTokens: 65_536 - 1,
      // Gemini context window = input token + output token
      contextWindow: 1_048_576,
      temperature: 0,
      dollarSigns: 2,
    },
  ],
  vertex: [
    // Vertex Gemini 2.5 Pro
    {
      name: "gemini-2.5-pro",
      displayName: "Gemini 2.5 Pro",
      description: "Vertex Gemini 2.5 Pro",
      maxOutputTokens: 65_536 - 1,
      contextWindow: 1_048_576,
      temperature: 0,
    },
    // Vertex Gemini 2.5 Flash
    {
      name: "gemini-flash-latest",
      displayName: "Gemini 2.5 Flash",
      description: "Vertex Gemini 2.5 Flash",
      maxOutputTokens: 65_536 - 1,
      contextWindow: 1_048_576,
      temperature: 0,
    },
  ],
  openrouter: [
    {
      name: "qwen/qwen3-coder:free",
      displayName: "Qwen3 Coder (free)",
      description: "Use for free (data may be used for training)",
      maxOutputTokens: 32_000,
      contextWindow: 262_000,
      temperature: 0,
      dollarSigns: 0,
    },
    // https://openrouter.ai/deepseek/deepseek-chat-v3-0324:free
    {
      name: "deepseek/deepseek-chat-v3.1:free",
      displayName: "DeepSeek v3.1 (free)",
      description: "Use for free (data may be used for training)",
      maxOutputTokens: 32_000,
      contextWindow: 128_000,
      temperature: 0,
      dollarSigns: 0,
    },
    {
      name: "deepseek/deepseek-chat-v3-0324:free",
      displayName: "DeepSeek v3 (free)",
      description: "Use for free (data may be used for training)",
      maxOutputTokens: 32_000,
      contextWindow: 128_000,
      temperature: 0,
      dollarSigns: 0,
    },
    {
      name: "z-ai/glm-4.6",
      displayName: "GLM 4.6",
      description: "Z-AI's best coding model",
      maxOutputTokens: 32_000,
      contextWindow: 200_000,
      temperature: 0,
      dollarSigns: 2,
    },
    {
      name: "qwen/qwen3-coder",
      displayName: "Qwen3 Coder",
      description: "Qwen's best coding model",
      maxOutputTokens: 32_000,
      contextWindow: 262_000,
      temperature: 0,
      dollarSigns: 2,
    },
    {
      name: "deepseek/deepseek-chat-v3.1",
      displayName: "DeepSeek v3.1",
      description: "Strong cost-effective model with optional thinking",
      maxOutputTokens: 32_000,
      contextWindow: 128_000,
      temperature: 0,
      dollarSigns: 2,
    },
    // https://openrouter.ai/moonshotai/kimi-k2
    {
      name: "moonshotai/kimi-k2-0905",
      displayName: "Kimi K2",
      description: "Powerful cost-effective model (updated to 0905)",
      maxOutputTokens: 32_000,
      contextWindow: 256_000,
      temperature: 0,
      dollarSigns: 2,
    },
  ],
  auto: [
    {
      name: "auto",
      displayName: "Auto",
      description: "Automatically selects the best model",
      tag: "Default",
      maxOutputTokens: 32_000,
      contextWindow: 1_000_000,
      temperature: 0,
    },
    {
      name: "free",
      displayName: "Free (OpenRouter)",
      description: "Selects from one of the free OpenRouter models",
      tag: "Free",
      maxOutputTokens: 32_000,
      contextWindow: 128_000,
      temperature: 0,
    },
    {
      name: "turbo",
      displayName: "Turbo",
      description: "Use very fast open-source frontier models",
      maxOutputTokens: 32_000,
      contextWindow: 256_000,
      temperature: 0,
      tag: "Fast",
      tagColor: "bg-rose-800 text-white",
    },
    {
      name: "value",
      displayName: "Super Value",
      description: "Uses the most cost-effective models available",
      maxOutputTokens: 32_000,
      contextWindow: 256_000,
      temperature: 0,
      tag: "Budget",
      tagColor: "bg-emerald-700 text-white",
    },
  ],
  azure: [
    {
      name: "gpt-5.1",
      displayName: "GPT-5.1",
      description: "Azure OpenAI GPT-5.1 model",
      // See OpenAI comment above
      // maxOutputTokens: 128_000,
      contextWindow: 400_000,
      temperature: 1,
    },
    {
      name: "gpt-5.1-codex",
      displayName: "GPT-5.1 Codex",
      description: "Azure OpenAI GPT-5.1 Codex model",
      // See OpenAI comment above
      // maxOutputTokens: 128_000,
      contextWindow: 400_000,
      temperature: 1,
    },
    {
      name: "gpt-5.1-codex-mini",
      displayName: "GPT-5.1 Codex Mini",
      description: "Azure OpenAI GPT-5.1 Codex Mini model",
      // See OpenAI comment above
      // maxOutputTokens: 128_000,
      contextWindow: 400_000,
      temperature: 1,
    },
    {
      name: "gpt-5-codex",
      displayName: "GPT-5 Codex",
      description: "Azure OpenAI GPT-5 Codex model",
      // See OpenAI comment above
      // maxOutputTokens: 128_000,
      contextWindow: 400_000,
      temperature: 1,
    },
    {
      name: "gpt-5",
      displayName: "GPT-5",
      description: "Azure OpenAI GPT-5 model with reasoning capabilities",
      // See OpenAI comment above
      // maxOutputTokens: 128_000,
      contextWindow: 400_000,
      temperature: 1,
    },
    {
      name: "gpt-5-mini",
      displayName: "GPT-5 Mini",
      description: "Azure OpenAI GPT-5 Mini model",
      // See OpenAI comment above
      // maxOutputTokens: 128_000,
      contextWindow: 400_000,
      temperature: 1,
    },
    {
      name: "gpt-5-nano",
      displayName: "GPT-5 Nano",
      description: "Azure OpenAI GPT-5 Nano model",
      // See OpenAI comment above
      // maxOutputTokens: 128_000,
      contextWindow: 400_000,
      temperature: 1,
    },
    {
      name: "gpt-5-chat",
      displayName: "GPT-5 Chat",
      description: "Azure OpenAI GPT-5 Chat model",
      // See OpenAI comment above
      // maxOutputTokens: 16_384,
      contextWindow: 128_000,
      temperature: 1,
    },
  ],
  xai: [
    // https://docs.x.ai/docs/models
    {
      name: "grok-code-fast-1",
      displayName: "Grok Code Fast",
      description: "Fast coding model",
      maxOutputTokens: 32_000,
      contextWindow: 256_000,
      temperature: 0,
      dollarSigns: 1,
    },
    {
      name: "grok-4",
      displayName: "Grok 4",
      description: "Most capable coding model",
      maxOutputTokens: 32_000,
      contextWindow: 256_000,
      temperature: 0,
      dollarSigns: 4,
    },
    {
      name: "grok-3",
      displayName: "Grok 3",
      description: "Powerful coding model",
      maxOutputTokens: 32_000,
      contextWindow: 131_072,
      temperature: 0,
      dollarSigns: 4,
    },
  ],
  bedrock: [
    {
      name: "us.anthropic.claude-sonnet-4-5-20250929-v1:0",
      displayName: "Claude 4.5 Sonnet",
      description:
        "Anthropic's best model for coding (note: >200k tokens is very expensive!)",
      maxOutputTokens: 32_000,
      contextWindow: 1_000_000,
      temperature: 0,
    },
    {
      name: "us.anthropic.claude-sonnet-4-20250514-v1:0",
      displayName: "Claude 4 Sonnet",
      description: "Excellent coder (note: >200k tokens is very expensive!)",
      maxOutputTokens: 32_000,
      contextWindow: 1_000_000,
      temperature: 0,
    },
    {
      name: "us.anthropic.claude-3-7-sonnet-20250219-v1:0",
      displayName: "Claude 3.7 Sonnet",
      description: "Excellent coder",
      maxOutputTokens: 16_000,
      contextWindow: 200_000,
      temperature: 0,
    },
    {
      name: "us.anthropic.claude-3-5-sonnet-20241022-v2:0",
      displayName: "Claude 3.5 Sonnet",
      description: "Good coder, excellent at following instructions",
      maxOutputTokens: 8_000,
      contextWindow: 200_000,
      temperature: 0,
    },
  ],
  cody: [
    {
      name: "gpt-4-0613",
      displayName: "GPT-4 (0613)",
      description: "GPT-4 model via Cody API",
      maxOutputTokens: 8_000,
      contextWindow: 128_000,
      temperature: 1,
      dollarSigns: 3,
    },
    {
      name: "gpt-4",
      displayName: "GPT-4",
      description: "GPT-4 model via Cody API",
      maxOutputTokens: 8_000,
      contextWindow: 128_000,
      temperature: 1,
      dollarSigns: 3,
    },
    {
      name: "gpt-3.5-turbo",
      displayName: "GPT-3.5 Turbo",
      description: "GPT-3.5 Turbo model via Cody API",
      maxOutputTokens: 4_000,
      contextWindow: 16_000,
      temperature: 1,
      dollarSigns: 1,
    },
    {
      name: "gpt-5.1-chat-latest",
      displayName: "GPT-5.1 Chat (Latest)",
      description: "Latest GPT-5.1 Chat model via Cody API",
      maxOutputTokens: 32_000,
      contextWindow: 400_000,
      temperature: 1,
      dollarSigns: 4,
    },
    {
      name: "gpt-5.1-2025-11-13",
      displayName: "GPT-5.1 (2025-11-13)",
      description: "GPT-5.1 snapshot from 2025-11-13 via Cody API",
      maxOutputTokens: 32_000,
      contextWindow: 400_000,
      temperature: 1,
      dollarSigns: 4,
    },
    {
      name: "gpt-5.1",
      displayName: "GPT-5.1",
      description: "GPT-5.1 model via Cody API",
      maxOutputTokens: 32_000,
      contextWindow: 400_000,
      temperature: 1,
      dollarSigns: 4,
    },
    {
      name: "gpt-3.5-turbo-instruct",
      displayName: "GPT-3.5 Turbo Instruct",
      description: "GPT-3.5 Turbo Instruct model via Cody API",
      maxOutputTokens: 4_000,
      contextWindow: 16_000,
      temperature: 1,
      dollarSigns: 1,
    },
    {
      name: "gpt-3.5-turbo-instruct-0914",
      displayName: "GPT-3.5 Turbo Instruct (0914)",
      description: "GPT-3.5 Turbo Instruct snapshot from 0914 via Cody API",
      maxOutputTokens: 4_000,
      contextWindow: 16_000,
      temperature: 1,
      dollarSigns: 1,
    },
    {
      name: "gpt-4-1106-preview",
      displayName: "GPT-4 Turbo Preview (1106)",
      description: "GPT-4 Turbo Preview from 1106 via Cody API",
      maxOutputTokens: 4_000,
      contextWindow: 128_000,
      temperature: 1,
      dollarSigns: 3,
    },
    {
      name: "gpt-3.5-turbo-1106",
      displayName: "GPT-3.5 Turbo (1106)",
      description: "GPT-3.5 Turbo snapshot from 1106 via Cody API",
      maxOutputTokens: 4_000,
      contextWindow: 16_000,
      temperature: 1,
      dollarSigns: 1,
    },
    {
      name: "gpt-4-0125-preview",
      displayName: "GPT-4 Turbo Preview (0125)",
      description: "GPT-4 Turbo Preview from 0125 via Cody API",
      maxOutputTokens: 4_000,
      contextWindow: 128_000,
      temperature: 1,
      dollarSigns: 3,
    },
    {
      name: "gpt-4-turbo-preview",
      displayName: "GPT-4 Turbo Preview",
      description: "GPT-4 Turbo Preview via Cody API",
      maxOutputTokens: 4_000,
      contextWindow: 128_000,
      temperature: 1,
      dollarSigns: 3,
    },
    {
      name: "gpt-3.5-turbo-0125",
      displayName: "GPT-3.5 Turbo (0125)",
      description: "GPT-3.5 Turbo snapshot from 0125 via Cody API",
      maxOutputTokens: 4_000,
      contextWindow: 16_000,
      temperature: 1,
      dollarSigns: 1,
    },
    {
      name: "gpt-4-turbo",
      displayName: "GPT-4 Turbo",
      description: "GPT-4 Turbo model via Cody API",
      maxOutputTokens: 4_000,
      contextWindow: 128_000,
      temperature: 1,
      dollarSigns: 3,
    },
    {
      name: "gpt-4-turbo-2024-04-09",
      displayName: "GPT-4 Turbo (2024-04-09)",
      description: "GPT-4 Turbo snapshot from 2024-04-09 via Cody API",
      maxOutputTokens: 4_000,
      contextWindow: 128_000,
      temperature: 1,
      dollarSigns: 3,
    },
    {
      name: "gpt-4o",
      displayName: "GPT-4o",
      description: "GPT-4o model via Cody API",
      maxOutputTokens: 16_000,
      contextWindow: 128_000,
      temperature: 1,
      dollarSigns: 3,
    },
    {
      name: "gpt-4o-2024-05-13",
      displayName: "GPT-4o (2024-05-13)",
      description: "GPT-4o snapshot from 2024-05-13 via Cody API",
      maxOutputTokens: 16_000,
      contextWindow: 128_000,
      temperature: 1,
      dollarSigns: 3,
    },
    {
      name: "gpt-4o-mini-2024-07-18",
      displayName: "GPT-4o Mini (2024-07-18)",
      description: "GPT-4o Mini snapshot from 2024-07-18 via Cody API",
      maxOutputTokens: 16_000,
      contextWindow: 128_000,
      temperature: 1,
      dollarSigns: 2,
    },
    {
      name: "gpt-4o-mini",
      displayName: "GPT-4o Mini",
      description: "GPT-4o Mini model via Cody API",
      maxOutputTokens: 16_000,
      contextWindow: 128_000,
      temperature: 1,
      dollarSigns: 2,
    },
    {
      name: "gpt-4o-2024-08-06",
      displayName: "GPT-4o (2024-08-06)",
      description: "GPT-4o snapshot from 2024-08-06 via Cody API",
      maxOutputTokens: 16_000,
      contextWindow: 128_000,
      temperature: 1,
      dollarSigns: 3,
    },
    {
      name: "chatgpt-4o-latest",
      displayName: "ChatGPT-4o (Latest)",
      description: "Latest ChatGPT-4o model via Cody API",
      maxOutputTokens: 16_000,
      contextWindow: 128_000,
      temperature: 1,
      dollarSigns: 3,
    },
    {
      name: "o1-2024-12-17",
      displayName: "o1 (2024-12-17)",
      description: "o1 snapshot from 2024-12-17 via Cody API",
      maxOutputTokens: 32_000,
      contextWindow: 200_000,
      temperature: 1,
      dollarSigns: 4,
    },
    {
      name: "o1",
      displayName: "o1",
      description: "o1 model via Cody API",
      maxOutputTokens: 32_000,
      contextWindow: 200_000,
      temperature: 1,
      dollarSigns: 4,
    },
    {
      name: "o3-mini",
      displayName: "o3 Mini",
      description: "o3 Mini model via Cody API",
      maxOutputTokens: 32_000,
      contextWindow: 200_000,
      temperature: 1,
      dollarSigns: 3,
    },
    {
      name: "o3-mini-2025-01-31",
      displayName: "o3 Mini (2025-01-31)",
      description: "o3 Mini snapshot from 2025-01-31 via Cody API",
      maxOutputTokens: 32_000,
      contextWindow: 200_000,
      temperature: 1,
      dollarSigns: 3,
    },
    {
      name: "o3-2025-04-16",
      displayName: "o3 (2025-04-16)",
      description: "o3 snapshot from 2025-04-16 via Cody API",
      maxOutputTokens: 32_000,
      contextWindow: 200_000,
      temperature: 1,
      dollarSigns: 5,
    },
    {
      name: "o3",
      displayName: "o3",
      description: "o3 model via Cody API",
      maxOutputTokens: 32_000,
      contextWindow: 200_000,
      temperature: 1,
      dollarSigns: 5,
    },
    {
      name: "gpt-4.1-2025-04-14",
      displayName: "GPT-4.1 (2025-04-14)",
      description: "GPT-4.1 snapshot from 2025-04-14 via Cody API",
      maxOutputTokens: 32_000,
      contextWindow: 400_000,
      temperature: 1,
      dollarSigns: 4,
    },
    {
      name: "gpt-4.1",
      displayName: "GPT-4.1",
      description: "GPT-4.1 model via Cody API",
      maxOutputTokens: 32_000,
      contextWindow: 400_000,
      temperature: 1,
      dollarSigns: 4,
    },
    {
      name: "gpt-4.1-mini-2025-04-14",
      displayName: "GPT-4.1 Mini (2025-04-14)",
      description: "GPT-4.1 Mini snapshot from 2025-04-14 via Cody API",
      maxOutputTokens: 32_000,
      contextWindow: 400_000,
      temperature: 1,
      dollarSigns: 3,
    },
    {
      name: "gpt-4.1-mini",
      displayName: "GPT-4.1 Mini",
      description: "GPT-4.1 Mini model via Cody API",
      maxOutputTokens: 32_000,
      contextWindow: 400_000,
      temperature: 1,
      dollarSigns: 3,
    },
    {
      name: "gpt-4.1-nano-2025-04-14",
      displayName: "GPT-4.1 Nano (2025-04-14)",
      description: "GPT-4.1 Nano snapshot from 2025-04-14 via Cody API",
      maxOutputTokens: 32_000,
      contextWindow: 400_000,
      temperature: 1,
      dollarSigns: 2,
    },
    {
      name: "gpt-4.1-nano",
      displayName: "GPT-4.1 Nano",
      description: "GPT-4.1 Nano model via Cody API",
      maxOutputTokens: 32_000,
      contextWindow: 400_000,
      temperature: 1,
      dollarSigns: 2,
    },
    {
      name: "gpt-5-chat-latest",
      displayName: "GPT-5 Chat (Latest)",
      description: "Latest GPT-5 Chat model via Cody API",
      maxOutputTokens: 32_000,
      contextWindow: 400_000,
      temperature: 1,
      dollarSigns: 5,
    },
    {
      name: "gpt-5-2025-08-07",
      displayName: "GPT-5 (2025-08-07)",
      description: "GPT-5 snapshot from 2025-08-07 via Cody API",
      maxOutputTokens: 32_000,
      contextWindow: 400_000,
      temperature: 1,
      dollarSigns: 5,
    },
    {
      name: "gpt-5",
      displayName: "GPT-5",
      description: "GPT-5 model via Cody API",
      maxOutputTokens: 32_000,
      contextWindow: 400_000,
      temperature: 1,
      dollarSigns: 5,
    },
    {
      name: "gpt-5-mini-2025-08-07",
      displayName: "GPT-5 Mini (2025-08-07)",
      description: "GPT-5 Mini snapshot from 2025-08-07 via Cody API",
      maxOutputTokens: 32_000,
      contextWindow: 400_000,
      temperature: 1,
      dollarSigns: 4,
    },
    {
      name: "gpt-5-mini",
      displayName: "GPT-5 Mini",
      description: "GPT-5 Mini model via Cody API",
      maxOutputTokens: 32_000,
      contextWindow: 400_000,
      temperature: 1,
      dollarSigns: 4,
    },
    {
      name: "gpt-5-nano-2025-08-07",
      displayName: "GPT-5 Nano (2025-08-07)",
      description: "GPT-5 Nano snapshot from 2025-08-07 via Cody API",
      maxOutputTokens: 32_000,
      contextWindow: 400_000,
      temperature: 1,
      dollarSigns: 3,
    },
    {
      name: "gpt-5-nano",
      displayName: "GPT-5 Nano",
      description: "GPT-5 Nano model via Cody API",
      maxOutputTokens: 32_000,
      contextWindow: 400_000,
      temperature: 1,
      dollarSigns: 3,
    },
    {
      name: "gpt-5-pro-2025-10-06",
      displayName: "GPT-5 Pro (2025-10-06)",
      description: "GPT-5 Pro snapshot from 2025-10-06 via Cody API",
      maxOutputTokens: 32_000,
      contextWindow: 400_000,
      temperature: 1,
      dollarSigns: 5,
    },
    {
      name: "gpt-5-pro",
      displayName: "GPT-5 Pro",
      description: "GPT-5 Pro model via Cody API",
      maxOutputTokens: 32_000,
      contextWindow: 400_000,
      temperature: 1,
      dollarSigns: 5,
    },
  ],
};

export const TURBO_MODELS: LanguageModel[] = [
  {
    apiName: "glm-4.6:turbo",
    displayName: "GLM 4.6",
    description: "Strong coding model (very fast)",
    maxOutputTokens: 32_000,
    contextWindow: 131_000,
    temperature: 0,
    dollarSigns: 3,
    type: "cloud",
  },
  {
    apiName: "kimi-k2:turbo",
    displayName: "Kimi K2",
    description: "Kimi 0905 update (fast)",
    maxOutputTokens: 16_000,
    contextWindow: 256_000,
    temperature: 0,
    dollarSigns: 2,
    type: "cloud",
  },
];

export const FREE_OPENROUTER_MODEL_NAMES = MODEL_OPTIONS.openrouter
  .filter((model) => model.name.endsWith(":free"))
  .map((model) => model.name);

export const PROVIDER_TO_ENV_VAR: Record<string, string> = {
  openai: "OPENAI_API_KEY",
  anthropic: "ANTHROPIC_API_KEY",
  google: "GEMINI_API_KEY",
  openrouter: "OPENROUTER_API_KEY",
  azure: "AZURE_API_KEY",
  xai: "XAI_API_KEY",
  bedrock: "AWS_BEARER_TOKEN_BEDROCK",
  cody: "CODY_API_KEY",
};

export const CLOUD_PROVIDERS: Record<
  string,
  {
    displayName: string;
    hasFreeTier?: boolean;
    websiteUrl?: string;
    gatewayPrefix: string;
    secondary?: boolean;
  }
> = {
  openai: {
    displayName: "OpenAI",
    hasFreeTier: false,
    websiteUrl: "https://platform.openai.com/api-keys",
    gatewayPrefix: "",
  },
  anthropic: {
    displayName: "Anthropic",
    hasFreeTier: false,
    websiteUrl: "https://console.anthropic.com/settings/keys",
    gatewayPrefix: "anthropic/",
  },
  google: {
    displayName: "Google",
    hasFreeTier: true,
    websiteUrl: "https://aistudio.google.com/app/apikey",
    gatewayPrefix: "gemini/",
  },
  vertex: {
    displayName: "Google Vertex AI",
    hasFreeTier: false,
    websiteUrl: "https://console.cloud.google.com/vertex-ai",
    // Use the same gateway prefix as Google Gemini for OliveAgent Pro compatibility.
    gatewayPrefix: "gemini/",
    secondary: true,
  },
  openrouter: {
    displayName: "OpenRouter",
    hasFreeTier: true,
    websiteUrl: "https://openrouter.ai/settings/keys",
    gatewayPrefix: "openrouter/",
  },
  auto: {
    displayName: "OliveAgent",
    websiteUrl: "https://academy.oliveagent.sh/settings",
    gatewayPrefix: "oliveagent/",
  },
  azure: {
    displayName: "Azure OpenAI",
    hasFreeTier: false,
    websiteUrl: "https://portal.azure.com/",
    gatewayPrefix: "",
    secondary: true,
  },
  xai: {
    displayName: "xAI",
    hasFreeTier: false,
    websiteUrl: "https://console.x.ai/",
    gatewayPrefix: "xai/",
    secondary: true,
  },
  bedrock: {
    displayName: "AWS Bedrock",
    hasFreeTier: false,
    websiteUrl: "https://console.aws.amazon.com/bedrock/",
    gatewayPrefix: "bedrock/",
    secondary: true,
  },
  cody: {
    displayName: "Cody AI",
    hasFreeTier: false,
    websiteUrl: "http://34.28.145.62:4000",
    gatewayPrefix: "",
  },
};

export const LOCAL_PROVIDERS: Record<
  string,
  {
    displayName: string;
    hasFreeTier: boolean;
  }
> = {
  ollama: {
    displayName: "Ollama",
    hasFreeTier: true,
  },
  lmstudio: {
    displayName: "LM Studio",
    hasFreeTier: true,
  },
};
