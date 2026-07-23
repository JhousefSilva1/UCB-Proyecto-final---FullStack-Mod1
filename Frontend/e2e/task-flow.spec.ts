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

    const createResponsePromise = page.waitForResponse(
      (response) =>
        response.url().includes("/tasks") &&
        response.request().method() === "POST"
    );

    await addButton.click();

    const createResponse = await createResponsePromise;

    expect(
      createResponse.status(),
      `El POST /tasks respondió con ${createResponse.status()}`
    ).toBe(201);

    const taskCard = page.locator(".task-card").filter({
      hasText: taskName,
    });

    await expect(taskCard).toBeVisible({ timeout: 10_000 });

    const checkbox = taskCard.getByRole("checkbox");

    const updateResponsePromise = page.waitForResponse(
      (response) =>
        response.url().includes("/tasks/") &&
        response.request().method() === "PUT"
    );

    await checkbox.click();

    const updateResponse = await updateResponsePromise;

    expect(
      updateResponse.status(),
      `El PUT /tasks/:id respondió con ${updateResponse.status()}`
    ).toBe(200);

    await expect(taskCard.getByText("Completado")).toBeVisible({
      timeout: 10_000,
    });

    const deleteResponsePromise = page.waitForResponse(
      (response) =>
        response.url().includes("/tasks/") &&
        response.request().method() === "DELETE"
    );

    await taskCard.getByRole("button", { name: "Eliminar" }).click();

    const deleteResponse = await deleteResponsePromise;

    expect(
      deleteResponse.status(),
      `El DELETE /tasks/:id respondió con ${deleteResponse.status()}`
    ).toBe(200);

    await expect(taskCard).not.toBeVisible();
  });
});