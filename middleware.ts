import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
    // Allow landing page at root
    if (req.nextUrl.pathname === '/') {
        return NextResponse.next()
    }

    // Redirect login/signup to inbox (no auth needed for preview)
    if (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/signup') {
        return NextResponse.redirect(new URL('/inbox', req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/login',
        '/signup',
    ],
}
