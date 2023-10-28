"use strict"
let CountTime;
let CD = 1;
let BGP = document.getElementById("loadingWindow");

//引数として画像のパスを取得し、画像を大きく表示するための関数
/*function PictureBigger(ps) {
    PictureWindow.style.display = "block"; //display:none;ではなくなったので、表示されるように
    StopS.style.overflow = "hidden";//overflow:visible;ではなくなったので、スクロールができないように
    BigPicture.src = ps;//img要素のsrcにpsを代入している(つまりクリック元の画像を大きく見せている)
}

//PictureBiggerが発動した状態を解除する(つまり拡大表示を終了する)関数
function PictureSmaller() {
    PictureWindow.style.display = "none";//noneにすることで、非表示に
    StopS.style.overflow = "visible";//visibleにすることで、スクロールを可能に
}*/

window.onload = function () {
    StartDelete();
}

function StartDelete() {
    BGP.style.backgroundColor = "rgb(255, 255, 255," + CD + " )";
    if (CD > 0.0) {
        window.setTimeout(DeletePicture, 30);
    }
    else {
        BGP.style.display = "none";
    }
}

function DeletePicture() {
    CD -= 0.03;
    StartDelete();
}

