import i18n from "@/i18n";
import { AssistantFollowUpAction, AssistantSuggestion } from "./types";

export const DEFAULT_STORAGE_KEY = "live-session-ai-history-v1";
export const INTRO_DELAY_MS = 280;
export const MAX_ATTACHMENTS = 5;
export const MAX_TEXT_ATTACHMENT_SIZE = 150_000;
export const RECENT_HISTORY_LIMIT = 10;
export const SEND_DEBOUNCE_MS = 400;

export const TEXT_ATTACHMENT_EXTENSIONS = new Set([
  "txt",
  "md",
  "json",
  "csv",
  "ts",
  "tsx",
  "js",
  "jsx",
  "py",
  "html",
  "css",
  "xml",
  "yml",
  "yaml",
]);

export function getIntroSuggestions(): AssistantSuggestion[] {
  return [
    {
      id: "explain-lesson",
      label: i18n.t("assistant.suggestion.explainLesson"),
      buildPrompt: (contextTitle?: string) =>
        contextTitle
          ? i18n.t("assistant.prompt.explainLessonWithContext", {
              contextTitle,
            })
          : i18n.t("assistant.prompt.explainLesson"),
    },
    {
      id: "quick-summary",
      label: i18n.t("assistant.suggestion.quickSummary"),
      buildPrompt: (contextTitle?: string) =>
        contextTitle
          ? i18n.t("assistant.prompt.quickSummaryWithContext", {
              contextTitle,
            })
          : i18n.t("assistant.prompt.quickSummary"),
    },
    {
      id: "illustrative-example",
      label: i18n.t("assistant.suggestion.illustrativeExample"),
      buildPrompt: (contextTitle?: string) =>
        contextTitle
          ? i18n.t("assistant.prompt.illustrativeExampleWithContext", {
              contextTitle,
            })
          : i18n.t("assistant.prompt.illustrativeExample"),
    },
    {
      id: "solve-question",
      label: i18n.t("assistant.suggestion.solveQuestion"),
      buildPrompt: (contextTitle?: string) =>
        contextTitle
          ? i18n.t("assistant.prompt.solveQuestionWithContext", {
              contextTitle,
            })
          : i18n.t("assistant.prompt.solveQuestion"),
    },
  ];
}

export function getAssistantFollowUpActions(): AssistantFollowUpAction[] {
  return [
    {
      id: "example",
      label: i18n.t("assistant.action.example"),
      buildPrompt: (assistantMessage: string, contextTitle?: string) =>
        i18n.t("assistant.prompt.followUpExample", {
          assistantMessage,
          contextPrefix: contextTitle
            ? i18n.t("assistant.prompt.contextPrefix", { contextTitle })
            : "",
        }),
    },
    {
      id: "expand",
      label: i18n.t("assistant.action.expand"),
      buildPrompt: (assistantMessage: string, contextTitle?: string) =>
        i18n.t("assistant.prompt.followUpExpand", {
          assistantMessage,
          contextPrefix: contextTitle
            ? i18n.t("assistant.prompt.contextPrefix", { contextTitle })
            : "",
        }),
    },
  ];
}
