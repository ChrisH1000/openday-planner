function extractTimePairs(obj) {
  const timePairs = [];

  // Iterate through the object properties
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      // Check if the key is a starttime or endtime key
      if (key.startsWith('starttime') || key.startsWith('endtime')) {
        // Determine the number (1, 2, 3, etc.) from the key
        const number = key.match(/\d+/)[0];

        // Create an object for the pair or update an existing one
        if (!timePairs[number - 1]) {
          timePairs[number - 1] = {};
        }

        // Set the value in the corresponding object
        timePairs[number - 1][key] = obj[key];

        // Remove the property from the original object
        delete obj[key];
      }
    }
  }

  return timePairs;
}

export default extractTimePairs;
