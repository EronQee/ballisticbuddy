import * as migration_20260831_190916 from './20260831_190916';

export const migrations = [
  {
    up: migration_20260831_190916.up,
    down: migration_20260831_190916.down,
    name: '20260831_190916'
  },
];
