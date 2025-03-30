import { Link } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';
import tw from 'twrnc';

import AvatarCustom from './AvatarCustom';
import { Button } from './Button';

import { GetAuthors } from '~/services/GET/authors';
import { IAuthor } from '~/types/author';

export default function Search({ placeholder }: { placeholder: string }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAuthors, setFilteredAuthors] = useState<IAuthor[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSearchQuery = async (query: string) => {
    try {
      const response = await GetAuthors();

      if (response) {
        const authors = response;
        const filteredAuthors = authors.filter((author: IAuthor) =>
          author.name.toLowerCase().slice(0, 5).includes(query.toLowerCase())
        );

        if (filteredAuthors.length > 0 && query.length > 0) {
          setFilteredAuthors(filteredAuthors);
          setModalOpen(true);
        } else {
          setFilteredAuthors([]);
          setModalOpen(false);
        }
      }
    } catch (error) {
      console.error(error);
    }

    setSearchQuery(query);
  };

  return (
    <GestureHandlerRootView>
      <View style={tw`flex flex-row items-center justify-between w-full`}>
        <TextInput
          editable
          maxLength={50}
          style={tw.style(
            'bg-[#E8E8E8] w-full flex-shrink rounded-lg p-2 h-9 font-normal text-lg flex items-center justify-start leading-5 placeholder:text-base placeholder:text-[#9F9F9F]',
            {
              'rounded-br-none rounded-bl-none': filteredAuthors.length > 0 && modalOpen === true,
            }
          )}
          placeholder={placeholder}
          clearButtonMode="always"
          autoCapitalize="none"
          autoCorrect={false}
          value={searchQuery}
          onChangeText={(query) => handleSearchQuery(query)}
          onBlur={() => setModalOpen(false)}
          onFocus={() => setModalOpen(true)}
        />
      </View>

      <View
        style={tw.style(
          'bg-white p-3 flex flex-col items-start justify-start gap-4 rounded-br-lg rounded-bl-lg',
          {
            hidden: filteredAuthors.length === 0 || modalOpen === false,
            flex: filteredAuthors.length > 0 && modalOpen === true,
          }
        )}>
        <Text style={tw`font-medium text-sm text-start`}>Sugestões de pesquisa:</Text>
        <View style={tw`flex flex-col gap-4 w-full items-start justify-start`}>
          {filteredAuthors.map((author, index: number) => (
            <Link
              key={index}
              href={{ pathname: '/authors/[authorId]', params: { authorId: author.id } }}
              asChild>
              <Button classnames="w-full flex flex-row items-center justify-start gap-1">
                <AvatarCustom label={author.name.slice(0, 2)} size={32} shape="rounded" />
                <View style={tw`flex flex-col items-start justify-start ml-2`}>
                  <Text style={tw`text-start text-[#444] font-bold text-sm`}>{author.name}</Text>
                  <Text style={tw`text-start text-[#444] font-normal text-xs`}>{author.email}</Text>
                </View>
              </Button>
            </Link>
          ))}
        </View>
      </View>
    </GestureHandlerRootView>
  );
}
