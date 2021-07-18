type MapStyle = typeof mapStyles[number];

export const mapStyles = ["decimal", "outdoors", "streets", "basic-customized"] as const;

export function mapStyleToUrl(style: MapStyle) {
  switch (style) {
    case "streets":
      return "mapbox://styles/mikhael1729/ckpmxdd8u0tli18r6nab32jpx";
    case "decimal":
      return "mapbox://styles/mikhael1729/ckmlfocjh0aee17qlh7uun9di";
    case "outdoors":
      return "mapbox://styles/mikhael1729/ckpmx6jmf0dnq18r0ynxmrscr";
    default:
      return "mapbox://styles/mikhael1729/ckr98m0ej1vc017of2v8mvckd";
      //return "mapbox://styles/mikhael1729/ckpmy16f43v7w17p81eqkytt0";
      // mapbox://styles/mikhael1729/ckpmy16f43v7w17p81eqkytt0
  }
}

export default MapStyle;
