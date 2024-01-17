import { useState, useEffect } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import { auth } from './firebase'

import LoadingScreen from './components/loading-screen'
import Layout from './components/layout'
import Home from './routes/Home'
import Profile from './routes/Profile'
import Login from './routes/Login'
import Signup from './routes/Signup'
import NotFound from './routes/NotFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/*',
    element: <NotFound />,
  },
])

const GlobalStyle = createGlobalStyle`
  ${reset},
  * {
    box-sizing: border-box;
  }
`

function App() {
  const [isLoading, setLoading] = useState(true)

  const init = async () => {
    // firebase 대기
    await auth.authStateReady()
    setLoading(false)
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <>
      <GlobalStyle />
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
    </>
  )
}

export default App
