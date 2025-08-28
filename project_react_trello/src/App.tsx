import { AddNewItem } from "./components/AddNewItem"
import { Card } from "./components/Card"
import { Column } from "./components/Column"
import { AppContainer } from "./utils/styles"

function App() {
  
  return (
    <>
    <AppContainer>
      <Column text="To Do">
        <Card text="Lesson day 60" />
      </Column>
      <Column text="In Progress">
      <Card text="Lesson day 59"/>
      </Column>
      <Column text="Done">
      <Card text="Lesson day 58"/>
      <Card text="Lesson day 59"/>
      <Card text="Lesson day 57"/>
      </Column>
      <AddNewItem toggleButtonText="+ Add another list" onAdd={console.log} />
    </AppContainer>

    </>
  )
}

export default App
