import { Quiz } from '../models/types';

export const mockQuizzes: Quiz[] = [
  {
    id: 'web-basics',
    title: {
      ar: 'أساسيات تطوير الويب',
      en: 'Web Development Basics'
    },
    duration: 10,
    startAt: Date.now() + 30 * 60 * 1000,
    endAt: Date.now() + 2 * 60 * 60 * 1000,
    questions: [
      {
        id: 'q1',
        text: { 
          ar: 'ما هو HTML؟', 
          en: 'What is HTML?' 
        },
        answers: [
          { id: 'a1', text: { ar: 'لغة برمجة', en: 'Programming Language' } },
          { id: 'a2', text: { ar: 'لغة توصيف صفحات', en: 'Markup Language' } },
          { id: 'a3', text: { ar: 'قاعدة بيانات', en: 'Database' } },
          { id: 'a4', text: { ar: 'نظام تشغيل', en: 'Operating System' } },
        ],
        correctAnswerId: 'a2',
      },
      {
        id: 'q2',
        text: { 
          ar: 'ما وظيفة CSS؟', 
          en: 'What is the function of CSS?' 
        },
        answers: [
          { id: 'a1', text: { ar: 'هيكلة الصفحة', en: 'Page Structuring' } },
          { id: 'a2', text: { ar: 'تنسيق وتصميم', en: 'Styling and Design' } },
          { id: 'a3', text: { ar: 'برمجة السيرفر', en: 'Server Programming' } },
          { id: 'a4', text: { ar: 'تخزين بيانات', en: 'Data Storage' } },
        ],
        correctAnswerId: 'a2',
      }
    ],
  },
  {
    id: 'react-fundamentals',
    title: {
      ar: 'أساسيات React',
      en: 'React Fundamentals'
    },
    duration: 10,
    startAt: Date.now() + 30 * 60 * 1000,
    endAt: Date.now() + 2 * 60 * 60 * 1000,
    questions: [
      {
        id: 'r1',
        text: {
          ar: 'ما هو component في React؟',
          en: 'What is a component in React?'
        },
        answers: [
          { id: 'ra1', text: { ar: 'دالة', en: 'A function' } },
          { id: 'ra2', text: { ar: 'قطعة من الكود القابلة لإعادة الاستخدام', en: 'A reusable piece of code' } },
          { id: 'ra3', text: { ar: 'CSS class', en: 'A CSS class' } },
          { id: 'ra4', text: { ar: 'Database table', en: 'A Database table' } },
        ],
        correctAnswerId: 'ra2',
      },
      {
        id: 'r2',
        text: {
          ar: 'ما هو useState؟',
          en: 'What is useState?'
        },
        answers: [
          { id: 'ra1', text: { ar: 'Hook لإدارة الحالة', en: 'A hook for state management' } },
          { id: 'ra2', text: { ar: 'CSS property', en: 'A CSS property' } },
          { id: 'ra3', text: { ar: 'HTML tag', en: 'An HTML tag' } },
          { id: 'ra4', text: { ar: 'Database query', en: 'A Database query' } },
        ],
        correctAnswerId: 'ra1',
      }
    ],
  },
  {
    id: 'js-advanced',
    title: {
      ar: 'JavaScript متقدم',
      en: 'Advanced JavaScript'
    },
    duration: 15,
    startAt: Date.now() - 2 * 60 * 60 * 1000,
    endAt: Date.now() - 30 * 60 * 1000,
    questions: [
      {
        id: 'j1',
        text: {
          ar: 'ما هو async/await؟',
          en: 'What is async/await?'
        },
        answers: [
          { id: 'ja1', text: { ar: 'طريقة للتعامل مع Promises', en: 'A way to handle Promises' } },
          { id: 'ja2', text: { ar: 'CSS animation', en: 'A CSS animation' } },
          { id: 'ja3', text: { ar: 'HTML element', en: 'An HTML element' } },
          { id: 'ja4', text: { ar: 'Database command', en: 'A Database command' } },
        ],
        correctAnswerId: 'ja1',
      }
    ],
  },
  {
    id: 'css-grid',
    title: {
      ar: 'CSS Grid متقدم',
      en: 'Advanced CSS Grid'
    },
    duration: 8,
    startAt: Date.now() + 5 * 60 * 1000,
    endAt: Date.now() + 45 * 60 * 1000,
    questions: [
      {
        id: 'c1',
        text: {
          ar: 'ما هو grid-template-areas؟',
          en: 'What is grid-template-areas?'
        },
        answers: [
          { id: 'ca1', text: { ar: 'تعريف مناطق Grid', en: 'Defining Grid areas' } },
          { id: 'ca2', text: { ar: 'Color property', en: 'A color property' } },
          { id: 'ca3', text: { ar: 'Font size', en: 'A font size' } },
          { id: 'ca4', text: { ar: 'Animation', en: 'An animation' } },
        ],
        correctAnswerId: 'ca1',
      }
    ],
  },
    {
    id: 'web-basics',
    title: {
      ar: 'أساسيات تطوير الويب',
      en: 'Web Development Basics'
    },
    duration: 10,
    startAt: Date.now() + 30 * 60 * 1000,
    endAt: Date.now() + 2 * 60 * 60 * 1000,
    questions: [
      {
        id: 'q1',
        text: { 
          ar: 'ما هو HTML؟', 
          en: 'What is HTML?' 
        },
        answers: [
          { id: 'a1', text: { ar: 'لغة برمجة', en: 'Programming Language' } },
          { id: 'a2', text: { ar: 'لغة توصيف صفحات', en: 'Markup Language' } },
          { id: 'a3', text: { ar: 'قاعدة بيانات', en: 'Database' } },
          { id: 'a4', text: { ar: 'نظام تشغيل', en: 'Operating System' } },
        ],
        correctAnswerId: 'a2',
      },
      {
        id: 'q2',
        text: { 
          ar: 'ما وظيفة CSS؟', 
          en: 'What is the function of CSS?' 
        },
        answers: [
          { id: 'a1', text: { ar: 'هيكلة الصفحة', en: 'Page Structuring' } },
          { id: 'a2', text: { ar: 'تنسيق وتصميم', en: 'Styling and Design' } },
          { id: 'a3', text: { ar: 'برمجة السيرفر', en: 'Server Programming' } },
          { id: 'a4', text: { ar: 'تخزين بيانات', en: 'Data Storage' } },
        ],
        correctAnswerId: 'a2',
      }
    ],
  },
];
