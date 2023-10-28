"use strict"
const atarasii = document.getElementById("notcamera");
const atarasiiC = document.getElementById("usecamera");
const newPicture = document.getElementById("subPicture1");
const secondPicturue = document.getElementById("subPicture2");
const changePicture = document.getElementById("hennsyuu");
const con = changePicture.getContext("2d");
const fileUp = document.getElementById("fileUp");
const cameraUp = document.getElementById("CameraUp");
const hozon = document.getElementById("hozon");
const hozonhyouzi = document.getElementById("PictureWindow");
const toziru = document.getElementById("CButton");
const StopS = document.getElementById("body");
const originSize = document.getElementById("originSize");
let newGazou = "";
let sdwidth = 3024;
let haba;
let takasa;
let heikinnAll = 0;
let R = [];
let G = [];
let B = [];
let newR = [];
let newG = [];
let newB = [];
let H = [];
let S = [];
let V = [];
let settingW;
let settingH;
let originW;
let originH;
let changeOK = false;

function konnitiha() {
    if (newGazou == "") {
        window.alert("画像が選択されていません。画像を選択してからやり直してください。");
    }
    else {
        changeOK = true;
        settingW = newPicture.width;
        settingH = newPicture.height;

        //secondPicturue.src = newGazou;
        haba = newPicture.naturalWidth;
        takasa = newPicture.naturalHeight;
        if (haba < sdwidth) {
            newPicture.width = haba;
        }
        else {
            newPicture.width = sdwidth;
        }

        changePicture.width = newPicture.width;
        changePicture.height = newPicture.height;
        con.drawImage(newPicture, 0, 0, changePicture.width, changePicture.height,);
        Gensyoku1(changePicture, changePicture.width, changePicture.height);
        var newSrc = changePicture.toDataURL();
        secondPicturue.src = newSrc;
        secondPicturue.width = settingW;
        //changePicture.width = settingW;
        //changePicture.height = settingH;
        //changePicture.style.display = "none";
        newPicture.width = settingW;
    }

}

function Gensyoku1(cd, wLen, hLen) { //cdはcanvas digit の略である
    R = [];
    G = [];
    B = [];
    H = [];
    S = [];
    V = [];
    newR = [];
    newG = [];
    newB = [];
    let ookisa = 130;  //130
    let pd = con.getImageData(0, 0, wLen, hLen); //pd　は pixel data の略
    //makeRGB(pd);
    makeBW(pd);
    RGB2HSV(R, G, B);
    //kyoutyou();
    reduceV();
    HSV2RGB(H, S, V);
    //newR = R;
    //newG = G;
    //newB = B;
    for (let i = 0; i <= pd.data.length; i += 4) {
        if (newR[i / 4] + newG[i / 4] + newB[i / 4] <= ookisa * 3) {
            pd.data[i] = 0;
            pd.data[i + 1] = 0;
            pd.data[i + 2] = 0;
        }
        else {
            pd.data[i] = 255;
            pd.data[i + 1] = 255;
            pd.data[i + 2] = 255;
        }


        /*if (newR[i/4] <= ookisa){
            pd.data[i] = 0;
        }
        else{
            pd.data[i] = 255;
        }
        if (newG[i/4] <= ookisa){
            pd.data[i + 1] = 0;
        }
        else{
            pd.data[i + 1] = 255;
        }
        if (newB[i/4] <= ookisa){
            pd.data[i + 2] = 0;
        }
        else{
            pd.data[i + 2] = 255;
        }
        /*if (newR[i/4] + newG[i/4] + newB[i/4] <= ookisa * 3)
        
        if (newR[i/4] <= ookisa){
            pd.data[i] = 0
            pd.data[i + 1] = 0;
            pd.data[i + 2] = 0;

        }
        else{
            pd.data[i] = 255;
            pd.data[i + 1] = 255;
            pd.data[i + 2] = 255;
        }
        else{
            pd.data[i] = 255;
        }
        if (newG[i/4] <= ookisa){
            pd.data[i + 1] = 0;
        }
        else{
            pd.data[i + 1] = 255;
        }
        if (newB[i/4] <= ookisa){
            pd.data[i + 2] = 0;
        }
        else{
            pd.data[i + 2] = 255;
        }*/

        //pd.data[i] = newR[i/4]
        //pd.data[i + 1] = newG[i/4];
        //pd.data[i + 2] = newB[i/4]; 
    }
    con.putImageData(pd, 0, 0);
}

function makeRGB(pd) {
    for (let i = 0; i <= pd.data.length; i += 4) {
        R.push(pd.data[i]);
        G.push(pd.data[i + 1]);
        B.push(pd.data[i + 2]);
    }
}

function makeBW(pd) {
    for (let i = 0; i <= pd.data.length; i += 4) {
        let heikinn = (pd.data[i] + pd.data[i + 1] + pd.data[i + 2]) / 3
        R.push(heikinn);
        G.push(heikinn);
        B.push(heikinn);
    }
}

function kyoutyou() {
    let originColor = H;
    let rangeColor = 40;
    let memoryN = haba / 5;
    let memoryT = takasa;
    let memoryL = [];
    for (let i = 0; i <= takasa; i++) { //二次元配列に、左上から順にx軸方向に走査するイメージ
        for (let j = 0; j <= haba; j++) {
            if (memoryL == []) { //memoryLが空、つまり一番最初か
                momoryL.push(j);
            }
            else {
                if (originColor[j + i * haba] >= originColor[(j + i * haba) - 1] - rangeColor && originColor[j + i * haba] <= originColor[(j + i * haba) - 1] + rangeColor) {
                    memoryL.push(j);
                }
                else {
                    if (memoryL.length < memoryN) {
                        memoryL.forEach(function (digit) {
                            originColor[i * haba + digit] = 0;
                        })
                    }
                    memoryL = []
                    memoryL.push(j)
                }
            }
        }
        memoryL = []
    }
    R = originColor; //グレースケール前提の話。
    G = originColor;
    B = originColor;
}

function reduceV() {
    let g = [0, 100, 255]; //グルーピングの基準となる色を格納するためのリスト 真ん中の初期値は100 黒が白くなる問題で調整すべき値はこの値である
    //let g_zahyou = [[],[]]; //グルーピングした色の座標を格納するためのリスト。リストのリストの形で中に値を格納する
    //let g_value = [[],[]];
    //let g_finish = [];
    let g_v = [0, 255];
    //let kizyun = 10; //グルーピングの際の色の範囲。これを大きくすればグループに入れる基準が緩くなる
    let Nagasa = 0; //グループの数
    //let oldlen = 0; //gの長さを管理する変数。newとの比較に用いる。
    //let newlen = 0; //gの長さを管理する変数。oldと比較し変化があれば、新たな値が追加されたということが分かる
    //let nnc = True; //新しい色がなかったことを表す。Falseの時に、gに新たな値を追加する
    let digit = 0;
    Nagasa = g.length - 2;
    let min = 0;
    let big = 0;

    V.forEach(function (v_value) {
        for (let k = 0; k <= Nagasa; k++) {
            min = g[k]
            big = g[k + 1]
            if (v_value < big && v_value >= min) {
                V[digit] = g_v[k]
            }
        }
        if (v_value == 255) {
            V[digit] = 255
        }
        digit++;
    })
}

function RGB2HSV(r, g, b) {
    for (let i = 0; i <= r.length; i++) {
        //RGBからHを求める
        let max;
        let min;
        if (r[i] == g[i] && r[i] == b[i]) {
            H.push(0);
            max = r[i];
            min = r[i];
        }
        else if (r[i] <= g[i] && r[i] <= b[i]) {
            if (g[i] >= b[i]) {
                max = g[i];
            }
            else {
                max = b[i];
            }
            min = r[i];
            H.push(60 * ((b[i] - g[i]) / (max - min)) + 180);
        }
        else if (g[i] <= r[i] && g[i] <= b[i]) {
            if (r[i] >= b[i]) {
                max = r[i];
            }
            else {
                max = b[i];
            }
            min = g[i];
            H.push(60 * ((r[i] - b[i]) / (max - min)) + 300);
        }
        else if (b[i] <= r[i] && b[i] <= g[i]) {
            if (r[i] >= g[i]) {
                max = r[i];
            }
            else {
                max = g[i];
            }
            min = b[i];
            H.push(60 * ((g[i] - r[i]) / (max - min)) + 60);
        }

        if (H[i] < 0 || H[i] > 360) {
            H[i] -= 360;
        }

        //RGBからSを求める
        //公式はmaxで割っているが、値が0,0,0の場合はこれではエラーになってしまう。そもそも、値がすべて0の場合は、hsvもすべて0にするか、以下のようにif文で分岐を作り、0で割らないようにする必要がある。
        if (max != 0) {
            S.push((max - min) / max * 255);
        }
        else {
            S.push(0);
        }
        //Sの値は、整数にするべきか...いや、このままでいいだろう

        //RGBからVを求める
        V.push(max);


    }
}

function HSV2RGB(h, s, v) {
    for (let i = 0; i <= h.length; i++) {
        let max;
        let min;
        //まず、彩度(s)と明度(v)から、最大値と最小値を求める
        max = v[i];
        min = max - ((s[i] / 255) * max);

        //Hの値によって、変換式が変わるので、if文を組む
        if (h[i] >= 0 && h[i] <= 60) {
            newR.push(max);
            newG.push((h[i] / 60) * (max - min) + min);
            newB.push(min);
        }
        else if (h[i] > 60 && h[i] <= 120) {
            newR.push(((120 - h[i]) / 60) * (max - min) + min);
            newG.push(max);
            newB.push(min);
        }
        else if (h[i] > 120 && h[i] <= 180) {
            newR.push(min);
            newG.push(max);
            newB.push(((h[i] - 120) / 60) * (max - min) + min);
        }
        else if (h[i] > 180 && h[i] <= 240) {
            newR.push(min);
            newG.push(((240 - h[i]) / 60) * (max - min) + min);
            newB.push(max);
        }
        else if (h[i] > 240 && h[i] <= 300) {
            newR.push(((h[i] - 240) / 60) * (max - min) + min);
            newG.push(min);
            newB.push(max);
        }
        else if (h[i] > 300 && h[i] <= 360) {
            newR.push(max);
            newG.push(min);
            newB.push(((360 - h[i]) / 60) * (max - min) + min);
        }
    }
}

atarasii.addEventListener("change", function (e) { //これはfileが変更されたときに発動する関数
    let file = e.target.files[0]; //おそらく、targetはunityでいうところのthisに近いもの。このイベントのオブジェクトから情報を取っているというだけの話
    let yomikomi = new FileReader();
    yomikomi.readAsDataURL(file);
    yomikomi.onload = function () { //ここが肝。onloadをかませないと、読み込みが終わらずに進行してしまい、値がnullになる
        if (yomikomi == null) {
            window.alert("画像が選択されていません");
        }
        else {
            newPicture.src = yomikomi.result;
            newGazou = yomikomi.result;
        }
    }

})

atarasiiC.addEventListener("change", function (e) { //これはfileが変更されたときに発動する関数
    let file = e.target.files[0]; //おそらく、targetはunityでいうところのthisに近いもの。このイベントのオブジェクトから情報を取っているというだけの話
    let yomikomi = new FileReader();
    yomikomi.readAsDataURL(file);
    yomikomi.onload = function () { //ここが肝。onloadをかませないと、読み込みが終わらずに進行してしまい、値がnullになる
        if (yomikomi == null) {
            window.alert("画像が選択されていません");
        }
        else {
            newPicture.src = yomikomi.result;
            newGazou = yomikomi.result;
        }
    }

})

fileUp.addEventListener("click", function (e) {
    atarasii.click();
})

cameraUp.addEventListener("click", function (e) {
    atarasiiC.click();
})

hozon.addEventListener("click", function (e) {
    if (changeOK == true){
        hozonhyouzi.style.display ="block";
        StopS.style.overflow = "hidden";
        originSize.src = newSrc;

    }
    else{
        window.alert("画像が加工されていません。")
    }
})

toziru.addEventListener("click", function (e) {
    hozonhyouzi.style.display = "none";//noneにすることで、非表示に
    StopS.style.overflow = "visible";//visibleにすることで、スクロールを可能に
})



/*function PictureHyouzi(){ //これは上記のプログラムの発動タイミングを、ボタンが押されたときに変えたもの
    let file = atarasii.files[0]; //input type = "file"から、fileの情報を取っているだけ。複数選択できる際は、for文を回してすべてのリストにアクセスすること
    let yomikomi = new FileReader();
    yomikomi.readAsDataURL(file);
    yomikomi.onload = function(){ //ここが肝。onloadをかませないと、読み込みが終わらずに進行してしまい、値がnullになる
        if (yomikomi == null)
        {
            window.alert("画像が選択されていません");
        }
        else{
            newPicture.src = yomikomi.result;
            newGazou = yomikomi.result;
        }
    }
}*/
