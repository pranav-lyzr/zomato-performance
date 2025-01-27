// utils.js

/**
 * Combines class names conditionally.
 * @param  {...any} classes - Array of class names or conditional objects.
 * @returns {string} - Combined class names.
 */
  const cn = (...classes) => {
    return classes
      .filter(Boolean) // Remove falsy values
      .map(cls => {
        if (typeof cls === 'object') {
          return Object.keys(cls)
            .filter(key => cls[key])
            .join(' ');
        }
        return cls;
      })
      .join(' ');
  };
  export default cn;
  
  /**
   * Truncates a string to a specified length and adds ellipsis.
   * @param {string} str - The string to truncate.
   * @param {number} maxLength - The maximum length of the string.
   * @returns {string} - Truncated string with ellipsis.
   */
  export const truncate = (str, maxLength) => {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + '...';
    }
    return str;
  };
  
  /**
   * Debounce function to limit how often a function can execute.
   * @param {Function} func - The function to debounce.
   * @param {number} delay - Delay in milliseconds.
   * @returns {Function} - Debounced function.
   */
  export const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };
  
  /**
   * Formats a number with commas as thousand separators.
   * @param {number} num - The number to format.
   * @returns {string} - Formatted number.
   */
  export const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  