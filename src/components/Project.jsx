import Button from './Button'

export default function Project({ onCreateMode, projects, onActive }) {
  return (
    <>
      <section className="bg-stone-900 h-[calc(100vh-2rem)] w-1/5 min-w-max py-16 px-10 mt-8 rounded-tr-xl">
        <h2 className="text-white font-bold text-2xl mb-10">YOUR PROJECT</h2>
        <Button
          onClick={() => {
            onCreateMode(true)
          }}
        >
          + Add Project
        </Button>
        {projects.length > 0 && (
          <ul className="project-list mt-10 flex flex-col gap-4">
            {projects.map((project, i) => {
              return (
                <li
                  key={project.title + i}
                  className="project"
                  onClick={() => {
                    onCreateMode(false)
                    onActive(project.id)
                  }}
                >
                  <span
                    className={`text-lg ${
                      project.isActive ? 'text-white' : 'text-stone-400'
                    } hover:text-stone-300 cursor-pointer`}
                  >
                    {project.title}
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
