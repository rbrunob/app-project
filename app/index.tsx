import { Container } from '~/components/Container';
import { PageTitle } from '~/components/PageTitle';
import Search from '~/components/Search';

export default function Home() {
  return (
    <Container>
      <PageTitle title="Explore as novidades" />

      <Search placeholder="Conhece algum dos nossos artistas?" />
    </Container>
  );
}
