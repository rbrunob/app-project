import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';

import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';

export default function AlbumPage() {
  const { albumId } = useLocalSearchParams();

  return (
    <Container>
      <ScreenContent path="app/index.tsx" title="AlbumPage" />
      <Text>Album ID: {albumId}</Text>
    </Container>
  );
}
