import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import TaskInput from "./TaskInput";

describe("TaskInput", () => {
  it("permite escribir una tarea y llamar a addTask al enviarla", async () => {
    const addTaskMock = vi.fn();
    const user = userEvent.setup();

    render(<TaskInput addTask={addTaskMock} />);

    const input = screen.getByPlaceholderText("Escribe una tarea...");
    const button = screen.getByRole("button", { name: "Agregar" });

    expect(button).toBeDisabled();

    await user.type(input, "Comprar pan");

    expect(button).toBeEnabled();

    await user.click(button);

    expect(addTaskMock).toHaveBeenCalledTimes(1);
    expect(addTaskMock).toHaveBeenCalledWith("Comprar pan");
    expect(input).toHaveValue("");
  });

  it("no agrega una tarea vacía", async () => {
    const addTaskMock = vi.fn();
    const user = userEvent.setup();

    render(<TaskInput addTask={addTaskMock} />);

    const input = screen.getByPlaceholderText("Escribe una tarea...");
    const button = screen.getByRole("button", { name: "Agregar" });

    await user.type(input, "   ");

    expect(button).toBeDisabled();
    expect(addTaskMock).not.toHaveBeenCalled();
  });
});