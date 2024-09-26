import { ErrorContent } from '@/components/error/error-content';
import { generateMetadata as generatePageMetadata } from '@/lib/metadata';

export async function generateMetadata() {
  return generatePageMetadata({
    description: 'Error',
  });
}

export default function ErrorPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <ErrorContent />
    </div>
  );
}
