export default str => {
  const words = str.split(" ");
  for (let i = words.length - 1; i >= 0; i--) {
    const word = words[i];
    words[i] = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }
  return words.join(" ");
};
