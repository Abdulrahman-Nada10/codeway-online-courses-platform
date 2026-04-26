import type { Course } from '@/app/store/types';

/**
 * TOPIC TO COURSE MAPPING
 * Centralized, editable mapping from keywords to course IDs.
 * Add or modify mappings as new courses are created.
 */
export const TOPIC_TO_COURSE_MAP: Record<string, string> = {
  // Frontend
  react: 'react-course-1',
  'رياكت': 'react-course-1',
  next: 'next-course-1',
  'next.js': 'next-course-1',
  'نكست': 'next-course-1',
  vue: 'vue-course-1',
  'فيو': 'vue-course-1',
  angular: 'angular-course-1',
  'انجولار': 'angular-course-1',
  javascript: 'js-course-1',
  'جافاسكريبت': 'js-course-1',
  typescript: 'ts-course-1',
  'تايبسكريبت': 'ts-course-1',
  html: 'html-course-1',
  'اتش تي ام ال': 'html-course-1',
  css: 'css-course-1',
  'سي اس اس': 'css-course-1',
  tailwind: 'tailwind-course-1',
  'تيلويند': 'tailwind-course-1',

  // Backend
  node: 'node-course-1',
  'node.js': 'node-course-1',
  'نود': 'node-course-1',
  express: 'node-course-1',
  'اكسبريس': 'node-course-1',
  python: 'python-zero-to-hero',
  'بايثون': 'python-zero-to-hero',
  django: 'django-course-1',
  'جانجو': 'django-course-1',
  php: 'php-course-1',
  'بي اتش بي': 'php-course-1',
  laravel: 'laravel-course-1',
  'لارافيل': 'laravel-course-1',
  java: 'java-course-1',
  'جافا': 'java-course-1',
  spring: 'java-course-1',
  'سبرينج': 'java-course-1',
  go: 'go-course-1',
  'جولانج': 'go-course-1',

  // Database

  sql: 'sql-course-1',
  'اس كيو ال': 'sql-course-1',
  mysql: 'mysql-course-1',
  'ماي اس كيو ال': 'mysql-course-1',
  postgresql: 'postgres-course-1',
  'بوستجريس': 'postgres-course-1',
  mongodb: 'mongodb-course-1',
  'مونجو': 'mongodb-course-1',
  redis: 'redis-course-1',
  'ريديس': 'redis-course-1',
  prisma: 'prisma-course-1',
  'بريزما': 'prisma-course-1',
     
  // Mobile
  flutter: 'flutter-course-1',
  'فلاتر': 'flutter-course-1',
  reactnative: 'react-native-course-1',
  'رياكت نيتيف': 'react-native-course-1',
  swift: 'swift-course-1',
  'سويفت': 'swift-course-1',
  kotlin: 'kotlin-course-1',
  'كوتلن': 'kotlin-course-1',

  // DevOps / Cloud
  docker: 'docker-course-1',
  'دوكر': 'docker-course-1',
  kubernetes: 'k8s-course-1',
  'كوبرنيتيس': 'k8s-course-1',
  aws: 'aws-course-1',
  'أوس': 'aws-course-1',
  azure: 'azure-course-1',
  'أزور': 'azure-course-1',
  cicd: 'devops-course-1',
  'سي اي سي دي': 'devops-course-1',
  devops: 'devops-course-1',
  'ديف اوبس': 'devops-course-1',

  // AI / Data
  ai: 'ai-course-1',
  'ذكاء اصطناعي': 'ai-course-1',
  machinelearning: 'ml-course-1',
  'تعلم الآلة': 'ml-course-1',
  datascience: 'data-science-course-1',
  'علم البيانات': 'data-science-course-1',
  deeplearning: 'deep-learning-course-1',
  'تعلم عميق': 'deep-learning-course-1',
  nlp: 'nlp-course-1',
  'معالجة اللغات': 'nlp-course-1',
  pandas: 'python-zero-to-hero',
  'بانداس': 'python-zero-to-hero',

  // Design
  ui: 'ui-design-course-1',
  'واجهة مستخدم': 'ui-design-course-1',
  ux: 'ux-design-course-1',
  'تجربة مستخدم': 'ux-design-course-1',
  figma: 'figma-course-1',
  'فيغما': 'figma-course-1',
  "design-systems-live": 'design-systems-live',
  'تصميم الانظمة ': 'design-systems-live',

  
  // Architecture
  microservices: 'microservices-course-1',
  'مايكروسيرفس': 'microservices-course-1',
  systemdesign: 'system-design-course-1',
  'تصميم أنظمة': 'system-design-course-1',
  'هندسة برمجيات': 'software-arch-course-1',
  'services مصغرة': 'microservices-course-1',
  'خدمات مصغرة': 'microservices-course-1',
};

const SESSION_CONTEXT_KEY = 'ai-chat-session-context-v1';

export interface AiSessionContext {
  courseId: string | null;
  lessonId: string | null;
  lastMessages: string[];
  detectedTopics: string[];
  lastResolvedAt: number;
}

function logDebug(...args: unknown[]) {
  // eslint-disable-next-line no-console
  console.log('[AI DEBUG]', ...args);
}

export function getDefaultSessionContext(): AiSessionContext {
  return {
    courseId: null,
    lessonId: null,
    lastMessages: [],
    detectedTopics: [],
    lastResolvedAt: 0,
  };
}

export function loadSessionContext(): AiSessionContext {
  try {
    const raw = window.localStorage.getItem(SESSION_CONTEXT_KEY);
    if (!raw) return getDefaultSessionContext();
    const parsed = JSON.parse(raw) as Partial<AiSessionContext>;
    return {
      ...getDefaultSessionContext(),
      ...parsed,
    };
  } catch {
    return getDefaultSessionContext();
  }
}

export function saveSessionContext(context: Partial<AiSessionContext>) {
  try {
    const existing = loadSessionContext();
    const next: AiSessionContext = {
      ...existing,
      ...context,
      lastResolvedAt: Date.now(),
    };
    window.localStorage.setItem(SESSION_CONTEXT_KEY, JSON.stringify(next));
  } catch {
    /* ignore storage errors */
  }
}

/**
 * Extract potential topics from a user message.
 */
export function extractTopics(message: string): string[] {
  const normalized = message
    .toLowerCase()
    .replace(/[.,!?؛،]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const words = normalized.split(' ');
  const foundTopics: string[] = [];

  for (const [keyword, courseId] of Object.entries(TOPIC_TO_COURSE_MAP)) {
    if (normalized.includes(keyword.toLowerCase())) {
      foundTopics.push(courseId);
    }
  }

  // Also check multi-word combinations
  for (let i = 0; i < words.length - 1; i += 1) {
    const bigram = `${words[i]} ${words[i + 1]}`;
    for (const [keyword, courseId] of Object.entries(TOPIC_TO_COURSE_MAP)) {
      if (bigram.includes(keyword.toLowerCase()) && !foundTopics.includes(courseId)) {
        foundTopics.push(courseId);
      }
    }
  }

  return [...new Set(foundTopics)];
}

/**
 * Try to infer courseId from message content using topic mapping.
 */
export function inferCourseIdFromMessage(message: string): string | null {
  const topics = extractTopics(message);
  logDebug('Inferred topics from message:', topics);
  return topics[0] ?? null;
}

/**
 * Try to match a session/context title to a course in the Redux store.
 */
export function matchCourseByTitle(
  title: string | undefined,
  courses: Course[],
): string | null {
  if (!title?.trim()) return null;
  const normalizedTitle = title.toLowerCase().trim();

  for (const course of courses) {
    const courseTitle = course.title?.toLowerCase()?.trim() ?? '';
    if (courseTitle && (normalizedTitle.includes(courseTitle) || courseTitle.includes(normalizedTitle))) {
      logDebug('Matched course by title:', course.id, course.title);
      return course.id;
    }
  }

  return null;
}

export interface ResolveCourseIdOptions {
  /** Direct prop passed to component */
  directCourseId?: string;
  /** URL search param */
  searchCourseId?: string | null;
  /** URL route param */
  routeCourseId?: string | null;
  /** URL route param (session slug or id) */
  routeSessionId?: string | null;
  /** Current Redux selected course */
  reduxSelectedCourse?: Course | null;
  /** All courses from Redux store */
  reduxCourses?: Course[];
  /** Session / context title (e.g. live session title) */
  contextTitle?: string;
  /** User message content for topic inference */
  message?: string;
  /** Previous session context from localStorage */
  sessionContext?: AiSessionContext;
}

/**
 * Resolve courseId from multiple sources in priority order.
 * Returns null if no valid courseId could be determined.
 */
export function resolveCourseId(options: ResolveCourseIdOptions): string | null {
  const {
    directCourseId,
    searchCourseId,
    routeCourseId,
    routeSessionId,
    reduxSelectedCourse,
    reduxCourses,
    contextTitle,
    message,
    sessionContext,
  } = options;

  // 1. Direct prop (highest priority)
  if (directCourseId?.trim()) {
    logDebug('Resolved courseId from direct prop:', directCourseId.trim());
    return directCourseId.trim();
  }

  // 2. Redux selected course
  if (reduxSelectedCourse?.id?.trim()) {
    logDebug('Resolved courseId from Redux selectedCourse:', reduxSelectedCourse.id);
    return reduxSelectedCourse.id.trim();
  }

  // 3. URL search param
  if (searchCourseId?.trim()) {
    logDebug('Resolved courseId from URL search param:', searchCourseId.trim());
    return searchCourseId.trim();
  }

  // 4. URL route param (courseId)
  if (routeCourseId?.trim()) {
    logDebug('Resolved courseId from URL route param:', routeCourseId.trim());
    return routeCourseId.trim();
  }

  // 5. Session context from previous chat (localStorage)
  if (sessionContext?.courseId?.trim()) {
    logDebug('Resolved courseId from cached session context:', sessionContext.courseId);
    return sessionContext.courseId.trim();
  }

  // 6. Match context title to Redux courses
  if (reduxCourses?.length && contextTitle?.trim()) {
    const matched = matchCourseByTitle(contextTitle, reduxCourses);
    if (matched) {
      logDebug('Resolved courseId by matching context title to Redux courses:', matched);
      return matched;
    }
  }

  // 7. Infer from user message keywords
  if (message?.trim()) {
    const inferred = inferCourseIdFromMessage(message);
    if (inferred) {
      logDebug('Resolved courseId from message topic inference:', inferred);
      return inferred;
    }
  }

  // 8. Route sessionId as last resort fallback
  if (routeSessionId?.trim()) {
    logDebug('Resolved courseId from route sessionId fallback:', routeSessionId.trim());
    return routeSessionId.trim();
  }

  logDebug('Could not resolve any courseId from options.');
  return null;
}

/**
 * Validate that a courseId is non-empty and not a generic placeholder.
 */
export function isValidCourseId(courseId: string | null | undefined): courseId is string {
  if (!courseId) return false;
  const trimmed = courseId.trim();
  if (!trimmed) return false;
  if (trimmed === 'live-sessions') return false; // old generic fallback
  if (trimmed === 'undefined') return false;
  if (trimmed === 'null') return false;
  return true;
}

