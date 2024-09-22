import { HabboUserInfo } from '@/components/habbo/finder/habbo-user-info';

export default function FinderPage() {
  return (
    <div className="flex flex-col flex-1 bg-background text-foreground">
      <div className="flex-grow flex flex-col justify-center items-center p-4">
        <HabboUserInfo />
      </div>
    </div>
  );
}
