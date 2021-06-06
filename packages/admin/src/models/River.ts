import Location from "models/Location";
import { RiverData } from "services/rivers/models";

class River {
  id: string;
  name: string;
  location: Location;
  userId: string;
  creationDate: Date;
  updateDate: Date;

  static fromRiverData(data: RiverData): River {
    const river: River = {
      updateDate: new Date(data.updateDate),
      creationDate: new Date(data.creationDate),
      userId: data.userID,
      location: data.location,
      name: data.name,
      id: data.riverID,
    };

    return river;
  }

  static fromRiverDataList(data: RiverData[]): River[] {
    const rivers = data.map((d) => River.fromRiverData(d));
    return rivers;
  }

  static mockData(): River[] {
    return [
      {
        id: "YN-1",
        name: "Yaque del Norte",
        location: { latitude: 33.24, longitude: -23.14 },
        userId: "US-1",
        creationDate: new Date(Date.now()),
        updateDate: new Date(Date.now()),
      },
    ];
  }
}

export default River;
