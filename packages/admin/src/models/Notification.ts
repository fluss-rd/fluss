type Notification = {
  id: string;
  moduleId: string;
  riverId: string;
  message: string;
  category: NotificationCategory;
  date: Date;
};

export default Notification;

export type NotificationCategory = "battery" | "unexpectedLocation";

export function mockNotifications(): Notification[] {
  return [
    {
      id: "N-01",
      moduleId: "MDL97ac6ecc77134ecdbdb5f8efe576f415",
      riverId: "RVRd195be9460fb42a7acf3725195a001b5",
      message: "Cambio inesperado de ubicación en módulo Punta de Mondesí, Laguna de Oviedo",
      category: "unexpectedLocation",
      date: new Date(2021, 6, 11),
    },
  ];
}
