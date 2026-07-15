import express from 'express'

const app = express()

app.use(express.json())

const tareas: Array<{ id: number; titulo: string }> = []

app.post('/tareas', (req, res) => {
  const { titulo } = req.body

  if (!titulo) {
    return res.status(400).json({
      mensaje: 'El título es obligatorio',
    })
  }

  const nuevaTarea = {
    id: tareas.length + 1,
    titulo,
  }

  tareas.push(nuevaTarea)

  return res.status(201).json(nuevaTarea)
})

app.get('/tareas', (_req, res) => {
  return res.status(200).json(tareas)
})

export default app