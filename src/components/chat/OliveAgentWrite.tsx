import type React from "react";
import type { ReactNode } from "react";
import { useState } from "react";
import {
  ChevronsDownUp,
  ChevronsUpDown,
  Pencil,
  Loader,
  CircleX,
  Edit,
  X,
  FileText,
  Sparkles,
} from "lucide-react";
import { CodeHighlight } from "./CodeHighlight";
import { CustomTagState } from "./stateTypes";
import { FileEditor } from "../preview_panel/FileEditor";
import { useAtomValue } from "jotai";
import { selectedAppIdAtom } from "@/atoms/appAtoms";

interface OliveAgentWriteProps {
  children?: ReactNode;
  node?: any;
  path?: string;
  description?: string;
}

export const OliveAgentWrite: React.FC<OliveAgentWriteProps> = ({
  children,
  node,
  path: pathProp,
  description: descriptionProp,
}) => {
  const [isContentVisible, setIsContentVisible] = useState(false);

  // Use props directly if provided, otherwise extract from node
  const path = pathProp || node?.properties?.path || "";
  const description = descriptionProp || node?.properties?.description || "";
  const state = node?.properties?.state as CustomTagState;

  const aborted = state === "aborted";
  const appId = useAtomValue(selectedAppIdAtom);
  const [isEditing, setIsEditing] = useState(false);
  const inProgress = state === "pending";

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setIsContentVisible(true);
  };
  // Extract filename from path
  const fileName = path ? path.split("/").pop() : "";

  return (
    <div
      className={`group relative overflow-hidden rounded-xl px-4 py-3 my-3 border-2 cursor-pointer transition-all duration-300 ${
        inProgress
          ? "border-amber-400 bg-gradient-to-br from-amber-50/50 via-orange-50/30 to-yellow-50/40 dark:from-amber-950/30 dark:via-orange-950/20 dark:to-yellow-950/20 shadow-lg shadow-amber-200/50 dark:shadow-amber-900/30"
          : aborted
            ? "border-red-400 bg-gradient-to-br from-red-50/50 via-rose-50/30 to-pink-50/40 dark:from-red-950/30 dark:via-rose-950/20 dark:to-pink-950/20 shadow-lg shadow-red-200/50 dark:shadow-red-900/30"
            : "border-border bg-gradient-to-br from-blue-50/30 via-indigo-50/20 to-purple-50/30 dark:from-blue-950/20 dark:via-indigo-950/15 dark:to-purple-950/20 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-lg hover:shadow-blue-200/30 dark:hover:shadow-blue-900/20"
      }`}
      onClick={() => setIsContentVisible(!isContentVisible)}
    >
      {inProgress && (
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-orange-400/20 to-yellow-400/20 animate-pulse" />
      )}
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-lg transition-all duration-300 ${
              inProgress
                ? "bg-amber-200 dark:bg-amber-800/50 shadow-md"
                : aborted
                  ? "bg-red-200 dark:bg-red-800/50 shadow-md"
                  : "bg-blue-100 dark:bg-blue-900/40 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/60"
            }`}
          >
            <Pencil
              size={18}
              className={`${
                inProgress
                  ? "text-amber-700 dark:text-amber-300"
                  : aborted
                    ? "text-red-700 dark:text-red-300"
                    : "text-blue-700 dark:text-blue-300"
              }`}
            />
          </div>
          <div className="flex flex-col gap-0.5">
            {fileName && (
              <div className="flex items-center gap-2">
                <FileText
                  size={14}
                  className="text-gray-600 dark:text-gray-400"
                />
                <span className="text-gray-800 dark:text-gray-200 font-semibold text-sm">
                  {fileName}
                </span>
              </div>
            )}
            {inProgress && (
              <div className="flex items-center text-amber-700 dark:text-amber-400 text-xs font-medium">
                <Loader size={14} className="mr-1.5 animate-spin" />
                <span>Writing file...</span>
                <Sparkles size={12} className="ml-1.5 animate-pulse" />
              </div>
            )}
            {aborted && (
              <div className="flex items-center text-red-700 dark:text-red-400 text-xs font-medium">
                <CircleX size={14} className="mr-1.5" />
                <span>Operation incomplete</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1">
          {!inProgress && (
            <>
              {isEditing ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCancel();
                  }}
                  className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-200/60 dark:hover:bg-gray-700/60 cursor-pointer transition-all duration-200"
                >
                  <X size={14} />
                  <span className="font-medium">Cancel</span>
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit();
                  }}
                  className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-200/60 dark:hover:bg-blue-800/60 cursor-pointer transition-all duration-200"
                >
                  <Edit size={14} />
                  <span className="font-medium">Edit</span>
                </button>
              )}
            </>
          )}
          {isContentVisible ? (
            <ChevronsDownUp
              size={20}
              className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
            />
          ) : (
            <ChevronsUpDown
              size={20}
              className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
            />
          )}
        </div>
      </div>
      {path && (
        <div className="relative mt-2 flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400 font-mono bg-gray-100/50 dark:bg-gray-800/50 px-2.5 py-1.5 rounded-md">
          <FileText size={12} />
          {path}
        </div>
      )}
      {description && (
        <div className="relative mt-2 text-sm text-gray-700 dark:text-gray-300 bg-white/40 dark:bg-gray-800/40 px-3 py-2 rounded-lg border border-gray-200/50 dark:border-gray-700/50">
          <span className="font-semibold text-gray-800 dark:text-gray-200">
            Summary:{" "}
          </span>
          <span className="italic">{description}</span>
        </div>
      )}
      {isContentVisible && (
        <div
          className="relative mt-3 text-xs cursor-text transition-all duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {isEditing ? (
            <div className="h-96 min-h-96 border-2 border-blue-300 dark:border-blue-700 rounded-lg overflow-hidden shadow-lg">
              <FileEditor appId={appId ?? null} filePath={path} />
            </div>
          ) : (
            <div className="rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700 shadow-md">
              <CodeHighlight className="language-typescript">
                {children}
              </CodeHighlight>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
