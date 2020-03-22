import React from "react";
import { storiesOf } from "@storybook/react";
import { css } from "@emotion/core";

import Navbar from "./";

const banner = css`
  background: url(${require("../../resources/desert_vegetation_mountains_clouds.jpg")});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 200px;
`;

storiesOf("Navbar", module).add("Normal Sticky", () => (
  <div style={{ width: "100%" }}>
    <div css={banner} />
    <Navbar toggleSide="right" sticky>
      <Navbar.Group>
        <Navbar.Brand>OSMstudios</Navbar.Brand>
        <Navbar.Link tag="a" href="#">
          Link One
        </Navbar.Link>
        <Navbar.Link tag="a" href="#">
          Link Two
        </Navbar.Link>
        <Navbar.Link tag="a" href="#">
          Link Three
        </Navbar.Link>
      </Navbar.Group>

      <Navbar.Group>
        <Navbar.Link tag="a" href="#">
          Account
        </Navbar.Link>
      </Navbar.Group>
    </Navbar>

    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus
      orci orci, sed mollis dui vehicula sit amet. Donec vulputate vel nibh
      molestie lobortis. Cras a lorem tempor, tristique libero ac, sagittis
      orci. Integer ex nibh, feugiat nec iaculis sed, finibus id eros. Donec
      vulputate, neque eu eleifend dictum, nunc justo consequat purus, vel
      feugiat justo dui non nulla. Donec a magna non nisl ornare vestibulum quis
      at tellus. Aenean semper dignissim lobortis. Pellentesque gravida
      tristique dolor sed vulputate. Etiam sollicitudin sem id lacus hendrerit,
      vel cursus tortor dictum. Nullam vel congue mauris. Nullam lorem turpis,
      eleifend quis est vitae, imperdiet sodales metus.
    </p>

    <p>
      Phasellus suscipit nulla a mattis sodales. Nullam quis posuere nunc. Donec
      eu malesuada dolor. Aliquam venenatis justo orci, ac lobortis sem
      venenatis non. Praesent vel mauris at massa maximus varius. Maecenas
      venenatis, nisl eget eleifend luctus, risus urna facilisis ante, ac
      eleifend sapien velit et diam. Vivamus vitae venenatis odio. Mauris eros
      enim, mollis tincidunt quam vitae, fringilla sollicitudin nisi.
    </p>

    <p>
      Ut id feugiat ipsum, ac semper ex. Maecenas at nunc elit. Cras semper diam
      ligula, at dapibus mi facilisis ultricies. Vivamus volutpat non lectus nec
      suscipit. Vestibulum non posuere lacus. Sed in nisi a lectus tincidunt
      maximus ornare sollicitudin purus. Fusce fermentum fermentum eros in
      iaculis. Aliquam non ligula tortor. Lorem ipsum dolor sit amet,
      consectetur adipiscing elit. Donec vel aliquet metus. Class aptent taciti
      sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
      Nam dapibus purus sed luctus malesuada. Maecenas tincidunt laoreet justo,
      a accumsan est bibendum vel. Quisque porttitor, quam id bibendum
      efficitur, eros ex aliquam massa, ut molestie dolor velit vitae lectus.
      Vivamus ac lacus nisi.
    </p>

    <p>
      Maecenas massa mauris, viverra at mauris sit amet, congue tempus quam.
      Aliquam fringilla, neque ut placerat venenatis, purus nibh sollicitudin
      arcu, non consequat elit sem vitae arcu. Ut tortor sapien, posuere a
      accumsan at, venenatis at sem. In hac habitasse platea dictumst. Lorem
      ipsum dolor sit amet, consectetur adipiscing elit. Nulla blandit ut augue
      nec faucibus. Morbi ultricies ante risus, vel rhoncus lectus dapibus id.
      Nullam id sem eu velit mollis pellentesque at sit amet nibh. Morbi egestas
      magna scelerisque quam interdum, ut blandit magna auctor.
    </p>

    <p>
      Vivamus cursus quam turpis, nec accumsan nisl commodo mollis. Pellentesque
      tincidunt sed enim vitae tristique. Pellentesque nec lacus odio. Nullam
      nisi lacus, auctor ac dictum non, mollis at lectus. Etiam volutpat
      consectetur hendrerit. Nunc ac lectus vel urna ornare elementum. Nam
      gravida, nibh ac pretium aliquet, massa nulla ultrices diam, in
      consectetur magna lorem ac ligula. Vestibulum condimentum velit nec lectus
      sodales ultrices. Ut semper id tellus nec aliquam. Cras convallis felis
      vitae nisl pretium mattis. Aenean quis ligula commodo, bibendum massa
      eget, aliquam felis. Ut felis sapien, efficitur eget fringilla eget,
      dictum lacinia mauris. Mauris tincidunt consequat orci, quis tempus velit
      tempor id.
    </p>

    <p>
      Phasellus accumsan augue eu mi elementum rhoncus. Ut ex tellus,
      scelerisque at ullamcorper sed, varius a magna. Nam et justo id lorem
      aliquet dictum. Integer neque felis, feugiat eu auctor ut, viverra vel mi.
      Mauris accumsan efficitur risus vel dictum. Curabitur vel tempus quam.
      Nunc tempus ac velit at mattis. Nullam imperdiet urna eu mi feugiat
      sagittis sed in massa.
    </p>

    <p>
      Pellentesque vitae ante vitae est ullamcorper eleifend. Cras laoreet
      fermentum est sed blandit. Sed vitae sagittis dui. Maecenas eu pulvinar
      tellus, vitae ullamcorper felis. Aenean fermentum risus sit amet nisl
      dictum feugiat. In sed mauris ut ligula facilisis pellentesque. Aenean
      gravida ipsum sit amet neque iaculis, non feugiat nulla laoreet. Nunc
      nulla mi, aliquet a dui pharetra, maximus bibendum dolor.
    </p>

    <p>
      Etiam efficitur fermentum urna sit amet suscipit. Aenean et nisi quis
      felis dapibus elementum. Nullam sed lectus sapien. Phasellus viverra
      sollicitudin libero. Etiam sit amet consectetur ex. Sed semper nulla nec
      enim tempus, sed pulvinar dui porta. Morbi pellentesque egestas
      scelerisque. Donec mattis dolor diam, pulvinar tincidunt sapien volutpat
      eu. Aenean id tempus neque. Proin aliquet elit non erat efficitur
      lobortis. Morbi sodales dictum porta.
    </p>

    <p>
      Curabitur sagittis gravida pulvinar. Ut placerat purus vel dui vehicula,
      id vestibulum urna pellentesque. Nunc elit tellus, tincidunt eget sodales
      ut, ultricies quis neque. Praesent neque arcu, tincidunt ut ornare ut,
      pharetra a orci. Sed vehicula nisi sed tellus pulvinar, eu gravida dolor
      auctor. Aliquam accumsan mauris sit amet justo tempus tempor. Morbi ut
      justo lorem.
    </p>

    <p>
      Maecenas massa mauris, viverra at mauris sit amet, congue tempus quam.
      Aliquam fringilla, neque ut placerat venenatis, purus nibh sollicitudin
      arcu, non consequat elit sem vitae arcu. Ut tortor sapien, posuere a
      accumsan at, venenatis at sem. In hac habitasse platea dictumst. Lorem
      ipsum dolor sit amet, consectetur adipiscing elit. Nulla blandit ut augue
      nec faucibus. Morbi ultricies ante risus, vel rhoncus lectus dapibus id.
      Nullam id sem eu velit mollis pellentesque at sit amet nibh. Morbi egestas
      magna scelerisque quam interdum, ut blandit magna auctor.
    </p>

    <p>
      Ut id feugiat ipsum, ac semper ex. Maecenas at nunc elit. Cras semper diam
      ligula, at dapibus mi facilisis ultricies. Vivamus volutpat non lectus nec
      suscipit. Vestibulum non posuere lacus. Sed in nisi a lectus tincidunt
      maximus ornare sollicitudin purus. Fusce fermentum fermentum eros in
      iaculis. Aliquam non ligula tortor. Lorem ipsum dolor sit amet,
      consectetur adipiscing elit. Donec vel aliquet metus. Class aptent taciti
      sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
      Nam dapibus purus sed luctus malesuada. Maecenas tincidunt laoreet justo,
      a accumsan est bibendum vel. Quisque porttitor, quam id bibendum
      efficitur, eros ex aliquam massa, ut molestie dolor velit vitae lectus.
      Vivamus ac lacus nisi.
    </p>

    <p>
      Suspendisse ac ullamcorper lorem, non efficitur dolor. Morbi venenatis
      dolor justo, et scelerisque urna ornare at. Curabitur sed commodo odio.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sagittis,
      risus ut semper porttitor, ante leo viverra lacus, vitae viverra lectus
      risus vel diam. Curabitur commodo velit ligula. Nunc tempus ante et est
      commodo, eget malesuada est hendrerit. Sed elementum vehicula sapien, et
      laoreet lorem vehicula in. Vestibulum sagittis pellentesque est, quis
      lobortis ipsum sagittis non. Curabitur non quam magna. Etiam vitae
      vehicula turpis.
    </p>

    <p>
      Suspendisse varius nibh quis nisl convallis, sit amet sollicitudin turpis
      vulputate. Vestibulum malesuada malesuada sapien in tincidunt. Praesent
      consectetur varius libero, ornare tempor arcu commodo vitae. Cras
      condimentum imperdiet leo sed volutpat. Sed condimentum nibh sit amet nisi
      tristique tempus. Donec ac augue dolor. Suspendisse maximus est a magna
      convallis convallis. Nulla facilisi. Sed blandit est nec nisi molestie
      eleifend. Nunc eget mattis libero. Praesent porttitor rhoncus felis et
      auctor. Fusce vel pharetra arcu. Fusce facilisis ultricies quam, a
      accumsan turpis maximus eu. Class aptent taciti sociosqu ad litora
      torquent per conubia nostra, per inceptos himenaeos. Pellentesque et
      luctus magna, vel gravida dolor. Etiam feugiat mollis nisi vel tempus.
    </p>
  </div>
));
