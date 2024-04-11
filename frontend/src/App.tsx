import { Landing } from './screens/Landing/Landing'
import { Signup } from './screens/Signup/Signup'
import { Success } from './screens/Success/Success'
import { Route, Routes } from 'react-router'
import { Layout } from './layout/Layout'

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/sign-up' element={<Signup />} />
          <Route path='/success' element={<Success />} />
        </Routes>
      </Layout>
    </>
  )
}

export default App
