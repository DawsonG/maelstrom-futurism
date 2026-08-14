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
// import ColorTool from './pages/ColorTool.tsx';
import Inputs from './pages/Inputs.tsx';
import DropZonePage from './pages/DropZone.tsx';
import DateTimePage from './pages/DateTime.tsx';
import PageGrid from './pages/Grid.tsx';
import PageContainers from './pages/Containers.tsx';
import PagePaper from './pages/Paper.tsx';
import ContentBoxPage from './pages/ContentBox.tsx';
import Buttons from './pages/Buttons.tsx';
import Icons from './pages/Icons.tsx';
import PageTooltip from './pages/Tooltip.tsx';
import PageModal from './pages/Modal.tsx';
import PagePaperReadability from './pages/PaperReadability.tsx';
import PageTable from './pages/Table.tsx';
import FormBuilderPage from './pages/FormBuilder.tsx';
import RadioPage from './pages/Radio.tsx';
import CheckboxPage from './pages/Checkbox.tsx';
import SecretPage from './pages/SecretPage.tsx';

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
        path: '/table',
        element: <PageTable />
      },
      {
        path: '/theming',
        element: <Theming />
      },
//      {
//        path: '/color_tool',
//        element: <ColorTool />
//      },
      {
        path: '/inputs',
        element: <Inputs />
      },
      {
        path: '/dropzone',
        element: <DropZonePage />
      },
      {
        path: '/datetime',
        element: <DateTimePage />
      },
      {
        path: '/form',
        element: <FormBuilderPage />
      },
      {
        path: '/tooltip',
        element: <PageTooltip />
      },
      {
        path: '/layout/containers',
        element: <PageContainers />
      },
      {
        path: '/layout/grid',
        element: <PageGrid />
      },
      {
        path: '/modal',
        element: <PageModal />
      },
      {
        path: '/paper',
        element: <PagePaper />
      },
      {
        path: '/paper_readability',
        element: <PagePaperReadability />
      },
      {
        path: '/radio',
        element: <RadioPage />
      },
      {
        path: '/checkbox',
        element: <CheckboxPage />
      },
      {
        path: '/icons',
        element: <Icons />
      },
      {
        path: '/asdf/jkl123',
        element: <SecretPage />
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={createTheme('nordLight')} darkTheme={createTheme('nordDark')}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);
