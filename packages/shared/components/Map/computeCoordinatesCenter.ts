import Location from "../../models/Location";

export default function computeCoordinatesCenter(data: Array<Location>): Location | null {
  if (!(data.length > 0)) {
    return null;
  }

  const size = data.length;
  let [x, y, z] = [0.0, 0.0, 0.0];

  for (let i = 0; i < data.length; i++) {
    const lat = (data[i].longitude * Math.PI) / 180;
    const lon = (data[i].latitude * Math.PI) / 180;

    const a = Math.cos(lat) * Math.cos(lon);
    const b = Math.cos(lat) * Math.sin(lon);
    const c = Math.sin(lat);

    x += a;
    y += b;
    z += c;
  }

  x /= size;
  y /= size;
  z /= size;

  const lon = Math.atan2(y, x);
  const hyp = Math.sqrt(x * x + y * y);
  const lat = Math.atan2(z, hyp);

  const newLongitude = (lat * 180) / Math.PI;
  const newLatitude = (lon * 180) / Math.PI;

  return { latitude: newLatitude, longitude: newLongitude };
}
