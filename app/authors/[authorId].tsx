import { useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';

import { Container } from '~/components/Container';
import GalleryAlbum from '~/components/GalleryAlbum';
import HighlightAlbumField from '~/components/HighlightAlbumField';
import { ScreenContent } from '~/components/ScreenContent';
import Search from '~/components/Search';
import TodaysHighlightAlbum from '~/components/TodaysHighlightAlbum';
import WelcomeText from '~/components/WelcomeText';
import { GetAlbumsByAuthor } from '~/services/GET/albums-by-author';
import { IAlbum } from '~/types/album';

export default function AuthorPage() {
  const { authorId } = useLocalSearchParams();
  const [albums, setAlbums] = useState<IAlbum[]>([]);

  const fetchAlbumsByAuthor = useCallback(async () => {
    try {
      const response = await GetAlbumsByAuthor({ authorIDFromAlbum: authorId as string });
      if (response) {
        const albums = response;
        setAlbums(albums);
      }
    } catch (error) {
      console.error('Error fetching albums by author:', error);
    }
  }, [authorId]);

  useEffect(() => {
    fetchAlbumsByAuthor();
  }, [fetchAlbumsByAuthor]);

  return (
    <Container>
      <Search placeholder="Conhece algum dos nossos artistas?" />
      <ScreenContent>
        <WelcomeText authorIDSelected={authorId as string} />
        <TodaysHighlightAlbum albumIDSelected={String(Math.floor(Math.random() * 10 + 1))} />
        {albums.map((album, index) => (
          <HighlightAlbumField key={index} albumIDSelected={String(album.id)} />
        ))}
        {albums.map((album, index) => (
          <GalleryAlbum key={index} albumIDSelected={String(album.id)} />
        ))}
      </ScreenContent>
    </Container>
  );
}
