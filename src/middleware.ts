import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

import { matcher, publicRoutes } from '@/types/middleware';

const isPublicRoute = createRouteMatcher(publicRoutes);

export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) {
    auth().protect();
  }
});

export const config = { matcher };
