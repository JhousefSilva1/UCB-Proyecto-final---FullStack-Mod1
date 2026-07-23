import { describe, expect, it } from "vitest";
import {
  contarTareasPendientes,
  esCorreoValido,
} from "./validaciones";

describe("validaciones", () => {
  it("valida correctamente un correo válido", () => {
    expect(esCorreoValido("usuario@correo.com")).toBe(true);
  });

  it("rechaza un correo inválido", () => {
    expect(esCorreoValido("correo-invalido")).toBe(false);
  });

  it("cuenta las tareas pendientes", () => {
    const tareas = [
      { completed: false },
      { completed: true },
      { completed: false },
    ];

    expect(contarTareasPendientes(tareas)).toBe(2);
  });
});