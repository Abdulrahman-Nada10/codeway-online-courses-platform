export type AiChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

type AiChatRequest = {
  message: string;
  courseId: string;
  history?: AiChatMessage[];
  signal?: AbortSignal;
};

const AI_CHAT_ENDPOINT = 'http://localhost:5500/ai/chat';
const MAX_RETRIES = 1;
const RETRY_DELAY_MS = 800;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRetryableError(error: unknown, status?: number): boolean {
  if (typeof status === 'number' && status >= 500) {
    return true;
  }
  if (error instanceof TypeError) {
    // Network errors, CORS failures, connection refused, etc.
    return true;
  }
  return false;
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}

export async function sendAiChatMessage({
  message,
  courseId,
  history,
  signal,
}: AiChatRequest): Promise<string> {
  const requestBody = {
    message,
    courseId,
    ...(history?.length ? { history } : {}),
  };

  // eslint-disable-next-line no-console
  console.log('[AI Chat] Request endpoint:', AI_CHAT_ENDPOINT);
  // eslint-disable-next-line no-console
  console.log('[AI Chat] Request payload:', JSON.stringify(requestBody, null, 2));

  let lastError: unknown;
  let lastStatus: number | undefined;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
    if (attempt > 0) {
      // eslint-disable-next-line no-console
      console.log(`[AI Chat] Retry attempt ${attempt}/${MAX_RETRIES} after ${RETRY_DELAY_MS}ms`);
      await sleep(RETRY_DELAY_MS);
    }

    try {
      const response = await fetch(AI_CHAT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
        signal,
      });

      // eslint-disable-next-line no-console
      console.log('[AI Chat] Response status:', response.status, response.statusText);

      const rawText = await response.text();
      // eslint-disable-next-line no-console
      console.log('[AI Chat] Raw response:', rawText.slice(0, 2000));

      if (!response.ok) {
        let errorMessage = `Request failed with status ${response.status}`;
        try {
          const err = JSON.parse(rawText);
          errorMessage = err?.message || errorMessage;
        } catch {
          /* ignore parse errors */
        }
        const httpError = new Error(errorMessage);
        lastError = httpError;
        lastStatus = response.status;

        if (isRetryableError(httpError, response.status) && attempt < MAX_RETRIES) {
          continue;
        }

        throw httpError;
      }

      let data: unknown;
      try {
        data = JSON.parse(rawText);
      } catch (parseError) {
        throw new Error(
          `AI chat response is not valid JSON. Raw response: ${rawText.slice(0, 500)}`
        );
      }

      // eslint-disable-next-line no-console
      console.log('[AI Chat] Parsed response data:', data);

      const reply = (data as Record<string, unknown>)?.reply;

      if (typeof reply !== 'string') {
        throw new Error(
          `AI chat response did not include a valid "reply" string. Received: ${JSON.stringify(reply)}`
        );
      }

      const trimmedReply = reply.trim();

      if (!trimmedReply) {
        throw new Error('AI chat response "reply" field is empty.');
      }

      return trimmedReply;
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw error;
      }

      lastError = error;

      if (isRetryableError(error, lastStatus) && attempt < MAX_RETRIES) {
        continue;
      }

      // eslint-disable-next-line no-console
      console.error('[AI Chat] Final error after retries:', getErrorMessage(error));
      throw error;
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error(getErrorMessage(lastError));
}

