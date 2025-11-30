import { normalizePath } from "../../../shared/normalizePath";
import log from "electron-log";
import { SqlQuery } from "../../lib/schemas";

const logger = log.scope("oliveagent_tag_parser");

export function getOliveAgentWriteTags(fullResponse: string): {
  path: string;
  content: string;
  description?: string;
}[] {
  const oliveagentWriteRegex = /<oliveagent-write([^>]*)>([\s\S]*?)<\/oliveagent-write>/gi;
  const pathRegex = /path="([^"]+)"/;
  const descriptionRegex = /description="([^"]+)"/;

  let match;
  const tags: { path: string; content: string; description?: string }[] = [];

  while ((match = oliveagentWriteRegex.exec(fullResponse)) !== null) {
    const attributesString = match[1];
    let content = match[2].trim();

    const pathMatch = pathRegex.exec(attributesString);
    const descriptionMatch = descriptionRegex.exec(attributesString);

    if (pathMatch && pathMatch[1]) {
      const path = pathMatch[1];
      const description = descriptionMatch?.[1];

      const contentLines = content.split("\n");
      if (contentLines[0]?.startsWith("```")) {
        contentLines.shift();
      }
      if (contentLines[contentLines.length - 1]?.startsWith("```")) {
        contentLines.pop();
      }
      content = contentLines.join("\n");

      tags.push({ path: normalizePath(path), content, description });
    } else {
      logger.warn(
        "Found <oliveagent-write> tag without a valid 'path' attribute:",
        match[0],
      );
    }
  }
  return tags;
}

export function getOliveAgentRenameTags(fullResponse: string): {
  from: string;
  to: string;
}[] {
  const oliveagentRenameRegex =
    /<oliveagent-rename from="([^"]+)" to="([^"]+)"[^>]*>([\s\S]*?)<\/oliveagent-rename>/g;
  let match;
  const tags: { from: string; to: string }[] = [];
  while ((match = oliveagentRenameRegex.exec(fullResponse)) !== null) {
    tags.push({
      from: normalizePath(match[1]),
      to: normalizePath(match[2]),
    });
  }
  return tags;
}

export function getOliveAgentDeleteTags(fullResponse: string): string[] {
  const oliveagentDeleteRegex =
    /<oliveagent-delete path="([^"]+)"[^>]*>([\s\S]*?)<\/oliveagent-delete>/g;
  let match;
  const paths: string[] = [];
  while ((match = oliveagentDeleteRegex.exec(fullResponse)) !== null) {
    paths.push(normalizePath(match[1]));
  }
  return paths;
}

export function getOliveAgentAddDependencyTags(fullResponse: string): string[] {
  const oliveagentAddDependencyRegex =
    /<oliveagent-add-dependency packages="([^"]+)">[^<]*<\/oliveagent-add-dependency>/g;
  let match;
  const packages: string[] = [];
  while ((match = oliveagentAddDependencyRegex.exec(fullResponse)) !== null) {
    packages.push(...match[1].split(" "));
  }
  return packages;
}

export function getOliveAgentChatSummaryTag(fullResponse: string): string | null {
  const oliveagentChatSummaryRegex =
    /<oliveagent-chat-summary>([\s\S]*?)<\/oliveagent-chat-summary>/g;
  const match = oliveagentChatSummaryRegex.exec(fullResponse);
  if (match && match[1]) {
    return match[1].trim();
  }
  return null;
}

export function getOliveAgentExecuteSqlTags(fullResponse: string): SqlQuery[] {
  const oliveagentExecuteSqlRegex =
    /<oliveagent-execute-sql([^>]*)>([\s\S]*?)<\/oliveagent-execute-sql>/g;
  const descriptionRegex = /description="([^"]+)"/;
  let match;
  const queries: { content: string; description?: string }[] = [];

  while ((match = oliveagentExecuteSqlRegex.exec(fullResponse)) !== null) {
    const attributesString = match[1] || "";
    let content = match[2].trim();
    const descriptionMatch = descriptionRegex.exec(attributesString);
    const description = descriptionMatch?.[1];

    // Handle markdown code blocks if present
    const contentLines = content.split("\n");
    if (contentLines[0]?.startsWith("```")) {
      contentLines.shift();
    }
    if (contentLines[contentLines.length - 1]?.startsWith("```")) {
      contentLines.pop();
    }
    content = contentLines.join("\n");

    queries.push({ content, description });
  }

  return queries;
}

export function getOliveAgentCommandTags(fullResponse: string): string[] {
  const oliveagentCommandRegex =
    /<oliveagent-command type="([^"]+)"[^>]*><\/oliveagent-command>/g;
  let match;
  const commands: string[] = [];

  while ((match = oliveagentCommandRegex.exec(fullResponse)) !== null) {
    commands.push(match[1]);
  }

  return commands;
}

export function getOliveAgentSearchReplaceTags(fullResponse: string): {
  path: string;
  content: string;
  description?: string;
}[] {
  const oliveagentSearchReplaceRegex =
    /<oliveagent-search-replace([^>]*)>([\s\S]*?)<\/oliveagent-search-replace>/gi;
  const pathRegex = /path="([^"]+)"/;
  const descriptionRegex = /description="([^"]+)"/;

  let match;
  const tags: { path: string; content: string; description?: string }[] = [];

  while ((match = oliveagentSearchReplaceRegex.exec(fullResponse)) !== null) {
    const attributesString = match[1] || "";
    let content = match[2].trim();

    const pathMatch = pathRegex.exec(attributesString);
    const descriptionMatch = descriptionRegex.exec(attributesString);

    if (pathMatch && pathMatch[1]) {
      const path = pathMatch[1];
      const description = descriptionMatch?.[1];

      // Handle markdown code fences if present
      const contentLines = content.split("\n");
      if (contentLines[0]?.startsWith("```")) {
        contentLines.shift();
      }
      if (contentLines[contentLines.length - 1]?.startsWith("```")) {
        contentLines.pop();
      }
      content = contentLines.join("\n");

      tags.push({ path: normalizePath(path), content, description });
    } else {
      logger.warn(
        "Found <oliveagent-search-replace> tag without a valid 'path' attribute:",
        match[0],
      );
    }
  }
  return tags;
}
