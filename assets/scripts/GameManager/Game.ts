import { PREFAB_TYPE } from "../GameEvents/GameEvents";
import GameResource from "./GameResource";
import ResourceLoader from "./ResourceLoader";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    onLoad() {
        this._init();
    }

    private _onLoadPref(): Promise<void> {
        return ResourceLoader.inst().fetchPrefab();
    }

    private async _init() {
        await this._onLoadPref();
        const spawner = cc.instantiate(GameResource.prefabs.get(PREFAB_TYPE.AIRCRAFT_SPAWNER));
        this.node.addChild(spawner);
        const aircraft = cc.instantiate(GameResource.prefabs.get(PREFAB_TYPE.AIRCRAFT));
        spawner.addChild(aircraft);
    }
}
