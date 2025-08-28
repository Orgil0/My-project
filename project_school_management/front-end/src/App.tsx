import { BrowserRouter as Router,
  Routes,
  Route,
  Navigate
 } from 'react-router-dom'

import './App.css'
import ParentList from './components/ParentList'
import ParentForm from './components/ParentForm'
import ParentDetail from './components/ParentDetail'
function App() {

  return (
    <Router>
    <div className='App'>
      <header className='App-header'>
        <h1>School Management System</h1>
      </header>
      <main className='container'>
        <Routes>
          <Route path='/' element={<Navigate to="/parents" replace />}></Route>
          <Route path='/parents' element={<ParentList />}></Route>
          <Route path='/parents/new' element={<ParentForm />}></Route>
          <Route path="/parents/:id" element= {<ParentDetail/>}/>
          <Route path="/parents/:id/edit" element= {<ParentForm/>}/>
        </Routes>
      </main>
    </div>
    </Router>
  )
}

export default App
