import { useQuery } from "react-query";
import { useService } from "services";

export default function usePlaceholder(userId: number) {
  const services = useService();
  const getToDo = services.todos.getToDo;

  const query = useQuery("todos", () => getToDo(userId));
  return query;
}


