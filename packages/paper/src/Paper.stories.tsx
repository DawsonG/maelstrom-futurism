import React, { Fragment } from "react";
import { storiesOf } from "@storybook/react";

import Paper, { PaperVariant } from ".";

storiesOf("Paper", module)
  .add("Basic", () => (
    <Fragment>
      <Paper width="768px">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Hendrerit
          dolor magna eget est lorem ipsum dolor. Pellentesque pulvinar
          pellentesque habitant morbi tristique. Aliquam sem fringilla ut morbi
          tincidunt augue interdum velit. Accumsan lacus vel facilisis volutpat
          est velit egestas dui id. Sit amet facilisis magna etiam tempor orci
          eu lobortis. Nulla pharetra diam sit amet nisl suscipit. Purus sit
          amet volutpat consequat mauris. Vel eros donec ac odio tempor orci
          dapibus ultrices. Vel orci porta non pulvinar. Elementum nibh tellus
          molestie nunc non blandit massa. Faucibus a pellentesque sit amet
          porttitor eget dolor morbi. Feugiat nisl pretium fusce id. Leo urna
          molestie at elementum eu facilisis sed odio.
        </p>
        <p>
          Proin nibh nisl condimentum id venenatis a condimentum. Orci phasellus
          egestas tellus rutrum tellus pellentesque eu tincidunt. Fusce ut
          placerat orci nulla pellentesque dignissim enim sit amet. Facilisi
          cras fermentum odio eu feugiat pretium nibh ipsum consequat. Tristique
          risus nec feugiat in fermentum posuere urna nec. Quis varius quam
          quisque id diam vel. Et magnis dis parturient montes. Consectetur
          lorem donec massa sapien faucibus. Auctor neque vitae tempus quam.
          Enim praesent elementum facilisis leo vel. Iaculis eu non diam
          phasellus vestibulum lorem. Varius morbi enim nunc faucibus a
          pellentesque sit. Turpis egestas maecenas pharetra convallis. Donec
          pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu.
          Velit ut tortor pretium viverra suspendisse potenti nullam.
        </p>
      </Paper>

      <Paper width="768px" variant={PaperVariant.STACK}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Hendrerit
          dolor magna eget est lorem ipsum dolor. Pellentesque pulvinar
          pellentesque habitant morbi tristique. Aliquam sem fringilla ut morbi
          tincidunt augue interdum velit. Accumsan lacus vel facilisis volutpat
          est velit egestas dui id. Sit amet facilisis magna etiam tempor orci
          eu lobortis. Nulla pharetra diam sit amet nisl suscipit. Purus sit
          amet volutpat consequat mauris. Vel eros donec ac odio tempor orci
          dapibus ultrices. Vel orci porta non pulvinar. Elementum nibh tellus
          molestie nunc non blandit massa. Faucibus a pellentesque sit amet
          porttitor eget dolor morbi. Feugiat nisl pretium fusce id. Leo urna
          molestie at elementum eu facilisis sed odio.
        </p>
        <p>
          Proin nibh nisl condimentum id venenatis a condimentum. Orci phasellus
          egestas tellus rutrum tellus pellentesque eu tincidunt. Fusce ut
          placerat orci nulla pellentesque dignissim enim sit amet. Facilisi
          cras fermentum odio eu feugiat pretium nibh ipsum consequat. Tristique
          risus nec feugiat in fermentum posuere urna nec. Quis varius quam
          quisque id diam vel. Et magnis dis parturient montes. Consectetur
          lorem donec massa sapien faucibus. Auctor neque vitae tempus quam.
          Enim praesent elementum facilisis leo vel. Iaculis eu non diam
          phasellus vestibulum lorem. Varius morbi enim nunc faucibus a
          pellentesque sit. Turpis egestas maecenas pharetra convallis. Donec
          pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu.
          Velit ut tortor pretium viverra suspendisse potenti nullam.
        </p>
      </Paper>

      <Paper width="768px" variant={PaperVariant.RANDOM_STACK}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Hendrerit
          dolor magna eget est lorem ipsum dolor. Pellentesque pulvinar
          pellentesque habitant morbi tristique. Aliquam sem fringilla ut morbi
          tincidunt augue interdum velit. Accumsan lacus vel facilisis volutpat
          est velit egestas dui id. Sit amet facilisis magna etiam tempor orci
          eu lobortis. Nulla pharetra diam sit amet nisl suscipit. Purus sit
          amet volutpat consequat mauris. Vel eros donec ac odio tempor orci
          dapibus ultrices. Vel orci porta non pulvinar. Elementum nibh tellus
          molestie nunc non blandit massa. Faucibus a pellentesque sit amet
          porttitor eget dolor morbi. Feugiat nisl pretium fusce id. Leo urna
          molestie at elementum eu facilisis sed odio.
        </p>
        <p>
          Proin nibh nisl condimentum id venenatis a condimentum. Orci phasellus
          egestas tellus rutrum tellus pellentesque eu tincidunt. Fusce ut
          placerat orci nulla pellentesque dignissim enim sit amet. Facilisi
          cras fermentum odio eu feugiat pretium nibh ipsum consequat. Tristique
          risus nec feugiat in fermentum posuere urna nec. Quis varius quam
          quisque id diam vel. Et magnis dis parturient montes. Consectetur
          lorem donec massa sapien faucibus. Auctor neque vitae tempus quam.
          Enim praesent elementum facilisis leo vel. Iaculis eu non diam
          phasellus vestibulum lorem. Varius morbi enim nunc faucibus a
          pellentesque sit. Turpis egestas maecenas pharetra convallis. Donec
          pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu.
          Velit ut tortor pretium viverra suspendisse potenti nullam.
        </p>
      </Paper>
    </Fragment>
  ))
  .add("Vertically Centered", () => (
    <Paper width="450px" centered>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Hendrerit dolor
        magna eget est lorem ipsum dolor. Facilisi cras fermentum odio eu
        feugiat pretium nibh ipsum consequat. Tristique risus nec feugiat in
        fermentum posuere urna nec. Quis varius quam quisque id diam vel. Et
        magnis dis parturient montes. Consectetur lorem donec massa sapien
        faucibus. Auctor neque vitae tempus quam. Enim praesent elementum
        facilisis leo vel. Iaculis eu non diam phasellus vestibulum lorem.
        Varius morbi enim nunc faucibus a pellentesque sit. Turpis egestas
        maecenas pharetra convallis. Donec pretium vulputate sapien nec sagittis
        aliquam malesuada bibendum arcu. Velit ut tortor pretium viverra
        suspendisse potenti nullam.
      </p>
    </Paper>
  ))
  .add("PaperVariant.NONE", () => (
    <Paper variant="none">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Hendrerit dolor
        magna eget est lorem ipsum dolor. Facilisi cras fermentum odio eu
        feugiat pretium nibh ipsum consequat. Tristique risus nec feugiat in
        fermentum posuere urna nec. Quis varius quam quisque id diam vel. Et
        magnis dis parturient montes. Consectetur lorem donec massa sapien
        faucibus. Auctor neque vitae tempus quam. Enim praesent elementum
        facilisis leo vel. Iaculis eu non diam phasellus vestibulum lorem.
        Varius morbi enim nunc faucibus a pellentesque sit. Turpis egestas
        maecenas pharetra convallis. Donec pretium vulputate sapien nec sagittis
        aliquam malesuada bibendum arcu. Velit ut tortor pretium viverra
        suspendisse potenti nullam.
      </p>
    </Paper>
  ));
