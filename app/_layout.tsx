import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="authors" />
      <Stack.Screen name="albums" />
      <Stack.Screen name="albums/[albumId]" />
      <Stack.Screen name="authors/[authorId]" />
    </Stack>
  );
}
