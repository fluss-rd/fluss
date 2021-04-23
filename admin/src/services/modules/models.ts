export type ModuleData = {
  moduleId: string;
  phoneNumber: string;
  riverId: string;
  riverName: string;
  userId: string;
  creationDate: string;
  updateDate: string;
  state: string;
  serial: string;
  location: {
    latitude: number;
    longitude: number;
  };
};

export type ModuleForm = {
  phoneNumber: string;
  riverId: string;
  serial: string;
  location: {
    latitude: number;
    longitude: number;
  };
};
