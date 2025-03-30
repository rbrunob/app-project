import { Container } from '~/components/Container';
import HighlightUserField from '~/components/HighlightUserField';
import MoreVistedAuthors from '~/components/MoreVistedAuthors';
import { PageTitle } from '~/components/PageTitle';
import { ScreenContent } from '~/components/ScreenContent';
import Search from '~/components/Search';

export default function AuthorsPage() {
  return (
    <Container>
      <PageTitle title="Explore nossos artistas" />
      <Search placeholder="Conhece algum dos nossos artistas?" />
      <ScreenContent>
        <MoreVistedAuthors />
        <HighlightUserField authorID={String(Math.floor(Math.random() * 10 + 1))} />
        <HighlightUserField authorID={String(Math.floor(Math.random() * 10 + 1))} />
        <HighlightUserField authorID={String(Math.floor(Math.random() * 10 + 1))} />
        <HighlightUserField authorID={String(Math.floor(Math.random() * 10 + 1))} />
      </ScreenContent>
    </Container>
  );
}
