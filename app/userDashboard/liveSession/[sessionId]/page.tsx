'use client';

import { notFound, useParams } from 'next/navigation';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { getSessionBySlug } from '../data';
import { LiveSessionRoom } from '../components/LiveSessionRoom';

export default function LiveSessionDetailsPage() {
  const { t, i18n } = useTranslation();
  const params = useParams<{ sessionId: string }>();
  const session = useMemo(
    () => getSessionBySlug(params.sessionId, t),
    [params.sessionId, t, i18n.language]
  );

  if (!session) {
    notFound();
  }

  return <LiveSessionRoom session={session} />;
}
