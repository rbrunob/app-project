import { StyleSheet } from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';

type ScreenContentProps = {
  children?: React.ReactNode;
};

export const ScreenContent = ({ children }: ScreenContentProps) => {
  return (
    <GestureHandlerRootView style={{ flexGrow: 1, paddingBottom: 90 }}>
      <ScrollView contentContainerStyle={styles.container}>{children}</ScrollView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexGrow: 1,
    gap: 36,
  },
});
