import Button from './Button'
import logo from '../assets/no-projects.png'

export default function Main({ onCreateMode }) {
  return (
    <section className="flex flex-col items-center w-4/5 min-w-max px-20 mt-40">
      <img className="w-16" src={logo} alt="logo" />
      <p className="font-bold text-stone-600 text-2xl mt-6">
        No Project Selected
      </p>
      <p className="text-stone-500 mt-4 mb-8">
        Select a project or get started with a new one
      </p>
      <Button
        onClick={() => {
          onCreateMode(true)
        }}
      >
        Create new project
      </Button>
    </section>
  )
}
