import { useEffect, useState } from 'react'
import Input from './components/Input'
import Project from './components/Project'
import Detail from './components/Detail'
import Main from './components/Main'

function App() {
  const [isCreateMode, setIsCreateMode] = useState(false)
  const [projects, setProjects] = useState(
    JSON.parse(localStorage.getItem('projects')) || []
  )

  const activedProject = projects.find(project => project.isActive)

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify([...projects]))
  }, [projects])

  const onCreateMode = boolean => {
    setIsCreateMode(boolean)
    const updatedProjects = projects.map(project => {
      return { ...project, isActive: false }
    })
    setProjects(updatedProjects)
  }

  const onSaveProject = project => {
    const nextId =
      projects.length > 0 ? projects[projects.length - 1].id + 1 : 1
    const newProject = { id: nextId, ...project }
    setProjects([...projects, newProject])
    setIsCreateMode(false)
  }

  const onDeleteProject = id => {
    const updatedProjects = projects.filter((project, i) => {
      return project.id !== id
    })
    setProjects(updatedProjects)
  }

  const onActive = id => {
    const updatedProjects = projects.map(project => {
      return project.id === id
        ? { ...project, isActive: true }
        : { ...project, isActive: false }
    })
    setProjects(updatedProjects)
  }

  const onAddTask = (id, taskContent) => {
    const updatedProjects = projects.map(project => {
      if (project.id === id) {
        const nextId =
          project.tasks.length > 0
            ? project.tasks[project.tasks.length - 1].id + 1
            : 1
        return {
          ...project,
          tasks: [...project.tasks, { id: nextId, content: taskContent }],
        }
      }

      return project
    })
    setProjects(updatedProjects)
  }

  const onClearTask = (id, taskId) => {
    const updatedProjects = projects.map(project => {
      if (project.id === id) {
        return {
          ...project,
          tasks: project.tasks.filter(task => task.id !== taskId),
        }
      }
      return project
    })
    setProjects(updatedProjects)
  }

  return (
    <div className="flex">
      <Project
        onCreateMode={onCreateMode}
        projects={projects}
        onActive={onActive}
      />
      {isCreateMode ? (
        <Input
          isCreateMode={isCreateMode}
          onCreateMode={onCreateMode}
          onSaveProject={onSaveProject}
        />
      ) : activedProject ? (
        <Detail
          activedProject={activedProject}
          onAddTask={onAddTask}
          onClearTask={onClearTask}
          onDeleteProject={onDeleteProject}
        />
      ) : (
        <Main onCreateMode={onCreateMode} />
      )}
    </div>
  )
}

export default App
