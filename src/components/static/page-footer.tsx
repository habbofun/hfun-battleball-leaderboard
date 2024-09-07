import Link from 'next/link';

export function PageFooter() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-6 text-center">
        <p className="text-sm text-muted-foreground mt-1">
          Visit our main website at{' '}
          <Link
            href="https://habbofun.org"
            className="underline hover:text-primary"
          >
            habbofun.org
          </Link>
        </p>
        <p className="text-[10px] text-muted-foreground mt-2">
          HFUN.info is an independent fan site. Not affiliated with or endorsed
          by Sulake Corporation Oy.
        </p>
      </div>
    </footer>
  );
}
