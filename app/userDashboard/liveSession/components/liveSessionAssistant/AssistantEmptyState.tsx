import { useTranslation } from 'react-i18next';
import { BookOpen } from 'lucide-react';
import { getIntroSuggestions } from './constants';

interface AssistantEmptyStateProps {
  contextTitle?: string;
  introPhase: 'idle' | 'title' | 'suggestions';
  isLoading: boolean;
  onSuggestionClick: (prompt: string, label: string) => void;
}

const suggestionKeyMap: Record<string, string> = {
  'explain-lesson': 'assistant.suggestion.explainLesson',
  'quick-summary': 'assistant.suggestion.quickSummary',
  'illustrative-example': 'assistant.suggestion.illustrativeExample',
  'solve-question': 'assistant.suggestion.solveQuestion',
};

export function AssistantEmptyState({
  contextTitle,
  introPhase,
  isLoading,
  onSuggestionClick,
}: AssistantEmptyStateProps) {
  const { t } = useTranslation();
  const introSuggestions = getIntroSuggestions();

  return (
    <div className="flex h-full min-h-80 flex-col items-center justify-center text-center sm:min-h-95">
      <div
        className={`flex max-w-110 flex-col items-center transition-all duration-500 ${
          introPhase === 'suggestions' ? '-translate-y-10' : 'translate-y-5'
        }`}
      >
        <h2 className="text-3xl font-bold text-[#1f2937] sm:text-4xl">{t('assistant.howCanIHelp')}</h2>
      </div>

      <div
        className={`mt-8 grid w-full max-w-115 grid-cols-1 gap-3 transition-all duration-500 min-[420px]:grid-cols-2 ${
          introPhase === 'suggestions' ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
        }`}
      >
        {introSuggestions.map((suggestion) => (
          <button
            key={suggestion.id}
            type="button"
            disabled={isLoading}
            onClick={() => onSuggestionClick(suggestion.buildPrompt(contextTitle), t(suggestionKeyMap[suggestion.id]))}
            className="flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-[#fff3eb] px-4 py-4 text-sm font-semibold text-[#ff6400] transition hover:bg-[#ffe6d4] disabled:cursor-not-allowed disabled:opacity-70"
          >
            <BookOpen className="h-4 w-4 shrink-0" />
            <span>{t(suggestionKeyMap[suggestion.id])}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
