import { View } from 'react-native';
import { Avatar } from 'react-native-paper';
import tw from 'twrnc';

function AvatarCustom({
  label,
  size,
  shape,
}: {
  label: string;
  size: number;
  shape: 'rounded' | 'circle';
}) {
  return (
    <View
      style={tw.style('w-auto h-auto bg-[#6750a4]', {
        'rounded-full': shape === 'circle',
        rounded: shape === 'rounded',
      })}>
      <Avatar.Text size={size} label={label} />
    </View>
  );
}

export default AvatarCustom;
