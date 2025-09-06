import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router";
import { HomePage, ProductPage, ArticlesPage, ProjectsPage } from './component/Pages'
import './style/index.css'
import { Base } from './component/Templates/Base/Base';
import { Buffer } from 'buffer';
import * as Routes from './utils/Routes';

(window as any).Buffer = Buffer;

const router = createBrowserRouter([
  {
    path: Routes.HomePagePath(),
    element: <Base />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: Routes.ProductPagePath(':productId'),
        element: <ProductPage />,
      },
      {
        path: Routes.ArticlesPagePath(),
        element: <ArticlesPage />,
      },
      {
        path: Routes.ProjectsPagePath(),
        element: <ProjectsPage />,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
