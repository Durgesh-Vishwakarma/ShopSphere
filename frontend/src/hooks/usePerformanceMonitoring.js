import { useEffect } from 'react';

export const usePerformanceMonitoring = () => {
  useEffect(() => {
    // Monitor Core Web Vitals
    const reportWebVital = (metric) => {
      // In production, send to analytics service
      if (process.env.NODE_ENV === 'production') {
        // Example: Send to Google Analytics, DataDog, etc.
        // gtag('event', metric.name, {
        //   value: Math.round(metric.value),
        //   metric_id: metric.id,
        //   metric_value: metric.value,
        //   metric_delta: metric.delta,
        // });
      }
    };

    // Largest Contentful Paint (LCP)
    const observeLCP = () => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        reportWebVital({
          name: 'LCP',
          value: lastEntry.startTime,
          id: 'lcp',
          delta: lastEntry.startTime,
        });
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    };

    // First Input Delay (FID)
    const observeFID = () => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          reportWebVital({
            name: 'FID',
            value: entry.processingStart - entry.startTime,
            id: 'fid',
            delta: entry.processingStart - entry.startTime,
          });
        });
      });
      observer.observe({ entryTypes: ['first-input'] });
    };

    // Cumulative Layout Shift (CLS)
    const observeCLS = () => {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            reportWebVital({
              name: 'CLS',
              value: clsValue,
              id: 'cls',
              delta: entry.value,
            });
          }
        });
      });
      observer.observe({ entryTypes: ['layout-shift'] });
    };

    // Time to First Byte (TTFB)
    const observeTTFB = () => {
      const navigationEntry = performance.getEntriesByType('navigation')[0];
      if (navigationEntry) {
        const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
        reportWebVital({
          name: 'TTFB',
          value: ttfb,
          id: 'ttfb',
          delta: ttfb,
        });
      }
    };

    // Initialize observers
    if ('PerformanceObserver' in window) {
      observeLCP();
      observeFID();
      observeCLS();
      observeTTFB();
    }

    // Monitor bundle size and load times
    const logResourceTimings = () => {
      const resources = performance.getEntriesByType('resource');
      const jsResources = resources.filter(resource => 
        resource.name.includes('.js') || resource.name.includes('.jsx')
      );
      
      jsResources.forEach(resource => {
        console.log('JS Resource:', {
          name: resource.name,
          size: resource.transferSize,
          loadTime: resource.duration,
        });
      });
    };

    // Log resource timings after page load
    if (document.readyState === 'complete') {
      logResourceTimings();
    } else {
      window.addEventListener('load', logResourceTimings);
    }

    return () => {
      window.removeEventListener('load', logResourceTimings);
    };
  }, []);
};

export default usePerformanceMonitoring;