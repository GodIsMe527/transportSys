const utils = {
    //产生随机字符串
    randomString: function (len) {
        len = len || 32;
        let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
        /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
        let maxPos = $chars.length;
        let pwd = '';
        for (let i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    },
    //日期转换工具,转换为HH:MM
    DateFormateHM:function (timeStr) {
        let time=new Date(parseInt(timeStr))
        return time.getHours().toString().padStart(2,"0")+":"+time.getMinutes().toString().padStart(2,"0");
    },
    //解密
    decode(str){
        let flag=str.charAt(5);
        if(flag=="b"){
            str=str.slice(0,5)+str.slice(6)
        }else if(flag=="g"){
            str=str.slice(0,5)+str.slice(6)+"="
        }else{
            str=str.slice(0,5)+str.slice(6)+"=="
        }
        return str
    }
}

module.exports = utils