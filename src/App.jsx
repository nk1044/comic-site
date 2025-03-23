import { useState } from 'react'
import Home from './Pages/Home'
import Layout from './Components/Layout'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Reader from './Pages/ReaderPage'

const router = createBrowserRouter([{
  path: '/',
  element: <Layout />,
  children: [
    {path: '', element: <Home />},
    {path: 'read-comic', element: <Reader />}
  ]
}])

function App() {
  const [count, setCount] = useState(0)

  return (
    <RouterProvider router={router}/>
  )
}

export default App
