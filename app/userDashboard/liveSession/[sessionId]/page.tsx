import { notFound } from 'next/navigation';
import { getSessionBySlug } from '../data';
import { LiveSessionRoom } from '../components/LiveSessionRoom';

export default async function LiveSessionDetailsPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;
  const session = getSessionBySlug(sessionId);

  if (!session) {
    notFound();
  }

  return <LiveSessionRoom session={session} />;
}
