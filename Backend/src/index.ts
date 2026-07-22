import express from "express";
import type { Request, Response, NextFunction } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import jwt from "jsonwebtoken";
import "dotenv/config";

const app = express();

const PORT = Number(process.env.PORT) || 4001;
const SECRET_KEY = process.env.JWT_SECRET || "mi_clave_secreta";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.get("/health", async (_req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    return res.status(200).json({
      status: "ok",
      database: "connected",
    });
  } catch (error) {
    console.error("Healthcheck failed:", error);

    return res.status(503).json({
      status: "error",
      database: "disconnected",
    });
  }
});

app.get("/", (_req: Request, res: Response) => {
  return res.send("Backend is working!");
});

app.post("/login", (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (username === "postgres" && password === "123456") {
    const token = jwt.sign(
      {
        username,
      },
      SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    return res.json({
      message: "Login successful",
      token,
    });
  }

  return res.status(401).json({
    message: "Invalid credentials",
  });
});

const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Token required",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Invalid token format",
    });
  }

  try {
    jwt.verify(token, SECRET_KEY);
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Invalid or expired token",
    });
  }
};

app.get("/private", verifyToken, (_req: Request, res: Response) => {
  return res.json({
    message: "Acceso permitido",
  });
});

app.get("/tasks", async (_req: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: {
        id: "asc",
      },
    });

    return res.json(tasks);
  } catch (error) {
    console.error("Error getting tasks:", error);

    return res.status(500).json({
      message: "Failed to fetch tasks",
    });
  }
});

app.post("/tasks", async (req: Request, res: Response) => {
  try {
    const { title, completed } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    const newTask = await prisma.task.create({
      data: {
        title: title.trim(),
        completed: completed ?? false,
      },
    });

    return res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);

    return res.status(500).json({
      message: "Failed to create task",
    });
  }
});

app.put("/tasks/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { title, completed } = req.body;

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "Invalid task id",
      });
    }

    const existingTask = await prisma.task.findUnique({
      where: {
        id,
      },
    });

    if (!existingTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    const updatedTask = await prisma.task.update({
      where: {
        id,
      },
      data: {
        title:
          title !== undefined && title.trim() !== ""
            ? title.trim()
            : existingTask.title,
        completed:
          completed !== undefined
            ? completed
            : existingTask.completed,
      },
    });

    return res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);

    return res.status(500).json({
      message: "Failed to update task",
    });
  }
});

app.patch("/tasks/:id/toggle", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "Invalid task id",
      });
    }

    const existingTask = await prisma.task.findUnique({
      where: {
        id,
      },
    });

    if (!existingTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    const updatedTask = await prisma.task.update({
      where: {
        id,
      },
      data: {
        completed: !existingTask.completed,
      },
    });

    return res.json(updatedTask);
  } catch (error) {
    console.error("Error toggling task:", error);

    return res.status(500).json({
      message: "Failed to toggle task",
    });
  }
});

app.delete("/tasks/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "Invalid task id",
      });
    }

    const existingTask = await prisma.task.findUnique({
      where: {
        id,
      },
    });

    if (!existingTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    await prisma.task.delete({
      where: {
        id,
      },
    });

    return res.json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting task:", error);

    return res.status(500).json({
      message: "Failed to delete task",
    });
  }
});

/*
 * ERROR INTENCIONAL PARA EL SIMULACRO DE CAOS.
 * Esta excepción impide que el servidor arranque.
 */
throw new Error("Fallo simulado");

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});