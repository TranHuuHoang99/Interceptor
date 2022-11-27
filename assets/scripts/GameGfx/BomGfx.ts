import { PREFAB_TYPE } from "../GameEvents/GameEvents";
import GameResource from "../GameManager/GameResource";


export default class BomGfx {
    private _bomDropper: cc.Node = undefined;
    private _nuclearBom: cc.Node = undefined;

    constructor(bomDropper: cc.Node) {
        this._bomDropper = bomDropper;
        const spawner = cc.instantiate(GameResource.prefabs.get(PREFAB_TYPE.NUCLEAR_BOM));
        this._bomDropper.addChild(spawner);
    }

    public onDroppingBom() {
        //TODO
    }
}