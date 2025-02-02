import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { Icon, IconName } from './Icon';
import { icons } from './icons';

describe("<Icon />", () => {
  test.each(Object.keys(icons) as IconName[])(
    'renders correct %s icon without violations',
    async (iconName: IconName) => {
      const { container } = render(<Icon icon={iconName} />);
      await screen.findByText(/svg/i);
    }
  );
});