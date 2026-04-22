import { LiveSessionsHome } from './components/LiveSessionsHome';

export default function LiveSessionPage() {
  return (
    <div className="min-h-screen bg-[#fff3eb] overflow-x-hidden">
      <div className="lg:mr-20 xl:mr-64">
        <main className="px-4 pb-8 pt-28 lg:px-8">
          <LiveSessionsHome />
        </main>
      </div>
    </div>
  );
}
