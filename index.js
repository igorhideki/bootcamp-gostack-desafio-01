const express = require('express')

const server = express()
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

server.put('/projects/:id', (req, res) => {
  const { title } = req.body
  const projectSelected = projects.find(project => project.id === req.params.id)

  projectSelected.title = title

  return res.json(projects)
})

server.delete('/projects/:id', (req, res) => {
  projects = projects.filter(project => project.id !== req.params.id)

  return res.json(projects)
})

server.post('/projects/:id/tasks', (req, res) => {
  const { title } = req.body
  const projectSelected = projects.find(project => project.id === req.params.id)

  projectSelected.tasks = [...projectSelected.tasks, title]

  return res.json(projects)
})

server.listen(3000)
