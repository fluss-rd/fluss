import { useRouter } from "next/router";
import MonitorView from "shared/views/Monitor";

const Monitor = () => {
  const router = useRouter();

  const toModuleData = (moduleId: string) => {
    console.log({ moduleId });
    router.push(`/monitor/${moduleId}`);
  };

  return <MonitorView onViewData={toModuleData} mode="user"  />;
};

export default Monitor;
