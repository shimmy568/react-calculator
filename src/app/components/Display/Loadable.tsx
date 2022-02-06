/**
 * Asynchronously loads the component for NotFoundPage
 */

import { lazyLoad } from 'utils/loadable';

export const Display = lazyLoad(
  () => import('./index'),
  module => module.Display,
);
