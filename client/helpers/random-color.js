const randomColor = () => {
  return `#${(((1 << 24) * Math.random()) | 0).toString(16)}`;
};

export default randomColor;
