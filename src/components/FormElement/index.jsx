import React from 'react'

import { AiOutlineEdit } from 'react-icons/ai'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { ElementTypesText } from '../../constants/elementTypes'
import { openDrawer } from '../../store/drawerSlice'
import { removeEditorElement } from '../../store/globalSlice'

const TextInput = ({ ...props }) => {
  const { placeHolder } = props
  return (
    <div className="px-4 py-2  flex flex-col gap-1">
      {placeHolder}
      <input
        type="text"
        className="bg-white p-1 rounded-lg border border-slate-300"
      />
    </div>
  )
}

const TextArea = ({ ...props }) => {
  const { placeHolder } = props
  return (
    <div className="px-4 py-2  flex flex-col gap-1">
      {placeHolder}
      <textarea
        rows={3}
        className="bg-white p-1 rounded-lg border border-slate-300"
      />
    </div>
  )
}

const DropDown = ({ ...props }) => {
  const { placeHolder, options } = props

  return (
    <div className="px-4 py-2 flex flex-col gap-1">
      {placeHolder}
      <select className="bg-white p-2 rounded-lg border border-slate-300">
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

const ElementTypes = {
  'text-input': TextInput,
  'text-area': TextArea,
  dropdown: DropDown,
}

const FormElement = ({ withToolkit, ...props }) => {
  const { type, id } = props

  const dispatch = useDispatch()

  const deleteClick = () => {
    dispatch(removeEditorElement({ id }))
  }

  const editClick = () => {
    dispatch(openDrawer({ id }))
  }

  return (
    <>
      {ElementTypes[type]({ ...props })}
      {withToolkit && (
        <div className="group absolute inset-0 bg-transparent opacity-0 hover:opacity-100 flex p-2 px-10">
          <div className="flex gap-4 p-1 items-center text-lg h-max ml-auto">
            <div className="h-max p-1 px-2 rounded text-xs font-bold text-white bg-slate-900">
              {ElementTypesText[type]}
            </div>
            <button onClick={editClick}>
              <AiOutlineEdit />
            </button>
            <button onClick={deleteClick}>
              <RiDeleteBin5Line />
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default FormElement
