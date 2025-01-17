import React from 'react';
import { createRoot } from 'react-dom/client';
import { Metric } from 'web-vitals';
import './i18n/config';
import App from './App.tsx';

const container = document.getElementById('root')!;
const root = createRoot(container);

if (process.env.NODE_ENV !== 'production') {
  void import('web-vitals').then((vitals) => {
    const warnOnlyNegativeMetrics = (metric: Metric) => {
      if (metric.rating !== 'good') {
        /* eslint-disable-next-line no-console */
        console.warn(`Metric ${metric.name} is not good`, metric);
      }
    };
    vitals.onCLS(warnOnlyNegativeMetrics);
    vitals.onINP(warnOnlyNegativeMetrics);
    vitals.onFCP(warnOnlyNegativeMetrics);
    vitals.onLCP(warnOnlyNegativeMetrics);
    vitals.onTTFB(warnOnlyNegativeMetrics);
  });
  void import('@axe-core/react').then((axe) => {
    void axe.default(React, root, 1000);
  });
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
