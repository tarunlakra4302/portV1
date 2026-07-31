import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const redirect_uri = 'http://127.0.0.1:3000/api/spotify/callback';
  const scope = 'user-read-currently-playing user-read-playback-state user-top-read';

  if (!client_id) {
    return NextResponse.json({ error: 'SPOTIFY_CLIENT_ID is not configured in .env' }, { status: 500 });
  }

  const spotifyAuthUrl = `https://accounts.spotify.com/authorize?` + 
    new URLSearchParams({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      show_dialog: 'true', // Force show authorization dialog so user can confirm
    }).toString();

  return NextResponse.redirect(spotifyAuthUrl);
}
