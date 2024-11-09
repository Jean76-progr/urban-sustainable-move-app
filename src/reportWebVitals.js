/**
 * Reports Web Vitals metrics using the provided callback function
 * @param {Function} onPerfEntry - Callback function to handle performance metrics
 */
const reportWebVitals = onPerfEntry => {
  // Check if callback is provided and is a function
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Dynamically import web-vitals library to measure performance metrics
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Report Core Web Vitals metrics:
      getCLS(onPerfEntry);    // Cumulative Layout Shift
      getFID(onPerfEntry);    // First Input Delay
      getFCP(onPerfEntry);    // First Contentful Paint
      getLCP(onPerfEntry);    // Largest Contentful Paint
      getTTFB(onPerfEntry);   // Time to First Byte
    });
  }
};

export default reportWebVitals;
