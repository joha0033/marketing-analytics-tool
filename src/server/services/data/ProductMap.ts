interface IProductMetadata {
  productName: string;
}

interface KeyToMetadataMap {
  [key: string]: IProductMetadata;
}

const METADATA: KeyToMetadataMap = {
  A: {
    productName: 'Apples'
  },
  B: {
    productName: 'Bananas'
  },
  C: {
    productName: 'Catapults'
  },
  D: {
    productName: 'Dolls'
  },
  E: {
    productName: 'Elephants'
  },
  F: {
    productName: 'Fritters'
  },
  G: {
    productName: 'Gelatin'
  },
  H: {
    productName: 'Helicopters'
  },
  I: {
    productName: 'Igloos'
  },
  J: {
    productName: 'Juice Boxes'
  },
  K: {
    productName: 'Kings'
  },
  L: {
    productName: 'Lipids'
  },
  M: {
    productName: 'Moon Pies'
  },
  N: {
    productName: 'Nightingales'
  },
  O: {
    productName: 'Olives'
  },
  P: {
    productName: 'Poodles'
  },
  Q: {
    productName: 'Questions'
  },
  R: {
    productName: 'Rounds'
  },
  S: {
    productName: 'Snails'
  },
  T: {
    productName: 'Trees'
  },
  U: {
    productName: 'Umbrellas'
  },
  V: {
    productName: 'Violins'
  },
  W: {
    productName: 'Wood'
  },
  X: {
    productName: 'Xylophones'
  },
  Y: {
    productName: 'Yarrow'
  },
  Z: {
    productName: 'Zzzzzzz'
  }
};

export default METADATA;
