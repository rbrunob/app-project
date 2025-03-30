import { Text, View } from 'react-native';
import tw from 'twrnc';

export const PageTitle = ({ title }: { title: string }) => {
  return (
    <View style={tw`w-full h-10 justify-center items-center mb-3`}>
      <Text style={tw`font-bold text-xl`}>{title}</Text>
    </View>
  );
};
