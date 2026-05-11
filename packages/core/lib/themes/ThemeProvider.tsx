import React, { ReactNode, createContext, useContext } from 'react';
import { Global, css } from '@emotion/react';
import poppinsLight from '../fonts/Poppins-Light.ttf';
import poppinsMedium from '../fonts/Poppins-Medium.ttf';
import silkscreenMedium from '../fonts/Silkscreen-Regular.ttf';
import silkscreenBold from '../fonts/Silkscreen-Bold.ttf';
import jetbrainsMonoLight from '../fonts/JetBrainsMono-Light.ttf';
import jetbrainsMonoMedium from '../fonts/JetBrainsMono-Medium.ttf';

import Theme from './theme';
import { createTheme } from './createTheme';

const ThemeContext = createContext(createTheme("nordDark"));
export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
    theme: Theme;
    children: ReactNode;
}

export const ThemeProvider = ({ theme, children }: ThemeProviderProps): ReactNode => {
    const themeValue = theme;

    const globalStyles = css`
        html {
            box-sizing: border-box;
        }
        *, *:before, *:after {
            box-sizing: inherit;
        }

        @font-face {
            font-family: "Poppins";
            font-weight: 400;
            font-display: swap;
            src: url(${poppinsLight}) format('truetype');
        }

        @font-face {
            font-family: "Poppins";
            font-weight: 500;
            font-display: swap;
            src: url(${poppinsMedium}) format('truetype');
        }

        @font-face {
            font-family: "Silkscreen";
            font-weight: 400;
            font-display: swap;
            src: url(${silkscreenMedium}) format('truetype');
        }

        @font-face {
            font-family: "Silkscreen";
            font-weight: 600;
            font-display: swap;
            src: url(${silkscreenBold}) format('truetype');
        }

        @font-face {
            font-family: "JetBrainsMono";
            font-weight: 400;
            font-display: swap;
            src: url(${jetbrainsMonoLight}) format('truetype');
        }

        @font-face {
            font-family: "JetBrainsMono";
            font-weight: 600;
            font-display: swap;
            src: url(${jetbrainsMonoMedium}) format('truetype');
        }

        html, body, #root {
            min-height: 100vh;
        }
        body {
            margin: 0;
            color: ${themeValue.color("textColor")};
            background-color: ${themeValue.color("background")};
            font-family: Poppins;
            font-size: ${themeValue.size('base')};
        }

        h1, h2, h3, h4 {
            margin: ${themeValue.space[1]}px 0;
        }
        
        a {
            color: ${themeValue.color("linkColor")};
        }

        form {
            background-color: inherit; /*without this, the input line cuts through the label*/
        }

        .mf-display, .mf-pixel {
            font-family: "Silkscreen", "Poppins", system-ui, sans-serif;
            font-weight: 400;
            letter-spacing: 0.04em;
            text-transform: uppercase;
        }

        .mf-text-sm {
            font-size: 0.707em;
        }

        .mf-text-muted {
            color: ${themeValue.color("textColor")}80;
        }
    `;

    return (
        <ThemeContext.Provider value={themeValue}>
            <Global styles={globalStyles} />
            {children}
        </ThemeContext.Provider>
    );
};