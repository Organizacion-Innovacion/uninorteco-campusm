// eslint-disable-next-line no-unused-vars
import React from 'react';
import { storiesOf } from '@storybook/react';

// import { withKnobs } from '@storybook/addon-knobs';
import { addTileFaceStories,generateImage } from "@ombiel/cm-tile-sdk/dev";

import PromedioTileFace from '../../../src/client/tiles/promedio-tile/components/promedio-tile-face';

const image = generateImage("My Tile ","#556666");

const stories = storiesOf('Promedio | Tile Face / With Image', module);

addTileFaceStories(stories,<PromedioTileFace image={image} text="Promedio" />);
