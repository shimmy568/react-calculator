/**
 * Asynchronously loads the component for NotFoundPage
 */

import { lazyLoad } from 'utils/loadable';

export const HistoryList = lazyLoad(
  () => import('./index'),
  module => module.HistoryList,
);
