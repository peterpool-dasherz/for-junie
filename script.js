const startButton = document.querySelector("#startButton");
const welcomeCard = document.querySelector(".welcome-card");

let hugCount = 0;

function animateCard() {
    welcomeCard.classList.remove("screen-enter");
    void welcomeCard.offsetWidth;

    welcomeCard.classList.add("screen-enter");
}

function showMenu() {
    welcomeCard.innerHTML = `
    <div class = "heart">🩷</div>
    
    <p class = "small-text">
        đây là vài thứ tui làm nè!
    </p>
    
    <h1>coi qua nha!</h1>
    
    <p class = "intro">
        hong biết để cái gì nên đại đại đi
    </p>
    
    <div class = "menu">
        <button class = "menu-button" data-feature = "hug">
            🥹
            <span>cần 1 cái ôm!</span>
        </button>

        <button class = "menu-button" data-feature = "sweet">
            😊
            <span>đồ ngọt nè!</span>
        </button>

        <button class = "menu-button" data-feature = "miss">
            🥺
            <span>nhớ tui hả?! thì bấm dô đây!</span>
        </button>

        <button class = "menu-button" data-feature = "sleep">
            🌙
            <span>hong ngủ được thì dô đây!</span>
        </button>

        <button class = "menu-button" data-feature = "photos">
            😉
            <span>ảnh nè!</span>
        </button>

        <button class = "menu-button" data-feature = "reminders">
            🩷
            <span>reminders!</span>
        </button>

        <button class = "menu-button" data-feature = "motivation">
            🫡
            <span>need me to be your hype man?</span>
        </button>

        <button class = "menu-button attention-button" data-feature = "attention">
            🥺 
            <span>em cần anh cơ!</span>
        </button>
    </div>
    `;
    animateCard();
    addMenuListeners();
}

function addMenuListeners() {
    const menuButtons = document.querySelectorAll(".menu-button");
    menuButtons.forEach(button => {
        button.addEventListener("click", function () {
            const feature = this.dataset.feature;
            showFeature(feature);
        });
    });
}

function showFeature(feature) {
    let content = "";
    
    // hug
    if (feature === "hug") {
        hugCount++;
        const hugMessage = "tui biết tui đang xa cô lắm, nhưng mà coi như cái này là 1 cái ôm thật chặt từ tui nhaaa!!! yêu cô lắm áaa!!!";
        content = `
            <div class = "hug-animation">
                <span>ôm nèeee</span>
            </div>
            <div class = "heart">💕</div>
            
            <p class = "small-text">
                lại đây coi!
            </p>
            
            <h1>think of this as a hug that i give you!</h1>
            
            <p class = "intro">
                ôm 1 cái thật chặt nèeeeeeeeee!!!
            </p>
            
            <div class = "feature-message">
                ${hugMessage}
            </div>
            <p class = "hug-counter">
                ôm ${hugCount} lần ời nèeeee!!!
            </p>
            <button class = "secondary-button" id = "hugAgainButton">
                ôm thêm cái nè!
            </button>
        `;
    }

    // đồ ngọt
    if (feature === "sweet") {
        const messages = [
            "cô là điều tuyệt vời nhất xảy ra với tui đó biết honggg",
            "tui yêu cô, thương cô nhiều lắm đóoooo!!!",
            "phải nhớ là tui luôn ở đây với cô nghe chưa!! cô hong có mất tui đâuuuu!",
            "i love you the mostest of the most to the power of infinity!!!"
        ];

        const randomMessage = 
            messages[Math.floor(Math.random() * messages.length)];
        content = `
            <div class = "heart">💌</div>
            <p class = "small-text">
                something sweet for you nè!!!
            </p>
            <h1>cho cô nè!!!</h1>
            <div class = "feature-message">
                ${randomMessage}
            </div>
            <button class = "secondary-button" id = "sweetAgainButton">
                thêm nè!!!
            </button>
        `;
    }

    // miss me?
    if (feature === "miss") {
        content = `
            <div class = "heart">🥺</div>
            <p class = "small-text">
                ooh... nhớ tui rồi hả...
            </p>
            <h1>biết gì hong?? tui cũng nhớ cô lắm áa!</h1>
            <div class = "feature-message">
                nhớ thật là nhiều!
                <br><br>
                dù bọn mình hong cạnh nhau bây giờ, cô luôn là người tui giữ trong tim á!!
                <br><br>
                ráng lên nha! tháng 11 về tui bám không buông luôn, 
                like a backpack í, 7 ngày gặp 10 lần luôn chứ ở đó mà 2 ngày 1 tuần là nhiều, 
                hứ! nhớ chết đi được í!
            </div>
        `;
    }

    // can't sleep?

    if (feature === "sleep") {
        content = `
            <div class = "heart">🌙</div>
            <p class = "small-text">
                hong ngủ được thì vô đây nè!
            </p>
            <h1>cố mà ngủ đi, tui lo á</h1>
            <div class = "feature-message">
                tưởng tượng là tui đang nằm cạnh cô và ôm cô nè
                ngủ ngon nhé junie cụa tui!!! công chúa cụa tui, tui thương lắm á!! ngủ đi nhen!
            </div>
         `;
    }

    // photos!

    if (feature === "photos") {
        content = `
            <div class = "heart">📷</div>
            <p class = "small-text">
                memories of us!
            </p>
            <h1>ảnh nè!</h1>
            <div class = "feature-message">
                lát tui bỏ sau nha, its gonna come soon!
                <br><br>
                <small>
                    coming soon chat
                </small>
            </div>
        `;
    }

    // reminders!

    if (feature === "reminders") {
        content = `
            <div class = "heart">🩷</div>
            <p class = "small-text">
                just in case u forget
            </p>
            <h1>reminders</h1>
            <div class = "feature-message">
                tui yêu cô nhiều nhất nèeee!!!
                <br><br>
                tui yêu cô nhiều hơn bất kì ai và thứ gì trên đời nàyyyy!!
                <br><br>
                và cô hong bao giờ phải nghi ngờ tình cảm của tui dành cho cô đâuuuu!!!
                <br><br>
                distance is just temporary, rồi mình sẽ được ở cạnh nhau tiếp nè!!!
                <br><br>
                cô hong có mất tui đâu, tui ở lại đến cuối với cô màaaa!!! hứa rồi á
                <br><br>
                and id say this an infinite amount of time, i love you the mostest of the most! 
                <br><br>
                <strong>
                    to the power of infinity!
                </strong>
            </div>
        `;
    }

    // motivation

    if (feature === "motivation") {
        const motivationMessages = [
            "u làm tốt lắm rồi í! don't push urself too hard nha!!!",
            "tui biết cô mệt, nhưng mà cô giỏi lắm í, ráng lên nha, tui ở đây mòooo!!!",
            "nếu hôm nay u thấy là u hong có sức, thì hãy nhớ là tui đang chờ cô để nghe cô rant nè!",
            "i am veri proud of u my dearest junie blehhhh!!! aint nobody is better than u á!",
            "i swear ur the goat, like deadass u are=))))), tui bị khùng á nhưng mà thats what i mean xin nhỗi hihiii yêu vl íiii"
        ];

        const randomMessage = 
            motivationMessages[
                Math.floor(Math.random() * motivationMessages.length)
            ];
        
        content = `
            <div class = "heart">🫡</div>
            <p class = "small-text">
                for when things get hard ạ
            </p>
            <h1>biggest glazer của u nè!</h1>
            <div class = "feature-message">
                ${randomMessage}
            </div>
            <button class = "secondary-button" id = "motivationAgainButton">
                cần thêm hảaa, đây nèee!
            </button>
        `;
    }

    // attention!

    if (feature === "attention") {
        content = `
            <div class = "heart">🥺</div>
            <p class = "small-text">
                u need me rồi hả?! bấm dô!
            </p>
            <h1>helloooo</h1>
            <div class = "feature-message">
                em bé cần mình rồi! có hết ở đây nè!
                <br><br>
                gọi tui liền đi! tui chờ nè!
            </div>
            <div class = "contact-buttons">
                <a
                    class = "contact-button"
                    href = "tel: +84359116670"
                >
                    call me here!!! even though u knew my number hihi để đó đó!
                </a>

                <a
                    class = "contact-button"
                    href = "https://www.instagram.com/nolimitpeter_/"
                    target = "_blank"
                    rel = "noopener noreferrer"
                >
                    ig dm của tui luôn mở mòoooooo!!!
                </a>
            </div>
        `;
    }

    // add + back button
    welcomeCard.innerHTML = `
        ${content}
        <button class = "back-button" id = "backButton">
            back button
        </button>
    `;
    animateCard();
    const backButton = document.querySelector("#backButton");
    backButton.addEventListener("click", function () {
        showMenu();
    });
    const hugAgainButton = document.querySelector("#hugAgainButton");
    if (hugAgainButton) {
        hugAgainButton.addEventListener("click", function () {
            showFeature("hug");
        });
    }
    const sweetAgainButton = document.querySelector("#sweetAgainButton");
    if (sweetAgainButton) {
        sweetAgainButton.addEventListener("click", function () {
            showFeature("sweet");
        });
    }
    const motivationAgainButton = document.querySelector("#motivationAgainButton");
    if (motivationAgainButton) {
        motivationAgainButton.addEventListener("click", function () {
            showFeature("motivation");
        });
    }
}

startButton.addEventListener("click", function () {
    welcomeCard.style.opacity = "0";
    welcomeCard.style.transform = "translateY(-20px)";
    setTimeout(() => {
        showMenu();
        welcomeCard.style.opacity = "1";
        welcomeCard.style.transform = "translateY(0)";
    
    }, 300);
});