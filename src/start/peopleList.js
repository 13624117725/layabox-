export default class peopleList extends Laya.Scene {
    constructor() {
        super();
        this.useMinis=0;
        this.useSconds="";
    }
    onOpened(num){
        if(num>=10000){
            // this.filText="无成绩，请再战";
            this.timeBox.zOrder=-1;
            this.fileTime.zOrder=3;
            return false
        }else{
            this.timeBox.zOrder=1;
            this.fileTime.zOrder=-1;
        }
        if(!num||num<=1){
            document.querySelector(".MYimg").style.display="none";
            this.removeSelf(); 
            Laya.Scene.open("LetterNum.scene");
        }
        if( num>59){
            this.useMinis=Math.floor( num/60);
            this.useSconds =  num - this.useMinis*60
            if( this.useSconds<10){
                this.useSconds=`0${this.useSconds}`
            }
        }else{
            this.useSconds = num;
            this.useMinis=0;
        }
        this.minis.text=this.useMinis+"";
        this.sconds.text=this.useSconds+"";
    }
    onEnable(){
        // let dataTime= new Date()
        // let year = dataTime.getFullYear();
        // let month = dataTime.getMonth()+1;
        // let date = dataTime.getDate()
        // if(month<10){
        //     month = '0'+month
        // }
        // if(date<10){
        //     date = "0"+date
        // }
        // let Times = `${year}-${month}-${date}`
        document.querySelector(".MYimg").style.display="block";
        axios.get(`https://mt.guoanfamily.com/pmgame/GetPmRanking`).then(res=>{
          
            if(res.data.Code==200){
                let List = [];
                res.data.Data.forEach((item,index) => {
                    item.costtime = `${Math.floor(item.costtime/60)}分${item.costtime%60}秒`
                    let url = "";
                    if(index<3){
                        url = `https://img.guoanfamily.com/yuandan19/NO${index+1}.png`
                    }

                    let imageurl = item.imageurl;
                    if(!imageurl){
                        imageurl = "https://img.guoanfamily.com/yuandan19/touxiang.jpg"
                    }

                    List.push({
                        NoImg:url,
                        mNo:(index+1+""),
                        mlabel:item.username,
                        mtime:item.costtime,
                        head_img:imageurl
                    })
                   
                });
                this.m_list.array = List
            }
        })
        let oneDailog = this.getChildByName('indexBottomDialog1');
        this.shearB.on(laya.events.Event.MOUSE_UP,this,this.toshear);
        
        oneDailog.on(laya.events.Event.MOUSE_UP,this,()=>{
            oneDailog.zOrder=-1
            document.querySelector(".MYimg").style.display="block"
        });
        this.playAgain.on(laya.events.Event.MOUSE_UP,this,()=>{
            document.querySelector(".MYimg").style.display="none";
            Laya.Scene.open("LetterNum.scene");
            this.removeSelf();          
        });
    }
    toshear(){
        var oneDailog = this.getChildByName('indexBottomDialog1');
        oneDailog.zOrder=3999  ;
        document.querySelector(".MYimg").style.display="none"     
    }
   
}