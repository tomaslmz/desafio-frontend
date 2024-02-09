import Login from '@/pages/Login';
import Register from '@/pages/Register';
import FilterRoute from './FilterRoute';
import Header from '@/components/Header';

import { 
  createBrowserRouter, Route, createRoutesFromElements 
} from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<FilterRoute isClosed />}>
        <Route path="/" element={<Header />} />
      </Route>
      <Route path="/entrar" element={<FilterRoute isClosed={false} />}>
        <Route path="/entrar" element={<Login />} />
      </Route>
      <Route path="/registrar" element={<FilterRoute />}>
        <Route path="/registrar" element={<Register />} />
      </Route>
    </>
  )
)

export default router;