import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#1DA1F2',
        tabBarInactiveTintColor: '#444444',
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          color: '#444444',
        },
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderColor: '#E7E7E7',
          borderWidth: 1,
          boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.1)',
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          paddingTop: 8,
        },
      }}>
      <Tabs.Screen
        name="albums"
        options={{
          title: 'Álbuns',
          tabBarIcon: ({ color }) => <Ionicons size={24} name="albums" color={color} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Explorar',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="explore" color={color} />,
        }}
      />
      <Tabs.Screen
        name="authors"
        options={{
          title: 'Artistas',
          tabBarIcon: ({ color }) => <FontAwesome size={22} name="users" color={color} />,
        }}
      />
    </Tabs>
  );
}
