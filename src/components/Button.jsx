export default function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-stone-700 text-stone-300 rounded-md px-3 py-2 hover:bg-stone-600"
    >
      {children}
    </button>
  )
}
