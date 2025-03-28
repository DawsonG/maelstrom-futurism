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
import ContentBoxPage from './pages/ContentBox.tsx';
import Buttons from './pages/Buttons.tsx';


const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      ...['/', '/getting_started'].map(path => ({
        path,
        element: <App />
      })),
      {
        path: '/buttons',
        element: <Buttons />
      },
      {
        path: '/box_and_contentbox',
        element: <ContentBoxPage />
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
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={createTheme("nordDark")}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);
