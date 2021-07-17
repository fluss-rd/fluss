import Location from "../../models/Location";

export type Waterbody = {
  riverID: string;
  name: string;
  location: Array<Location>;
  userID: string;
  type: string;
  creationDate: string;
  updateDate: string;
};

