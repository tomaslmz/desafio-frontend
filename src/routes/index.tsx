import Login from '@/pages/Login';
import Register from '@/pages/Register';

import { 
  createBrowserRouter, Route, createRoutesFromElements 
} from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Register />}>
      <Route path="/login" element={<Login />} />
    </Route>
  )
)

export default router;