const SUPABASE_URL = 
    "https://fivxqdrbdyvwuleafhgt.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = 
    "sb_publishable_Vc-1StuMqGnqUl5sMNePkg_MRDXHw7X";
const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);

function escapeHtml(value = "") {
    return String(value).replace(/[&<>"']/g, character => {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };

        return entities[character];
    });
}

function escapeAttribute(value = "") {
    return escapeHtml(value).replace(/`/g, "&#096;");
}

const startButton = document.querySelector("#startButton");
const welcomeCard = document.querySelector(".welcome-card");
let siteContent = {};
let hugCount = 0;
let messageJar = {
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
};

let reminders = [
    {
        icon: "💧",
        title: "drink some water!",
        text: "nhớ uống nước vô! anything but water hoài đi😠 tui lo đó, stay hydrated!!!"
    },
    {
        icon: "🍽️",
        title: "eat something!!!",
        text: "này nha, tui hong có bên cạnh cô bây giờ được, đừng có bỏ bữa, đã không ăn sáng thì lunch ăn cho đủ với đừng nhịn bữa tối, nhớ kiếm cái gì bỏ bụng đó:(, tui xót lắm:(("
    },
    {
        icon: "🔑",
        title: "itemsssss!!!",
        text: "nhớ cầm chìa khoá nhà và phòng, airpods, nếu lạnh thì cầm áo khoác chứ đừng có mặc của thằng nào đó 😠, về đây tui đưa áo tui cho, hứ!"
    }
];

async function loadMessageJarFromDatabase() {
    const {data, error} = await supabaseClient
        .from("message_categories")
        .select(`
            name,
            label,
            messages (
                message
            )
        `)
        .order("id", {ascending: true});
    
    if (error) {
        throw error;
    }

    if (!data || data.length === 0) {
        return;
    }

    messageJar = Object.fromEntries(
        data.map(category => [
            category.name,
            {
                label: category.label,
                messages: (category.messages || []).map(item => item.message)
            }
        ])
    );
}

async function signUp(email, password) {
    const {data, error} = await supabaseClient.auth.signUp({
        email,
        password
    });

    if (error) {
        throw error;
    }

    return data;
}

async function signIn(email, password) {
    const {data, error} = 
        await supabaseClient.auth.signInWithPassword({
            email,
            password
        });

    if (error) {
        throw error;
    }

    return data;
}

async function sendPasswordReset(email) {
    const {error} = await supabaseClient.auth.resetPasswordForEmail(
        email,
        {
            redirectTo: `${window.location.origin}${window.location.pathname}`
        }
    );

    if (error) {
        throw error;
    }
}

async function updatePassword(newPassword) {
    const {error} = await supabaseClient.auth.updateUser({
        password: newPassword
    });

    if (error) {
        throw error;
    }
}

async function loadRemindersFromDatabase() {
    const {data, error} = await supabaseClient
        .from("reminders")
        .select("icon, title, description")
        .order("id", {ascending: true});
    
    if (error) {
        throw error;
    }

    if (!data || data.length === 0) {
        return;
    }

    reminders = data.map(reminder => ({
        icon: reminder.icon,
        title: reminder.title,
        text: reminder.description
    }));
}

async function loadPhotosFromDatabase() {
    const {data, error} = await supabaseClient
        .from("photos")
        .select("image_url, alt_text, caption")
        .order("id", {ascending: true});
    
    if (error) {
        throw error;
    }

    if (!data || data.length === 0) {
        return;
    }

    if (!siteContent.photos) {
        siteContent.photos = {};
    }

    siteContent.photos.items = data.map(photo => ({
        src: photo.image_url,
        alt: photo.alt_text,
        caption: photo.caption
    }));
}

async function loadWeeklyPhotoDumps() {
    const {data, error} = await supabaseClient
        .from("weekly_photo_dumps")
        .select(`
            id,
            week_start,
            title,
            note,
            weekly_photo_dump_items(
                id,
                image_url,
                alt_text,
                caption,
                sort_order
            )
        `)
        .order("week_start", {ascending: false});
    if (error) {
        throw error;
    }

    siteContent.weeklyDumps = (data || []).map(dump => ({
        ...dump,
        photos: (dump.weekly_photo_dump_items || [])
            .sort((a, b) => a.sort_order - b.sort_order)
    }));
}

async function signOut() {
    const {error} = await supabaseClient.auth.signOut();

    if (error) {
        throw error;
    }
}

async function getCurrentUser() {
    const {
        data: {user}
    } = await supabaseClient.auth.getUser();
    
    return user;
}

async function isAdmin() {
    const user = await getCurrentUser();
    
    if (!user) {
        return false;
    }

    const {data, error} = await supabaseClient
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();
    
    if (error) {
        console.error("Failed to check admin role:", error);
        return false;
    }

    return data.role === "admin";
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

        const errorMessage = document.createElement("p");

        errorMessage.className = "content-error";
        errorMessage.setAttribute("role", "alert");
        errorMessage.textContent = "chết ời lỗi ời, để tui sửa nha:("
        welcomeCard.appendChild(errorMessage);
    }
}

const siteContentReady = loadSiteContent();

async function checkAuth() {
    const user = await getCurrentUser();

    if (!user) {
        showLoginScreen();
        return;
    }

    try {
        await siteContentReady;
        await loadMessageJarFromDatabase();
        await loadRemindersFromDatabase();
        await loadPhotosFromDatabase();
        await loadWeeklyPhotoDumps();
    } catch (error) {
        console.error("Failed to load messages from database:", error);
    }

    await showPrivateApp(user);
}

supabaseClient.auth.onAuthStateChange((_event, session) => {
    if (_event === "PASSWORD_RECOVERY") {
        showPasswordResetScreen();
        return;
    }


    if (!session?.user) {
        showLoginScreen();
        return;
    }

    void (async () => {
        try {
            await siteContentReady;
            await loadMessageJarFromDatabase();
            await loadRemindersFromDatabase();
            await loadPhotosFromDatabase();
            await loadWeeklyPhotoDumps();
            await showPrivateApp(session.user);
        } catch (error) {
            console.error(
                "Failed to load messages from database:",
                error
            );
        }
    })();
});

checkAuth();

function showLoginScreen() {
    welcomeCard.innerHTML = `
        <div class = "heart">🔐</div>
        <p class = "small-text">
            just for us onlyyy!!!
        </p>
        <h1>private space</h1>
        <form id = "loginForm">
            <input
                id = "emailInput"
                type = "email"
                placeholder = "email"
                autocomplete = "email"
                required
            >
            <input
                id = "passwordInput"
                type = "password"
                placeholder = "password"
                autocomplete = "current-password"
                required
            >
            <button type = "submit">
                log in
            </button>
            <button
                id = "forgotPasswordButton"
                class = "text-button"
                type = "button"
            >
                quên password???
            </button>
            <button
                id = "signUpButton"
                class = "back-button"
                type = "button"
            >
                create account
            </button>
            <p
                id = "authMessage"
                class = "auth-message"
                role = "status"
                aria-live = "polite"
            ></p>
        </form>
    `;
    const loginForm = document.querySelector("#loginForm");
    const signUpButton = document.querySelector("#signUpButton");
    const authMessage = document.querySelector("#authMessage");
    const forgotPasswordButton = document.querySelector(
        "#forgotPasswordButton"
    );
    forgotPasswordButton.addEventListener("click", async () => {
        const email = document.querySelector("#emailInput").value;

        if (!email) {
            authMessage.textContent =
                "enter mail trước nè!!!";
            return;
        }
        authMessage.textContent = "sending reset email...";

        try {
            await sendPasswordReset(email);
            authMessage.textContent = 
                "check your email nha!!!";
        } catch (error) {
            authMessage.textContent = error.message;
        }
    });

    loginForm.addEventListener("submit", async event => {
        event.preventDefault();

        const email = document.querySelector("#emailInput").value;
        const password = document.querySelector("#passwordInput").value;

        authMessage.textContent = "logging in...";
        try {
                await signIn(email, password);
                authMessage.textContent = "";
        } catch (error) {
            authMessage.textContent = error.message;
        }
    });

    signUpButton.addEventListener("click", async () => {
        const email = document.querySelector("#emailInput").value;
        const password = document.querySelector("#passwordInput").value;

        if (!email || !password) {
            authMessage.textContent = 
                "nhập mail với pass nè!";
            return;
        }

        authMessage.textContent = "creating your account...";

        try {
            await signUp(email, password);
            authMessage.textContent = 
                "tạo được acc rồi nè, check mail nhaaa!!!"
        } catch (error) {
            authMessage.textContent = error.message;
        }
    });
}

function showPasswordResetScreen() {
    welcomeCard.innerHTML = `
        <div class = "heart">🔑</div>
        <p class = "small-text">
            make a new password ne!
        </p>
        <h1>reset password</h1>
        <form id = "resetPasswordForm">
            <input
                id = "newPasswordInput"
                type = "password"
                placeholder = "new password"
                autocomplete = "new-password"
                minlength = "6"
                required
            >
            <button type = "submit">
                save new password
            </button>
            <p
                id = "resetMessage"
                class = "auth-message"
                role = "status"
                aria-live = "polite"
            ></p>
        </form>
    `;

    const resetForm = document.querySelector("#resetPasswordForm");
    const newPasswordInput = document.querySelector("#newPasswordInput");
    const resetMessage = document.querySelector("#resetMessage");

    resetForm.addEventListener("submit", async event => {
        event.preventDefault();
        const newPassword = newPasswordInput.value;
        resetMessage.textContent = 
            "saving your new password...";
        try {
            await updatePassword(newPassword);
            resetMessage.textContent =
                "password updated rồi nha! use this one to log in từ giờ nhen!";
            setTimeout(() => {
                showLoginScreen();
            }, 1500);
        } catch (error) {
            resetMessage.textContent = error.message;
        }
    });
}

async function showPrivateApp(user) {
    const userIsAdmin = await isAdmin();
    const home = siteContent.home || {};
    welcomeCard.innerHTML = `
        <div class = "heart">🩷</div>
        <p class = "small-text">
            ${escapeHtml(home.eyebrow || "he nhô! welcome back!")}
        </p>
        <h1>${escapeHtml(home.title || "hello junieee!!!")}</h1>
        <p class = "intro">
            ${escapeHtml(home.intro || "nhớ tui thì ở đây xíu nè!")}
        </p>
        <div class = "home-photo-banner">
            <img
                src = "${escapeAttribute(home.bannerImage || "assets/images/FullSizeRender 2.jpg")}"
                alt = "${escapeAttribute(home.bannerAlt || "a photo of us")}"
            >
        </div>
        <button id = "continueButton" type = "button">
            enter our space!
        </button>
        ${
            userIsAdmin
                ? `
                    <button
                        id = "adminButton"
                        class = "secondary-button"
                        type = "button"
                    >
                        admin space
                    </button>
                `
                : ""
        }
        <button
            id = "logoutButton"
            class = "back-button"
            type = "button"
        >
            log out
        </button>
    `;

    document
        .querySelector("#continueButton")
        .addEventListener("click", () => {
            showMenu();
        });
    
    const adminButton = document.querySelector("#adminButton");

    if (adminButton) {
        adminButton.addEventListener("click", () => {
            showAdminDashboard();
        });
    }

    document
        .querySelector("#logoutButton")
        .addEventListener("click", async () => {
            try {
                await signOut();
            } catch (error) {
                console.error("Failed to log out:", error);
            }
        });
}

async function showAdminDashboard() {
    welcomeCard.innerHTML = `
        <div class = "heart">⚙️</div>
        <p class = "small-text">
            cái này chỉ có peter thấy thuiiii!!!
        </p>
        <h1>admin space</h1>
        <p class = "intro">
            manage reminders nè!
        </p>
        <form id = "reminderForm" class = "admin-form">
            <input
                id = "reminderId"
                type = "hidden"
            >
            <input
                id = "reminderIcon"
                type = "text"
                placeholder = "icon, like 💧"
                required
            >
            <input
                id = "reminderTitle"
                type = "text"
                placeholder = "reminder title"
                required
            >
            <textarea
                id = "reminderDescription"
                placeholder = "reminder description"
                rows = "4"
                required
            ></textarea>
            <button type = "submit">
                save reminder
            </button>
            <button
                id = "cancelReminderButton"
                class = "back-button"
                type = "button"
            >
                cancel
            </button>
            <p
                id = "adminMessage"
                class = "auth-message"
                role = "status"
                aria-live = "polite"
            ></p>
        </form>
        <div
            id = "reminderAdminList"
            class = "admin-content"
            aria-live = "polite"
        >
            loading reminders...
        </div>
        <button
            id = "messageManagerButton"
            class = "secondary-button"
            type = "button"
        >
            manage messages
        </button>
        <button
            id = "adminBackButton"
            class = "back-button"
            type = "button"
        >
            về lại welcome page
        </button>
    `;

    const reminderForm = document.querySelector("#reminderForm");
    const reminderId = document.querySelector("#reminderId");
    const reminderIcon = document.querySelector("#reminderIcon");
        const reminderTitle = document.querySelector("#reminderTitle");
        const reminderDescription = document.querySelector("#reminderDescription");
        const cancelReminderButton = document.querySelector("#cancelReminderButton");
    const adminMessage = document.querySelector("#adminMessage");
    const reminderAdminList = document.querySelector("#reminderAdminList");

    let remindersData = [];

    function clearReminderForm() {
        reminderForm.reset();
        reminderId.value = "";
        cancelReminderButton.hidden = true;
    }

    function renderReminders() {
        if (remindersData.length === 0) {
            reminderAdminList.innerHTML = `
                <p class = "admin-empty">
                    no reminders yet!
                </p>
            `;
            return;
        }
        reminderAdminList.innerHTML = remindersData.map(reminder => `
            <article class = "admin-section">
                <div class = "admin-reminder-heading">
                    <span aria-hidden = "true">
                        ${escapeHtml(reminder.icon || "📝")}
                    </span>
                    <h2>${escapeHtml(reminder.title)}</h2>
                </div>
                <p>${escapeHtml(reminder.description)}</p>
                <div class = "admin-actions">
                    <button
                        class = "edit-reminder-button"
                        type = "button"
                        data-reminder-id = "${escapeAttribute(reminder.id)}"
                    >
                        edit
                    </button>
                    <button
                        class = "delete-reminder-button"
                        type = "button"
                        data-reminder-id = "${escapeAttribute(reminder.id)}"
                    >
                        delete
                    </button>
                </div>
            </article>
            `).join("");

            document
                .querySelectorAll(".edit-reminder-button")
                .forEach(button => {
                    button.addEventListener("click", () => {
                        const reminder = remindersData.find(
                            item => item.id === Number(button.dataset.reminderId)
                        );

                        if (!reminder) {
                            return;
                        }
                        reminderId.value = reminder.id;
                        reminderIcon.value = reminder.icon || "";
                        reminderTitle.value = reminder.title;
                        reminderDescription.value = reminder.description;
                        cancelReminderButton.hidden = false;
                        reminderIcon.focus();
                    });
                });
            
                document
                    .querySelectorAll(".delete-reminder-button")
                    .forEach(button => {
                        button.addEventListener("click", async () => {
                            const shouldDelete = window.confirm(
                                "delete this reminder?"
                            );

                            if (!shouldDelete) {
                                return;
                            }

                            adminMessage.textContent = "deleting reminder...";
                            const {error} = await supabaseClient
                                .from("reminders")
                                .delete()
                                .eq("id", Number(button.dataset.reminderId));
                            
                            if (error) {
                                adminMessage.textContent = error.message;
                                return;
                            }
                            adminMessage.textContent = 
                                "reminder deleted!";
                            await loadAdminReminders();
                        });
                    });
    }

    async function loadAdminReminders() {
        const {data, error} = await supabaseClient
            .from("reminders")
            .select("id, icon, title, description")
            .order("id", {ascending: true});

        if (error) {
            throw error;
        }

        remindersData = data || [];
        renderReminders();
    }

    reminderForm.addEventListener("submit", async event => {
        event.preventDefault();

        const reminderData = {
            icon: reminderIcon.value.trim(),
            title: reminderTitle.value.trim(),
            description: reminderDescription.value.trim()
        };

        adminMessage.textContent = "saving reminder...";

        const editingId = Number(reminderId.value);
        const request = editingId
            ? supabaseClient
                .from("reminders")
                .update(reminderData)
                .eq("id", editingId)
            : supabaseClient
                .from("reminders")
                .insert(reminderData);

        const {error} = await request;

        if (error) {
            adminMessage.textContent = error.message;
            return;
        }

        adminMessage.textContent = editingId
            ? "reminder updated!"
            : "reminder added!";

        clearReminderForm();
        await loadAdminReminders();
        await loadRemindersFromDatabase();
    });

    cancelReminderButton.addEventListener("click", () => {
        clearReminderForm();
        adminMessage.textContent = "";
    });

    document
        .querySelector("#messageManagerButton")
        .addEventListener("click", () => {
            showMessageManager();
        });

    document
        .querySelector("#adminBackButton")
        .addEventListener("click", async () => {
            const user = await getCurrentUser();

            if (user) {
                await showPrivateApp(user);
            }
        });
    cancelReminderButton.hidden = true;
    
    try {
        await loadAdminReminders();
    } catch (error) {
        console.error("Failed to load admin data:", error);
        reminderAdminList.textContent = 
            "could not load the admin data right now:(";
    }
}

async function showMessageManager() {
    welcomeCard.innerHTML = `
        <div class = "heart">💌</div>
        <p class = "small-text">
            cái chỗ này chỉ có peter chỉnh được hoi!
        </p>
        <h1>message manager</h1>
        <p class = "intro">
            thêm message vô đúng categories nè!
        </p>
        <form id = "messageForm" class = "admin-form">
            <select id = "messageCategory" required>
                <option value = "">choose a category</option>
            </select>
            <textarea
                id = "messageText"
                placeholder = "write a message..."
                rows = "5"
                required
            ></textarea>
            <button type = "submit">
                add message
            </button>
            <p
                id = "messageAdminStatus"
                class = "auth-message"
                aria-live = "polite"
            ></p>
        </form>
        <div
            id = "messageAdminList"
            class = "admin-content"
            aria-live = "polite"
        >
            loading messages...
        </div>
        <button
            id = "messageManagerBackButton"
            class = "back-button"
            type = "button"
        >
            back to admin space
        </button>
    `;
    const categorySelect = 
        document.querySelector("#messageCategory");
    const messageForm = 
        document.querySelector("#messageForm");
    const messageText =
        document.querySelector("#messageText");
    const messageAdminStatus =
        document.querySelector("#messageAdminStatus");
    const messageAdminList =
        document.querySelector("#messageAdminList");
    
    let categories = [];
    let messages = [];

    async function loadMessageManagerData() {
        const {data, error} = await supabaseClient
            .from("message_categories")
            .select(`
                id,
                name,
                label,
                messages (
                    id,
                    message
                )
            `)
            .order("id", {ascending: true});
        
        if (error) {
            throw error;
        }

        categories = data || [];
        categorySelect.innerHTML = `
            <option value = "">choose a category</option>
            ${categories.map(category => `
                <option value = "${escapeAttribute(category.id)}">
                    ${escapeHtml(category.label)}
                </option>
            `).join("")}
        `;
        messages = categories.flatMap(category =>
            category.messages.map(message => ({
                ...message,
                categoryLabel: category.label
            }))
        );

        renderMessages();
    }

    function renderMessages() {
        if (messages.length === 0) {
            messageAdminList.innerHTML = `
                <p class = "admin-empty">
                    no messages yet!
                </p>
            `;
            return;
        }
        messageAdminList.innerHTML = messages.map(item => `
                <article class = "admin-section">
                    <p class = "message-category">
                        ${escapeHtml(item.categoryLabel)}
                    </p>
                    <p class = "admin-message-text">
                        ${escapeHtml(item.message)}
                    </p>
                    <button
                        class = "delete-message-button"
                        type = "button"
                        data-message-id = "${escapeAttribute(item.id)}"
                    >
                        delete
                    </button>
                </article>
            `).join("");

            document
                .querySelectorAll(".delete-message-button")
                .forEach(button => {
                    button.addEventListener("click", async () => {
                        const shouldDelete = window.confirm(
                            "delete this message?"
                        );

                        if (!shouldDelete) {
                            return;
                        }

                        messageAdminStatus.textContent = 
                            "deleting message...";
                        
                        const {error} = await supabaseClient
                            .from("messages")
                            .delete()
                            .eq(
                                "id",
                                Number(button.dataset.messageId)
                            );
                        
                        if (error) {
                            messageAdminStatus.textContent = error.message;
                            return;
                        }
                        messageAdminStatus.textContent = "message deleted ời!!!";

                        await loadMessageManagerData();
                        await loadMessageJarFromDatabase();
                    });
                });
    }
    
    messageForm.addEventListener("submit", async event => {
        event.preventDefault();

        const categoryId = Number(categorySelect.value);
        const message = messageText.value.trim();

        if (!categoryId || !message) {
            messageAdminStatus.textContent = 
                "choose a category and write a message!";
            return;
        }

        messageAdminStatus.textContent = 
            "saving message...";
        const {error} = await supabaseClient
            .from("messages")
            .insert({
                category_id: categoryId,
                message
            });
        
        if (error) {
            messageAdminStatus.textContent = error.message;
            return;
        }

        messageForm.reset();
        messageAdminStatus.textContent = "message được thêm rồi nè!";
        
        await loadMessageManagerData();
        await loadMessageJarFromDatabase();
    });

    document
        .querySelector("#messageManagerBackButton")
        .addEventListener("click", async () => {
            const user = await getCurrentUser();

            if (user) {
                await showAdminDashboard();
            }
        });
    
    try {
        await loadMessageManagerData();
    } catch (error) {
        console.error("Failed to load message manager:", error);

        messageAdminList.textContent = 
            "could not load messages right now ùi:("
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
    if (!photoPath || /^https?:\/\//i.test(photoPath)) {
        return photoPath;
    }

    if (!photoPath.startsWith("assets/images/")) {
        return photoPath;
    }
    
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

function formatWeeklyDumpDate(dateString) {
    if (!dateString) {
        return "";
    }

    const startDate = new Date(`${dateString}T00:00:00`);

    if (Number.isNaN(startDate.getTime())) {
        return "";
    }

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6);

    const startMonth = startDate.toLocaleDateString("en-US", {
        month: "long"
    });

    const endMonth = endDate.toLocaleDateString("en-US", {
        month: "long"
    });

    const startDay = startDate.getDate();
    const endDay = endDate.getDate();

    if (startMonth === endMonth) {
        return `${startMonth} ${startDay}-${endDay}`;
    }

    return `${startMonth} ${startDay} - ${endMonth} ${endDay}`;
}

function showWeeklyPhotoDump(dumpId) {
    const weeklyDumps = siteContent?.weeklyDumps || [];

    const currentIndex = weeklyDumps.findIndex(
        dump => String(dump.id) === String(dumpId)
    );

    if (currentIndex === -1) {
        return;
    }

    const dump = weeklyDumps[currentIndex];
    const photos = dump.photos || [];

    const previousDump = weeklyDumps[currentIndex + 1] || null;
    const nextDump = weeklyDumps[currentIndex - 1] || null;

    const photoGallery = photos.map((photo, index) => {
        const photoAlt =
            photo.alt_text || 
            `${dump.title || "weekly memory"} photo ${index + 1}`;
        
        return `
            <button
                class = "photo-card"
                type = "button"
                aria-label = "Open ${escapeAttribute(photoAlt)}"
                data-photo = "${escapeAttribute(photo.image_url)}"
            >
                <img
                    src = "${escapeAttribute(
                        getOptimizedPhotoPath(photo.image_url)
                    )}"
                    alt = "${escapeAttribute(photoAlt)}"
                    loading = "lazy"
                    onerror = "handlePhotoError(this)"
                >

                ${
                    photo.caption
                        ? `
                            <span class = "photo-caption">
                                ${escapeHtml(photo.caption)}
                            </span>
                        `
                        : ""
                }
            </button>
        `;
    }).join("");

    const weekDate = formatWeeklyDumpDate(dump.week_start);
    welcomeCard.innerHTML = `
        <div class = "heart">🗓️</div>
        <p class = "small-text">
            a little piece of our week!!!
        </p>
        <h1>
            ${escapeHtml(dump.title || "weekly photo dump")}
        </h1>

        ${
            weekDate
                ? `
                    <p class = "weekly-dump-date">
                        ${escapeHtml(weekDate)}
                    </p>
                `
                : ""
        }

        ${
            dump.note
                ? `
                    <p class = "gallery-intro">
                        ${escapeHtml(dump.note)}
                    </p>
                `
                : ""
        }

        ${
            photos.length > 0
                ? `
                    <div class = "photo-gallery">
                        ${photoGallery}
                    </div>
                `
                : `
                    <div class = "feature-message">
                        no photos in this dumpy yet:<br>
                        we'll add some in soon!!!
                    </div>
                `
        }

        <div class = "weekly-dump-navigation">
            ${
                previousDump
                    ? `
                        <button
                            id = "previousWeeklyDumpButton"
                            class = "secondary-button"
                            type = "button"
                        >
                            ← previous week
                        </button>
                    `
                    : ""
            }

            ${
                nextDump
                    ? `
                        <button
                            id = "nextWeeklyDumpButton"
                            class = "secondary-button"
                            type = "button"
                        >
                            next week →
                        </button>
                    `
                    : ""
            }
        </div>

        <button
            id = "weeklyDumpBackButton"
            class = "back-button"
            type = "button"
        >
            back to our photos!
        </button>
    `;

    animateCard();

    const backButton = 
        document.querySelector("#weeklyDumpBackButton");

    backButton.addEventListener("click", () => {
        showFeature("photos");
    });

    const previousButton =
        document.querySelector("#previousWeeklyDumpButton");
    
    if (previousButton) {
        previousButton.addEventListener("click", () => {
            showWeeklyPhotoDump(previousDump.id);
        });
    }

    const nextButton =
        document.querySelector("#nextWeeklyDumpButton");
    
    if (nextButton) {
        nextButton.addEventListener("click", () => {
            showWeeklyPhotoDump(nextDump.id);
        });
    }

    const photoCards =
        document.querySelectorAll(".photo-card");
    
    photoCards.forEach(card => {
        card.addEventListener("click", function () {
            const triggerButton = this;
            const image = this.querySelector("img");

            const lightbox =
                document.createElement("div");

            lightbox.className = "photo-lightbox";
            lightbox.setAttribute("role", "dialog");
            lightbox.setAttribute("aria-modal", "true");
            lightbox.setAttribute(
                "aria-label",
                "Expanded photo"
            );

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
            document.body.classList.add("lightbox-open");

            const closeButton =
                lightbox.querySelector(".lightbox-close");
            
            const closeLightbox = () => {
                lightbox.remove();
                document.body.classList.remove(
                    "lightbox-open"
                );

                document.removeEventListener(
                    "keydown",
                    closeOnEscape
                );

                triggerButton.focus();
            };

            const closeOnEscape = event => {
                if (event.key === "Escape") {
                    closeLightbox();
                }
            };

            lightbox.addEventListener("click", event => {
                if (
                    event.target === lightbox ||
                    event.target === closeButton
                ) {
                    closeLightbox();
                }
            });

            document.addEventListener(
                "keydown",
                closeOnEscape
            );

            requestAnimationFrame(() => {
                lightbox.classList.add("is-open");
                closeButton.focus();
            });
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
            <div class = "hug-animation" id = "hugAnimation">
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
            <p class = "hug-counter" id = "hugCounter">
                ôm ${hugCount} lần ời nèeeee!!!
            </p>
            <button 
                class = "secondary-button" 
                id = "hugAgainButton"
                type = "button"
            >
                ôm thêm cái nè!
            </button>
            <p
                class = "hug-response"
                id = "hugResponse"
                role = "status"
                aria-live = "polite"
            >
            </p>
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
        const weeklyDumps = siteContent?.weeklyDumps || [];

        if (!photos) {
            content = `
                <div class = "heart">📷</div>
                <h1>ảnh nè!</h1>
                <div class = "feature-message" aria-live = "polite">
                    its loadinggg, chờ chút ii!
                </div>
            `;
        } else {
            const photoGallery = photos.items.map((photo, index) => {
                const photoAlt = photo.alt || `memory ${index + 1}`;

                return `
                    <button
                        class = "photo-card"
                        type = "button"
                        aria-label = "Open ${escapeAttribute(photoAlt)}"
                        data-photo = "${escapeAttribute(photo.src)}"
                    >
                        <img
                            src = "${escapeAttribute(getOptimizedPhotoPath(photo.src))}"
                            alt = "${escapeAttribute(photoAlt)}"
                            loading = "lazy"
                            onerror = "handlePhotoError(this)"
                        >
                        ${
                            photo.caption
                                ? `<span class = "photo-caption">${escapeHtml(photo.caption)}</span>`
                                : ""
                        }
                    </button>
                `;
            }).join("");

            const weeklyDumpCards = weeklyDumps.map(dump => {
                const firstPhoto = dump.photos?.[0];
                const photoCount = dump.photos?.length || 0;

                return `
                    <button
                        class = "weekly-dump-card"
                        type = "button"
                        data-dump-id = "${escapeAttribute(dump.id)}"
                    >
                        ${
                            firstPhoto
                                ? `
                                    <img
                                        src = "${escapeAttribute(
                                            getOptimizedPhotoPath(
                                                firstPhoto.image_url
                                            )
                                        )}"
                                        alt = "${escapeAttribute(
                                            firstPhoto.alt_text ||
                                            dump.title ||
                                            "weekly memory"
                                        )}"
                                        loading = "lazy"
                                        onerror = "handlePhotoError(this)"
                                    >
                                `
                                : `
                                    <div class = "weekly-dump-placeholder">
                                        🗓️
                                    </div>
                                `
                        }

                        <div class = "weekly-dump-info">
                            <strong>
                                ${escapeHtml(
                                    dump.title || "another week with you!"
                                )}
                            </strong>
                            <span>
                                ${photoCount}
                                ${photoCount === 1 ? "photo" : "photos"}
                            </span>
                        </div>
                    </button>
                `;
            }).join("");

            content = `
                <div class = "heart">📷</div>
                <p class = "small-text">${escapeHtml(photos.eyebrow)}</p>
                <h1>${escapeHtml(photos.title)}</h1>
                <p class = "gallery-intro">${escapeHtml(photos.intro)}</p>
                <div class = "photo-gallery">
                    ${photoGallery}
                </div>
                <p class = "gallery-note">${escapeHtml(photos.note)}</p>
                <div class = "weekly-dumps-divider">
                    <span>♡</span>
                </div>
                <div class = "weekly-dumps-section">
                    <p class = "small-text">
                        🗓️ little pieces of us nè!
                    </p>

                    <h2 class = "weekly-dumps-title">
                        weekly photo dumps
                    </h2>
                    <p class = "weekly-dumps-intro">
                        a small and tiny collection of our weeks together nè!!!
                    </p>

                    ${
                        weeklyDumps.length > 0
                            ? `
                                <div class = "weekly-dump-list">
                                    ${weeklyDumpCards}
                                </div>
                            `
                            : `
                                <div class = "feature-message">
                                    chưa có thêm gì nên từ từ nha!!!
                                    cả 2 tụi mình đều up được á!
                                </div>
                            `
                    }
                </div>
            `;
        }
    }

    // reminders!

    if (feature === "reminders") {
        const reminderCards = reminders.map(reminder => `
            <article class = "reminder-card">
                <div class = "reminder-icon" aria-hidden = "true">
                    ${escapeHtml(reminder.icon)}
                </div>
                <div>
                    <h2>${escapeHtml(reminder.title)}</h2>
                    <p>${escapeHtml(reminder.text)}</p>
                </div>
            </article>
        `).join("");

        content = `
            <div class = "heart">📝</div>
            <p class = "small-text">
                just in case u forget nè!
            </p>
            <h1>little reminders</h1>
            <p class = "gallery-intro">
                a few things u should rmb nè!!!
            </p>
            <div class = "reminder-list">
                ${reminderCards}
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
                    data-situation = "${escapeAttribute(key)}"
                >
                    ${escapeHtml(situation.label)}
                </button>
            `).join("");
        
        content = `
            <div class = "heart jar-visual" id = "jarVisual">🫙</div>
            <p class = "small-text">
                open this nhaaaa!!!
            </p>
            <h1>message jar</h1>
            <p class = "gallery-intro">
                chọn cái nào fit nha vợ iu ơi
            </p>
            <button
                class = "random-message-button"
                id = "randomMessageButton"
                type = "button"
            >
                random nè!!!
            </button>
            <div class = "jar-situations">
                ${jarSituations}
            </div>
            <div
                class = "jar-message"
                id = "jarMessage"
                role = "status"
                aria-live = "polite"
                aria-atomic = "true"
            >
                chọn 1 cái ở trên đi nè!
            </div>
            <button
                class = "draw-another-button"
                id = "drawAnotherButton"
                type = "button"
            >
                draw another one!!!
            </button>
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
            hugCount += 1;

            const hugAnimation = document.querySelector("#hugAnimation");
            const hugCounter = document.querySelector("#hugCounter");
            const hugResponse = document.querySelector("#hugResponse");

            if (hugCounter) {
                hugCounter.textContent = `ôm ${hugCount} lần ời nèeee!!!`;
            }

            if (hugAnimation) {
                hugAnimation.classList.remove("hug-tapped");
                void hugAnimation.offsetWidth;
                hugAnimation.classList.add("hug-tapped");
            }

            if (hugResponse) {
                const hugResponses = [
                    "tớ ôm rồi nhá!!!!",
                    "ôm 1 cái siêu chặt nèeee!!!",
                    "A HUNNID MOREEEE!!!",
                    "NHỚ VL Í:(",
                    "về nhớ cho tui bám đó:("
                ];

                const randomResponse = 
                    hugResponses[
                        Math.floor(Math.random() * hugResponses.length)
                    ];
                
                hugResponse.textContent = randomResponse;
                hugResponse.classList.remove("hug-response-pop");

                void hugResponse.offsetWidth;

                hugResponse.classList.add("hug-response-pop");
            }
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

    const weeklyDumpCards = document.querySelectorAll(".weekly-dump-card");
    weeklyDumpCards.forEach(card => {
        card.addEventListener("click", () => {
            showWeeklyPhotoDump(card.dataset.dumpId);
        });
    });

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
            document.body.classList.add("lightbox-open");

            const closeButton = lightbox.querySelector(".lightbox-close");
            const lightboxImage = lightbox.querySelector("img");

            const closeLightbox = () => {
                lightbox.remove();
                document.body.classList.remove("lightbox-open");
                document.removeEventListener("keydown", closeOnEscape);
                triggerButton.focus();
            };

            const closeOnEscape = event => {
                if (event.key === "Escape") {
                    closeLightbox();
                }
            };

            lightbox.addEventListener("click", event => {
                if (
                    event.target === lightbox ||
                    event.target === closeButton
                ) {
                    closeLightbox();
                }
            });

            lightbox.addEventListener("keydown", event => {
                if (event.key === "Tab") {
                    event.preventDefault();
                    closeButton.focus();
                }
            });

            document.addEventListener("keydown", closeOnEscape);

            requestAnimationFrame(() => {
                lightbox.classList.add("is-open");
                closeButton.focus();
            });

            lightboxImage.addEventListener("load", () => {
                lightboxImage.focus();
            });
        });
    });


    const randomMessageButton = document.querySelector("#randomMessageButton");
    const jarMessage = document.querySelector("#jarMessage");
    const drawAnotherButton = document.querySelector("#drawAnotherButton");
    const jarVisual = document.querySelector("#jarVisual");

    let selectedSituationKey = null;
    const lastMessageBySituation = {};

    function getRandomMessage(situationKey) {
        const situation = messageJar[situationKey];
        if (!situation || situation.messages.length === 0) {
            return "";
        }

        if (situation.messages.length === 1) {
            const onlyMessage = situation.messages[0];
            lastMessageBySituation[situationKey] = onlyMessage;
            return onlyMessage;
        }

        const previousMessage = lastMessageBySituation[situationKey];
        
        let randomMessage;

        do {
            randomMessage = 
                situation.messages[
                    Math.floor(Math.random() * situation.messages.length)
                ];
        } while (randomMessage === previousMessage);

        lastMessageBySituation[situationKey] = randomMessage;

        return randomMessage;
    } 

    function displayJarMessage(message) {
        jarMessage.textContent = message;
        jarMessage.classList.remove("jar-message-pop");

        if (jarVisual) {
            jarVisual.classList.remove("jar-shake");
        }
        void jarMessage.offsetWidth;

        if (jarVisual) {
            void jarVisual.offsetWidth;
        }

        jarMessage.classList.add("jar-message-pop");

        if (jarVisual) {
            jarVisual.classList.add("jar-opening");

            setTimeout(() => {
                jarVisual.classList.remove("jar-opening");
            }, 650);
        }
    }

    function selectRandomSituation() {
        const situationKeys = Object.keys(messageJar);
        return situationKeys[
            Math.floor(Math.random() * situationKeys.length)
        ];
    }

    function showSituationMessage(situationKey) {
        const situation = messageJar[situationKey];

        if (!situation) {
            return;
        }

        selectedSituationKey = situationKey;
        displayJarMessage(getRandomMessage(situationKey));

        document.querySelectorAll(".jar-situation").forEach(button => {
            button.classList.toggle(
                    "is-selected",
                    button.dataset.situation === situationKey
            );
        });
    }

    if (randomMessageButton) {
        randomMessageButton.addEventListener("click", function () {
            const randomSituationKey = selectRandomSituation();
            showSituationMessage(randomSituationKey);
        });
    }

    const jarSituationButtons = document.querySelectorAll(".jar-situation");

    jarSituationButtons.forEach(button => {
        button.addEventListener("click", function () {
            showSituationMessage(this.dataset.situation);
        });
    });

    if (drawAnotherButton) {
        drawAnotherButton.addEventListener("click", function () {
            if (!selectedSituationKey) {
                selectedSituationKey = selectRandomSituation();
            }
            showSituationMessage(selectedSituationKey);
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

