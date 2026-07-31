import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'No code returned from Spotify' }, { status: 400 });
  }

  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirect_uri = 'http://127.0.0.1:3000/api/spotify/callback';

  if (!client_id || !client_secret) {
    return NextResponse.json({ error: 'SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET is missing from .env' }, { status: 500 });
  }

  const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirect_uri,
      }).toString(),
      cache: 'no-store',
    });

    const data = await response.json();

    if (data.error) {
      return NextResponse.json({ error: data.error, description: data.error_description }, { status: 400 });
    }

    const { refresh_token } = data;

    if (!refresh_token) {
      return NextResponse.json({ error: 'Spotify did not return a refresh token. Make sure you are using the Authorization Code Flow.' }, { status: 400 });
    }

    // Automatically update the .env file
    const envPath = path.join(process.cwd(), '.env');
    let envContent = '';
    if (fs.existsSync(envPath)) {
      envContent = fs.readFileSync(envPath, 'utf8');
    }

    if (envContent.includes('SPOTIFY_REFRESH_TOKEN=')) {
      envContent = envContent.replace(
        /SPOTIFY_REFRESH_TOKEN=.*/,
        `SPOTIFY_REFRESH_TOKEN=${refresh_token}`
      );
    } else {
      envContent += `\nSPOTIFY_REFRESH_TOKEN=${refresh_token}`;
    }

    fs.writeFileSync(envPath, envContent, 'utf8');

    return new NextResponse(
      `<html>
        <head>
          <title>Authorization Successful</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              background-color: #0b0b0f;
              color: #f3f4f6;
              max-width: 600px;
              margin: 60px auto;
              padding: 24px;
              line-height: 1.6;
              border-radius: 12px;
              border: 1px solid #1f1f2e;
              box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            }
            h2 { color: #1db954; margin-top: 0; font-size: 24px; font-weight: 700; }
            code { background-color: #1a1a24; padding: 3px 6px; border-radius: 4px; font-family: monospace; color: #a5b4fc; }
            pre {
              background-color: #111116;
              padding: 16px;
              border-radius: 8px;
              overflow-x: auto;
              border: 1px solid #27273a;
              color: #34d399;
              font-size: 14px;
              word-break: break-all;
              white-space: pre-wrap;
              font-family: monospace;
            }
            .success-badge {
              display: inline-block;
              background-color: rgba(29, 185, 84, 0.1);
              color: #1db954;
              padding: 4px 12px;
              border-radius: 20px;
              font-size: 14px;
              font-weight: 600;
              margin-bottom: 16px;
            }
            .warning-note {
              background-color: rgba(245, 158, 11, 0.1);
              border-left: 4px solid #f59e0b;
              color: #f59e0b;
              padding: 12px;
              border-radius: 4px;
              margin-top: 20px;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="success-badge">Success</div>
          <h2>Spotify Authorization Code Swapped Successfully!</h2>
          <p>The new refresh token with the required scopes (<code>user-read-currently-playing</code>) has been generated.</p>
          <p><strong>Action Taken:</strong> Automatically updated the <code>SPOTIFY_REFRESH_TOKEN</code> inside your <code>.env</code> file.</p>
          
          <h3>New Refresh Token:</h3>
          <pre>${refresh_token}</pre>
          
          <div class="warning-note">
            <strong>Important Next Step:</strong> Please restart your Next.js development server to pick up the updated environment variables from <code>.env</code> (stop the current <code>npm run dev</code> process and run it again).
          </div>
        </body>
      </html>`,
      {
        headers: { 'Content-Type': 'text/html' },
      }
    );
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
