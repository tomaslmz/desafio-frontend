import Login from '@/pages/Login';
import Register from '@/pages/Register';

import { 
  createBrowserRouter, Route, createRoutesFromElements 
} from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/registrar" element={<Register />} />
      <Route path="/entrar" element={<Login />} />
    </>
  )
)

export default router;