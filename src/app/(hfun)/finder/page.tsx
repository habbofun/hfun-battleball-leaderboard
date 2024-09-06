import { HabboUserInfo } from '@/components/habbo/finder/habbo-user-info';

export default function FinderPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-grow flex flex-col justify-center items-center p-4">
        <HabboUserInfo />
      </main>
    </div>
  );
}
