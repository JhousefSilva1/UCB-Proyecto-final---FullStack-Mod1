export const esCorreoValido = (correo: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
};

export const contarTareasPendientes = (
  tareas: { completed: boolean }[]
): number => {
  return tareas.filter((tarea) => !tarea.completed).length;
};