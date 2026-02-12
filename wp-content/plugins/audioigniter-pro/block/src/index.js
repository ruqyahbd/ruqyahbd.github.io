import { __ } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';

import AudioIgniterPlayerEdit from './edit';
import PlayerBlockIcon from './block-icon';
import { getDefaultBackgroundImageValue } from './components/BackgroundControl/helpers';

import './styles/editor.scss';

export const audioIgniterColors = [
  { key: 'backgroundColor', label: __('Background Color') },
  { key: 'textColor', label: __('Text Color') },
  { key: 'accentColor', label: __('Accent Color') },
  { key: 'textOnAccentColor', label: __('Text Color on Accent') },
  { key: 'controlColor', label: __('Controls Color') },
  { key: 'playerTextColor', label: __('Player Text Color') },
  {
    key: 'playerButtonBackgroundColor',
    label: __('Player Button Background'),
  },
  { key: 'playerButtonTextColor', label: __('Player Button Text') },
  { key: 'playerButtonActiveColor', label: __('Player Active Background') },
  { key: 'playerButtonActiveTextColor', label: __('Player Text On Active') },
  { key: 'trackBarColor', label: __('Track Bar') },
  { key: 'progressBarColor', label: __('Progress Bar') },
  { key: 'trackBackgroundColor', label: __('Track Background') },
  { key: 'trackTextColor', label: __('Track Text') },
  { key: 'activeTrackBackgroundColor', label: __('Active Track Background') },
  { key: 'trackActiveTextColor', label: __('Active Track Text') },
  { key: 'trackButtonBackgroundColor', label: __('Track Button Background') },
  { key: 'trackButtonTextColor', label: __('Track Button Text') },
  { key: 'lyricsModalBackgroundColor', label: __('Lyrics Modal Background') },
  { key: 'lyricsModalTextColor', label: __('Lyrics Modal Text') },
];

registerBlockType('audioigniter/player', {
  title: __('AudioIgniter Player'),
  description: __('Display your AudioIgniter player'),
  icon: PlayerBlockIcon,
  category: 'audioigniter',
  keywords: [__('playlist'), __('audioigniter'), __('player')],
  attributes: {
    uniqueId: {
      type: 'string',
    },
    playerId: {
      type: 'string',
    },
    className: {
      type: 'string',
      default: '',
    },
    backgroundImage: {
      type: 'object',
      default: getDefaultBackgroundImageValue(),
    },
    ...audioIgniterColors.reduce((acc, color) => {
      return {
        ...acc,
        [color.key]: {
          type: 'string',
        },
      };
    }, {}),
  },
  edit: AudioIgniterPlayerEdit,
  save: () => null,
});
