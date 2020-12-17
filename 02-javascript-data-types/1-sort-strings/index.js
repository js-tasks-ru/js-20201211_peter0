/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  return arr.concat().sort(function(a, b) {
    const sign = a.localeCompare(b, 'ru', { caseFirst: 'upper'});
    return (param === 'asc') ? sign : -sign;
  });
}
