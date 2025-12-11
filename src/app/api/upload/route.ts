import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return new NextResponse('', { status: 200 });
}

export async function POST(request: NextRequest) {
  // Efficiently consume and discard the stream
  if (request.body) {
    const reader = request.body.getReader();
    try {
      while (true) {
        const { done } = await reader.read();
        if (done) break;
      }
    } catch (e) {
      // Ignore errors during stream reading (client might cancel)
    }
  }
  return new NextResponse('', { status: 200 });
}
