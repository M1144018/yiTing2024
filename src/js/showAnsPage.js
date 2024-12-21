let config = [
    {
        "level":"easy",
        "src":
            [
                {
                    image: "../assets/photo/easy/1.jpg",
                    text1: "文字組 1 - A",
                    text2: "文字組 1 - B",
                    text3: "文字組 1 - C"
                },
                {
                    image: "../assets/photo/easy/2.jpg",
                    text1: "文字組 2 - A",
                    text2: "文字組 2 - B",
                    text3: "文字組 2 - C"
                },
                {
                    image: "https://via.placeholder.com/300/7f7fff",
                    text1: "文字組 3 - A",
                    text2: "文字組 3 - B",
                    text3: "文字組 3 - C"
                }
            ]
    },
    {
        "level":"medium",
        "src":
            [
                {
                    image: "https://via.placeholder.com/300/ff7f7f",
                    text1: "文字組 1 - A",
                    text2: "文字組 1 - B",
                    text3: "文字組 1 - C"
                },
                {
                    image: "https://via.placeholder.com/300/7fff7f",
                    text1: "文字組 2 - A",
                    text2: "文字組 2 - B",
                    text3: "文字組 2 - C"
                },
                {
                    image: "https://via.placeholder.com/300/7f7fff",
                    text1: "文字組 3 - A",
                    text2: "文字組 3 - B",
                    text3: "文字組 3 - C"
                }
            ]
    },
    {
        "level":"hard",
        "src":
            [
                {
                    image: "https://via.placeholder.com/300/ff7f7f",
                    text1: "文字組 1 - A",
                    text2: "文字組 1 - B",
                    text3: "文字組 1 - C"
                },
                {
                    image: "https://via.placeholder.com/300/7fff7f",
                    text1: "文字組 2 - A",
                    text2: "文字組 2 - B",
                    text3: "文字組 2 - C"
                },
                {
                    image: "https://via.placeholder.com/300/7f7fff",
                    text1: "文字組 3 - A",
                    text2: "文字組 3 - B",
                    text3: "文字組 3 - C"
                }
            ]
    },
];

let systemLevel = 0;
let level ='';
let leveData ="";
let data;
let currentIndex = 0;

const urlParams = new URLSearchParams(window.location.search);

level = urlParams.get('level')


if(level=='easy'){
    systemLevel = 0;
}
else if(level=='medium'){
    systemLevel = 1;
}
else{
    systemLevel = 2;
}
levelData = config[systemLevel]
console.log("QQ",levelData.src[0])

data = levelData.src


// document.getElementById("prevBtn").addEventListener("click", showPrevious);
// document.getElementById("nextBtn").addEventListener("click", showNext);

// 初始化顯示第一組數據
updateContent();

// 觸控滑動事件處理
let startX = 0;

document.querySelector(".content-block").addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

document.querySelector(".content-block").addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) {
        // 左滑，顯示下一組
        showNext();
    } else if (endX - startX > 50) {
        // 右滑，顯示上一組
        showPrevious();
    }
});

const btn_next = document.getElementById("btn-next")
const btn_home = document.getElementById("btn-home")

if(systemLevel==2){
    btn_next.hidden=true
}

function updateContent() {
    const { image, text1, text2, text3 } = data[currentIndex];
    document.getElementById("image").src = image;
    document.getElementById("text1").textContent = text1;
    document.getElementById("text2").textContent = text2;
    // document.getElementById("text3").textContent = text3;
}

function showNext() {
    currentIndex = (currentIndex + 1) % data.length;
    updateContent();
}

function showPrevious() {
    currentIndex = (currentIndex - 1 + data.length) % data.length;
    updateContent();
}

function doJpNextGame(){
    let jpLevel="medium";
    if(systemLevel== 0){
        jpLevel = "medium";
    }
    else{
        jpLevel = "hard";
    }
    window.location.href = `../html/orderGame.html?level=${jpLevel}`;
}

function backToHomePage(){
    window.location.href = `../../index.html`;
}