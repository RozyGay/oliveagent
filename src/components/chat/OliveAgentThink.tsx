import React, { useState, useEffect } from "react";
import { Brain, ChevronDown, ChevronUp, Loader } from "lucide-react";
import { VanillaMarkdownParser } from "./OliveAgentMarkdownParser";
import { CustomTagState } from "./stateTypes";
import { OliveAgentTokenSavings } from "./OliveAgentTokenSavings";

interface OliveAgentThinkProps {
  node?: any;
  children?: React.ReactNode;
}

export const OliveAgentThink: React.FC<OliveAgentThinkProps> = ({ children, node }) => {
  const state = node?.properties?.state as CustomTagState;
  const inProgress = state === "pending";
  const [isExpanded, setIsExpanded] = useState(inProgress);

  // Check if content matches token savings format
  const tokenSavingsMatch =
    typeof children === "string"
      ? children.match(
          /^oliveagent-token-savings\?original-tokens=([0-9.]+)&smart-context-tokens=([0-9.]+)$/,
        )
      : null;

  // Collapse when transitioning from in-progress to not-in-progress
  useEffect(() => {
    if (!inProgress && isExpanded) {
      setIsExpanded(false);
    }
  }, [inProgress]);

  // If it's token savings format, render OliveAgentTokenSavings component
  if (tokenSavingsMatch) {
    const originalTokens = parseFloat(tokenSavingsMatch[1]);
    const smartContextTokens = parseFloat(tokenSavingsMatch[2]);
    return (
      <OliveAgentTokenSavings
        originalTokens={originalTokens}
        smartContextTokens={smartContextTokens}
      />
    );
  }

  return (
    <div
      className={`group relative overflow-hidden rounded-xl px-4 py-3 my-3 border-2 cursor-pointer transition-all duration-300 ${
        inProgress
          ? "border-purple-400 bg-gradient-to-br from-purple-50/50 via-violet-50/30 to-fuchsia-50/40 dark:from-purple-950/30 dark:via-violet-950/20 dark:to-fuchsia-950/20 shadow-lg shadow-purple-200/50 dark:shadow-purple-900/30"
          : "border-border bg-gradient-to-br from-purple-50/20 via-violet-50/15 to-indigo-50/20 dark:from-purple-950/15 dark:via-violet-950/10 dark:to-indigo-950/15 hover:border-purple-400 dark:hover:border-purple-600 hover:shadow-lg hover:shadow-purple-200/30 dark:hover:shadow-purple-900/20"
      }`}
      onClick={() => setIsExpanded(!isExpanded)}
      role="button"
      aria-expanded={isExpanded}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsExpanded(!isExpanded);
        }
      }}
    >
      {inProgress && (
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-violet-400/20 to-fuchsia-400/20 animate-pulse" />
      )}

      {/* Top-left label badge */}
      <div
        className={`relative flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 ${
          inProgress
            ? "bg-purple-200 dark:bg-purple-800/60 text-purple-800 dark:text-purple-200 shadow-md"
            : "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/60"
        }`}
        style={{ zIndex: 1 }}
      >
        <div
          className={`p-1.5 rounded-md ${
            inProgress
              ? "bg-purple-300 dark:bg-purple-700"
              : "bg-purple-200 dark:bg-purple-800 group-hover:bg-purple-300 dark:group-hover:bg-purple-700"
          }`}
        >
          <Brain
            size={16}
            className={
              inProgress
                ? "text-purple-700 dark:text-purple-300"
                : "text-purple-600 dark:text-purple-400"
            }
          />
        </div>
        <span>AI Thinking</span>
        {inProgress && (
          <Loader size={14} className="ml-1 animate-spin" />
        )}
        {/* Indicator icon */}
        <div className="ml-auto text-gray-600 dark:text-gray-400">
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>

      {/* Main content with smooth transition */}
      <div
        className="pt-3 overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isExpanded ? "1000px" : "0px",
          opacity: isExpanded ? 1 : 0,
        }}
      >
        <div className="px-1 text-sm text-gray-700 dark:text-gray-300 bg-white/40 dark:bg-gray-800/40 px-3 py-3 rounded-lg border border-purple-200/50 dark:border-purple-700/50">
          {typeof children === "string" ? (
            <VanillaMarkdownParser content={children} />
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );
};
