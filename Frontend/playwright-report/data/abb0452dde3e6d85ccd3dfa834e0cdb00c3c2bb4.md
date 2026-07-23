# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: task-flow.spec.ts >> Flujo completo de tareas >> permite crear, completar y eliminar una tarea
- Location: e2e\task-flow.spec.ts:4:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Tarea E2E 1784771719286')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('Tarea E2E 1784771719286')

```

```yaml
- heading "Task Manager Bugteam" [level=1]
- textbox "Escribe una tarea..."
- button "Agregar" [disabled]
- heading "No hay tareas aún" [level=4]
- paragraph: Agrega tu primera tarea
- contentinfo:
  - paragraph: "Incompletas: 0"
  - paragraph: "Completadas: 0"
  - paragraph: "Total: 0"
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test.describe("Flujo completo de tareas", () => {
  4  |   test("permite crear, completar y eliminar una tarea", async ({ page }) => {
  5  |     const taskName = `Tarea E2E ${Date.now()}`;
  6  | 
  7  |     await page.goto("/");
  8  | 
  9  |     const input = page.getByPlaceholder("Escribe una tarea...");
  10 |     const addButton = page.getByRole("button", { name: "Agregar" });
  11 | 
  12 |     await expect(input).toBeVisible();
  13 |     await expect(addButton).toBeDisabled();
  14 | 
  15 |     await input.fill(taskName);
  16 | 
  17 |     await expect(addButton).toBeEnabled();
  18 | 
  19 |     await addButton.click();
  20 | 
  21 |     const taskText = page.getByText(taskName);
  22 | 
> 23 |     await expect(taskText).toBeVisible();
     |                            ^ Error: expect(locator).toBeVisible() failed
  24 | 
  25 |     const taskCard = page.locator(".task-card").filter({
  26 |       hasText: taskName,
  27 |     });
  28 | 
  29 |     const checkbox = taskCard.getByRole("checkbox");
  30 | 
  31 |     await checkbox.check();
  32 | 
  33 |     await expect(taskCard.getByText("Completado")).toBeVisible();
  34 | 
  35 |     await taskCard.getByRole("button", { name: "Eliminar" }).click();
  36 | 
  37 |     await expect(taskText).not.toBeVisible();
  38 |   });
  39 | });
```