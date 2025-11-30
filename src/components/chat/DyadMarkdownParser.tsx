import React, { useMemo } from "react";
import ReactMarkdown from "react-markdown";

import { OliveAgentWrite } from "./OliveAgentWrite";
import { OliveAgentRename } from "./DyadRename";
import { OliveAgentDelete } from "./DyadDelete";
import { OliveAgentAddDependency } from "./DyadAddDependency";
import { OliveAgentExecuteSql } from "./DyadExecuteSql";
import { OliveAgentAddIntegration } from "./DyadAddIntegration";
import { OliveAgentEdit } from "./DyadEdit";
import { OliveAgentSearchReplace } from "./DyadSearchReplace";
import { OliveAgentCodebaseContext } from "./DyadCodebaseContext";
import { OliveAgentThink } from "./DyadThink";
import { CodeHighlight } from "./CodeHighlight";
import { useAtomValue } from "jotai";
import { isStreamingByIdAtom, selectedChatIdAtom } from "@/atoms/chatAtoms";
import { CustomTagState } from "./stateTypes";
import { OliveAgentOutput } from "./DyadOutput";
import { OliveAgentProblemSummary } from "./DyadProblemSummary";
import { IpcClient } from "@/ipc/ipc_client";
import { OliveAgentMcpToolCall } from "./DyadMcpToolCall";
import { OliveAgentMcpToolResult } from "./DyadMcpToolResult";
import { OliveAgentWebSearchResult } from "./DyadWebSearchResult";
import { OliveAgentWebSearch } from "./DyadWebSearch";
import { OliveAgentWebCrawl } from "./DyadWebCrawl";
import { OliveAgentCodeSearchResult } from "./DyadCodeSearchResult";
import { OliveAgentCodeSearch } from "./DyadCodeSearch";
import { OliveAgentRead } from "./DyadRead";
import { mapActionToButton } from "./ChatInput";
import { SuggestedAction } from "@/lib/schemas";

interface OliveAgentMarkdownParserProps {
  content: string;
}

type CustomTagInfo = {
  tag: string;
  attributes: Record<string, string>;
  content: string;
  fullMatch: string;
  inProgress?: boolean;
};

type ContentPiece =
  | { type: "markdown"; content: string }
  | { type: "custom-tag"; tagInfo: CustomTagInfo };

const customLink = ({
  node: _node,
  ...props
}: {
  node?: any;
  [key: string]: any;
}) => (
  <a
    {...props}
    onClick={(e) => {
      const url = props.href;
      if (url) {
        e.preventDefault();
        IpcClient.getInstance().openExternalUrl(url);
      }
    }}
  />
);

export const VanillaMarkdownParser = ({ content }: { content: string }) => {
  return (
    <ReactMarkdown
      components={{
        code: CodeHighlight,
        a: customLink,
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

/**
 * Custom component to parse markdown content with OliveAgent-specific tags
 */
export const OliveAgentMarkdownParser: React.FC<OliveAgentMarkdownParserProps> = ({
  content,
}) => {
  const chatId = useAtomValue(selectedChatIdAtom);
  const isStreaming = useAtomValue(isStreamingByIdAtom).get(chatId!) ?? false;
  // Extract content pieces (markdown and custom tags)
  const contentPieces = useMemo(() => {
    return parseCustomTags(content);
  }, [content]);

  return (
    <>
      {contentPieces.map((piece, index) => (
        <React.Fragment key={index}>
          {piece.type === "markdown"
            ? piece.content && (
                <ReactMarkdown
                  components={{
                    code: CodeHighlight,
                    a: customLink,
                  }}
                >
                  {piece.content}
                </ReactMarkdown>
              )
            : renderCustomTag(piece.tagInfo, { isStreaming })}
        </React.Fragment>
      ))}
    </>
  );
};

/**
 * Pre-process content to handle unclosed custom tags
 * Adds closing tags at the end of the content for any unclosed custom tags
 * Assumes the opening tags are complete and valid
 * Returns the processed content and a map of in-progress tags
 */
function preprocessUnclosedTags(content: string): {
  processedContent: string;
  inProgressTags: Map<string, Set<number>>;
} {
  const customTagNames = [
    "oliveagent-write",
    "oliveagent-rename",
    "oliveagent-delete",
    "oliveagent-add-dependency",
    "oliveagent-execute-sql",
    "oliveagent-add-integration",
    "oliveagent-output",
    "oliveagent-problem-report",
    "oliveagent-chat-summary",
    "oliveagent-edit",
    "oliveagent-search-replace",
    "oliveagent-codebase-context",
    "oliveagent-web-search-result",
    "oliveagent-web-search",
    "oliveagent-web-crawl",
    "oliveagent-read",
    "think",
    "oliveagent-command",
    "oliveagent-mcp-tool-call",
    "oliveagent-mcp-tool-result",
  ];

  let processedContent = content;
  // Map to track which tags are in progress and their positions
  const inProgressTags = new Map<string, Set<number>>();

  // For each tag type, check if there are unclosed tags
  for (const tagName of customTagNames) {
    // Count opening and closing tags
    const openTagPattern = new RegExp(`<${tagName}(?:\\s[^>]*)?>`, "g");
    const closeTagPattern = new RegExp(`</${tagName}>`, "g");

    // Track the positions of opening tags
    const openingMatches: RegExpExecArray[] = [];
    let match;

    // Reset regex lastIndex to start from the beginning
    openTagPattern.lastIndex = 0;

    while ((match = openTagPattern.exec(processedContent)) !== null) {
      openingMatches.push({ ...match });
    }

    const openCount = openingMatches.length;
    const closeCount = (processedContent.match(closeTagPattern) || []).length;

    // If we have more opening than closing tags
    const missingCloseTags = openCount - closeCount;
    if (missingCloseTags > 0) {
      // Add the required number of closing tags at the end
      processedContent += Array(missingCloseTags)
        .fill(`</${tagName}>`)
        .join("");

      // Mark the last N tags as in progress where N is the number of missing closing tags
      const inProgressIndexes = new Set<number>();
      const startIndex = openCount - missingCloseTags;
      for (let i = startIndex; i < openCount; i++) {
        inProgressIndexes.add(openingMatches[i].index);
      }
      inProgressTags.set(tagName, inProgressIndexes);
    }
  }

  return { processedContent, inProgressTags };
}

/**
 * Parse the content to extract custom tags and markdown sections into a unified array
 */
function parseCustomTags(content: string): ContentPiece[] {
  const { processedContent, inProgressTags } = preprocessUnclosedTags(content);

  const customTagNames = [
    "oliveagent-write",
    "oliveagent-rename",
    "oliveagent-delete",
    "oliveagent-add-dependency",
    "oliveagent-execute-sql",
    "oliveagent-add-integration",
    "oliveagent-output",
    "oliveagent-problem-report",
    "oliveagent-chat-summary",
    "oliveagent-edit",
    "oliveagent-search-replace",
    "oliveagent-codebase-context",
    "oliveagent-web-search-result",
    "oliveagent-web-search",
    "oliveagent-web-crawl",
    "oliveagent-code-search-result",
    "oliveagent-code-search",
    "oliveagent-read",
    "think",
    "oliveagent-command",
    "oliveagent-mcp-tool-call",
    "oliveagent-mcp-tool-result",
  ];

  const tagPattern = new RegExp(
    `<(${customTagNames.join("|")})\\s*([^>]*)>(.*?)<\\/\\1>`,
    "gs",
  );

  const contentPieces: ContentPiece[] = [];
  let lastIndex = 0;
  let match;

  // Find all custom tags
  while ((match = tagPattern.exec(processedContent)) !== null) {
    const [fullMatch, tag, attributesStr, tagContent] = match;
    const startIndex = match.index;

    // Add the markdown content before this tag
    if (startIndex > lastIndex) {
      contentPieces.push({
        type: "markdown",
        content: processedContent.substring(lastIndex, startIndex),
      });
    }

    // Parse attributes
    const attributes: Record<string, string> = {};
    const attrPattern = /(\w+)="([^"]*)"/g;
    let attrMatch;
    while ((attrMatch = attrPattern.exec(attributesStr)) !== null) {
      attributes[attrMatch[1]] = attrMatch[2];
    }

    // Check if this tag was marked as in progress
    const tagInProgressSet = inProgressTags.get(tag);
    const isInProgress = tagInProgressSet?.has(startIndex);

    // Add the tag info
    contentPieces.push({
      type: "custom-tag",
      tagInfo: {
        tag,
        attributes,
        content: tagContent,
        fullMatch,
        inProgress: isInProgress || false,
      },
    });

    lastIndex = startIndex + fullMatch.length;
  }

  // Add the remaining markdown content
  if (lastIndex < processedContent.length) {
    contentPieces.push({
      type: "markdown",
      content: processedContent.substring(lastIndex),
    });
  }

  return contentPieces;
}

function getState({
  isStreaming,
  inProgress,
}: {
  isStreaming?: boolean;
  inProgress?: boolean;
}): CustomTagState {
  if (!inProgress) {
    return "finished";
  }
  return isStreaming ? "pending" : "aborted";
}

/**
 * Render a custom tag based on its type
 */
function renderCustomTag(
  tagInfo: CustomTagInfo,
  { isStreaming }: { isStreaming: boolean },
): React.ReactNode {
  const { tag, attributes, content, inProgress } = tagInfo;

  switch (tag) {
    case "oliveagent-read":
      return (
        <OliveAgentRead
          node={{
            properties: {
              path: attributes.path || "",
            },
          }}
        >
          {content}
        </OliveAgentRead>
      );
    case "oliveagent-web-search":
      return (
        <OliveAgentWebSearch
          node={{
            properties: {},
          }}
        >
          {content}
        </OliveAgentWebSearch>
      );
    case "oliveagent-web-crawl":
      return (
        <OliveAgentWebCrawl
          node={{
            properties: {},
          }}
        >
          {content}
        </OliveAgentWebCrawl>
      );
    case "oliveagent-code-search":
      return (
        <OliveAgentCodeSearch
          node={{
            properties: {},
          }}
        >
          {content}
        </OliveAgentCodeSearch>
      );
    case "oliveagent-code-search-result":
      return (
        <OliveAgentCodeSearchResult
          node={{
            properties: {},
          }}
        >
          {content}
        </OliveAgentCodeSearchResult>
      );
    case "oliveagent-web-search-result":
      return (
        <OliveAgentWebSearchResult
          node={{
            properties: {
              state: getState({ isStreaming, inProgress }),
            },
          }}
        >
          {content}
        </OliveAgentWebSearchResult>
      );
    case "think":
      return (
        <OliveAgentThink
          node={{
            properties: {
              state: getState({ isStreaming, inProgress }),
            },
          }}
        >
          {content}
        </OliveAgentThink>
      );
    case "oliveagent-write":
      return (
        <OliveAgentWrite
          node={{
            properties: {
              path: attributes.path || "",
              description: attributes.description || "",
              state: getState({ isStreaming, inProgress }),
            },
          }}
        >
          {content}
        </OliveAgentWrite>
      );

    case "oliveagent-rename":
      return (
        <OliveAgentRename
          node={{
            properties: {
              from: attributes.from || "",
              to: attributes.to || "",
            },
          }}
        >
          {content}
        </OliveAgentRename>
      );

    case "oliveagent-delete":
      return (
        <OliveAgentDelete
          node={{
            properties: {
              path: attributes.path || "",
            },
          }}
        >
          {content}
        </OliveAgentDelete>
      );

    case "oliveagent-add-dependency":
      return (
        <OliveAgentAddDependency
          node={{
            properties: {
              packages: attributes.packages || "",
            },
          }}
        >
          {content}
        </OliveAgentAddDependency>
      );

    case "oliveagent-execute-sql":
      return (
        <OliveAgentExecuteSql
          node={{
            properties: {
              state: getState({ isStreaming, inProgress }),
              description: attributes.description || "",
            },
          }}
        >
          {content}
        </OliveAgentExecuteSql>
      );

    case "oliveagent-add-integration":
      return (
        <OliveAgentAddIntegration
          node={{
            properties: {
              provider: attributes.provider || "",
            },
          }}
        >
          {content}
        </OliveAgentAddIntegration>
      );

    case "oliveagent-edit":
      return (
        <OliveAgentEdit
          node={{
            properties: {
              path: attributes.path || "",
              description: attributes.description || "",
              state: getState({ isStreaming, inProgress }),
            },
          }}
        >
          {content}
        </OliveAgentEdit>
      );

    case "oliveagent-search-replace":
      return (
        <OliveAgentSearchReplace
          node={{
            properties: {
              path: attributes.path || "",
              description: attributes.description || "",
              state: getState({ isStreaming, inProgress }),
            },
          }}
        >
          {content}
        </OliveAgentSearchReplace>
      );

    case "oliveagent-codebase-context":
      return (
        <OliveAgentCodebaseContext
          node={{
            properties: {
              files: attributes.files || "",
              state: getState({ isStreaming, inProgress }),
            },
          }}
        >
          {content}
        </OliveAgentCodebaseContext>
      );

    case "oliveagent-mcp-tool-call":
      return (
        <OliveAgentMcpToolCall
          node={{
            properties: {
              serverName: attributes.server || "",
              toolName: attributes.tool || "",
            },
          }}
        >
          {content}
        </OliveAgentMcpToolCall>
      );

    case "oliveagent-mcp-tool-result":
      return (
        <OliveAgentMcpToolResult
          node={{
            properties: {
              serverName: attributes.server || "",
              toolName: attributes.tool || "",
            },
          }}
        >
          {content}
        </OliveAgentMcpToolResult>
      );

    case "oliveagent-output":
      return (
        <OliveAgentOutput
          type={attributes.type as "warning" | "error"}
          message={attributes.message}
        >
          {content}
        </OliveAgentOutput>
      );

    case "oliveagent-problem-report":
      return (
        <OliveAgentProblemSummary summary={attributes.summary}>
          {content}
        </OliveAgentProblemSummary>
      );

    case "oliveagent-chat-summary":
      // Don't render anything for oliveagent-chat-summary
      return null;

    case "oliveagent-command":
      if (attributes.type) {
        const action = {
          id: attributes.type,
        } as SuggestedAction;
        return <>{mapActionToButton(action)}</>;
      }
      return null;

    default:
      return null;
  }
}
