const startButton = document.querySelector("#startButton");
const welcomeCard = document.querySelector(".welcome-card");

let hugCount = 0;

let siteContent = null;

async function loadSiteContent() {
    try {
        const response = await fetch("data/site-content.json");
        if (!response.ok) {
            throw new Error(
                `Could not load site content: ${response.status}`
            );
        }

        siteContent = await response.json();
        applyHomeContent();
    } catch (error) {
        console.error("Failed to load site content:", error);
    }
}

function applyHomeContent() {
    const home = siteContent.home;

    document.querySelector(".small-text").textContent = home.eyebrow;
    document.querySelector("h1").textContent = home.title;
    document.querySelector(".intro").textContent = home.intro;
    document.querySelector(".love-message").textContent = home.message;

    const bannerImage = document.querySelector(".home-photo-banner img");
    if (bannerImage) {
        bannerImage.src = home.bannerImage;
        bannerImage.alt = home.bannerAlt;
    }

    document.querySelector("#startButton").textContent = home.button;
}

const photoFiles = [
    "0283D1FE-01D5-4CEC-BFC4-F824D0D1C51A.JPG",
    "036A3711-3353-40A0-952A-35FBD0A41176.JPG",
    "06EDE733-CC4F-4467-A0AA-B39688282C9D.JPG",
    "0BC161CB-EF0B-4715-9A85-3D4D09484F37.JPG",
    "11BC886B-6F1A-4B77-AC7C-1D6ABC0D53FD.JPG",
    "28791C71-B2EF-4051-9C16-0653560B771C.JPG",
    "2E1AA16E-8910-4B8E-88B9-02B0BFF1F4C2.JPG",
    "35BAF841-8C90-49C6-917A-DCA4A3B2FD3E.JPG",
    "5FDBF4E3-D0AD-4F78-B51A-7476FCB12D6B.JPG",
    "602431D8-E176-4BE3-ACB6-45ADC64643D0.JPG",
    "62004986-39B8-41C6-8BDF-0EF69BA85104.JPG",
    "73342D91-5D9F-4D3A-BA45-71757FDE29D0.JPG",
    "778590B8-3559-4847-A2F6-CC5158DE0734.JPG",
    "7B5B37F4-4E5C-4328-9DB5-2E169F024B5F.JPG",
    "7F219F9F-4CA6-4192-BA22-DF05589FE616.JPG",
    "989FFF25-79C0-490E-82E9-5F9589FBC3BB.JPG",
    "A6CF8A48-24EE-4A9B-8101-249C883A93AF.JPG",
    "B9545158-9187-4311-959A-950B189E38C6.JPG",
    "C4D830A7-ED4F-47E9-A729-090CEB6DAE9D.JPG",
    "E2A251ED-3DA3-4D3C-803F-B20EDAD0D6BD.JPG",
    "E48E96B9-2138-4FDA-A36E-56E32B6D434A.JPG",
    "E6D3C405-8291-4159-8815-FEAE0ACBDE2C.JPG",
    "E8918D29-E1F0-4331-905C-B3DD88FBE95F.JPG",
    "EFF90954-BA58-4B53-AEB2-2845C5B6A9EB.JPG",
    "FullSizeRender 2.jpg",
    "FullSizeRender.jpg",
    "IMG_0400.jpg",
    "IMG_4876.JPG",
    "IMG_4877.JPG",
    "IMG_4882.JPG",
    "IMG_4911.JPG",
    "IMG_4942.JPG",
    "IMG_4993.JPG",
    "IMG_5006.JPG",
    "IMG_5091.JPG",
    "IMG_5096.JPG",
    "IMG_5099.JPG",
    "IMG_5122.JPG",
    "IMG_5172.JPG",
    "fqs 2026-07-03 1026238A53D1E2F106.JPG"
];

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
        const photoGallery = photoFiles.map((file, index) => `
        <button
            class = "photo-card"
            type = "button"
            data-photo = "${file}"
        >
            <img
                src = "assets/images/${file}"
                alt = "memory ${index + 1}"
                loading = "lazy"
            >
        </button>
        `).join("");


        content = `
            <div class = "heart">📷</div>
            <p class = "small-text">
                memories of us!
            </p>
            <h1>ảnh nè!</h1>
            <p class = "gallery-intro">
                bọn mình chưa có nhiều ảnh với nhau, nên tui coi như đây là chỗ store hết mọi thứ tụi mình có nha!!!
            </p>
            <div class = "photo-gallery">
                ${photoGallery}
            </div>
            <p class = "gallery-note">
                bấm dô đi đừng có nói cô xấu là được!
            </p>
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
    const photoCards = document.querySelectorAll(".photo-card");
    photoCards.forEach(card => {
        card.addEventListener("click", function () {
            const image = this.querySelector("img");
            const lightbox = document.createElement("div");
            lightbox.className = "photo-lightbox";
            lightbox.innerHTML = `
                <button
                    class = "lightbox-close"
                    type = "button"
                    aria-label = "Close photo"
                >
                    x
                </button>
                <img
                    src = "${image.src}"
                    alt = "${image.alt}"
                >
            `;
            document.body.appendChild(lightbox);
            requestAnimationFrame (() => {
                lightbox.classList.add("is-open");
            });
            const closeLightbox = () => {
                lightbox.remove();
            };
            lightbox.addEventListener("click", event => {
                if (
                    event.target === lightbox ||
                    event.target.classList.contains("lightbox-close")
                ) {
                    closeLightbox();
                }
            });
            const closeOnEscape = event => {
                if (event.key === "Escape") {
                    closeLightbox();
                    document.removeEventListener("keydown", closeOnEscape);
                }
            };
            document.addEventListener("keydown", closeOnEscape);
        });
    });
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

loadSiteContent();