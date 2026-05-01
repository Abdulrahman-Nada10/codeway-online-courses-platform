import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useTranslation } from "react-i18next";
const {t}= useTranslation()
export const QuestionCard = ({ question, answers, onAnswer, onNext, onPrev, isLast, isFinished, currentLang, optionLabels, isRTL, t }: any) => {
  const userAnswer = answers[question.id];
  
  return (
    <div className="rounded-2xl bg-background p-6 shadow-sm">
      <h2 className="text-lg font-bold mb-5">{question.text[currentLang] || question.text}</h2>
      <div className="space-y-3">
        {question.answers.map((ans: any, i: number) => {
          const isSelected = userAnswer === ans.id;
const isCorrect = ans.isCorrect;

          let borderClass = "border-gray-200";
          let bgClass = "";
          
          if (isFinished) {
            if (isCorrect) {
                borderClass = "border-green-500 bg-green-50";
            } else if (isSelected && !isCorrect) {
                borderClass = "border-red-500 bg-red-50";
            }
          } else if (isSelected) {
            borderClass = "border-primary bg-input-bg";
          }

          return (
            <button
              key={ans.id}
              disabled={isFinished}
              onClick={() => onAnswer(question.id, ans.id)}
              className={`w-full flex items-center justify-between rounded-xl border px-4 py-3 transition ${borderClass} ${bgClass}`}
            >
              <span className="text-sm">{ans.text[currentLang] || ans.text}</span>
              <span className="text-xs bg-gray-200 px-2 py-0.5 rounded">{optionLabels[i]}</span>
            </button>
          );
        })}
      </div>

      {!userAnswer && isFinished && (
        <p className="mt-2 text-red-500 text-sm font-bold">{t("quiz.notAnswered") || "لم يتم الإجابة"}</p>
      )}

      <div className="mt-6 flex justify-between">
        <button onClick={onPrev} className="rounded-full border px-4 py-2 flex items-center">
          {isRTL ? <MdKeyboardArrowRight/> : <MdKeyboardArrowLeft/>} {t("quiz.prev")}
        </button>
        
        <button
          onClick={onNext}
          className={`rounded-full px-6 py-2 text-white flex items-center ${isLast && !isFinished ? 'bg-green-600' : 'bg-primary'}`}
        >
          {isLast && !isFinished ? t("quiz.submit") || "تسليم" : t("quiz.next")}
          {(!isLast || isFinished) && (isRTL ? <MdKeyboardArrowLeft/> : <MdKeyboardArrowRight/>)}
        </button>
      </div>
    </div>
  );
};