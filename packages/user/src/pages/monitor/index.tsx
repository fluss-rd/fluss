import MonitorView from "shared/views/Monitor";
import { useRouter } from "next/router";

const Monitor = () => {
  const router = useRouter();

  const toModuleData = (moduleId: string) => {
    console.log({ moduleId });
    router.push(`/monitor/${moduleId}`);
  };

  return <MonitorView onViewData={toModuleData} />;
};

export default Monitor;

