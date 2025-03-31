import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import tw from 'twrnc';

import { Button } from './Button';

import { GetAlbumsByAuthor } from '~/services/GET/albums-by-author';
import { GetPhotosByAlbum } from '~/services/GET/photos-by-album';
import { GetUniqueAuthor } from '~/services/GET/unique-author';
import { IAlbum } from '~/types/album';
import { IAuthor } from '~/types/author';
import { IPhoto } from '~/types/photo';

interface HighlightUserFieldProps {
  authorID: string;
}

export default function HighlightUserField({ authorID }: HighlightUserFieldProps) {
  const [author, setAuthor] = useState<IAuthor>();
  const [albums, setAlbums] = useState<IAlbum>();
  const [photos, setPhotos] = useState<IPhoto[]>([]);

  const fetchPhotosByAlbum = useCallback(async () => {
    try {
      const response = await GetPhotosByAlbum({ albumID: albums?.id as number, limit: 4 });

      if (response) {
        const updatedPhotos = response.map((photo: IPhoto) => ({
          ...photo,
          thumbnailUrl: `https://picsum.photos/${photo.id}/150`,
          url: `https://picsum.photos/${photo.id}/600`,
        }));

        setPhotos(updatedPhotos);
      }
    } catch (error) {
      console.error('Error fetching photos by album:', error);
    }
  }, [albums?.id]);

  const fetchAlbumsByAuthor = useCallback(async () => {
    try {
      const response = await GetAlbumsByAuthor({ authorIDFromAlbum: authorID });

      if (response) {
        setAlbums(response[0]);

        if (response[0]?.id) {
          fetchPhotosByAlbum();
        }
      }
    } catch (error) {
      console.error('Error fetching albums by author:', error);
    }
  }, [authorID]);

  const fetchUserHighlight = useCallback(async () => {
    try {
      const authorIDSelected = authorID;
      const response = await GetUniqueAuthor({ authorID: authorIDSelected });

      if (response) {
        const authorData = response[0];
        setAuthor(authorData);
      }
    } catch (error) {
      console.error('Error fetching user highlight:', error);
    }
  }, [authorID]);

  useEffect(() => {
    fetchUserHighlight();
    fetchAlbumsByAuthor();
  }, [fetchUserHighlight, fetchAlbumsByAuthor]);

  return (
    <View style={tw`flex flex-col items-center justify-center`}>
      <View style={tw`flex flex-row items-center justify-between w-full mb-4`}>
        <View style={tw`flex flex-col items-start justify-center`}>
          <Text style={tw`text-[#444] font-bold text-base`}>{author?.name}</Text>
          <Text style={tw`text-[#444] font-normal text-sm`}>{author?.email}</Text>
        </View>
        <Link href={{ pathname: '/authors/[authorId]', params: { authorId: authorID } }} asChild>
          <Button
            style={tw`bg-[#1DA1F2] flex flex-row item-center justify-between gap-2 p-2 rounded`}>
            <FontAwesome name="photo" size={20} color="white" />
            <Text style={tw`font-bold text-sm text-white leading-6`}>Galeria</Text>
          </Button>
        </Link>
      </View>
      <View style={tw`flex flex-row flex-wrap gap-3 w-full`}>
        {photos.map((photo, index) => (
          <View
            key={index}
            style={tw.style('flex items-center justify-center bg-gray-300 rounded-lg relative', {
              'w-full h-28': index === 0,
              'w-[31%] h-28': index !== 0,
            })}>
            <Image
              source={{ uri: photo.thumbnailUrl }}
              alt={photo.title}
              style={tw`w-full h-full rounded-lg`}
            />

            {index === 0 && (
              <LinearGradient
                colors={['#000000ab', 'transparent']}
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0 }}
                style={tw`absolute bottom-0 w-full px-2 py-3 h-20 rounded-lg`}>
                <Text style={tw`absolute bottom-0 w-full px-2 py-3 text-white font-bold text-sm`}>
                  {photo.title}
                </Text>
              </LinearGradient>
            )}
          </View>
        ))}
      </View>
    </View>
  );
}
