import { LiveSessionsHome } from './components/LiveSessionsHome';
import { LiveSessionAssistant } from './components/LiveSessionAssistant';

export default function LiveSessionPage() {
  return (
    <div className="min-h-screen bg-[#fff3eb] overflow-x-hidden">
      <div className="lg:mr-20 xl:mr-64">
        <main className="px-3 pb-6 pt-26 sm:px-4 sm:pb-8 sm:pt-28 lg:px-8">
          <LiveSessionsHome />
        </main>
      </div>
      <LiveSessionAssistant contextTitle="الحصص المباشرة" />
    </div>
  );
}
