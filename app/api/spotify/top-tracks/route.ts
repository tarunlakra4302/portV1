import { NextResponse } from 'next/server'
import * as fs from 'fs'
import * as path from 'path'

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
    // fallback
  }

  return { client_id, client_secret, refresh_token };
}

const defaultTracks = [
  {
    id: "1",
    title: "Blinding Lights",
    artist: "The Weeknd",
    albumArt: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
    spotifyUrl: "https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMiFD"
  },
  {
    id: "2",
    title: "Someone You Loved",
    artist: "Lewis Capaldi",
    albumArt: "https://i.scdn.co/image/ab67616d0000b273fc2101e6889d6ce9025f85f2",
    spotifyUrl: "https://open.spotify.com/track/7qiZjoN4coc1piW748XbbA"
  },
  {
    id: "3",
    title: "Shape of You",
    artist: "Ed Sheeran",
    albumArt: "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96",
    spotifyUrl: "https://open.spotify.com/track/7qiZjoN4coc1piW748XbbA"
  },
  {
    id: "4",
    title: "Starboy",
    artist: "The Weeknd",
    albumArt: "https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452",
    spotifyUrl: "https://open.spotify.com/track/7qiZjoN4coc1piW748XbbA"
  },
  {
    id: "5",
    title: "Levitating",
    artist: "Dua Lipa",
    albumArt: "https://i.scdn.co/image/ab67616d0000b273be841ba4bc24340152e3a79a",
    spotifyUrl: "https://open.spotify.com/track/3ee8Jm2cnm6IQ8XmXOIg6H"
  },
  {
    id: "6",
    title: "Save Your Tears",
    artist: "The Weeknd",
    albumArt: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
    spotifyUrl: "https://open.spotify.com/track/5pgZph2v0mEqSqZz10r53e"
  }
]

async function getAccessToken() {
  const { client_id, client_secret, refresh_token } = getCredentials();
  if (!client_id || !client_secret || !refresh_token) {
    throw new Error('Spotify environment variables are missing')
  }

  const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    }).toString(),
    cache: 'no-store'
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch access token: ${response.statusText}`)
  }

  return response.json()
}

export async function GET() {
  try {
    const { access_token } = await getAccessToken()

    const response = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=6&time_range=short_term', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: 'no-store'
    })

    if (!response.ok) {
      console.error(`Spotify API error: ${response.status} ${response.statusText}`)
      return NextResponse.json({ tracks: defaultTracks })
    }

    const data = await response.json()
    
    if (!data.items || data.items.length === 0) {
      return NextResponse.json({ tracks: defaultTracks })
    }

    const tracks = data.items.map((track: any) => ({
      id: track.id,
      title: track.name,
      artist: track.artists.map((_artist: any) => _artist.name).join(', '),
      albumArt: track.album.images[0]?.url || '',
      spotifyUrl: track.external_urls.spotify
    }))

    return NextResponse.json({ tracks })
  } catch (error) {
    console.error('Error fetching Spotify tracks:', error)
    // Fall back to default tracks on any error so UI doesn't break
    return NextResponse.json({ tracks: defaultTracks })
  }
}
