import { Container } from '~/components/Container';
import HighlightAlbumField from '~/components/HighlightAlbumField';
import HighlightPhotoField from '~/components/HighlightPhotoField';
import HighlightUserField from '~/components/HighlightUserField';
import { PageTitle } from '~/components/PageTitle';
import { ScreenContent } from '~/components/ScreenContent';
import Search from '~/components/Search';

export default function Home() {
  return (
    <Container>
      <PageTitle title="Explore as novidades" />
      <Search placeholder="Conhece algum dos nossos artistas?" />
      <ScreenContent>
        <HighlightUserField authorID={String(Math.floor(Math.random() * 10 + 1))} />
        <HighlightAlbumField albumIDSelected={String(Math.floor(Math.random() * 10 + 1))} />
        <HighlightPhotoField albumIDSelected={String(Math.floor(Math.random() * 10 + 1))} />
      </ScreenContent>
    </Container>
  );
}
