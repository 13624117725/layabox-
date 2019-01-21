/**
 * 设置LayaNative屏幕方向，可设置以下值
 * landscape           横屏
 * portrait            竖屏
 * sensor_landscape    横屏(双方向)
 * sensor_portrait     竖屏(双方向)
 */


window.screenOrientation = "sensor_portrait";

// axios
loadLib('libs/axios.min.js');

//-----libs-begin-----
loadLib("libs/laya.coref3b2ac1a.js");
loadLib("libs/laya.webglb0adda52.js");
loadLib("libs/laya.ui6425d5ef.js");
loadLib("libs/laya.physics2fe4d9fa.js");
loadLib("libs/laya.filter631c8538.js");
//-----libs-end-------
loadLib("js/bundle47dbc2b7.js");
 
// // 
// window.onload = function(){
    
//     document.querySelector("#music_play_filter").pause();    
//     document.querySelector("#bgMusicBtn").onclick = function(){
//         if(this.classList.contains("music")){
//             document.querySelector("#music_play_filter").pause();
//             this.classList.remove("music")
//         }else{
//             document.querySelector("#music_play_filter").play();
//             this.classList.add("music")
//         }   
//     }
// }
