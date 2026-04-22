import { type ReactElement } from 'react';
import { iconMap } from './theme';

export function getIcon(iconName: keyof typeof iconMap): ReactElement | null {
  const Icon = iconMap[iconName];
  if (!Icon) return null;
  return <Icon />;
}
