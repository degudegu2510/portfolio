import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router";
import { HomePage, ProductPage } from './component/Pages'
import './style/index.css'
import { Base } from './component/Templates/Base/Base';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Base />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/product/:productId',
        element: <ProductPage />,
      },

    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
