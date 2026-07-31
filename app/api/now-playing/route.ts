import { NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';

function getCredentials() {
  let client_id = process.env.SPOTIFY_CLIENT_ID;
  let client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  let refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

  try {
    const envPath = path.join(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      const tokenMatch = envContent.match(/^SPOTIFY_REFRESH_TOKEN=(.*)$/m);
      if (tokenMatch && tokenMatch[1]) {
        refresh_token = tokenMatch[1].trim();
      }
      const idMatch = envContent.match(/^SPOTIFY_CLIENT_ID=(.*)$/m);
      if (idMatch && idMatch[1]) {
        client_id = idMatch[1].trim();
      }
      const secretMatch = envContent.match(/^SPOTIFY_CLIENT_SECRET=(.*)$/m);
      if (secretMatch && secretMatch[1]) {
        client_secret = secretMatch[1].trim();
      }
    }
  } catch (e) {
    // fallback to process.env
  }

  return { client_id, client_secret, refresh_token };
}

const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';

const getAccessToken = async () => {
  const { client_id, client_secret, refresh_token } = getCredentials();
  const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refresh_token || '',
    }),
    cache: 'no-store',
  });

  return response.json();
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const logFile = path.join(process.cwd(), 'spotify-debug.log');
  const log = (msg: string) => fs.appendFileSync(logFile, msg + '\n');
  
  try {
    const tokenResponse = await getAccessToken();
    log('Token response: ' + JSON.stringify(tokenResponse));
    
    if (!tokenResponse.access_token) {
      log('Failed to get access token');
      return NextResponse.json({ isPlaying: false, error: 'No access token' });
    }

    const { access_token } = tokenResponse;

    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: 'no-store',
    });

    log('Spotify response status: ' + response.status);

    if (response.status === 204 || response.status > 400) {
      return NextResponse.json({ isPlaying: false });
    }

    const song = await response.json();
    log('Spotify song data: ' + JSON.stringify(song).substring(0, 200) + '...');

    if (song.item === null) {
      return NextResponse.json({ isPlaying: false });
    }

    const isPlaying = song.is_playing;
    const title = song.item.name;
    const artist = song.item.artists.map((_artist: any) => _artist.name).join(', ');
    const album = song.item.album.name;
    const albumImageUrl = song.item.album.images[0].url;
    const songUrl = song.item.external_urls.spotify;

    return NextResponse.json({
      album,
      albumImageUrl,
      artist,
      isPlaying,
      songUrl,
      title,
    });
  } catch (error) {
    log('Error fetching Spotify now playing: ' + String(error));
    return NextResponse.json(
      { isPlaying: false, message: 'Internal Server Error', error: String(error) },
      { status: 500 }
    );
  }
}
