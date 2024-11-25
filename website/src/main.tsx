import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './App.tsx';
import ColorTool from './pages/ColorTool.tsx';
import Inputs from './pages/Inputs.tsx';
import { ThemeProvider, createTheme } from '@maelstrom-futurism/core';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/colorTool',
    element: <ColorTool />
  },
  {
    path: '/inputs',
    element: <Inputs />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={createTheme("nordDarkColors")}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
