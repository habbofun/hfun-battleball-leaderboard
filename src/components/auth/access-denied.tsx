import Link from 'next/link';

export default function AccessDenied() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md mx-auto px-4 py-8shadow-md rounded-lg">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
          Access denied
        </h2>
        <p className="text-sm sm:text-base text-center">
          <Link href="/auth/sign-in" className="text-gray-400 hover:underline">
            You must be signed in to view this page
          </Link>
        </p>
      </div>
    </div>
  );
}
