export default class Lettersecond extends Laya.Scene {
    constructor() {
        super();
    }
    onEnable(){
        document.querySelector("#bgMusicBtn").classList.add("music")
        document.querySelector("#bgMusicBtn").classList.add("circle")

        this.sbtn.on(laya.events.Event.MOUSE_UP,this,this.firstCkick)
    }
    firstCkick(){
        document.querySelector("#bgMusicBtn").classList.remove("music")
        document.querySelector("#bgMusicBtn").classList.remove("circle")
        Laya.Scene.open("LetterNum.scene")
        this.removeSelf();
    }
}