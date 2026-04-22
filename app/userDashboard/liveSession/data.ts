import { LiveSession } from './types';

export const liveSessions: LiveSession[] = [
  {
    id: 1,
    slug: 'advanced-banking-expansion',
    title: 'توسيع البنى الحديثة: من الخدمة الأحادية إلى الخدمات المصغرة',
    instructor: 'أحمد منتصر',
    instructorRole: 'مهندس برمجيات أول في TechEgypt',
    instructorAvatar: '/profile.jpg',
    image: '/liveCard.png',
    category: 'live',
    description:
      'في هذه الجلسة المتقدمة نستعرض الرحلة الاستراتيجية لتجديد الأنظمة المعتمدة. نتعلّم من خبراء الصناعة عن مخاطر التوسّع السريع وكيفية انتقاء التصميم الذي يمنحك مرونة معمارية حقيقية في 2024.',
    dateLabel: '21 أبريل 2026',
    timeLabel: '8:00 ص - 9:30 ص بتوقيت القاهرة',
    startTime: '2026-04-21T08:00:00+02:00',
    endTime: '2026-04-21T09:30:00+02:00',
    viewers: 1243,
    durationLabel: '42:15',
    resources: [
      { id: 'slides-pdf', name: 'Session Slides.pdf', type: 'pdf' },
      { id: 'slides-link', name: 'Session Slides.pdf', type: 'link' },
    ],
    speakers: [
      { name: 'Mrs Modupe Oifaemi', role: 'CEO GITECH' },
      { name: 'Dr Alan Smith', role: 'HEAD OF INNOVATION, NJT' },
      { name: 'Stella Johnson', role: 'CFO CLOUDCORE' },
    ],
    messages: [
      {
        id: 'm1',
        author: 'أحمد منتصر',
        avatar: '/profile.jpg',
        text: 'النقطة المتعلقة بالسياق النوعي تعد حاسمة في الأنظمة الموزعة.',
      },
      {
        id: 'm2',
        author: 'أحمد منتصر',
        avatar: '/profile.jpg',
        text: 'النقطة المتعلقة بالانساق النوعي تعد حاسمة في الأنظمة الموزعة.',
      },
      {
        id: 'm3',
        author: 'أحمد منتصر',
        avatar: '/profile.jpg',
        text: 'النقطة المتعلقة بالتوافق النوعي تعد حاسمة في الأنظمة الموزعة.',
      },
      {
        id: 'm4',
        author: 'أحمد منتصر',
        avatar: '/profile.jpg',
        text: 'النقطة المتعلقة بالتناسق النوعي تعد حاسمة في الأنظمة الموزعة.',
      },
    ],
    poll: {
      question: 'ما هي البنية التي تستخدمها حالياً؟',
      options: [
        { id: 'p1', label: 'نظام متكامل', percentage: 42 },
        { id: 'p2', label: 'مايكروسيرفس', percentage: 58 },
      ],
    },
  },
  {
    id: 2,
    slug: 'design-systems-live',
    title: 'توسيع البنى الحديثة: من الخدمة الأحادية إلى الخدمات المصغرة',
    instructor: 'أحمد منتصر',
    instructorRole: 'مهندس برمجيات أول في TechEgypt',
    instructorAvatar: '/profile.jpg',
    image: '/liveCard.png',
    category: 'live',
    description:
      'في هذه الجلسة المتقدمة نستعرض الرحلة الاستراتيجية لتجديد الأنظمة المعتمدة. نتعلّم من خبراء الصناعة عن مخاطر التوسّع السريع وكيفية انتقاء التصميم الذي يمنحك مرونة معمارية حقيقية في 2024.',
    dateLabel: '15 نوفمبر 2026',
    timeLabel: '8:00 ص - 9:30 م بتوقيت القاهرة',
    startTime: '2026-04-21T05:00:00+02:00',
    endTime: '2026-04-21T09:30:00+02:00',
    viewers: 1243,
    durationLabel: '18:40',
    resources: [
      { id: 'design-pdf', name: 'Session Slides.pdf', type: 'pdf' },
      { id: 'design-link', name: 'Session Slides.pdf', type: 'link' },
    ],
    speakers: [
      { name: 'Mrs Modupe Oifaemi', role: 'CEO GITECH' },
      { name: 'Dr Alan Smith', role: 'HEAD OF INNOVATION, NJT' },
      { name: 'Stella Johnson', role: 'CFO CLOUDCORE' },
    ],
    messages: [
      {
        id: 'd1',
        author: 'أحمد منتصر',
        avatar: '/profile.jpg',
        text: 'النقطة المتعلقة بالسياق النوعي تعد حاسمة في الأنظمة الموزعة.',
      },
      {
        id: 'd2',
        author: 'أحمد منتصر',
        avatar: '/profile.jpg',
        text: 'النقطة المتعلقة بالتناسق النوعي تعد حاسمة في الأنظمة الموزعة.',
      },
      {
        id: 'd3',
        author: 'أحمد منتصر',
        avatar: '/profile.jpg',
        text: 'النقطة المتعلقة بالتوافق النوعي تعد حاسمة في الأنظمة الموزعة.',
      },
      {
        id: 'd4',
        author: 'أحمد منتصر',
        avatar: '/profile.jpg',
        text: 'النقطة المتعلقة بالاتصال بين الخدمات تعد حاسمة في الأنظمة الموزعة.',
      },
    ],
    poll: {
      question: 'ما هي البنية التي تستخدمها حالياً؟',
      options: [
        { id: 'dp1', label: 'نظام متكامل', percentage: 42 },
        { id: 'dp2', label: 'مايكروسيرفس', percentage: 58 },
      ],
    },
  },
  {
    id: 3,
    slug: 'frontend-architecture',
    title: 'هندسة واجهات Frontend قابلة للتوسع',
    instructor: 'محمد علي',
    instructorRole: 'Senior Frontend Engineer',
    instructorAvatar: '/profile.jpg',
    image: '/card.jpg',
    category: 'upcoming',
    description: 'جلسة قادمة لمناقشة تنظيم المجلدات، الأنماط المعمارية، والحد من التضخم داخل صفحات Next.js.',
    startTime: '2026-04-21T10:30:00+02:00',
  },
  {
    id: 4,
    slug: 'ai-product-strategy',
    title: 'استراتيجية بناء منتجات AI قابلة للإطلاق',
    instructor: 'فاطمة علي',
    instructorRole: 'AI Product Manager',
    instructorAvatar: '/profile.jpg',
    image: '/card.jpg',
    category: 'upcoming',
    description: 'كيف تنقل الفكرة إلى MVP ثم إلى منتج حقيقي مع قياس القيمة وليس الضجيج فقط.',
    startTime: '2026-04-21T13:45:00+02:00',
  },
  {
    id: 5,
    slug: 'mlops-retrospective',
    title: 'مراجعة عملية لتجارب MLOps في فرق متوسطة الحجم',
    instructor: 'فاطمة صالح',
    instructorRole: 'Machine Learning Lead',
    instructorAvatar: '/profile.jpg',
    image: '/liveCard.png',
    category: 'past',
    description: 'جلسة منتهية حول النشر، المراقبة، والتحسين المستمر لنماذج الذكاء الاصطناعي.',
    startTime: '2026-04-19T19:00:00+02:00',
    endTime: '2026-04-19T20:10:00+02:00',
    viewers: 120,
  },
];

export function getSessionBySlug(slug: string) {
  return liveSessions.find((session) => session.slug === slug);
}
