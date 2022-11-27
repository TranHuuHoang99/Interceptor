import AircraftGfx from "../GameGfx/AircraftGfx";
import { GameParam } from "./GameParam";
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
        //TODO initialize aircraft spawner, aircraft
        new AircraftGfx(this.node); // inside this is a Promise object
    }

    update(dt?: number) {
        if(GameParam.debug_mode) {
            console.log(cc.view.getFrameSize().width, cc.view.getFrameSize().height);
        }
    }
}
