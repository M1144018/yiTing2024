let config = [
    {
        "level":"easy",
        "src":
            [
                {
                    image: "../assets/photo/easy/1.jpg",
                    text1: "2021年1月5日",
                    text2: "板橋夏慕尼",
                },
                {
                    image: "../assets/photo/easy/2.jpg",
                    text1: "2021年2月5日",
                    text2: "路地 氷の怪物",
                },
                {
                    image: "../assets/photo/easy/3.jpg",
                    text1: "2021年12月23日",
                    text2: "ABV 閣樓餐酒館",
                },
                {
                    image: "../assets/photo/easy/4.jpg",
                    text1: "2022年1月6日",
                    text2: "焼肉の名門 赤虎",
                },
                {
                    image: "../assets/photo/easy/5.jpg",
                    text1: "2022年8月12日",
                    text2: "長庚大學",
                },
                {
                    image: "../assets/photo/easy/6.jpg",
                    text1: "2023年1月5日",
                    text2: "東西匯歐陸料理",
                },
                {
                    image: "../assets/photo/easy/7.jpg",
                    text1: "2023年5月17日",
                    text2: "長庚大學",
                },
                {
                    image: "../assets/photo/easy/8.jpg",
                    text1: "2024年5月18日",
                    text2: "長庚大學",
                },
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