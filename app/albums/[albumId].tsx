import { useLocalSearchParams } from 'expo-router';

import { Container } from '~/components/Container';
import GalleryAlbum from '~/components/GalleryAlbum';
import { ScreenContent } from '~/components/ScreenContent';
import Search from '~/components/Search';
import WelcomeText from '~/components/WelcomeText';

export default function AlbumPage() {
  const { albumId } = useLocalSearchParams();

  return (
    <Container>
      <Search placeholder="Conhece algum dos nossos artistas?" />
      <ScreenContent>
        <WelcomeText albumIDSelected={albumId as string} />
        <GalleryAlbum albumIDSelected={albumId as string} />
      </ScreenContent>
    </Container>
  );
}
