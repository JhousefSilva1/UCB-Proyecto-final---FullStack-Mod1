import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "./index";

describe("API Backend", () => {
  it("responde correctamente en GET /", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.text).toBe("Backend is working!");
  });

  it("permite iniciar sesión con credenciales correctas", async () => {
    const response = await request(app)
      .post("/login")
      .send({
        username: "postgres",
        password: "123456",
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Login successful");
    expect(response.body.token).toBeDefined();
  });

  it("rechaza credenciales incorrectas", async () => {
    const response = await request(app)
      .post("/login")
      .send({
        username: "postgres",
        password: "incorrecta",
      });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: "Invalid credentials",
    });
  });
});