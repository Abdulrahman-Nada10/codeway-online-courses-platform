import i18n from "@/i18n";
import {
  MAX_TEXT_ATTACHMENT_SIZE,
  TEXT_ATTACHMENT_EXTENSIONS,
} from "./constants";
import { formatFileSize } from "./utils";

export function isTextAttachment(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "";

  return (
    file.type.startsWith("text/") ||
    file.type === "application/json" ||
    TEXT_ATTACHMENT_EXTENSIONS.has(extension)
  );
}

export async function getAttachmentContext(files: File[]) {
  const parts = await Promise.all(
    files.map(async (file) => {
      const header = [
        i18n.t("assistant.attachmentNameLine", { name: file.name }),
        i18n.t("assistant.attachmentSizeLine", {
          size: formatFileSize(file.size),
        }),
      ];

      if (!isTextAttachment(file) || file.size > MAX_TEXT_ATTACHMENT_SIZE) {
        return header.join("\n");
      }

      try {
        const text = (await file.text()).trim();

        if (!text) {
          return header.join("\n");
        }

        return `${header.join("\n")}\n${i18n.t("assistant.attachmentSnippetLine")}\n${text.slice(0, 1800)}`;
      } catch {
        return header.join("\n");
      }
    })
  );

  return parts.join("\n\n");
}
