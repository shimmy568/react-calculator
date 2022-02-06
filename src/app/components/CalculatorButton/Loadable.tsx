/**
 * Asynchronously loads the component for NotFoundPage
 */

import { lazyLoad } from 'utils/loadable';

export const CalculatorButton = lazyLoad(
  () => import('./index'),
  module => module.CalculatorButton,
);
