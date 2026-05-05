import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  let shortId = searchParams.get('shortId');

  if (!shortId) {
    return NextResponse.json({ error: 'shortId is required' }, { status: 400 });
  }

  // If the user pasted the full minified URL, extract the shortId
  if (shortId.startsWith('http')) {
    try {
      const urlObj = new URL(shortId);
      shortId = urlObj.pathname.replace('/', '');
    } catch {
      return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 });
    }
  } else {
      // It might be like domain.com/shortId, just remove any leading slashes
      shortId = shortId.split('/').pop() || shortId;
  }

  try {
    const url = await prisma.url.findUnique({
      where: { shortId },
    });

    if (!url) {
      return NextResponse.json({ error: 'Short URL not found' }, { status: 404 });
    }

    return NextResponse.json({
      original: url.original,
      shortId: url.shortId,
      clicks: url.clicks,
      createdAt: url.createdAt,
    });
  } catch (error) {
    console.error('Error fetching URL stats:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
