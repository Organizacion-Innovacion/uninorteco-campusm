// eslint-disable-next-line no-unused-vars
import React from 'react';
import { storiesOf } from '@storybook/react';

// import { withKnobs } from '@storybook/addon-knobs';
import { addTileFaceStories, generateImage } from "@ombiel/cm-tile-sdk/dev";

import MultipleLinkTileFace from '../../../src/client/tiles/multiple-link-tile/components/multiple-link-tile-face';

const image = generateImage("My Tile    ","#eeeeee");

const stories = storiesOf('Multiple Link | Tile Face / With Icon', module);

addTileFaceStories(stories,<MultipleLinkTileFace text="Multiple Link" icon={image} />);
