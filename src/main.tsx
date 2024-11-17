import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import getRoutes from './router/index.tsx'
import "@radix-ui/themes/styles.css";
import { Theme } from '@radix-ui/themes'
import { RecoilRoot } from 'recoil'

const router = createBrowserRouter(createRoutesFromElements(getRoutes()));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RecoilRoot>
      <Theme>
        <RouterProvider router={router} />
      </Theme>
    </RecoilRoot>
  </StrictMode>,
)
