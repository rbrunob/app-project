import { Link } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import tw from 'twrnc';

import AvatarCustom from './AvatarCustom';
import { Button } from './Button';

import { GetAuthors } from '~/services/GET/authors';
import { IAuthor } from '~/types/author';

export default function MoreVistedAuthors() {
  const [author, setAuthor] = useState<IAuthor[]>();

  const fetchUser = useCallback(async () => {
    try {
      const response = await GetAuthors({ limit: 4 });

      if (response) {
        const authors = response;
        setAuthor(authors);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <View style={tw`w-full flex flex-col items-start justify-start gap-3`}>
      <Text style={tw`text-[#444] font-bold text-base`}>Nossos artistas mais vistos</Text>

      <View style={tw`flex flex-wrap flex-row gap-3 items-start justify-start`}>
        {author?.map((author, index) => (
          <Link
            key={index}
            href={{ pathname: '/authors/[authorId]', params: { authorId: author.id } }}
            asChild>
            <Button style={tw`w-[48%] flex flex-row items-start justify-start`}>
              <AvatarCustom label={author.name.slice(0, 2)} size={48} shape="rounded" />
              <View style={tw`flex flex-col items-start justify-start ml-2`}>
                <Text style={tw`text-start text-[#444] font-bold text-sm`}>{author.name}</Text>
                <Text style={tw`text-start text-[#444] font-normal text-xs`}>{author.email}</Text>
              </View>
            </Button>
          </Link>
        ))}
      </View>
    </View>
  );
}
