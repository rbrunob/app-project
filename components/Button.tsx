import { forwardRef } from 'react';
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

type ButtonProps = {
  children?: React.ReactNode;
} & TouchableOpacityProps;

export const Button = forwardRef<View, ButtonProps>(({ children, ...touchableProps }, ref) => {
  return (
    <TouchableOpacity ref={ref} {...touchableProps}>
      {children}
    </TouchableOpacity>
  );
});
