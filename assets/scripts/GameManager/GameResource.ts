import { PREFAB_TYPE } from "../GameEvents/GameEvents";


export default class GameResource {

    public static prefabs: Map<PREFAB_TYPE, cc.Prefab> = new Map<PREFAB_TYPE, cc.Prefab>([
        [PREFAB_TYPE.AIRCRAFT_SPAWNER, undefined],
        [PREFAB_TYPE.AIRCRAFT, undefined],
        [PREFAB_TYPE.CLOUD, undefined],
    ]);
}