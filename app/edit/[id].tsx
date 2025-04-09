import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { TextInput, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { useTodo } from '../../context/TodoContext';

export default function EditTodo() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { todos, updateTodo } = useTodo();
  
  const todo = todos.find(t => t.id === id);
  
  const [text, setText] = useState(todo?.text || '');
  const [imageUri, setImageUri] = useState<string | null>(todo?.imageUri || null);

  useEffect(() => {
    if (!todo) {
      router.back();
    }
  }, [todo]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (text.trim() && id) {
      updateTodo(id as string, {
        text: text.trim(),
        imageUri: imageUri || undefined,
      });
      router.back();
    }
  };

  if (!todo) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TextInput
        label="Write Your Todo..."
        value={text}
        onChangeText={setText}
        style={styles.input}
        multiline
      />
      
      <Button
        mode="outlined"
        onPress={pickImage}
        style={styles.imageButton}
        icon="image"
      >
        {imageUri ? 'Change Image' : 'Add Image'}
      </Button>

      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={styles.previewImage}
        />
      )}

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleSubmit}
          disabled={!text.trim()}
          style={styles.submitButton}
        >
          Update Todo
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  imageButton: {
    marginBottom: 16,
  },
  previewImage: {
    width: '100%',
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
  },
  buttonContainer: {
    marginTop: 'auto',
  },
  submitButton: {
    backgroundColor: '#6200ee',
  },
}); 