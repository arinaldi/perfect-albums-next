import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Playlist | Perfect Albums',
};

export default function Playlist() {
  return (
    <a
      className="hover:text-muted-foreground underline underline-offset-4"
      href="https://open.spotify.com/playlist/3NAIQcUEkwKXu2eHaZBQrg"
      rel="noopener noreferrer"
      target="_blank"
    >
      Spotify
    </a>
  );
}
