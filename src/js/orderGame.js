
let config = [
    {
        "model":"easy",
        "ans":['1','2','3','4','5','6','7','8','9','10'],
        "src": [
            { "img": "https://pbs.twimg.com/profile_images/1701878932176351232/AlNU3WTK_400x400.jpg", "order": 1 },
            { "img": "", "order": 2 },
            { "img": "", "order": 3 },
            { "img": "", "order": 4 },
            { "img": "", "order": 5 },
            { "img": "", "order": 6 },
            { "img": "", "order": 7 },
            { "img": "", "order": 8 },
          ],
        "key": 7
    
    },
    {
        "model":"medium",
        "ans":['1','2','3','4','5','6','7','8','9','10'],
        "src": [
            { "img": "", "order": 1 },
            { "img": "", "order": 2 },
            { "img": "", "order": 3 },
            { "img": "", "order": 4 },
            { "img": "", "order": 5 },
            { "img": "", "order": 6 },
            { "img": "", "order": 7 },
            { "img": "", "order": 8 },
          ],
        "key": 3
    
    },
    {
        "model":"hard",
        "ans":[1,2,3,4,5,6,7,8,9,10],
        "src": [
            { "img": "", "order": 1 },
            { "img": "", "order": 2 },
            { "img": "", "order": 3 },
            { "img": "", "order": 4 },
            { "img": "", "order": 5 },
            { "img": "", "order": 6 },
            { "img": "", "order": 7 },
            { "img": "", "order": 8 },
          ],
        "key": 5
    
    }
]

let clickOrder = []; // 用來紀錄點擊順序的陣列
let systemLevel = 0;
let level ='';
let leveData ="";

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);

    // 獲取單個參數
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
    leveData = config[systemLevel]

    const cardContainer = document.getElementById("card-container");

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // 隨機索引
            [array[i], array[j]] = [array[j], array[i]];  // 交換元素
        }
    }
    
    // 先打亂 leveData.src
    shuffleArray(leveData.src);

    leveData.src.forEach(item => {
        const div = document.createElement("div");
        div.className = "card";
        div.setAttribute("cardOrder", item.order); // 將 order 存為 data attribute

        const img = document.createElement("img");
        img.src = item.img;
        img.alt = `Image ${item.order}`;

        div.appendChild(img);
        cardContainer.appendChild(div);
    });
    const longPressDuration = 500;
    let timer;
    let cards = document.querySelectorAll('.card');
    // 為每張卡牌添加點擊事件
    cards.forEach(card => {
        const img = card.querySelector("img");

        card.addEventListener("contextmenu", (e) => {
            e.preventDefault();
        });
        
        card.addEventListener("touchstart", () => {
            timer = setTimeout(() => {
                img.classList.add("zoom"); // 加入放大效果
            },longPressDuration)
        });

        card.addEventListener("touchend", () => {
            clearTimeout(timer)
            img.classList.remove("zoom"); // 移除放大效果
        });

        card.addEventListener("touchcancel", () => {
            clearTimeout(timer)
            img.classList.remove("zoom"); // 確保意外情況下也移除
        });
        card.addEventListener('click', () => {
            const cardNumber = card.getAttribute("cardOrder");
            console.log("AA",cardNumber)
            const orderIndex = clickOrder.indexOf(cardNumber);

            if (orderIndex === -1) {
                // 如果卡片還沒有被點擊過，增加到點擊順序中
                clickOrder.push(cardNumber);
                updateCardOrderLabels();
            } else {
                // 如果卡片已經被點擊過，從順序中移除
                clickOrder.splice(orderIndex, 1);
                updateCardOrderLabels();
            }

            // 添加 "jump" class 進行跳動動畫
            card.classList.add('jump');

            // 等動畫結束後移除 "jump" class

            setTimeout(() => {
                card.classList.remove('jump');
            }, 500);
        });
        // card.addEventListener("touchstart", () => {
        //     timer = setTimeout(() => {
        //         console.log("Long press detected on touch!");
        //     }, longPressDuration);
        // });
        // card.addEventListener("touchend", () => {
        //     clearTimeout(timer)
        //     console.log("touch End!!")
        // });
    });

    const img_refresh = document.getElementById("img-refresh")
    const img_present = document.getElementById("img-present")
    if(systemLevel==2){
        img_present.hidden = false
        img_refresh.hidden = true
    }
});

// 更新卡片上的順序標籤
function updateCardOrderLabels() {
    let cards = document.querySelectorAll('.card');
    console.log(clickOrder)
    cards.forEach(card => {
        const cardNumber = card.getAttribute("cardOrder");
        const orderIndex = clickOrder.indexOf(cardNumber);

        // 如果卡片在點擊順序中，顯示標籤
        if (orderIndex !== -1) {
            let orderLabel = card.querySelector('.order-label');
            if (!orderLabel) {
                // 如果沒有標籤，新增標籤
                orderLabel = document.createElement('div');
                orderLabel.classList.add('order-label');
                card.appendChild(orderLabel);
            }
            // 更新標籤內容
            orderLabel.textContent = orderIndex + 1;
        } else {
            // 如果卡片不在點擊順序中，移除標籤
            const orderLabel = card.querySelector('.order-label');
            if (orderLabel) {
                card.removeChild(orderLabel);
            }
        }
    });
}

function backToHomePage(){
     window.location.href = `../../index.html`;
}

function doRefreshOrderList() {
    clickOrder = [];
    let ansContainer = document.getElementById("answer-container");
    ansContainer.hidden = true
    let cards = document.querySelectorAll('.card');
    
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('jump');
            
            setTimeout(() => {
                card.classList.remove('jump');
            }, 500); // 跳動動畫持續時間
        }, index * 100); // 每張卡片延遲時間依次增加
    });

    setTimeout(() => {
        updateCardOrderLabels();
    }, cards.length * 100); // 確保所有卡片跳完後再更新標籤
}

function checkAnswer() {

    if (clickOrder.length !== 10 || leveData.ans.length !== 10) {
        alert("排順序要每個都按挖!");
    }
    else{
        let diffNumber = 0;
        let diffIndex = 10;
        for (let i = 0; i < 10; i++) {
            if (clickOrder[i] !== leveData.ans[i]) {
                diffNumber++;
                diffIndex = diffIndex < i ? diffIndex:i;
            }
        }
        let ansLegend = document.getElementById("ans-legend");
        let ansTextFirst = document.getElementById("ans-textFirst");
        let ansTextSecond = document.getElementById("ans-textSecond");
        let ansContainer = document.getElementById("answer-container");

        let btnAgain = document.getElementById("btn-again");
        let btnHome = document.getElementById("btn-home");
        let btnPicture = document.getElementById("btn-picture");
        ansContainer.hidden = false

        if(diffNumber == 0){
            btnAgain.hidden = true;
            btnPicture.hidden = false;
            ansLegend.innerText = "全部答對了~~"; 
            ansTextFirst.innerText = `怡庭太厲害了!`; 
            ansTextSecond.innerText = `第${systemLevel+1}個密碼為【${leveData.key}】`; 

        }
        else{
            btnAgain.hidden = false;
            btnPicture.hidden = true;
            ansLegend.innerText = "答錯了~~~~再加油一下!!!"; 
            ansTextFirst.innerText = `答錯了:${diffNumber}個順序!`; 
            ansTextSecond.innerText = `從第:${diffIndex+1}個開始錯的!`; 
        }
    }

}

function nextBtnClick(){
    doJpAnsPage(level);
}

function doJpAnsPage(level){
    setTimeout(() => {
        window.location.href = `../html/showAnsPage.html?level=${level}`;
    },800)
}

