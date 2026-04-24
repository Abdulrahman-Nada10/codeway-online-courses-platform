import { RoomTab, RoomUser } from './types';

export const roomTabs: Array<{ id: RoomTab; label: string; helper: string }> = [
  {
    id: 'chat',
    label: 'دردشة',
    helper: 'الدردشة تعرض كل التعليقات والأسئلة والاستطلاعات المباشرة داخل الحصة.',
  },
  {
    id: 'questions',
    label: 'الأسئلة',
    helper: 'أرسل سؤالك للمحاضر، وستظهر هنا الأسئلة فقط بصيغة مختلفة عن الدردشة العامة.',
  },
  {
    id: 'poll',
    label: 'استطلاع الرأي',
    helper: 'أنشئ استطلاعاً جديداً أو صوّت على الاستطلاعات الجارية وأنهِ استطلاعك وقتما تريد.',
  },
];

export const currentRoomUser: RoomUser = {
  id: 'current-user',
  name: 'محمد محمود',
  avatar: '/profile.jpg',
  role: 'student',
};

export const minPollOptions = 2;
export const maxPollOptions = 4;

export function createDefaultPollDraft() {
  return {
    question: '',
    options: ['', ''],
  };
}
