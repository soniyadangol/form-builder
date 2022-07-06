function importAll(r) {
    return r.keys().map(r);
  }
  
const images = importAll(require.context('../images', true, /\.(png|jpe?g|svg)$/));