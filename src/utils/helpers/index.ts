import {IColor, IIcon} from '@/types';
import {nanoid} from 'nanoid/non-secure';

const palette = {
  /**Tailwind Colors*/
  red500: '#ef4444',
  orange500: '#f97316',
  amber500: '#f59e0b',
  green500: '#22c55e',
  sky500: '#0ea5e9',
  blu500: '#007AFF',
  violet500: '#6366f1',
  purple500: '#a855f7',
  fuchsia500: '#d946ef',
  pink500: '#ec4899',
  rose500: '#f43f5e',
};

export const getColors = () => {
  const colors: IColor[] = Object.keys(palette).map(_paletteItem => {
    return {
      id: `color_${nanoid()}`,
      code: palette[_paletteItem as keyof typeof palette],
      name: _paletteItem,
    };
  });
  return colors;
};

const ICON_SET = {
  seed: '🌱',
  fries: '🍟',
  pizza: '🍕',
  rocket: '🚀',
  grinning: '😀',
  partying_face: '🥳',
  beach_umbrella: '🏖️',
};

export const getIcons = () => {
  const icons: IIcon[] = Object.keys(ICON_SET).map(_icon => {
    return {
      id: `icon_${nanoid()}`,
      name: _icon,
      symbol: ICON_SET[_icon as keyof typeof ICON_SET],
    };
  });
  return icons;
};

export const getGreetings = ({hour}: {hour: number}) => {
  if (hour < 12) {
    return 'Morning ☀️';
  }
  if (hour < 18) {
    return 'Evening 🌄';
  } else {
    return 'Night 🌆';
  }
};
