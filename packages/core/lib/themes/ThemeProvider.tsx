import { ReactNode, createContext, useContext } from 'react';
import { Global, css } from '@emotion/react';
import poppinsLight from '../fonts/Poppins-Light.ttf';
import poppinsMedium from '../fonts/Poppins-Medium.ttf';
import silkscreenMedium from '../fonts/Silkscreen-Regular.ttf';
import silkscreenBold from '../fonts/Silkscreen-Bold.ttf';
import jetbrainsMonoLight from '../fonts/JetBrainsMono-Light.ttf';
import jetbrainsMonoMedium from '../fonts/JetBrainsMono-Medium.ttf';

import Theme from './theme';
import { createTheme } from './createTheme';
import { EASE_FUNCTION } from '../motion';

const ThemeContext = createContext(createTheme("nordDark"));
export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
    theme: Theme;
    children: ReactNode;
}

export const ThemeProvider = ({ theme, children }: ThemeProviderProps): ReactNode => {
    const themeValue = theme;

    const isDark = themeValue.color('background') === '#242933';
    const fg2 = isDark ? '#d8dee9' : '#3b4252';
    const bg2 = isDark ? '#3b4252' : '#e5e9f0';
    const bg3 = isDark ? '#434c5e' : '#d8dee9';

    const globalStyles = css`
        :root {
            /* Semantic colors */
            --mf-background:   ${themeValue.color('background')};
            --mf-content:      ${themeValue.color('content')};
            --mf-border:       ${themeValue.color('border')};
            --mf-border-muted: ${themeValue.color('borderMuted')};
            --mf-text:         ${themeValue.color('textColor')};
            --mf-text-muted:   ${themeValue.color('textColor')}80;
            --mf-link:         ${themeValue.color('linkColor')};
            --mf-primary:      ${themeValue.color('primary')};
            --mf-secondary:    ${themeValue.color('secondary')};
            --mf-focus:        ${themeValue.color('focus')};
            --mf-active:       ${themeValue.color('active')};
            --mf-alert:        ${themeValue.color('alert')};
            --mf-warning:      ${themeValue.color('warning')};
            --mf-success:      ${themeValue.color('success')};
            --mf-info:         ${themeValue.color('info')};

            /* Convenience surface / foreground scale */
            --mf-fg-1: ${themeValue.color('textColor')};
            --mf-fg-2: ${fg2};
            --mf-fg-3: ${themeValue.color('textColor')}99;
            --mf-bg-0: ${themeValue.color('background')};
            --mf-bg-1: ${themeValue.color('content')};
            --mf-bg-2: ${bg2};
            --mf-bg-3: ${bg3};

            /* Raw Nord palette */
            --nord-polar-0: #2e3440;
            --nord-polar-1: #3b4252;
            --nord-polar-2: #434c5e;
            --nord-polar-3: #4c566a;
            --nord-snow-0:  #d8dee9;
            --nord-snow-1:  #e5e9f0;
            --nord-snow-2:  #eceff4;
            --nord-frost-0: #8fbcbb;
            --nord-frost-1: #88c0d0;
            --nord-frost-2: #81a1c1;
            --nord-frost-3: #5e81ac;
            --nord-aurora-red:    #bf616a;
            --nord-aurora-orange: #d08770;
            --nord-aurora-yellow: #ebcb8b;
            --nord-aurora-green:  #a3be8c;
            --nord-aurora-purple: #b48ead;

            /* Type families */
            --mf-font-sans:    "Poppins", system-ui, -apple-system, "Segoe UI", sans-serif;
            --mf-font-display: "Silkscreen", "Poppins", system-ui, sans-serif;
            --mf-font-mono:    "JetBrainsMono", ui-monospace, "SF Mono", Menlo, monospace;

            /* Type scale */
            --mf-size-base:   ${themeValue.sizes.base};
            --mf-size-sm:     ${themeValue.sizes.sm};
            --mf-size-normal: ${themeValue.sizes.normal};
            --mf-size-md:     ${themeValue.sizes.md};
            --mf-size-lg:     ${themeValue.sizes.lg};
            --mf-size-xl:     ${themeValue.sizes.xl};
            --mf-size-xxl:    ${themeValue.sizes.xxl};

            /* Spacing scale */
            --mf-space-0: ${themeValue.space[0]}px;
            --mf-space-1: ${themeValue.space[1]}px;
            --mf-space-2: ${themeValue.space[2]}px;
            --mf-space-3: ${themeValue.space[3]}px;
            --mf-space-4: ${themeValue.space[4]}px;
            --mf-space-5: ${themeValue.space[5]}px;
            --mf-space-6: ${themeValue.space[6]}px;
            --mf-space-7: ${themeValue.space[7]}px;
            --mf-space-8: ${themeValue.space[8]}px;

            /* Radii */
            --mf-radius-input:  ${themeValue.inputRadius};
            --mf-radius-button: ${themeValue.buttonRadius};
            --mf-radius-card:   ${themeValue.borderRadius};
            --mf-radius-pill:   ${themeValue.pillRadius};

            /* Z-index scale */
            --mf-z-bottom: ${themeValue.heights.bottom};
            --mf-z-low:    ${themeValue.heights.low};
            --mf-z-sunk:   ${themeValue.heights.sunk};
            --mf-z-normal: ${themeValue.heights.normal};
            --mf-z-raised: ${themeValue.heights.raised};
            --mf-z-high:   ${themeValue.heights.high};
            --mf-z-top:    ${themeValue.heights.top};

            /* Line heights */
            --mf-lh-tight:   ${themeValue.lineHeights.tight};
            --mf-lh-normal:  ${themeValue.lineHeights.normal};
            --mf-lh-relaxed: ${themeValue.lineHeights.relaxed};

            /* Letter spacings */
            --mf-ls-tight:   ${themeValue.letterSpacings.tight};
            --mf-ls-normal:  ${themeValue.letterSpacings.normal};
            --mf-ls-wide:    ${themeValue.letterSpacings.wide};
            --mf-ls-display: ${themeValue.letterSpacings.display};

            /* Motion */
            --mf-ease:       ${EASE_FUNCTION};
            --mf-dur-fast:   ${themeValue.durations.fast};
            --mf-dur-normal: ${themeValue.durations.normal};
            --mf-dur-slow:   ${themeValue.durations.slow};
            --mf-dur-ripple: ${themeValue.durations.ripple};
        }

        @media (prefers-reduced-motion: reduce) {
            :root {
                --mf-dur-fast:   1ms;
                --mf-dur-normal: 1ms;
                --mf-dur-slow:   1ms;
                --mf-dur-ripple: 1ms;
            }
        }

        *:focus-visible {
            outline: 2px solid var(--mf-focus);
            outline-offset: 2px;
        }

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
            font-weight: 400;
            line-height: var(--mf-lh-normal);
        }

        h1, h2, h3, h4, h5, h6 {
            margin: ${themeValue.space[1]}px 0;
            font-family: var(--mf-font-sans);
            font-weight: 500;
            line-height: var(--mf-lh-tight);
            letter-spacing: var(--mf-ls-tight);
        }
        h1 { font-size: ${themeValue.sizes.xxl}; }
        h2 { font-size: ${themeValue.sizes.xl}; }
        h3 { font-size: ${themeValue.sizes.lg}; }
        h4 { font-size: ${themeValue.sizes.md}; }
        h5 { font-size: ${themeValue.sizes.normal}; text-transform: uppercase; letter-spacing: var(--mf-ls-display); }
        h6 { font-size: ${themeValue.sizes.sm}; text-transform: uppercase; letter-spacing: var(--mf-ls-display); }

        p {
            margin: 0 0 16px;
            text-wrap: pretty;
        }

        a {
            color: ${themeValue.color("linkColor")};
            text-decoration: none;
            transition: color var(--mf-dur-fast) ${EASE_FUNCTION};
        }
        a:hover {
            text-decoration: underline;
        }

        code, pre, kbd, samp {
            font-family: var(--mf-font-mono);
            font-size: 0.95em;
        }
        code {
            padding: 1px 6px;
            border-radius: 6px;
        }

        form {
            background-color: inherit; /*without this, the input line cuts through the label*/
        }

        .mf-display, .mf-pixel {
            font-family: "Silkscreen", "Poppins", system-ui, sans-serif;
            font-weight: 400;
            letter-spacing: var(--mf-ls-wide);
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