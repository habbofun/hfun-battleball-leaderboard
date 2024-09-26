import { HabboUserInfo } from '@/components/habbo/finder/habbo-user-info';
import { generateMetadata as generatePageMetadata } from '@/lib/metadata';

export async function generateMetadata() {
  return generatePageMetadata({
    description: 'Habbo user finder',
  });
}

export default function FinderPage() {
  return (
    <div className="flex flex-col flex-1 bg-background text-foreground">
      <div className="flex-grow flex flex-col justify-center items-center p-4">
        <HabboUserInfo />
      </div>
    </div>
  );
}
