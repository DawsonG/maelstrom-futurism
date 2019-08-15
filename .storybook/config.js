import { configure } from "@storybook/react";
import { setOptions } from "@storybook/addon-options";
import "@storybook/addon-console";

import { addDecorator } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
// import centered from "@storybook/addon-centered/react";
import { withBackgrounds } from "@storybook/addon-backgrounds";
import { withA11y } from "@storybook/addon-a11y";
import { withConsole } from "@storybook/addon-console";
// import { withViewport } from "@storybook/addon-viewport";

import globalDecorator from "./GlobalDecorator";

setOptions({
  /**
   * name to display in the top left corner
   * @type {String}
   */
  name: "Maelstrom Futurism",
  /**
   * URL for name in top left corner to link to
   * @type {String}
   */
  url: "https://github.com/ritz078/react-typescript-component-starter-kit"
  /**
   * show addon panel as a vertical panel on the right
   * @type {Boolean}
   */
  // addonPanelInRight: true
});

// Decorators
// addDecorator(centered);
addDecorator(withKnobs);
addDecorator(withA11y);
// addDecorator(withViewport);
addDecorator((storyFn, context) => withConsole()(storyFn)(context));
addDecorator(globalDecorator);
addDecorator(
  withBackgrounds([
    {
      name: "Grey",
      value: "#f9f9f9"
    },
    {
      name: "White",
      value: "#ffffff",
      default: true
    }
  ])
);

// automatically import all files ending in *.stories.tsx
const req = require.context("../src", true, /.stories.tsx$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
