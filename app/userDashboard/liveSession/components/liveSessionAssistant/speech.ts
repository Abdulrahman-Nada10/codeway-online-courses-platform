import { ExtendedWindow, SpeechRecognitionConstructor } from './types';

export function getSpeechRecognitionApi() {
  const speechWindow = window as ExtendedWindow;

  return (speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition || null) as SpeechRecognitionConstructor | null;
}
