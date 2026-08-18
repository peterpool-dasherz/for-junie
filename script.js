const startButton = document.getElementById("startButton");
const welcomeCard = document.querySelector(".welcome-card");

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
    </div>
    `;

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
        content = `
            <div class = "heart">💕</div>
            
            <p class = "small-text">
                lại đây coi!
            </p>
            
            <h1>think of this as a hug that i give you!</h1>
            
            <p class = "intro">
                ôm 1 cái thật chặt nèeeeeeeeee!!!
            </p>
            
            <div class = "feature-message">
                tui biết tui đang xa cô lắm, nhưng mà coi như cái này là 1 cái ôm thật chặt từ tui nhaaa!!! yêu cô lắm áaa!!!
            </div> `;
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
            <button class = "secondary-button" onclick = "showFeature('sweet')">
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

    // add + back button
    welcomeCard.innerHTML = `
        ${content}
        <button class = "back-button" onclick = "showMenu()">
            back button
        </button>
    `;
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