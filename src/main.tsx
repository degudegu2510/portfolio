import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import { HomePage, ProductPage } from './component/Pages'
import './style/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path='/product/:productId' element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
