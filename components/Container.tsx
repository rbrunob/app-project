import { SafeAreaView } from 'react-native';
import tw from 'twrnc';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return <SafeAreaView style={tw`flex-1 my-6 mx-4`}>{children}</SafeAreaView>;
};
