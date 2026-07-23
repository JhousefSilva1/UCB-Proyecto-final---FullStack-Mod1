import { test, expect } from "@playwright/test";

test.describe("Flujo completo de tareas", () => {
  test("permite crear, completar y eliminar una tarea", async ({ page }) => {
    const taskName = `Tarea E2E ${Date.now()}`;

    await page.goto("/");

    const input = page.getByPlaceholder("Escribe una tarea...");
    const addButton = page.getByRole("button", { name: "Agregar" });

    await expect(input).toBeVisible();
    await expect(addButton).toBeDisabled();

    await input.fill(taskName);

    await expect(addButton).toBeEnabled();

    await addButton.click();

    const taskText = page.getByText(taskName);

    await expect(taskText).toBeVisible();

    const taskCard = page.locator(".task-card").filter({
      hasText: taskName,
    });

    const checkbox = taskCard.getByRole("checkbox");

    await checkbox.check();

    await expect(taskCard.getByText("Completado")).toBeVisible();

    await taskCard.getByRole("button", { name: "Eliminar" }).click();

    await expect(taskText).not.toBeVisible();
  });
});