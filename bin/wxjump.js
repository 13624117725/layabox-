(function() {
    function wxjump() {
        var _proto = wxjump.prototype;
        _proto.getQueryString = function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return decodeURIComponent(r[2]);
            return null;
        }
        _proto.getUserInfo = function() {
            if(this.getQueryString("error") == 'true'){
                return;
            }
            //如果没有openid则跳去授权获取客户信息 "nickname", "headimgurl", "openid", "province", "city", "error"]
            if (!localStorage.getItem("openid")) {
                //如果链接中也没有参数则跳转授权
                if (!this.getQueryString("openid")) {
                    window.location.href = "http://act.guoanfamily.com/openweixin/user/getCode?scope=snsapi_userinfo&redirect_url=" + window.location.href;
                    
                } else {
                    //从链接中获取了参数，则存到本地
                    localStorage.setItem("nickname", this.getQueryString("nickname"));
                    localStorage.setItem("headimgurl", this.getQueryString("headimgurl"));
                    localStorage.setItem("openid", this.getQueryString("openid"));
                    localStorage.setItem("province", this.getQueryString("province"));
                    localStorage.setItem("city", this.getQueryString("city"));
                    // if(Number(window.history.length)>=2){
                    //     // history.go(-1)
                    //     window.location.replace(e.target.getAttribute('href'))
                    //     // location.replace(window.location.href);

                    //     // location.replace(document.referrer);
                    //     // document.referrer//前一个页面的URL
                    // }

                }
            }
        }
    }
    window.$wxjump = new wxjump();
 
})(window)