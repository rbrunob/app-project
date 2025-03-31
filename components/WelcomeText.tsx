import { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import tw from 'twrnc';

import { GetUniqueAlbum } from '~/services/GET/unique-album';
import { GetUniqueAuthor } from '~/services/GET/unique-author';
import { IAlbum } from '~/types/album';
import { IAuthor } from '~/types/author';

export default function WelcomeText({
  authorIDSelected,
  albumIDSelected,
}: {
  authorIDSelected?: string;
  albumIDSelected?: string;
}) {
  const [currentAuthor, setCurrentAuthor] = useState<IAuthor>();
  const [album, setAlbum] = useState<IAlbum>();

  const fetchAuthorData = useCallback(
    async (userIdByAlbum?: string) => {
      try {
        const response = await GetUniqueAuthor({
          authorID: authorIDSelected || String(userIdByAlbum),
        });

        if (response) {
          setCurrentAuthor(response[0]);
        }
      } catch (error) {
        console.error('Error fetching author data:', error);
      }
    },
    [authorIDSelected]
  );

  const fetchAlbumData = useCallback(async () => {
    try {
      const response = await GetUniqueAlbum({ albumID: albumIDSelected as string });

      if (response) {
        setAlbum(response[0]);

        if (response[0]?.userId && !authorIDSelected) {
          fetchAuthorData(response[0]?.userId);
        }
      }
    } catch (error) {
      console.error('Error fetching album data:', error);
    }
  }, [albumIDSelected]);

  useEffect(() => {
    if (albumIDSelected) {
      fetchAlbumData();
    }

    if (authorIDSelected) {
      fetchAuthorData();
    }
  }, [authorIDSelected, albumIDSelected]);

  return (
    <View style={tw`flex justify-center flex-col items-start`}>
      <Text style={tw`font-bold text-2xl text-[#444]`}>
        {authorIDSelected ? 'Bem-vindo a galeria de' : album?.title}
      </Text>
      <Text style={tw`font-bold text-2xl text-[#939393]`}>
        {authorIDSelected ? currentAuthor?.name : 'por ' + currentAuthor?.name}
      </Text>
    </View>
  );
}
