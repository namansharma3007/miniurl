import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redis } from '@/lib/redis';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized. Please sign in to minify URLs.' }, { status: 401 });
    }

    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    try {
      new URL(url);
    } catch {
      return NextResponse.json({ error: 'Invalid URL provided' }, { status: 400 });
    }

    // Check limit
    const userUrlCount = await prisma.url.count({
      where: { userId: session.user.id }
    });

    if (userUrlCount >= 10) {
      return NextResponse.json({ error: 'You have reached the maximum limit of 10 minified URLs.' }, { status: 403 });
    }

    // Check if exactly this URL already exists for this user
    const existingUrl = await prisma.url.findFirst({
      where: { 
        original: url,
        userId: session.user.id
      },
    });

    if (existingUrl) {
      return NextResponse.json({
        shortId: existingUrl.shortId,
        original: existingUrl.original,
        exists: true,
        message: 'This URL already exists in your dashboard!'
      }, { status: 200 });
    }

    let shortId = crypto.randomBytes(4).toString('base64url').slice(0, 6);
    
    // Collision retry mechanism
    let exists = await prisma.url.findUnique({ where: { shortId } });
    while (exists) {
      shortId = crypto.randomBytes(4).toString('base64url').slice(0, 6);
      exists = await prisma.url.findUnique({ where: { shortId } });
    }

    const newUrl = await prisma.url.create({
      data: {
        original: url,
        shortId: shortId,
        userId: session.user.id
      },
    });

    if (redis) {
      await redis.set(`url:${newUrl.shortId}`, newUrl.original, 'EX', 60 * 60 * 24 * 7); // Cache for 7 days
    }

    return NextResponse.json({ 
      shortId: newUrl.shortId, 
      original: newUrl.original 
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating short URL:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
