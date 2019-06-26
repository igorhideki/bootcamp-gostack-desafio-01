const express = require('express')

const server = express()
let amountApiRequest = 0
let projects = [
  {
    id: '1',
    title: 'Projeto 1',
    tasks: ['Tarefa 1']
  },
  {
    id: '2',
    title: 'Projeto 2',
    tasks: []
  }
]

server.use(express.json())

server.use((req, res, next) => {
  amountApiRequest += 1
  console.log(`Número de requisições na API: ${amountApiRequest}`)

  next()
})

server.get('/projects', (req, res) => {
  return res.json(projects)
})

server.post('/projects', (req, res) => {
  const { id, title } = req.body

  projects.push({
    id,
    title,
    tasks: []
  })

  return res.json(projects)
})

server.put('/projects/:id', checkProjectExists, (req, res) => {
  const { title } = req.body
  const projectSelected = projects.find(project => project.id === req.params.id)

  projectSelected.title = title

  return res.json(projects)
})

server.delete('/projects/:id', checkProjectExists, (req, res) => {
  projects = projects.filter(project => project.id !== req.params.id)

  return res.json(projects)
})

server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
  const { title } = req.body
  const projectSelected = projects.find(project => project.id === req.params.id)

  projectSelected.tasks = [...projectSelected.tasks, title]

  return res.json(projects)
})

function checkProjectExists(req, res, next) {
  const { id } = req.params
  const hasProject = projects.some(project => project.id === id)

  if (!hasProject) {
    return res.status(400).json({ error: 'Project does not exists' })
  }

  return next()
}

server.listen(3000)
