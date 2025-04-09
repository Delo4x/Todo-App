import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { TodoProvider } from '../context/TodoContext';

export default function Layout() {
  return (
    <PaperProvider>
      <TodoProvider>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: '#6200ee',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </TodoProvider>
    </PaperProvider>
  );
}
