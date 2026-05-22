import { ReactNode, createContext, useContext, useState, useEffect } from 'react';
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

const ThemeContext = createContext(createTheme('nordLight'));
export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  theme: Theme;
  darkTheme?: Theme;
  colorScheme?: 'light' | 'dark' | 'auto';
  children: ReactNode;
}

export const ThemeProvider = ({ theme, darkTheme, colorScheme = 'auto', children }: ThemeProviderProps): ReactNode => {
  const [colorSchemeActual, setColorSchemeActual] = useState<'dark' | 'light'>('light');
  const [_systemPrefersDark, setSystemPrefersDark] = useState(false);

  useEffect(() => {
    if (!darkTheme) {
      // no dark theme is available so we'll have to use the light theme
      setColorSchemeActual('light');
      return;
    }

    if (colorScheme !== 'auto') {
      // color scheme has been manaully set, pass it on
      setColorSchemeActual(colorScheme);
      return;
    }

    // calculate based on browser settings
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setSystemPrefersDark(e.matches);

    mq.addEventListener('change', handler);
    setColorSchemeActual(mq.matches ? 'dark' : 'light');
    return () => mq.removeEventListener('change', handler);
  }, [darkTheme, colorScheme]);

  const themeValue = colorSchemeActual === 'dark' ? darkTheme! : theme;

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
            --mf-accent:       ${themeValue.color('accent')};
            --mf-focus:        ${themeValue.color('focus')};
            ${Object.entries(themeValue.customColors).map(([name, value]) => `--mf-color-${name}: ${value};`).join('\n            ')}
            --mf-active:       ${themeValue.color('active')};
            --mf-alert:        ${themeValue.color('alert')};
            --mf-warning:      ${themeValue.color('warning')};
            --mf-success:      ${themeValue.color('success')};
            --mf-info:         ${themeValue.color('info')};

            --mf-surface-hover: ${themeValue.color('surfaceHover')};
            --mf-surface-press: ${themeValue.color('surfacePress')};

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
            --mf-font-sans:    ${themeValue.fonts.sans};
            --mf-font-display: ${themeValue.fonts.display};
            --mf-font-mono:    ${themeValue.fonts.mono};

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
            color: ${themeValue.color('textColor')};
            background-color: ${themeValue.color('background')};
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
            color: ${themeValue.color('linkColor')};
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
            color: ${themeValue.color('textColor')}80;
        }
    `;

  return (
    <ThemeContext.Provider value={themeValue}>
      <Global styles={globalStyles} />
      {children}
    </ThemeContext.Provider>
  );
};
