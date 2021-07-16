import Location from "../../models/Location";

export default function computeCoordinatesCenter(data: Array<Location>): Location | null {
  if (!(data.length > 0)) {
    return null;
  }

  let size = data.length;
  let [x, y, z] = [0.0, 0.0, 0.0];

  for (let i = 0; i < data.length; i++) {
    let lat = (data[i].longitude * Math.PI) / 180;
    let lon = (data[i].latitude * Math.PI) / 180;

    let a = Math.cos(lat) * Math.cos(lon);
    let b = Math.cos(lat) * Math.sin(lon);
    let c = Math.sin(lat);

    x += a;
    y += b;
    z += c;
  }

  x /= size;
  y /= size;
  z /= size;

  let lon = Math.atan2(y, x);
  let hyp = Math.sqrt(x * x + y * y);
  let lat = Math.atan2(z, hyp);

  let newLongitude = (lat * 180) / Math.PI;
  let newLatitude = (lon * 180) / Math.PI;

  return { latitude: newLatitude, longitude: newLongitude };
}

