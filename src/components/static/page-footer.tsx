import Link from 'next/link';

export function PageFooter() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-6 text-center">
        <p className="text-sm text-muted-foreground">Official site from HABBOFUN</p>
        <p className="text-sm text-muted-foreground mt-1">
          Visit our main website at{' '}
          <Link href="https://habbofun.org" className="underline hover:text-primary">
            habbofun.org
          </Link>
        </p>
      </div>
    </footer>
  );
}
