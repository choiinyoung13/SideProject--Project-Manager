import { useRef, useState } from 'react'
import Modal from './Modal'

export default function Input({ onCreateMode, onSaveProject }) {
  const [project, setProject] = useState({
    title: '',
    description: '',
    dueDate: new Date().toISOString().split('T')[0],
    tasks: [],
    isActive: false,
  })

  const isInputVaild =
    project.title.trim() && project.description.trim() && project.dueDate.trim()

  const dialog = useRef()

  const handleProject = (e, type) => {
    setProject({
      ...project,
      [type]: e.target.value,
    })
  }

  return (
    <>
      <Modal ref={dialog} />
      <section className="w-4/5 min-w-max pl-20 pr-80 mt-32">
        <div className="flex justify-end">
          <button
            onClick={() => {
              onCreateMode(false)
            }}
            className="text-xl rounded-md px-3 py-2"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (!isInputVaild) {
                dialog.current.open()
                return
              }

              onSaveProject(project)
            }}
            className="text-xl bg-stone-900 text-stone-300 rounded-md px-3 py-2 hover:bg-stone-800"
          >
            Save
          </button>
        </div>

        <div>
          <p className="font-bold text-xl text-stone-700 mb-1">TITLE</p>
          <input
            onChange={e => {
              handleProject(e, 'title')
            }}
            className="bg-stone-200 w-full min-w-96 p-2"
            type="text"
          />
        </div>

        <div className="my-4">
          <p className="font-bold text-xl text-stone-700 mb-1">DESCRIPTION</p>
          <textarea
            onChange={e => {
              handleProject(e, 'description')
            }}
            className="bg-stone-200 w-full min-w-96 p-2"
          ></textarea>
        </div>

        <div>
          <p className="font-bold text-xl text-stone-700 mb-1">DUE DATE</p>
          <input
            value={project.dueDate}
            onChange={e => {
              handleProject(e, 'dueDate')
            }}
            className="bg-stone-200 w-full min-w-96 p-2"
            type="date"
          />
        </div>
      </section>
    </>
  )
}
