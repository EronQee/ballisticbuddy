import * as migration_20260831_190916 from './20260831_190916';
import * as migration_20260902_081821_localization from './20260902_081821_localization';
import * as migration_20260903_074333 from './20260903_074333';

export const migrations = [
  {
    up: migration_20260831_190916.up,
    down: migration_20260831_190916.down,
    name: '20260831_190916',
  },
  {
    up: migration_20260902_081821_localization.up,
    down: migration_20260902_081821_localization.down,
    name: '20260902_081821_localization',
  },
  {
    up: migration_20260903_074333.up,
    down: migration_20260903_074333.down,
    name: '20260903_074333'
  },
];
