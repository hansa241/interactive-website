import type {NextRequest} from "next/server";
import {NextResponse} from "next/server";

export const config = {
    matcher: '/streetview/:path*',
}

export function middleware(request: NextRequest) {
    const authHeader = request.headers.get('authorization');
    if (authHeader === null) {
        return new NextResponse('Authentication is required', {
            status: 401,
            headers: {
                'WWW-Authenticate': 'Basic realm="streetview"'
            },
        });
    }

    const [scheme, encoded] = authHeader.split(' ');
    if (scheme !== 'Basic' || !encoded) {
        return new NextResponse('Invalid authentication format', {
            status: 400
        });
    }

    const decoded = Buffer.from(encoded, 'base64').toString('utf-8');
    const [username, password] = decoded.split(':');

    if (
        username !== process.env.STREETVIEW_USERNAME ||
        password !== process.env.STREETVIEW_PASSWORD
    ) {
        return new NextResponse('Invalid authorization', {
            status: 401,
            headers: {
                'WWW-Authenticate': 'Basic realm="streetview"',
            },
        })
    }

    return NextResponse.next();
}

