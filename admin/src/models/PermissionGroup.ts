import Actions from "./Actions";
import Permission from "./Permission";

export default class PermissionGroup {
  id: string;
  permission: Permission;
  actions: Actions[];

  static mockData(): PermissionGroup[] {
    const groups: PermissionGroup[] = [];
    const actions = Actions.mockData();

    const memo: Array<string> = [];
    for (let i = 0; i < actions.length; i++) {
      const action = actions[i];
      const index = memo.indexOf(action.permission.name);

      if (index === -1) {
        const permission = action.permission;
        groups.push({ id: `g${i}`, permission, actions: [action] });
        memo.push(permission.name);
      } else {
        groups[index].actions.push(action);
      }
    }

    return groups;
  }
}
