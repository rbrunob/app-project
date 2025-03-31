import { useLocalSearchParams } from 'expo-router';

import { Container } from '~/components/Container';
import Search from '~/components/Search';
import WelcomeText from '~/components/WelcomeText';

export default function AuthorPage() {
  const { authorId } = useLocalSearchParams();

  return (
    <Container>
      <Search placeholder="Conhece algum dos nossos artistas?" />
      <WelcomeText authorIDSelected={authorId as string} />
    </Container>
  );
}
