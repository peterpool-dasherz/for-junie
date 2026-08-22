const startButton = document.querySelector("#startButton");
const welcomeCard = document.querySelector(".welcome-card");

const messageJar = {
    miss: {
        label: "when you miss me",
        messages: [
            "i miss you a lot too baby:<, nhưng mà hong sao, tui chờ cô được mòooo",
            "ráng lên nha, rồi mình lại gặp nhau thui nè khánh vy!!!!, this is just temporary, im stayin with u forevaaaa màaa!",
            "stay here for a bit if u need nha, i love you the mostest á công chúa!!!"
        ]
    },
    stressed: {
        label: "when you're stressed",
        messages: [
            "take a deep breath, u dont need to carry this alone dear:<",
            "tui có thể carry sự nặng nề đó với cô nè, hong ôm cô được bây giờ nên tui mong cô sẽ cảm nhận được sự ấm áp từ tui qua chỗ này nha:<",
            "thương lắm á:<, chạy về với tui khi mọi thứ nặng nề hơn 1 chút nhé:<",
            "hôm nay cô cố gắng rồi nè, em bé của anh giỏi lắm í!"
        ]
    },

    sleep: {
        label: "when you can't sleep",
        messages: [
            "thử tưởng tượng tui đang nằm cạnh cô i, mong là nó giúp cô ngủ dễ hơn í, tui yêu cô lắm công chúa cụa tui!!!",
            "ngủ i, mai còn dậy đi làm với đi học á, dậy rồi nhắn tui liền nha, yêu khánh vy!!!"
        ]
    },

    reassurance: {
        label: "when you need reassurance",
        messages: [
            "cô hong mất tui được đâu í, tui bám dai lắmmmmm!!",
            "tui pinky promise là yêu cô đến cuối cùng mà, hong cần phải nghi ngờ tình cảm tui đâu!!!",
            "i'd spend a lifetime to prove that i love you the most out of anything and anybody lun á:<",
            "hong ai yêu cô được như tui đâu tui hứa lun á!",
            "mốt về tui bù cho nha, tui thương, tui yêu cô lắm á:<<"
        ]
    },

    angry: {
        label: "when you're angry",
        messages: [
            "hong sao nè, nguôi giận i, ull be okayyyy!!!",
            "take a big deep breath, you don't have to tell me now, but just know im here to listen to u rant nè!!!",
            "biết là vợ tui đang khó chịu, lại đây tui ôm 1 cái để nguôi giận nè, yêu lắm íiii!!!"
        ]
    },

    motivation: {
        label: "when you need motivation",
        messages: [
            "to me, you're the goat á, hơn cả shai với cl16 lun ó:<",
            "i know u can do anything that life throws at u, and id always be the one who supports u!",
            "theres 7 billion people in the world, im one of your supporter",
            "if its reduced to 1000, im still one of them",
            "a 100? obv im one",
            "10? still is",
            "and if theres only one existing rn, im that one dear!",
            "your biggest glazer á!!! nhớ đó nha, yêu vợ iu cụa tui lắmmmm"
        ]
    },

    love: {
        label: "when you need to feel loved",
        messages: [
            "tui yêu cô nhiềuuuuuu ơiiiiii làaaaaa nhiềuuuuuuuuu, more than anything and anybody in this whole universe",
            "you're the best thing that ever happened to me á, i hope yk that nè:<",
            "you're my only exception and my main priority, i love you lots baby!!!!",
            "hong ai yêu cô nhiều như tui hết á, hứa nhunnnn",
            "anh yêu em nhiều nhất cái vũ trụ nàyyyyyy!!!",
            "em là để anh thương, anh quan tâm, anh xót, anh lo và anh yêu:<",
            "cố lên nha, tui hong có đi đâu hết trơn á!!!!",
            "anh yêu emmmmm!!! <333"
        ]
    }
}

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



function animateCard() {
    welcomeCard.classList.remove("screen-enter");
    void welcomeCard.offsetWidth;

    welcomeCard.classList.add("screen-enter");
}

function getOptimizedPhotoPath(photoPath) {
    return photoPath.replace(
        "assets/images/",
        "assets/images/optimized/"
    );
}

function handlePhotoError(image) {
    image.classList.add("image-failed");
    image.alt = "ảnh lỗi ùi, để anh add lại nhen!!";
    const photoCard = image.closest(".photo-card");
    if (photoCard) {
        photoCard.classList.add("photo-unavailable");
        photoCard.disabled = true;
    }
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
        <button class = "menu-button jar-button" data-feature = "messageJar">
            🫙
            <span>message jar!</span>
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
        const photos = siteContent?.photos;
        if (!photos) {
            content = `
                <div class = "heart">📷</div>
                <h1>ảnh nè!</h1>
                <div class = "feature-message" aria-live = "polite">
                    its loadinggg, chờ chút ii!
                </div>
            `;
        } else {
            const photoGallery = photos.items.map((photo, index) => `
                <button
                    class = "photo-card"
                    type = "button"
                    aria-label = "Open ${photo.alt || `memory ${index + 1}`}"
                    data-photo = "${photo.src}"
                >
                    <img
                        src = "${getOptimizedPhotoPath(photo.src)}"
                        alt = "${photo.alt || `memory ${index + 1}`}"
                        loading = "lazy"
                        onerror = "handlePhotoError(this)"
                    >
                    ${
                        photo.caption
                            ? `<span class = "photo-caption">${photo.caption}</span>`
                            : ""
                    }
                </button>
            `).join("");

            content = `
                <div class = "heart">📷</div>
                <p class = "small-text">${photos.eyebrow}</p>
                <h1>${photos.title}</h1>
                <p class = "gallery-intro">${photos.intro}</p>
                <div class = "photo-gallery">
                    ${photoGallery}
                </div>
                <p class = "gallery-note">${photos.note}</p>
            `;
        }
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

    // message jar

    if (feature === "messageJar") {
        const jarSituations = Object.entries(messageJar)
            .map(([key, situation]) => `
                <button
                    class = "jar-situation"
                    type = "button"
                    data-situation = "${key}"
                >
                    ${situation.label}
                </button>
            `).join("");
        
        content = `
            <div class = "heart">🫙</div>
            <p class = "small-text">
                open this nhaaaa!!!
            </p>
            <h1>message jar</h1>
            <p class = "gallery-intro">
                chọn cái nào fit nha vợ iu ơi
            </p>
            <div class = "jar-situations">
                ${jarSituations}
            </div>
            <div
                class = "jar-message"
                id = "jarMessage"
                aria-live = "polite"
            >
                chọn 1 cái ở trên đi nè!
            </div>
        `;
    }


    // add + back button
    welcomeCard.innerHTML = `
        ${content}
        <button
            class = "back-button"
            id = "backButton"
            type = "button"
            aria-label = "Return to the menu"
        >
            về menu lại nè!
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
            const triggerButton = this;
            const image = this.querySelector("img");
            const lightbox = document.createElement("div");

            lightbox.className = "photo-lightbox";
            lightbox.setAttribute("role", "dialog");
            lightbox.setAttribute("aria-modal", "true");
            lightbox.setAttribute("aria-label", "Expanded photo");

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
            const closeButton = lightbox.querySelector(".lightbox-close");
            closeButton.focus();
            requestAnimationFrame (() => {
                lightbox.classList.add("is-open");
            });
            const closeLightbox = () => {
                lightbox.remove();
                document.removeEventListener("keydown", closeOnEscape);
                triggerButton.focus();
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
                }
            };
            document.addEventListener("keydown", closeOnEscape);
        });
    });
    const jarSituationButtons = document.querySelectorAll(".jar-situation");
    const jarMessage = document.querySelector("#jarMessage");

    jarSituationButtons.forEach(button => {
        button.addEventListener("click", function () {
            const situation = messageJar[this.dataset.situation];
            const randomMessage =
                situation.messages[
                    Math.floor(Math.random() * situation.messages.length)
                ];
            jarMessage.textContent = randomMessage;
            jarMessage.classList.remove("jar-message-pop");
            void jarMessage.offsetWidth;
            jarMessage.classList.add("jar-message-pop");
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