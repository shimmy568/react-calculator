/**
 * Asynchronously loads the component for NotFoundPage
 */

import { lazyLoad } from 'utils/loadable';

export const Calculator = lazyLoad(
  () => import('./index'),
  module => module.Calculator,
);
