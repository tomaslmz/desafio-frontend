import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './query/queryClient';
import './global.css';


ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient} >
			<RouterProvider router={router} />
		</QueryClientProvider>
	</React.StrictMode>
);
