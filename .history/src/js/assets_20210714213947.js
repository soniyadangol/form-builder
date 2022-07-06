function importAll(images) {
    return images.keys().map(images);
  }
  
const images = importAll(require.context('../images', true, /\.(png|jpe?g|svg)$/));