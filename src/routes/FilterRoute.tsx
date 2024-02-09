import getCookie from '@/utils/getCookie';
import { Navigate, useLocation, Outlet } from 'react-router-dom';

interface FilterRouteProps {
  isClosed?: boolean;
}

export default function FilterRoute({ isClosed = false }: FilterRouteProps) {
	const location = useLocation();
	const auth = getCookie('auth');

	if (isClosed && !auth) {
		return <Navigate to="/entrar" state={{ from: location}} replace />;
	}

	if (!isClosed && auth) {
		return <Navigate to="/" state={{ from: location}} replace />;
	}

	return <Outlet />;
}