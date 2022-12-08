import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux'
import { ItemTypes } from '../../constants/itemTypes'
import { insertAtEditorElement } from '../../store/globalSlice'

const DraggableTool = ({ type, index, moveElement, children }) => {
  const dispatch = useDispatch()

  const ref = useRef(null)
  const [, drop] = useDrop({
    accept: ItemTypes.BOX,
    hover(item, monitor) {
      if (!index && index !== 0) return
      if (!item.index && item.index !== 0) {
        dispatch(
          insertAtEditorElement({
            type: item.type,
            index: index,
          })
        )
        item.index = index
        return
      }
      if (!ref.current) return
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) return
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return

      moveElement(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.BOX,
    item: () => {
      return { index, type }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0.5 : 1
  drag(drop(ref))

  return (
    <div
      ref={ref}
      style={{ opacity }}
      className="mb-4 cursor-grab active:cursor-grabbing hover:bg-white relative"
    >
      {children}
    </div>
  )
}

export default DraggableTool
