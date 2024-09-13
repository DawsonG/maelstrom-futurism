import React, { ReactNode, createContext, useContext } from 'react';
import { Global, css } from '@emotion/react';
import poppinsLight from './fonts/Poppins-Light.ttf';
import poppinsMedium from './fonts/Poppins-Medium.ttf';
import silkscreenMedium from './fonts/Silkscreen-Regular.ttf';
import silkscreenBold from './fonts/Silkscreen-Bold.ttf';
import Theme from './theme';

const defaultValue = new Theme("User");
const ThemeContext = createContext(defaultValue);
export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
    theme?: Theme;
    children: ReactNode;
}

export const ThemeProvider = ({ theme, children }: ThemeProviderProps): JSX.Element => {
    const themeValue = theme || new Theme("User");

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
            src: url(${poppinsLight}) format('truetype');
        }
        
        @font-face {
            font-family: "Poppins";
            font-weight: 500;
            src: url(${poppinsMedium}) format('truetype');
        }
        
        @font-face {
            font-family: "Silkscreen";
            font-weight: 400;
            src: url(${silkscreenMedium}) format('truetype');
        }
        
        @font-face {
            font-family: "Silkscreen";
            font-weight: 600;
            src: url(${silkscreenBold}) format('truetype');
        }

        html, body {
            min-height: 100vh;
        }
        body {
            margin: 0;
            color: ${themeValue.color("text")};
            background-color: ${themeValue.color("background")};
            font-family: Poppins;
        }

        h1, h2, h3, h4 {
            margin: ${themeValue.space[1]}px 0;
        }
    `;

    return (
        <ThemeContext.Provider value={themeValue}>
            <Global styles={globalStyles} />
            {children}
        </ThemeContext.Provider>
    );
};