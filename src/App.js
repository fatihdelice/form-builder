import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useSelector } from 'react-redux'
import EditDrawer from './components/EditDrawer'
import Editor from './components/Editor'
import Toolbox from './components/Toolbox'

function App() {
  const { activeElementId, isOpen } = useSelector((state) => state.drawer)
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-screen h-screen mx-auto overflow-auto flex gap-12 px-12 pt-4">
        {isOpen && <EditDrawer activeElementId={activeElementId} />}
        <Editor />
        <Toolbox />
      </div>
    </DndProvider>
  );
}

export default App;
