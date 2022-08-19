export interface ScriptConfiguration {
  exceptions: Array<Array<string>>;
}

export const compareArrays = <T extends unknown>(
  array1: Array<T>,
  array2: Array<T>
): boolean => {
  if (array1.length === array2.length) {
    return array1.every((element, index) => {
      if (Array.isArray(element) && Array.isArray(array2[index])) {
        return compareArrays(element, array2[index] as Array<T>);
      }
      return element === array2[index];
    });
  }
  return false;
};
