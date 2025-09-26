import { useImperativeHandle, useRef } from 'react'
import { createPortal } from 'react-dom'

export default function Modal({ ref }) {
  const dialog = useRef()

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal()
      },
    }
  })

  return createPortal(
    <dialog ref={dialog} className="backdrop:bg-black/50">
      <div className="flex flex-col items-center gap-4 bg-white p-6 rounded-lg">
        <p className="text-xl">Please fill out all the input spaces</p>
        <form method="dialog">
          <button className="bg-stone-800 text-white px-4 py-2 rounded">
            Close
          </button>
        </form>
      </div>
    </dialog>,
    document.getElementById('modal-root')
  )
}
