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
      moduleId: "YN-1",
      riverId: "RV-1",
      message: "Porcentaje de batería al 10% en módulo YN-1, Río Yaque del Norte",
      category: "battery",
      date: new Date(Date.now()),
    },
    {
      id: "N-02",
      moduleId: "YN-1",
      riverId: "RV-1",
      message: "Cambio inesperado de ubicación en módulo YN-1, Río Yaque del norte",
      category: "unexpectedLocation",
      date: new Date(Date.now()),
    },
  ];
}
