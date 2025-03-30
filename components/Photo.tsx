import { LinearGradient } from 'expo-linear-gradient';
import { Image, Text, View } from 'react-native';
import tw from 'twrnc';

import { IPhoto } from '~/types/photo';

export default function Photo({ photo }: { photo: IPhoto }) {
  return (
    <View
      style={tw.style(
        'flex items-center justify-center bg-gray-300 rounded-lg relative w-full h-52'
      )}>
      <Image
        source={{ uri: photo.thumbnailUrl }}
        alt={photo.title}
        style={tw`w-full h-full rounded-lg`}
      />
      <LinearGradient
        colors={['#000000ab', 'transparent']}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={tw`absolute bottom-0 w-full px-2 py-3 h-20 rounded-b-lg`}>
        <Text style={tw`absolute bottom-0 w-full px-2 py-3 text-white font-bold text-sm`}>
          {photo.title}
        </Text>
      </LinearGradient>
    </View>
  );
}
