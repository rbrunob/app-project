import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback, useEffect, useState } from 'react';
import { Text, View, Modal, TouchableOpacity, Image } from 'react-native';
import tw from 'twrnc';

import { Button } from './Button';
import Photo from './Photo';

import { GetPhotosByAlbum } from '~/services/GET/photos-by-album';
import { GetUniqueAlbum } from '~/services/GET/unique-album';
import { GetUniqueAuthor } from '~/services/GET/unique-author';
import { IAlbum } from '~/types/album';
import { IAuthor } from '~/types/author';
import { IPhoto } from '~/types/photo';

interface HighlightPhotoFieldProps {
  albumIDSelected: string;
}

export default function HighlightPhotoField({ albumIDSelected }: HighlightPhotoFieldProps) {
  const [albums, setAlbums] = useState<IAlbum>();
  const [photos, setPhotos] = useState<IPhoto[]>([]);
  const [author, setAuthor] = useState<IAuthor>();
  const [selectedPhoto, setSelectedPhoto] = useState<IPhoto | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchGetAuhtorByAlbum = useCallback(
    async (authorID: number) => {
      try {
        const response = await GetUniqueAuthor({ auhtorID: String(authorID) });

        if (response) {
          setAuthor(response[0]);
        }
      } catch (error) {
        console.error('Error fetching author by album:', error);
      }
    },
    [albums?.id]
  );

  const fetchPhotosByAlbum = useCallback(async () => {
    try {
      const response = await GetPhotosByAlbum({ albumID: albums?.id as number, limit: 2 });

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

  const fetchAlbumsByID = useCallback(async () => {
    try {
      const response = await GetUniqueAlbum({ albumID: albumIDSelected });

      if (response) {
        setAlbums(response[0]);

        if (response[0]?.userId) {
          fetchGetAuhtorByAlbum(response[0]?.userId);
        }

        if (response[0]?.id) {
          fetchPhotosByAlbum();
        }
      }
    } catch (error) {
      console.error('Error fetching albums:', error);
    }
  }, [albumIDSelected]);

  useEffect(() => {
    fetchAlbumsByID();
  }, [fetchAlbumsByID]);

  const handlePressPhoto = (photo: IPhoto) => {
    setSelectedPhoto(photo);
    setModalVisible(true);
  };

  return (
    <>
      <View style={tw`flex flex-col items-center justify-center`}>
        <View style={tw`flex flex-row flex-wrap gap-3 w-full`}>
          {photos.map((photo, index) => (
            <Button
              onPress={() => handlePressPhoto(photo)}
              key={index}
              style={tw`flex flex-col items-center justify-center w-[48%]`}>
              <View style={tw`flex flex-col items-center justify-center w-full`}>
                <Photo photo={photo} />
                <Text style={tw`text-[#444] font-normal text-sm text-start w-full`}>
                  Foto por <Text style={tw`font-bold`}>{author?.name}</Text>
                </Text>
              </View>
            </Button>
          ))}
        </View>
      </View>

      <Modal visible={modalVisible && !!selectedPhoto} transparent animationType="fade">
        <View style={tw`bg-black/50 items-center justify-center w-full h-full`}>
          <>
            <View style={tw`bg-white w-[335px] h-[500px] rounded-lg items-center justify-center`}>
              <Image
                source={{ uri: selectedPhoto?.url }}
                style={tw`w-full h-full rounded-lg border`}
                resizeMode="contain"
              />
              <LinearGradient
                colors={['#000000ab', 'transparent']}
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0 }}
                style={tw`absolute bottom-0 w-full px-2 py-3 h-32 rounded-lg`}>
                <Text style={tw`absolute bottom-0 w-full px-2 py-3 text-white font-bold text-base`}>
                  {selectedPhoto?.title}
                </Text>
              </LinearGradient>
            </View>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={tw`absolute top-12 right-4`}>
              <FontAwesome name="close" size={24} color="white" />
            </TouchableOpacity>
          </>
        </View>
      </Modal>
    </>
  );
}
