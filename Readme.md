# Maelstrom Futurism

> Extremely opinionated framework for super fast webapp development.

[Demo & Documentation Website](https://mf.osmstudios.com/)
[DawsonGoodell.com](https://dawsongoodell.com/)

* **Maelstrom** - for speedy development
* **Futurism** - for sleek, post-modern design

## Should I use this?

Probably **not**.  This is hardly production ready.  MF is a personal project to determine if I still have any web development skills.  It is designed to be used by me and is mostly styled via [emotion](https://emotion.sh).

## Rules / Tenets (mostly for ignoring)

* Flat actions - we don't push components out on the z-axis unless we have to.  Buttons don't move away from you when you click.  Websites are 2D and it's time they start acting like it.
* Highly reactive - since things don't move, it's important that they do react to user actions.  Buttons ripple, form fields light up, etc.
* Simple typography with BOLD colors - actually, you know what, just pick whatever color.  We let you pick colors.  Typography is still simple though.
* Rounded edges and organic flow - there is nothing worse than stubbing your line-of-sight on the corner of a table -- or button.
* Only take what you need - each control is in it's own package so you can grab only what you need. (You also have to take Core because the other components rely on values it provides, but you get the idea.)

## Getting Started

Maelstrom Futurism comes as a cluster of `@maelstrom-futurism` packages, so users can pick and choose which components they need to import.  The base package can be found in `@maelstrom-futurism/core`.  This package contains themes and theming providers.  While many components *can* function without a ThemeProvider, it isn't recommended.

Alternatively, the `maelstrom-futurism` package contains core as well as all the base components. 

> Packages starting with `mf-` are not imported in the `maelstrom-futurism` master package.  These packages have unique use cases and won't be helpful for most people.  As a result they are installed separately.

**To start:**

**Ignore this section. I haven't published this to npm since I don't want to encourage its use.**

```
npm i @maelstrom-futurism/core
```

Once Core is installed, you can add components you might want to use.

```
npm i @maelstrom-futurism/button @maelstrom-futurism/layout @maelstrom-futurism/input
```

a complete list of packages to install can be found in the [packages directory](https://github.com/DawsonG/maelstrom-futurism/tree/main/packages).

To use components provide a Theme in the root component of your application.

```
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={createTheme("nordDark")}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);
```

`createTheme` takes either a theme object or the name of a predefined color scheme.  The current options are `nordDark` and `nordLight`, based on [Nord theme](https://www.nordtheme.com/docs/colors-and-palettes).

## License

MIT
