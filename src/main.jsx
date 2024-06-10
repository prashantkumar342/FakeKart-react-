/* eslint-disable react-refresh/only-export-components */
import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './scss/index.scss'
import('./fontAwesome/all.js')
import('./fontAwesome/all.css')
import $ from 'jquery';
const App = lazy(() => import('./App.jsx'))
window.$ = window.jQuery = $;
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense>
        <App />
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>,
)
