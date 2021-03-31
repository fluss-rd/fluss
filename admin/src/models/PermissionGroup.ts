import Actions from "./Actions";

export default class PermissionGroup {
  id: string;
  name: string;
  actions: Actions[];

  static mockData(): PermissionGroup[] {
    const groups: PermissionGroup[] = [];
    const actions = Actions.mockData();

    const memo: Array<string> = [];
    for (let i = 0; i < actions.length; i++) {
      const action = actions[i];
      const index = memo.indexOf(action.permission.name);

      if (index === -1) {
        const name = action.permission.name;
        groups.push({ id: `g${i}`, name, actions: [action] });
        memo.push(name);
      } else {
        groups[index].actions.push(action);
      }
    }

    return groups;
  }
}
