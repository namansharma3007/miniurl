import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { redis } from '@/lib/redis';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ shortId: string }> }
) {
  const shortId = (await params).shortId;

  if (!shortId) {
    return new NextResponse('Bad Request', { status: 400 });
  }

  try {
    let originalUrl: string | null = null;

    if (redis) {
      originalUrl = await redis.get(`url:${shortId}`);
    }

    if (!originalUrl) {
      const url = await prisma.url.findUnique({
        where: { shortId },
      });

      if (!url) {
        // Redirect to home or a 404 page if not found
        const urlOrigin = new URL(req.url).origin;
        return NextResponse.redirect(`${urlOrigin}/?error=not-found`, { status: 302 });
      }

      originalUrl = url.original;

      if (redis) {
        redis.set(`url:${shortId}`, url.original, 'EX', 60 * 60 * 24 * 7).catch(console.error); // Cache for 7 days
      }
    }

    // Increment click asynchronously to avoid blocking the redirect
    prisma.url.update({
      where: { shortId },
      data: { clicks: { increment: 1 } },
    }).catch(error => console.error('Failed to update clicks:', error));

    return NextResponse.redirect(originalUrl, { 
      status: 301,
      headers: {
        'X-Robots-Tag': 'noindex, nofollow' // Crucial SEO step: Prevent Google from indexing the shortened links
      }
    });
  } catch (error) {
    console.error('Error in redirection:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
