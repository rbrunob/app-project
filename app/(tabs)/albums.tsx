import { Container } from '~/components/Container';
import HighlightAlbumField from '~/components/HighlightAlbumField';
import { PageTitle } from '~/components/PageTitle';
import { ScreenContent } from '~/components/ScreenContent';
import Search from '~/components/Search';
import TodaysHighlightAlbum from '~/components/TodaysHighlightAlbum';

export default function AlbumsPage() {
  return (
    <Container>
      <PageTitle title="Explore álbuns de artistas" />
      <Search placeholder="Conhece algum dos nossos artistas?" />
      <ScreenContent>
        <TodaysHighlightAlbum albumIDSelected={String(Math.floor(Math.random() * 10 + 1))} />
        <HighlightAlbumField albumIDSelected={String(Math.floor(Math.random() * 10 + 1))} />
        <HighlightAlbumField albumIDSelected={String(Math.floor(Math.random() * 10 + 1))} />
        <HighlightAlbumField albumIDSelected={String(Math.floor(Math.random() * 10 + 1))} />
        <HighlightAlbumField albumIDSelected={String(Math.floor(Math.random() * 10 + 1))} />
      </ScreenContent>
    </Container>
  );
}
