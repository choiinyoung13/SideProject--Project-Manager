import { useRef, useState } from 'react'
import Modal from './Modal'

function formatDate(dateString) {
  const date = new Date(dateString)

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  const month = months[date.getMonth()]
  const day = date.getDate()
  const year = date.getFullYear()

  return `${month} ${day}, ${year}`
}

export default function Detail({
  activedProject,
  onAddTask,
  onClearTask,
  onDeleteProject,
}) {
  const descArr = activedProject.description.split('\n')
  const dialog = useRef()
  const input = useRef()

  function handleAdd() {
    if (!input.current.value.trim()) {
      dialog.current.open()
      return
    }
    onAddTask(activedProject.id, input.current.value)
    input.current.value = ''
  }

  return (
    <>
      <Modal ref={dialog} />
      <section className="w-4/5 min-w-[48rem] pl-20 pr-80  mt-32">
        <div className="flex justify-between items-end ">
          <h1 className="text-4xl font-bold text-stone-700">
            {activedProject.title}
          </h1>
          <span
            className="text-xl text-stone-700 cursor-pointer"
            onClick={() => {
              onDeleteProject(activedProject.id)
            }}
          >
            Delete
          </span>
        </div>
        <p className="text-xl mt-4 text-stone-500">
          {formatDate(activedProject.dueDate)}
        </p>
        <div className="mt-4 leading-8  break-words">
          {descArr.length === 1
            ? activedProject.description
            : descArr.map((dsec, i) => {
                return <p key={dsec + i}>{dsec}</p>
              })}
        </div>
        <div className="underline my-6 border-b-2 border-stone-300"></div>
        <h1 className="text-4xl font-bold text-stone-700">Tasks</h1>
        <div className="flex gap-4 items-center mt-4 max-w-[48rem] ">
          <input
            className="bg-stone-300 rounded-md p-2 flex-1 max-w-80"
            type="text"
            ref={input}
          />
          <span
            className="text-xl text-stone-700 cursor-pointer"
            onClick={handleAdd}
          >
            Add Task
          </span>
        </div>

        {activedProject.tasks.length > 0 && (
          <ul className="flex flex-col gap-4 tasks-list mt-4 bg-stone-200 rounded-md p-4">
            {activedProject.tasks.length > 0 &&
              activedProject.tasks.map((task, i) => {
                return (
                  <li
                    key={task.id}
                    className="flex justify-between text-xl text-stone-700"
                  >
                    <span>{task.content}</span>
                    <span
                      className="cursor-pointer"
                      onClick={() => {
                        onClearTask(activedProject.id, task.id)
                      }}
                    >
                      Clear
                    </span>
                  </li>
                )
              })}
          </ul>
        )}
      </section>
    </>
  )
}
