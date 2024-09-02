import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx'
import './index.css'
import {  Tunovers } from './components/demo/tunovers.tsx'
import { Collection } from './components/demo/collection.tsx';
import { Certificate } from './components/demo/certificate.tsx';
import { SalesFarce } from './components/demo/salesForce.tsx';
import { ExpenditureRevenue } from './components/demo/expenditureRevenue.tsx';
import { FormResult } from './components/demo/formResult.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>, 
  },
  {
    path: '/FormResult',
    element: <FormResult/>
  },
  {
     path: '/Tunovers/:startDate/:endDate/:intermediate',
     element: <Tunovers />
  },
  {
     path: '/Collection/:startDate/:endDate/:intermediate',
     element: <Collection/>
  },
  {
    path: '/Certificate/:startDate/:endDate/:intermediate',
    element: <Certificate/>
  },
  {
     path: '/SalesForce/:startDate/:endDate/:intermediate',
     element: <SalesFarce/>
  },
  {
    path: '/ExpenditureRevenue/:startDate/:endDate/:intermediate',
    element: <ExpenditureRevenue/>
  },
])
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
 <RouterProvider router={router} />
);


///:intermediate/:startDate/:endDate
