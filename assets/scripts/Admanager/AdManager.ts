const {ccclass, property} = cc._decorator;


@ccclass
export default class AdManager extends cc.Component {

    start() {

    }

    update(dt?:number) {

    }

    watchAds() {
        if(cc.sys.isNative) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AdManage", "showRewardedVideo", "()V");
        }
    }
}
