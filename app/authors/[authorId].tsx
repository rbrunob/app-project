import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';

import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';

export default function AuthorPage() {
  const { authorId } = useLocalSearchParams();

  return (
    <Container>
      <ScreenContent path="app/index.tsx" title="AuthorPage" />
      <Text>Author ID: {authorId}</Text>
    </Container>
  );
}
