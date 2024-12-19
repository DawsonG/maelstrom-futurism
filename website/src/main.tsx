import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ThemeProvider, createTheme } from '@maelstrom-futurism/core';

import Layout from './components/Layout.tsx';
import App from './pages/App.tsx';
import Theming from './pages/Theming.tsx';
import ColorTool from './pages/ColorTool.tsx';
import Inputs from './pages/Inputs.tsx';
import PageGrid from './pages/Grid.tsx';
import PagePaper from './pages/Paper.tsx';


const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <App />
      },
      {
        path: '/theming',
        element: <Theming />
      },
      {
        path: '/color_tool',
        element: <ColorTool />
      },
      {
        path: '/inputs',
        element: <Inputs />
      },
      {
        path: '/layout/grid',
        element: <PageGrid />
      },
      {
        path: '/paper',
        element: <PagePaper />
      }
    ]
  }
], {
  future: {
    v7_partialHydration: true,
    v7_skipActionStatusRevalidation: true,
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={createTheme("nordDarkColors")}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
