const moduleStates = ["active", "inactive", "deleted", "broken"] as const;

type ModuleState = typeof moduleStates[number];

export default ModuleState;

