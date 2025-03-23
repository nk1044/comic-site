import { useState } from 'react'
import Home from './Pages/Home'
import Layout from './Components/Layout'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

const router = createBrowserRouter([{
  path: '/',
  element: <Layout />,
  children: [
    {path: '', element: <Home />}
  ]
}])

function App() {
  const [count, setCount] = useState(0)

  return (
    <RouterProvider router={router}/>
  )
}

export default App
