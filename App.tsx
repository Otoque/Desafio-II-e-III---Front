import { registerRootComponent } from "expo";
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  StyleSheet,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import axios from "axios";

const API_URL = "http://192.168.0.2:3000";

function App() {
  const [tasks, setTasks] = useState<{ id: number; title: string }[]>([]);
  const [inputText, setInputText] = useState("");
  const [editingTask, setEditingTask] = useState<{ id: number; title: string } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/tasks`);
      setTasks(response.data);
    } catch (e) {
      Alert.alert(
        "Erro de conexão",
        "Não conectou ao servidor.\n\nVerifique:\n• Backend rodando (npm start)\n• IP correto em App.tsx\n• Celular e PC na mesma rede Wi-Fi"
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit() {
    const trimmed = inputText.trim();
    if (!trimmed) {
      Alert.alert("Atenção", "Digite o título da tarefa.");
      return;
    }
    try {
      if (editingTask) {
        const response = await axios.put(`${API_URL}/tasks/${editingTask.id}`, { title: trimmed });
        setTasks((prev) => prev.map((t) => (t.id === response.data.id ? response.data : t)));
        setEditingTask(null);
      } else {
        const response = await axios.post(`${API_URL}/tasks`, { title: trimmed });
        setTasks((prev) => [...prev, response.data]);
      }
      setInputText("");
    } catch (e) {
      Alert.alert("Erro", "Não foi possível salvar a tarefa.");
    }
  }

  function handleEdit(task: { id: number; title: string }) {
    setEditingTask(task);
    setInputText(task.title);
  }

  function handleCancelEdit() {
    setEditingTask(null);
    setInputText("");
  }

  function handleDelete(id: number) {
    Alert.alert("Confirmar", "Deseja excluir esta tarefa?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await axios.delete(`${API_URL}/tasks/${id}`);
            setTasks((prev) => prev.filter((t) => t.id !== id));
          } catch (e) {
            Alert.alert("Erro", "Não foi possível excluir a tarefa.");
          }
        },
      },
    ]);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Text style={styles.header}>📝 Lista de Tarefas</Text>

        <TextInput
          style={styles.input}
          placeholder="Digite uma tarefa..."
          value={inputText}
          onChangeText={setInputText}
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
        />

        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.btn, editingTask ? styles.saveBtn : styles.addBtn]}
            onPress={handleSubmit}
          >
            <Text style={styles.btnText}>{editingTask ? "✅ Salvar" : "➕ Adicionar"}</Text>
          </TouchableOpacity>
          {editingTask && (
            <TouchableOpacity style={[styles.btn, styles.cancelBtn]} onPress={handleCancelEdit}>
              <Text style={styles.btnText}>✖ Cancelar</Text>
            </TouchableOpacity>
          )}
        </View>

        {loading && (
          <ActivityIndicator size="large" color="#4a90e2" style={{ marginTop: 20 }} />
        )}

        {!loading && tasks.length === 0 && (
          <Text style={styles.empty}>Nenhuma tarefa ainda.</Text>
        )}

        <FlatList
          data={tasks}
          keyExtractor={(item) => String(item.id)}
          style={{ marginTop: 10 }}
          renderItem={({ item }) => (
            <View style={styles.taskItem}>
              <Text style={styles.taskTitle} numberOfLines={2}>{item.title}</Text>
              <View style={styles.taskBtns}>
                <TouchableOpacity
                  style={[styles.taskBtn, styles.editBtn]}
                  onPress={() => handleEdit(item)}
                >
                  <Text style={styles.taskBtnText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.taskBtn, styles.deleteBtn]}
                  onPress={() => handleDelete(item.id)}
                >
                  <Text style={styles.taskBtnText}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f2f4f8" },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },
  header: {
    marginTop: 70,
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
  },
  row: { flexDirection: "row", gap: 10, marginBottom: 10 },
  btn: { flex: 1, paddingVertical: 12, borderRadius: 8, alignItems: "center" },
  addBtn: { backgroundColor: "#4a90e2" },
  saveBtn: { backgroundColor: "#27ae60" },
  cancelBtn: { backgroundColor: "#95a5a6" },
  btnText: { color: "#fff", fontWeight: "bold", fontSize: 15 },
  empty: { textAlign: "center", color: "#999", fontSize: 16, marginTop: 40 },
  taskItem: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  taskTitle: { fontSize: 15, color: "#333", flex: 1, marginRight: 10 },
  taskBtns: { flexDirection: "row", gap: 8 },
  taskBtn: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6 },
  editBtn: { backgroundColor: "#f0a500" },
  deleteBtn: { backgroundColor: "#e74c3c" },
  taskBtnText: { color: "#fff", fontSize: 13, fontWeight: "bold" },
});

registerRootComponent(App);
export default App;
