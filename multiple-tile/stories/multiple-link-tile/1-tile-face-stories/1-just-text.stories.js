// eslint-disable-next-line no-unused-vars
import React from 'react';
import { storiesOf } from '@storybook/react';

// import { withKnobs } from '@storybook/addon-knobs';
import { addTileFaceStories } from "@ombiel/cm-tile-sdk/dev";

import MultipleLinkTileFace from '../../../src/client/tiles/multiple-link-tile/components/multiple-link-tile-face';


const stories = storiesOf('Multiple Link | Tile Face / Just Text', module);

addTileFaceStories(stories,<MultipleLinkTileFace text="Multiple Link" />);
