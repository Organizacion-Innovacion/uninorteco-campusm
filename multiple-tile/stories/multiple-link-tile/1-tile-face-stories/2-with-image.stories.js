// eslint-disable-next-line no-unused-vars
import React from 'react';
import { storiesOf } from '@storybook/react';

// import { withKnobs } from '@storybook/addon-knobs';
import { addTileFaceStories,generateImage } from "@ombiel/cm-tile-sdk/dev";

import MultipleLinkTileFace from '../../../src/client/tiles/multiple-link-tile/components/multiple-link-tile-face';

const image = generateImage("My Tile ","#556666");

const stories = storiesOf('Multiple Link | Tile Face / With Image', module);

addTileFaceStories(stories,<MultipleLinkTileFace image={image} text="Multiple Link" />);
