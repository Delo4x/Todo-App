import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { FAB, Card, Text, IconButton, Avatar } from 'react-native-paper';
import { useTodo } from '../context/TodoContext';
import { Todo } from '../types/todo';

export default function TodoList() {
  const router = useRouter();
  const { todos, deleteTodo } = useTodo();

  const renderTodo = ({ item }: { item: Todo }) => (
    <Card style={styles.todoCard}>
      <Card.Content style={styles.cardContent}>
        {item.imageUri && (
          <Avatar.Image
            size={50}
            source={{ uri: item.imageUri }}
            style={styles.todoImage}
          />
        )}
        <View style={styles.todoTextContainer}>
          <Text variant="titleMedium">{item.text}</Text>
          <Text variant="bodySmall" style={styles.dateText}>
            {new Date(item.createdAt).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.actionsContainer}>
          <IconButton
            icon="pencil"
            size={20}
            onPress={() => router.push('/edit/' + item.id as '/edit/[id]')}
          />
          <IconButton
            icon="delete"
            size={20}
            onPress={() => deleteTodo(item.id)}
          />
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        renderItem={renderTodo}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => router.push('/create')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 16,
  },
  todoCard: {
    marginBottom: 12,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  todoImage: {
    marginRight: 12,
  },
  todoTextContainer: {
    flex: 1,
  },
  dateText: {
    color: '#666',
    marginTop: 4,
  },
  actionsContainer: {
    flexDirection: 'row',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#6200ee',
  },
});