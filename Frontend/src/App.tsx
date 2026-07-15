import { useEffect, useState, type JSX } from "react";

import Header from "./header/Header";
import TaskInput from "./taskInput/TaskInput";
import TaskList from "./taskList/TaskList";
import Footer from "./footer/Footer";
import EmptyState from "./emptyState/EmptyState";

/**
 * Interface que representa una tarea.
 * Define la estructura de datos que se recibe desde el backend.
 */
export interface Task {
  id: number;
  title: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * URL base de la API.
 * Esta variable viene desde el archivo .env del Frontend.
 *
 * Ejemplo:
 * VITE_API_URL=http://localhost:3000
 */
const API = import.meta.env.VITE_API_URL;

console.log("API URL:", API);

function App(): JSX.Element {
  /**
   * Estado principal donde se guardan todas las tareas.
   */
  const [tasks, setTasks] = useState<Task[]>([]);

  /**
   * Estado para saber si las tareas todavía se están cargando.
   * Al inicio está en true porque apenas abre la app debe consultar al backend.
   */
  const [loading, setLoading] = useState<boolean>(true);

  /**
   * Obtiene la lista de tareas desde el backend.
   * Hace una petición GET al endpoint /tasks.
   */
  const fetchTasks = async () => {
    try {
      const res = await fetch(`${API}/tasks`);
      const data: Task[] = await res.json();

      // Actualiza el estado con las tareas recibidas desde la API.
      setTasks(data);
    } catch (error) {
      console.error("Error al obtener tareas:", error);
    } finally {
      // Cuando termina la petición, se desactiva el estado de carga.
      setLoading(false);
    }
  };

  /**
   * useEffect se ejecuta una sola vez cuando el componente App se monta.
   * Aquí se cargan las tareas iniciales desde el backend.
   */
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void fetchTasks();
    }, 0);

    /**
     * Limpia el timeout si el componente se desmonta.
     * Esto evita posibles efectos secundarios.
     */
    return () => window.clearTimeout(timeoutId);
  }, []);

  /**
   * Agrega una nueva tarea.
   * Recibe el texto escrito por el usuario desde el componente TaskInput.
   */
  const addTask = async (text: string) => {
    try {
      await fetch(`${API}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: text }),
      });

      // Después de agregar una tarea, vuelve a cargar la lista actualizada.
      fetchTasks();
    } catch (error) {
      console.error("Error al agregar tarea:", error);
    }
  };

  /**
   * Elimina una tarea según su ID.
   */
  const deleteTask = async (id: number) => {
    try {
      await fetch(`${API}/tasks/${id}`, {
        method: "DELETE",
      });

      // Después de eliminar, se vuelve a consultar la lista actualizada.
      fetchTasks();
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  };

  /**
   * Cambia el estado de una tarea.
   * Si está completada, la marca como pendiente.
   * Si está pendiente, la marca como completada.
   */
  const toggleTask = async (task: Task) => {
    try {
      await fetch(`${API}/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: !task.completed,
        }),
      });

      // Después de actualizar la tarea, recarga la lista.
      fetchTasks();
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
    }
  };

  /**
   * Calcula cuántas tareas están completadas.
   * Este valor se envía al Footer para mostrar el resumen.
   */
  const completedTasks = tasks.filter((t) => t.completed).length;

  return (
    <div className="app-container">
      {/* Encabezado principal de la aplicación */}
      <Header />

      {/* Componente para escribir y agregar nuevas tareas */}
      <TaskInput addTask={addTask} />

      {/* Renderizado condicional:
          - Si loading es true, muestra mensaje de carga.
          - Si no hay tareas, muestra el estado vacío.
          - Si existen tareas, muestra la lista.
      */}
      {loading ? (
        <p style={{ textAlign: "center" }}>Cargando tareas...</p>
      ) : tasks.length === 0 ? (
        <EmptyState />
      ) : (
        <TaskList
          tasks={tasks}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
        />
      )}

      {/* Pie de página con el total de tareas y tareas completadas */}
      <Footer total={tasks.length} completed={completedTasks} />
    </div>
  );
}

export default App;