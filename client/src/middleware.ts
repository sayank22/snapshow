// src/middleware.ts
import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

// Optionally, restrict middleware to only specific routes:
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'], // applies Clerk to all routes except static files and API
};
