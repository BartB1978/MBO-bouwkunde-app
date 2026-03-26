import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Dashboard from './pages/Dashboard/Dashboard'
import SchetsOntwerp from './pages/SchetsOntwerp/SchetsOntwerp'
import VoorlopigOntwerp from './pages/VoorlopigOntwerp/VoorlopigOntwerp'
import DefinitiefOntwerp from './pages/DefinitiefOntwerp/DefinitiefOntwerp'
import TechnischOntwerp from './pages/TechnischOntwerp/TechnischOntwerp'
import UitvoeringOntwerp from './pages/UitvoeringOntwerp/UitvoeringOntwerp'
import Oplevering from './pages/Oplevering/Oplevering'
import Onderhoud from './pages/Onderhoud/Onderhoud'
import InteractieveModule from './pages/InteractieveModule/InteractieveModule'
import QuizModule from './pages/QuizModule/QuizModule'
import Theorie from './pages/Theorie/Theorie'
import TheorieDetail from './pages/Theorie/TheorieDetail'
import Teacherbot from './pages/Teacherbot/Teacherbot'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/schets-ontwerp" element={<SchetsOntwerp />} />
          <Route path="/voorlopig-ontwerp" element={<VoorlopigOntwerp />} />
          <Route path="/definitief-ontwerp" element={<DefinitiefOntwerp />} />
          <Route path="/technisch-ontwerp" element={<TechnischOntwerp />} />
          <Route path="/uitvoering-ontwerp" element={<UitvoeringOntwerp />} />
          <Route path="/oplevering" element={<Oplevering />} />
          <Route path="/onderhoud" element={<Onderhoud />} />
          <Route path="/interactieve-module" element={<InteractieveModule />} />
          <Route path="/quiz" element={<QuizModule />} />
          <Route path="/theorie" element={<Theorie />} />
          <Route path="/theorie/:id" element={<TheorieDetail />} />
          <Route path="/teacherbot" element={<Teacherbot />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
