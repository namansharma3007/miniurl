import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redis } from "@/lib/redis";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Verify ownership
    const url = await prisma.url.findUnique({
      where: { id },
    });

    if (!url || url.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Not found or forbidden" },
        { status: 403 },
      );
    }

    await prisma.url.delete({
      where: { id },
    });

    if (redis) {
      redis.del(`url:${url.shortId}`).catch(console.error);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting URL:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
