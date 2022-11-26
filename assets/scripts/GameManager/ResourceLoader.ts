import { PREFAB_TYPE } from "../GameEvents/GameEvents";
import GameResource from "./GameResource";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ResourceLoader {
    private static readonly _path_loader: Array<string> = [
        "prefabs/Spawner/PlaneSpawner",
        "prefabs/planes/su57"
    ];

    private static _resource_loader: ResourceLoader = undefined;

    public static inst(): ResourceLoader {
        if(this._resource_loader === undefined) {
            this._resource_loader = new ResourceLoader;
        }
        return this._resource_loader;
    }

    private _load_pref(path: string): Promise<cc.Prefab> {
        return new Promise<cc.Prefab>((resolve, reject) => {
            cc.resources.load(path, (error: Error, pref: cc.Prefab) => {
                resolve(pref);
            })
        });
    }

    public async fetchPrefab() {
        for(let i = 0; i < ResourceLoader._path_loader.length; i++) {
            await this._load_pref(ResourceLoader._path_loader[i]).then((pref:cc.Prefab) => {
                GameResource.prefabs.set(i, pref);
            });
        }
    }

}
