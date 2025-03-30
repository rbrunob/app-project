import { forwardRef } from 'react';
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import tw from 'twrnc';

type ButtonProps = {
  title?: string;
  children?: React.ReactNode;
  classnames?: string;
} & TouchableOpacityProps;

export const Button = forwardRef<View, ButtonProps>(
  ({ title, children, classnames, ...touchableProps }, ref) => {
    return (
      <TouchableOpacity ref={ref} {...touchableProps} style={tw.style(classnames)}>
        {children}
      </TouchableOpacity>
    );
  }
);
