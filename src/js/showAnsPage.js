let config = [
    {
        "level":"easy",
        "src":
            [
                {
                    image: "../assets/photo/easy/1.jpg",
                    text1: "2021年1月5日",
                    text2: "【板橋】夏慕尼",
                },
                {
                    image: "../assets/photo/easy/2.jpg",
                    text1: "2021年2月5日",
                    text2: "【大安】路地 氷の怪物",
                },
                {
                    image: "../assets/photo/easy/3.jpg",
                    text1: "2021年12月23日",
                    text2: "【板橋】ABV 閣樓餐酒館",
                },
                {
                    image: "../assets/photo/easy/4.jpg",
                    text1: "2022年1月6日",
                    text2: "【信義】焼肉の名門 赤虎",
                },
                {
                    image: "../assets/photo/easy/5.jpg",
                    text1: "2022年8月12日",
                    text2: "【龜山】長庚大學",
                },
                {
                    image: "../assets/photo/easy/6.jpg",
                    text1: "2023年1月5日",
                    text2: "【礁溪】東西匯歐陸料理",
                },
                {
                    image: "../assets/photo/easy/7.jpg",
                    text1: "2023年5月17日",
                    text2: "【龜山】長庚大學",
                },
                {
                    image: "../assets/photo/easy/8.jpg",
                    text1: "2024年5月18日",
                    text2: "【龜山】長庚大學",
                },
            ]
    },
    {
        "level":"medium",
        "src":
            [
                {
                    image: "../assets/photo/medium/9.jpg",
                    text1: "2021年12月2日",
                    text2: "【中山】中山商圈",
                },
                {
                    image: "../assets/photo/medium/10.jpg",
                    text1: "2021年12月9日",
                    text2: "【信義】信義A8商圈",
                },
                {
                    image: "../assets/photo/medium/11.jpg",
                    text1: "2022年2月17日",
                    text2: "【士林】臺北燈節",
                },
                {
                    image: "../assets/photo/medium/12.jpg",
                    text1: "2022年2月24日",
                    text2: "【中壢】桃園老街溪燈節",
                },
                {
                    image: "../assets/photo/medium/13.jpg",
                    text1: "2022年11月22日",
                    text2: "【板橋】新北耶誕城",
                },
                {
                    image: "../assets/photo/medium/14.jpg",
                    text1: "2023年6月15日",
                    text2: "【彰化】有片森林「植一座咖啡館」",
                },
                {
                    image: "../assets/photo/medium/15.jpg",
                    text1: "2023年8月19日",
                    text2: "【松山】Roller 186",
                },
                {
                    image: "../assets/photo/medium/16.jpg",
                    text1: "2023年10月14日",
                    text2: "【松山】75度獴",
                },
            ]
    },
    {
        "level":"hard",
        "src":
            [
                {
                    image: "../assets/photo/hard/17o.jpg",
                    text1: "2020年8月20日",
                    text2: "【青埔】Xpark",
                },
                {
                    image: "../assets/photo/hard/18o.jpg",
                    text1: "2021年1月1日",
                    text2: "【信義】統一時代百貨",
                },
                {
                    image: "../assets/photo/hard/19o.jpg",
                    text1: "2021年4月2日",
                    text2: "【文山】木柵動物園",
                },
                {
                    image: "../assets/photo/hard/20o.jpg",
                    text1: "2021年11月4日",
                    text2: "【大園】桃園青埔萬聖城",
                },
                {
                    image: "../assets/photo/hard/21o.jpg",
                    text1: "2022年7月26日",
                    text2: "【基隆】八斗子高地",
                },
                {
                    image: "../assets/photo/hard/22o.jpg",
                    text1: "2022年8月11日",
                    text2: "【萬華】Makers'Base",
                },
                {
                    image: "../assets/photo/hard/23o.jpg",
                    text1: "2023年6月14日",
                    text2: "【南投】星月天空夜景",
                },
                {
                    image: "../assets/photo/hard/24o.jpg",
                    text1: "2023年6月29日",
                    text2: "【烏來】瀑布3號",
                },
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