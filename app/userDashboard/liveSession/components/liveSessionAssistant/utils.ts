import i18n from "@/i18n";
import {
  AttachmentMeta,
  ConversationRecord,
  InputMode,
  MessageRole,
} from "./types";

export function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function createConversation(): ConversationRecord {
  const now = Date.now();

  return {
    id: createId(),
    title: i18n.t("assistant.newConversation"),
    createdAt: now,
    updatedAt: now,
    messages: [],
  };
}

export function getAttachmentMeta(file: File): AttachmentMeta {
  return {
    id: createId(),
    name: file.name,
    size: file.size,
    type: file.type || "application/octet-stream",
  };
}

export function getConversationTitle(text: string, fallbackTitle?: string) {
  const normalized = text.replace(/\s+/g, " ").trim();

  if (!normalized) {
    return fallbackTitle
      ? i18n.t("assistant.conversationWithTitle", { title: fallbackTitle })
      : i18n.t("assistant.newConversation");
  }

  return normalized.length > 42
    ? `${normalized.slice(0, 42).trim()}...`
    : normalized;
}

export function parseStoredConversations(
  rawValue: string | null
): ConversationRecord[] {
  if (!rawValue) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawValue) as ConversationRecord[];

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter(
        (conversation) =>
          conversation &&
          typeof conversation.id === "string" &&
          Array.isArray(conversation.messages)
      )
      .map((conversation) => ({
        id: conversation.id,
        title:
          typeof conversation.title === "string" && conversation.title.trim()
            ? conversation.title
            : i18n.t("assistant.previousConversation"),
        createdAt:
          typeof conversation.createdAt === "number"
            ? conversation.createdAt
            : Date.now(),
        updatedAt:
          typeof conversation.updatedAt === "number"
            ? conversation.updatedAt
            : Date.now(),
        messages: conversation.messages
          .filter(
            (message) =>
              message &&
              typeof message.id === "string" &&
              typeof message.content === "string"
          )
          .map((message) => {
            const role: MessageRole =
              message.role === "assistant" ? "assistant" : "user";
            const inputMode: InputMode =
              message.inputMode === "voice" ? "voice" : "text";
            const attachments = Array.isArray(message.attachments)
              ? message.attachments.filter(
                  (attachment): attachment is AttachmentMeta =>
                    Boolean(attachment) &&
                    typeof attachment.id === "string" &&
                    typeof attachment.name === "string" &&
                    typeof attachment.size === "number" &&
                    typeof attachment.type === "string"
                )
              : undefined;

            return {
              id: message.id,
              role,
              content: message.content,
              createdAt:
                typeof message.createdAt === "number"
                  ? message.createdAt
                  : Date.now(),
              attachments,
              inputMode,
            };
          }),
      }))
      .filter((conversation) => conversation.messages.length > 0);
  } catch {
    return [];
  }
}

export function getAssistantReply(payload: unknown) {
  if (payload && typeof payload === "object") {
    const result = payload as Record<string, unknown>;

    if (typeof result.reply === "string" && result.reply.trim()) {
      return result.reply.trim();
    }

    if (typeof result.message === "string" && result.message.trim()) {
      return result.message.trim();
    }
  }

  return i18n.t("assistant.replyWithoutText");
}

export function formatFileSize(size: number) {
  if (size < 1024) {
    return `${size} B`;
  }

  if (size < 1024 * 1024) {
    return `${Math.round(size / 102.4) / 10} KB`;
  }

  return `${Math.round(size / (1024 * 102.4)) / 10} MB`;
}
