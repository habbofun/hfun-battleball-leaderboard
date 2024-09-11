/**
 * Array of public routes that don't require authentication.
 */
export const publicRoutes = [
  /* Root */
  '/',

  /* Auth */
  '/sign-in(.*)', // Sign-in page and its subpages
  '/sign-up(.*)', // Sign-up page and its subpages

  /* Pages */
  '/catalog(.*)', // Catalog page and its subpages
  '/leaderboard(.*)', // Leaderboard page and its subpages
  '/finder(.*)', // Finder page and its subpages
];

/**
 * Matcher for the middleware.
 */
export const matcher = [
  // Skip Next.js internals and all static files, unless found in search params
  '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  // Always run for API routes
  '/(api|trpc)(.*)',
];
