import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import FormElement from '../FormElement'

const PreviewModal = ({ onClose }) => {
  const { editorElements } = useSelector((state) => state.global)

  return (
    <div className="absolute inset-0 bg-black bg-opacity-10 flex flex-col z-40">
      <div className="w-[90%] max-w-5xl h-[90%] bg-white m-auto shadow-xl rounded-xl flex flex-col p-2">
        <div className="flex justify-end">
          <button className="text-2xl" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <div className="flex flex-col flex-1">
          {editorElements.map((element) => (
            <FormElement key={element.id} {...element} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default PreviewModal
