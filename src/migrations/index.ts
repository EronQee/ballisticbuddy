import * as migration_20260831_190916 from './20260831_190916';
import * as migration_20260902_081821_localization from './20260902_081821_localization';

export const migrations = [
  {
    up: migration_20260831_190916.up,
    down: migration_20260831_190916.down,
    name: '20260831_190916',
  },
  {
    up: migration_20260902_081821_localization.up,
    down: migration_20260902_081821_localization.down,
    name: '20260902_081821_localization'
  },
];
