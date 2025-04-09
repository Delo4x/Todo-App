import React, { useState } from 'react';
import { View, StyleSheet, Image, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { TextInput, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { useTodo } from '../context/TodoContext';

export default function CreateTodo() {
  const router = useRouter();
  const { addTodo } = useTodo();
  const [text, setText] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);

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
    if (text.trim()) {
      addTodo({
        text: text.trim(),
        imageUri: imageUri || undefined,
      });
      router.back();
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TextInput
          label="Write Your Todo..."
          value={text}
          onChangeText={setText}
          style={styles.input}
          textColor='black'
          multiline
        />
        
        <Button
          mode="outlined"
          onPress={pickImage}
          textColor='black'
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
            textColor='black'
          >
            Create Todo
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 16,
    flexGrow: 1,
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
    paddingBottom: 100,
    color: 'black',
  },
  submitButton: {
    backgroundColor: '#2e7d32',
  },
}); 