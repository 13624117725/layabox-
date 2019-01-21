export default class LetterNum extends Laya.Scene {
    
    constructor() {
        super();
        this.nx = 6;
        this.ny = 8;
        this.Imgname = 'oneImg'
        this.empty = '&nbsp;'
        this.timers = null;
        this.maxTime = 60;
        this.maxTimeTemp = this.maxTime
        this.isSuccess = false;
        this.selectedCell = null;
        this.cellArray = [];
        this.pathStack = []
  
        // 引入图片
        var asset = [
            {
                url: [
                    "comp/001.png",
                    "comp/002.png",
                    "comp/003.png",
                    "comp/004.png",
                    "comp/005.png",
                    "comp/006.png",
                    "comp/007.png",
                    "comp/008.png",
                    "comp/009.png",
                    "comp/sandian.png",
                    "comp/p0.png",
                    "comp/p1.png",
                    "comp/p2.png",
                    "comp/p3.png",
                    "comp/p4.png",
                    "comp/p5.png",
                    "comp/success.png",
                    "comp/failed.png"
                ],
                type: Laya.Loader.IMAGE
            },
            {
                url: [
                    "comp/lining.mp3",
                    'https://img.guoanfamily.com/yuandan19/success.mp3',
                    "https://img.guoanfamily.com/yuandan19/fail.mp3"
                ],
                type: Laya.Loader.SOUND
            }
        ];
       
        var lightning = "comp/sandian.png"
        // 加载图片。
        Laya.loader.load(asset, laya.utils.Handler.create(this, this.InitializationFn));
        
        // 小图片的数组对象
        this.symbols1 = [
            { key: '001', value: 'comp/001.png' },
            { key: '002', value: 'comp/002.png' },
            { key: '003', value: 'comp/003.png' },
            { key: '004', value: 'comp/004.png' },
            { key: '005', value: 'comp/005.png' },
            { key: '006', value: 'comp/006.png' },
            { key: '007', value: 'comp/007.png' },
            { key: '008', value: 'comp/008.png' },
            { key: '009', value: 'comp/009.png' },
        ]
        // 事坐标位置
        this.StartX = 50,
        this.StartY = 220;
        this.count = this.nx * this.ny;
        this.empty = '&nbsp;';
        this.clickcosttime = 0;
    }
    // 初始化页面样式方法
    InitializationFn(pr) {
        // 打乱数组，放到页面上面
        var stateImg;
        var newArr = [];
        // 头部的空数组
        let xOne = -40;
        let yOne = 130;
        var topArr = [];
        for (let i = 0; i < 8; i++) {
            var stateImgeNull = new Laya.Sprite();
            stateImgeNull.width = 90;
            stateImgeNull.height = 90;
            stateImgeNull.pos(xOne, yOne);
            stateImgeNull.innerHTML = this.empty;
            stateImgeNull.c_y = 0;
            stateImgeNull.c_x = i;
            this.LetterNum.addChild(stateImg);
            topArr.push(stateImgeNull);
            xOne += 90;
        }

        let endX = -40;
        let endY = 940;
        var bottomArr = [];
        for (let i = 0; i < 8; i++) {
            var stateImgeNull = new Laya.Sprite();
            stateImgeNull.width = 90;
            stateImgeNull.height = 90;
            stateImgeNull.pos(endX, endY);
            stateImgeNull.c_x = (endX+40)/90;
            stateImgeNull.c_y = 9;
            stateImgeNull.innerHTML = this.empty;
            this.LetterNum.addChild(stateImg);
            bottomArr.push(stateImgeNull);
            endX += 90;

        }

        var all = this.count = this.nx * this.ny;
        var halfAll = all / 2;
        var tmp = [];
        // 生成随机数组
        for (var i = 0; i < halfAll; i++) {
            var stateNum = Math.floor(Math.random() * this.symbols1.length);
            var c = this.symbols1[stateNum];
            tmp.push(c);
            tmp.push(c);
        }
        
        for (var i = all - 1; i >= 0; i--) {
            var r = Math.floor(Math.random() * i);
            var c = tmp.splice(r, 1);
            var y = Math.floor(i / this.nx);
            var x = i - y * this.nx;
            // 图片
            var Imgurl = Laya.loader.getRes(c[0].value);
            stateImg = new Laya.Sprite();
            stateImg.width = 90;
            stateImg.height = 90;

            // 初始时候的空边框。
            if (this.StartX == 50) {
                let stateImg1 = new Laya.Sprite();
                stateImg1.width = 90;
                stateImg1.height = 90;

                stateImg1.pos(this.StartX - 90, this.StartY);
                stateImg1.innerHTML = this.empty;
                stateImg1.c_x = 0;
                stateImg1.c_y = Math.floor(stateImg1._y/90)-1
                this.LetterNum.addChild(stateImg1);
                newArr.push(stateImg1);
            }
            stateImg.pos(this.StartX, this.StartY)
            stateImg.name = this.Imgname + i;
            stateImg.innerHTML = c[0].key;//唯一标识
            stateImg.Imsrc = c[0].value
            stateImg.c_x = Math.floor((stateImg._x + 90) / 90);
            stateImg.c_y = Math.floor((stateImg._y - 90) / 90);
            Imgurl.width=80
            Imgurl.height=80
            stateImg.graphics.drawTexture(Imgurl, 5,5);
            stateImg.on(laya.events.Event.MOUSE_UP, this, this.onCellClicked)
            this.LetterNum.addChild(stateImg);
            newArr.push(stateImg);
            this.StartX += 90;

            if (this.StartX >= 590) {
                let stateImg2 = new Laya.Sprite();
                stateImg2.width = 90;
                stateImg2.height = 90;
                stateImg2.pos(this.StartX, this.StartY);
                stateImg2.innerHTML = this.empty;
                stateImg2.c_x=7;
                stateImg2.c_y=(this.StartY-220)/90+1;

                this.LetterNum.addChild(stateImg2);
                newArr.push(stateImg2);
                let arr = newArr.map(item => {
                    return item
                })
                this.cellArray.push(arr);
                newArr = [];
                this.StartX = 50;
                this.StartY += 90;
            }
        }
        this.cellArray.unshift(topArr);
        this.cellArray.push(bottomArr);
        this.setbars(pr)
    }
    // 图片的点击事件方法
    onCellClicked(e) {
        
        var timestamp = new Date().getTime();   
        if(timestamp - this.clickcosttime < 10){
            this.clickcosttime = timestamp
            return false;
        }
        this.clickcosttime = timestamp
        // 点击高亮
        if(e.target&&e.target.innerHTML){
            this.applayFilter(e.target)
        }

        if (e.currentTarget.innerHTML == this.empty) {
            return;
        }
        if (this.selectedCell) {
            // debugger;
            // this.selectedCell 是起始对象
            this.tryMatch(this.selectedCell, e.currentTarget);
            // 需要在这里改变图标选中样式
            // selectedCell.setAttribute('class', 'cell');
            this.selectedCell = null;
            
        } else {
            this.selectedCell = e.currentTarget;
            // 这里是需要改变第一个目标点的样式
            // selectedCell.setAttribute('class', 'cell selected');
        }
    }

    changeImg(ca){
        let stateImg1 = new Laya.Sprite();
        stateImg1.width = 103;
        stateImg1.height = 103;
        stateImg1.pos(ca._x-4, ca._y-4)
        
        let caImg = ca.Imsrc;

        ca.graphics.clear();
        ca.off(laya.events.Event.MOUSE_UP, this, this.onCellClicked)
        this.LetterNum.removeChild(ca)


        var Imgurl2 =  Laya.loader.getRes("comp/sandian.png") ;
        Imgurl2.width = 115;
        Imgurl2.height = 115;
        stateImg1.graphics.drawTexture(Imgurl2, -6,-6);
        this.LetterNum.addChild(stateImg1);
       
        if(caImg){
            let stateImg2= new Laya.Sprite();
            stateImg2.width = 90;
            stateImg2.height = 90;
            stateImg2.pos(ca._x, ca._y);
            
            stateImg2.c_x = ca.c_x;
            stateImg2.c_y = ca.c_y;
            
            let Imgurl21 =  Laya.loader.getRes(caImg) ;
            Imgurl21.width = 80;
            Imgurl21.height = 80;

            Imgurl21.innerHTML = this.empty
            stateImg2.graphics.drawTexture(Imgurl21, 5, 5);
            this.LetterNum.addChild(stateImg2);
            let timer = setTimeout(()=>{
                this.makeNullBox(stateImg2)
                stateImg2.graphics.clear();
                stateImg1.graphics.clear();
                this.LetterNum.removeChild(stateImg1)
                
                window.clearTimeout(timer)
            },160)
        }
    }
    makepath(arr){
        let ti = 0,
        tp = ["comp/p0.png",
            "comp/p1.png",
            "comp/p2.png",
            "comp/p3.png",
            "comp/p4.png",
            "comp/p5.png"]

        arr.forEach((items,index )=> {
            if(index==0||index==arr.length-1){
                return false
            }
            // 纵向
            if(arr[index-1].c_x==items.c_x){
                // 上一个盒子在上
                if(arr[index-1].c_y<items.c_y){
                    // 下一项在下
                    if(arr[index+1].c_x==items.c_x &&arr[index+1].c_y>items.c_y ){
                        ti = 1
                    }
                    // 下一项在左边
                    if(arr[index+1].c_x<items.c_x){
                        ti = 4
                    }
                    // 下一项在右边
                    if(arr[index+1].c_x>items.c_x){
                        ti = 5
                    }
                }
                // 上一个盒子在下
                if(arr[index-1].c_y>items.c_y){
                    // 下一项在上
                    if(arr[index+1].c_x==items.c_x&&arr[index+1].c_y<items.c_y){
                        ti = 1
                    }
                    // 下一项在左边
                    if(arr[index+1].c_x<items.c_x){
                        ti = 2
                    }
                    // 下一项在右边
                    if(arr[index+1].c_x>items.c_x){
                        ti = 3
                    }

                }
            }
            // 横向
            if(arr[index-1].c_y==items.c_y){
                //上个盒子在左边
                if(arr[index-1].c_x<items.c_x){
                    // 下一个盒子在右
                    if(arr[index+1].c_y==items.c_y&&arr[index+1].c_x>items.c_x){
                        ti = 0
                    }
                    // 下一个盒子在上
                    if(arr[index+1].c_y<items.c_y){
                        ti = 4
                    }
                    // 下一个盒子在下
                    if(arr[index+1].c_y>items.c_y){
                        ti = 2
                    }

                }
                // 上一个盒子在右边
                if(arr[index-1].c_x>items.c_x){
                    // 下一个盒子在右边
                    if(arr[index+1].c_y==items.c_y&&arr[index+1].c_x<items.c_x){
                        ti = 0
                    }
                    // 下一个盒子在上边
                    if(arr[index+1].c_y<items.c_y){
                        ti = 5
                    }
                     // 下一个盒子在下边
                     if(arr[index+1].c_y>items.c_y){
                        ti = 3
                    }
                }
            }
            
            // 外部盒子


            // 闪电

            let stateImg2= new Laya.Sprite();
            stateImg2.zOrder=1;
            stateImg2.c_x = items.c_x;
            stateImg2.c_y = items.c_y;
            stateImg2.width = 90;
            stateImg2.height = 90;
            stateImg2.pos(items._x-4, items._y-4);
            let Imgurl21 =  Laya.loader.getRes(tp[ti]) ;
            Imgurl21.width = 90;
            Imgurl21.height = 90;
            let dx = 0;
            let dy = 0;
            if(stateImg2.c_x==0){
                dx = 35
            }else if(stateImg2.c_x==7){
                dx = -35
            }else if(stateImg2.c_y==0){
                dy = 35
            }else if(stateImg2.c_y==9){
                dy = -35
            }
            stateImg2.graphics.drawTexture(Imgurl21,dx,dy);
            this.LetterNum.addChild(stateImg2);
            let timer = setTimeout(()=>{
                stateImg2.graphics.clear();
                window.clearTimeout(timer)
            },120)
        })

    }
    makeNullBox(ca){
        let stateImg1 = new Laya.Sprite();
        stateImg1.width = 95;
        stateImg1.height = 95;
        stateImg1.pos(ca._x, ca._y)
        
        let caImg = ca.Imsrc;
        ca.graphics.clear();

        stateImg1.innerHTML = this.empty
        stateImg1.c_x = ca.c_x;
        stateImg1.c_y = ca.c_y;

        this.cellArray[ca.c_y][ca.c_x] = stateImg1
        this.LetterNum.addChild(stateImg1);
    }
    tryMatch(ca, cb) {
        if (ca == cb) {
           this.uniquireFilter(ca,cb)
            return;
        }

        if (ca.innerHTML !== cb.innerHTML) {
            this.uniquireFilter(ca,cb)
            return;
        }
        var pathStack = [ca];
        var found = false;
        var nexts = this.neibors(ca,cb);

        for (var i = 0; i < nexts.length; i++) {
            
            if (this.findPath(nexts[i], cb, pathStack, 0)) {
                found = true;
                break;
            }
        }
        if (!found) {
            this.uniquireFilter(ca,cb)
            return;
        }else{
            this.pathStack = pathStack;
            let coin = "comp/lining.mp3";
            laya.media.SoundManager.playSound(coin);
            this.makepath(pathStack)
            this.changeImg(ca)
            this.changeImg(cb)
        }
        // 这里是移除图片
        // setTimeout(this.drawPath, 10, pathStack);
        this.count -= 2;
        if (this.count < 2) {
            let timers= setTimeout(()=>{
                Laya.timer.clear(this, this.timers);
                this.successed();
                clearTimeout(timers)
            },550)
            
            // alert('You win!');
        }
    }
   
    neibors(c,target) {
        // let c_x = Math.floor((c.x + 90) / 90);
        // let c_y = Math.floor((c.y -90) / 90);
        let c_x = c.c_x;
        let c_y = c.c_y;
        let t_x= target.c_x;
        let t_y= target.c_y;

        let cindex = 0;

        if(c_x<t_x){
            if(c_y<=t_y){
                cindex=0
            }
            if(c_y>t_y){
                cindex=2
            }
        }
        if(c_x>t_x||c_x==t_x){
            if(c_y<=t_y){
                cindex=1
            }else{
                cindex=3
            } 

        }
        let caseObg=[
            [
                 this.fc(c_x + 1, c_y),
                 this.fc(c_x, c_y + 1),            
                 this.fc(c_x, c_y - 1),
                 this.fc(c_x - 1, c_y)
             ],
             [
                 this.fc(c_x - 1, c_y),
                 this.fc(c_x, c_y - 1),
                 this.fc(c_x, c_y + 1), 
                 this.fc(c_x + 1, c_y),
             
             ],
             [
                 this.fc(c_x, c_y + 1), 
                 this.fc(c_x + 1, c_y),
                 this.fc(c_x - 1, c_y),
                 this.fc(c_x, c_y - 1)
             ],
             [
                 this.fc(c_x, c_y - 1),
                 this.fc(c_x + 1, c_y),
                 this.fc(c_x - 1, c_y),
                 this.fc(c_x, c_y + 1)
             ]
         ]
        let neiborArr =[]
        
        neiborArr = caseObg[cindex]
        return neiborArr;
    }

    fc(x, y) {
        if (x < 0 || x > this.nx + 1 || y < 0 || y > this.ny + 1) {
            return null;
        }
        return this.cellArray[y][x];
    }

    // 图片路径匹配，消除动作
    findPath(c, target, pathStack, trunCount) {
        if (!c) {
            return false;
        }
        var c_2 = pathStack[pathStack.length - 2];
        if (c_2 && c_2.x != c.x && c_2.y != c.y) {
            if (++trunCount > 2) {
                return false;
            }
        }
        if (c == target) {
            pathStack.push(c);
            return true;
        }
        if (c.innerHTML != this.empty) {
            return false;
        }
        if (pathStack.indexOf(c) >= 0) {
            return false;
        }
        pathStack.push(c);
        var nexts = this.neibors(c,target);
        for (var i = 0; i < nexts.length; i++) {
            if (this.findPath(nexts[i], target, pathStack, trunCount)) {
                return true;
            }
        }
        pathStack.pop();
        return false;
    }
    clearPath(path) {
        for (var i = 0; i < path.length; i++) {
            // path[i].setAttribute('class', path[i].getAttribute('class').replace(' showPath', ''));
        }
    }
    drawPath(path) {
        // 这里出发消除动作
        for (var i = 0; i < path.length; i++) {
            // console.log('1234234', path)
            // path[i].setAttribute('class', path[i].getAttribute('class') + ' showPath');
        }
        setTimeout(this.clearPath, 150, path);
    }
    // 设置滤镜集合为发光滤镜
    applayFilter(ape){
        var glowFilter = new Laya.GlowFilter("#ff0",30,0,0);
        ape.filters = [glowFilter];
    }
    // 取消高亮
    uniquireFilter(ca,cb){
        this.makeImg(ca)
        this.makeImg(cb)
    }
    makeImg(ca){
        var glowFilter = new Laya.GlowFilter("#ff0000",0,0,0);
        ca.filters = [glowFilter];
    }
    setbars(pr){
        this.Mprogress.value = 1;
            // 进度条
        let it = this.maxTime
        // this.onLoading(pr)
        this.timers = ()=>{
            this.Mprogress.value -= 1/it;
            this.maxTime--;
            if( this.maxTime>59){
                let m =Math.floor( this.maxTime/60);
                let s =   this.maxTime -  m*60
                if(s<10){
                    this.myTime.text=`0${m}:0${s}`
                }else{
                    this.myTime.text=`0${m}:${s}`
                }
                
            }else if( this.maxTime>=10&& this.maxTime<=59){
                this.myTime.text=`00:${ this.maxTime}`
            }else if( this.maxTime<10&& this.maxTime>0){
                this.myTime.text=`00:0${ this.maxTime}`
            }else if(this.maxTime<=0){
                this.myTime.text=`00:00`;
    
                Laya.timer.clear(this, this.timers);
                this.failed() 
                return false;
            }
        }
        Laya.timer.clear(this, this.timers);
        Laya.timer.loop(1000, this, this.timers);
        // console.log("timerend")
    }
    // 失败
    failed(){
        if(this.isSuccess){
            return false
        }
        let coin = "https://img.guoanfamily.com/yuandan19/fail.mp3";
        laya.media.SoundManager.playSound(coin);
         //  创建一个颜色滤镜对象，灰图
        let grayscaleMat = [0.3086, 0.6094, 0.0820, 0, 0, 0.3086, 0.6094, 0.0820, 0, 0, 0.3086, 0.6094, 0.0820, 0, 0, 0, 0, 0, 1, 0];
        let grayscaleFilter = new Laya.ColorFilter(grayscaleMat);
        // 模糊
        let blurFilter = new Laya.BlurFilter();
        blurFilter.strength = 10;
        this.LetterNum.filters = [grayscaleFilter,blurFilter];
        let stateImg22= new Laya.Sprite();
       
        stateImg22.width = 640;
        stateImg22.height = 1136;
        stateImg22.pos(0, 0);
        let Imgurl21 = Laya.loader.getRes("comp/failed.png") ;
        Imgurl21.width = 640;
        Imgurl21.height = 1136;
        stateImg22.graphics.drawTexture(Imgurl21, 0,0);
        Laya.stage.addChild(stateImg22);
        stateImg22.on(laya.events.Event.MOUSE_UP,this,()=>{
            stateImg22.zOrder="-1";
            stateImg22.graphics.clear();
            this.removeSelf();            
            Laya.Scene.open("peopleList.scene",true,10000)
        })

    }
    // 成功

    successed(){
        let coin = "https://img.guoanfamily.com/yuandan19/success.mp3";
        laya.media.SoundManager.playSound(coin);
        this.isSuccess = true;
        // this.mytimer.clearAll();
        //Laya.timer.clearAll();
        // Laya.timer.clear(this, this.timers);
        // 模糊
        let blurFilter = new Laya.BlurFilter();
        blurFilter.strength = 10;
        this.LetterNum.filters = [blurFilter];
        let success2= new Laya.Sprite();
        
        success2.width = 640;
        success2.height = 1136;
        success2.pos(0, 0);
        let Imgurl21 = Laya.loader.getRes("comp/success.png") ;
        Imgurl21.width = 640;
        Imgurl21.height = 1136;
        success2.graphics.drawTexture(Imgurl21, 0,0);
        Laya.stage.addChild(success2);
        success2.on(laya.events.Event.MOUSE_UP,this,()=>{
            success2.zOrder="-1";
            success2.graphics.clear();
            this.removeSelf();            
            Laya.Scene.open("peopleList.scene",true,(this.maxTimeTemp-this.maxTime))
        })
        // 保存
        
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
        let username = localStorage.getItem("nickname");
        let imageurl = localStorage.getItem("headimgurl");
        let openId = localStorage.getItem("openid");
        if(!username){
            username:""
        }
        if(!imageurl){
            imageurl = "https://img.guoanfamily.com/touxiang.png"
        }
        if(!openId){
            openId="" 
        }
        axios.post("https://mt.guoanfamily.com/pmgame/PmRankingSave",{
        // axios.post("http://172.16.44.233:9100/PmRankingSave",{
            "username":username,
            "costtime":(this.maxTimeTemp-this.maxTime),
            // "answerday":`${year}-${month}-${date}`,
            'imageurl':imageurl,
            'openid':openId
        }).then(res=>{
        })
    }
}