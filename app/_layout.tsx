import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="albums/[albumId]"
        options={{
          title: 'Álbum',
          headerShown: true,
          headerBackTitle: 'Voltar',
          headerTitle: '',
          headerTintColor: '#444',
          headerShadowVisible: false,
          headerTransparent: true,
          headerBackButtonDisplayMode: 'default',
        }}
      />
      <Stack.Screen
        name="authors/[authorId]"
        options={{
          title: 'Artista',
          headerShown: true,
          headerBackTitle: 'Voltar',
          headerTitle: '',
          headerTintColor: '#444',
          headerShadowVisible: false,
          headerTransparent: true,
          headerBackButtonDisplayMode: 'default',
        }}
      />
    </Stack>
  );
}
