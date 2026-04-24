import { ChangeEvent, FormEvent, KeyboardEvent, RefObject } from 'react';
import { ArrowUp, FileText, LoaderCircle, Mic, Paperclip, X } from 'lucide-react';
import { PendingAttachment } from './types';

interface AssistantComposerProps {
  composerError: string | null;
  composerValue: string;
  fileInputRef: RefObject<HTMLInputElement | null>;
  isListening: boolean;
  isLoading: boolean;
  pendingAttachments: PendingAttachment[];
  onComposerChange: (value: string) => void;
  onFileSelection: (event: ChangeEvent<HTMLInputElement>) => void;
  onRemoveAttachment: (attachmentId: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onTextareaKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
  onVoiceInput: () => void;
}

export function AssistantComposer({
  composerError,
  composerValue,
  fileInputRef,
  isListening,
  isLoading,
  pendingAttachments,
  onComposerChange,
  onFileSelection,
  onRemoveAttachment,
  onSubmit,
  onTextareaKeyDown,
  onVoiceInput,
}: AssistantComposerProps) {
  return (
    <div className="mt-4 space-y-3 border-t border-[#f7e2d4] pt-4">
      {pendingAttachments.length ? (
        <div className="flex flex-wrap gap-2">
          {pendingAttachments.map((attachment) => (
            <div
              key={attachment.id}
              className="flex max-w-full items-center gap-2 rounded-full border border-[#f4d3bf] bg-[#fff7f2] px-3 py-2 text-xs text-[#5f6368]"
            >
              <FileText className="h-4 w-4 shrink-0 text-[#ff6400]" />
              <span className="max-w-[40vw] truncate sm:max-w-45">{attachment.file.name}</span>
              <button
                type="button"
                onClick={() => onRemoveAttachment(attachment.id)}
                className="rounded-full p-0.5 text-[#a1a1aa] transition hover:text-[#ef4444]"
                aria-label={`إزالة ${attachment.file.name}`}
                title={`إزالة ${attachment.file.name}`}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      ) : null}

      {composerError ? <p className="text-sm text-[#d23f21]">{composerError}</p> : null}

      <form onSubmit={onSubmit} className="rounded-[22px] bg-[#fff3eb] px-3 py-3 shadow-[0_8px_24px_rgba(17,53,85,0.05)]">
        <div className="flex items-end gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onVoiceInput}
            className={`rounded-full p-2 transition ${
              isListening ? 'bg-[#113555] text-white' : 'text-[#7a7a7a] hover:bg-white hover:text-[#113555]'
            }`}
            aria-label={isListening ? 'إيقاف التسجيل الصوتي' : 'إدخال صوتي'}
            title={isListening ? 'إيقاف التسجيل الصوتي' : 'إدخال صوتي'}
          >
            <Mic className="h-4 w-4" />
          </button>

          <button
            type="submit"
            disabled={isLoading || (!composerValue.trim() && pendingAttachments.length === 0)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#ff6400] text-white transition hover:bg-[#ec5b00] disabled:cursor-not-allowed disabled:opacity-60"
            aria-label="إرسال"
            title="إرسال"
          >
            {isLoading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <ArrowUp className="h-4 w-4" />}
          </button>

          <div className="flex-1">
            <textarea
              rows={1}
              value={composerValue}
              onChange={(event) => onComposerChange(event.target.value)}
              onKeyDown={onTextareaKeyDown}
              placeholder="...اسأل المساعد الذكي عن أي شيء"
              className="min-h-9 max-h-28 w-full resize-none bg-transparent px-2 py-2 text-right text-sm text-[#374151] outline-none placeholder:text-[#b4b4b8]"
            />
          </div>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="rounded-full p-2 text-[#7a7a7a] transition hover:bg-white hover:text-[#113555]"
            aria-label="إرفاق ملف"
            title="إرفاق ملف"
          >
            <Paperclip className="h-4 w-4" />
          </button>
        </div>

        <input
          ref={fileInputRef}
          aria-label="uploadFiles"
          type="file"
          multiple
          className="hidden"
          onChange={onFileSelection}
        />
      </form>
    </div>
  );
}
