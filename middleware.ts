import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Define public routes that don't require authentication
const publicRoutes = createRouteMatcher([
    '/', '/sign-in*', '/sign-up*', '/api/webhook/clerk'
])

export default clerkMiddleware(async (auth, request) => {
    // If the route is not public, protect it with authentication
    if (!publicRoutes(request)) {
        await auth.protect()
    }
})

export const config = {
    matcher: [
        // Skip Next.js internals and all static files
        '/((?!_next|[^?]\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
}