import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import tw from 'twrnc';

import { Button } from './Button';

import { GetPhotosByAlbum } from '~/services/GET/photos-by-album';
import { GetUniqueAlbum } from '~/services/GET/unique-album';
import { GetUniqueAuthor } from '~/services/GET/unique-author';
import { IAlbum } from '~/types/album';
import { IAuthor } from '~/types/author';
import { IPhoto } from '~/types/photo';

export default function TodaysHighlightAlbum({ albumIDSelected }: { albumIDSelected: string }) {
  const [author, setAuthor] = useState<IAuthor>();
  const [album, setAlbum] = useState<IAlbum>();
  const [photo, setPhoto] = useState<IPhoto>();

  const fetchPhotosByAlbum = useCallback(async () => {
    try {
      const response = await GetPhotosByAlbum({ albumID: album?.id as number, limit: 1 });

      if (response) {
        const updatedPhoto = response.map((photo: IPhoto) => ({
          ...photo,
          thumbnailUrl: `https://picsum.photos/${photo.id}/150`,
          url: `https://picsum.photos/${photo.id}/600`,
        }));

        setPhoto(updatedPhoto[0]);
      }
    } catch (error) {
      console.error('Error fetching photos by album:', error);
    }
  }, [album?.id]);

  const fetchUser = useCallback(async () => {
    try {
      const response = await GetUniqueAuthor({ authorID: String(album?.userId) });

      if (response) {
        const authors = response;
        setAuthor(authors[0]);
      }
    } catch (error) {
      console.error(error);
    }
  }, [album?.userId]);

  const fetchAlbum = useCallback(async () => {
    try {
      const response = await GetUniqueAlbum({ albumID: albumIDSelected });

      if (response) {
        const albums = response;
        setAlbum(albums[0]);

        if (albums[0]?.id) {
          fetchUser();
          fetchPhotosByAlbum();
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, [albumIDSelected]);

  useEffect(() => {
    fetchAlbum();
  }, [fetchUser]);

  return (
    <View style={tw`w-full flex flex-col items-start justify-start gap-3`}>
      <Text style={tw`text-[#444] font-bold text-base`}>Nosso destaque de hoje</Text>
      <Link
        asChild
        href={{ pathname: '/albums/[albumId]', params: { albumId: String(album?.id) } }}>
        <Button>
          <View style={tw`flex flex-wrap flex-row gap-3 items-start justify-start`}>
            <View
              style={tw.style(
                'flex items-center justify-center bg-gray-300 rounded-lg relative w-full h-36'
              )}>
              <Image
                source={{ uri: photo?.thumbnailUrl }}
                alt={photo?.title}
                style={tw`w-full h-full rounded-lg`}
              />

              <LinearGradient
                colors={['#000000ab', 'transparent']}
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0 }}
                style={tw`absolute bottom-0 w-full px-2 py-3 h-20 rounded-lg flex flex-col items-start justify-end`}>
                <Text style={tw`w-full text-white font-bold text-base`}>{album?.title}</Text>
                <Text style={tw`w-full text-white font-normal text-sm`}>
                  Álbum por <Text style={tw`font-bold`}>{author?.name}</Text>
                </Text>
              </LinearGradient>
            </View>
          </View>
        </Button>
      </Link>
    </View>
  );
}
