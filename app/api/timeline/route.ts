import { NextRequest } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const state = searchParams.get('state');

    if (!adminDb) {
      return Response.json({ error: 'Database not initialized' }, { status: 500 });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let query: any = adminDb.collection('constituencies');
    if (state) {
      query = query.where('stateEn', '==', state);
    }

    const snapshot = await query.get();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const results = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data()
    }));

    return Response.json(results);
  } catch (error) {
    console.error('Timeline API Error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
