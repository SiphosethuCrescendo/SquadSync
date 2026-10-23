// ==========================================================
// SQUADSYNC PROTOTYPE - MAIN JAVASCRIPT FILE
// ==========================================================

// --- 1. Shared Data (Simulated Database) ---
const fakePlayers = [
    { username: "DemonSlayerX", game: "Seven Deadly Sins", platform: "PC", mic: "Yes", vibe: "Anime RPG fan" },
    { username: "GoalMachine99", game: "FC 27", platform: "PlayStation", mic: "Yes", vibe: "Football fanatic" },
    { username: "DevilHunter", game: "Devil May Cry 5", platform: "PC", mic: "No", vibe: "Combo master" },
    { username: "SaiyanKing", game: "Dragon Ball Sparkling Zero", platform: "Xbox", mic: "Yes", vibe: "Competitive fighter" },
    { username: "FortniteQueen", game: "Fortnite", platform: "PC", mic: "Yes", vibe: "Casual builder" },
    { username: "KombatKing", game: "Mortal Kombat 11", platform: "PlayStation", mic: "No", vibe: "Fatalities only" },
    { username: "CODWarrior", game: "Call Of Duty Black Opps 3", platform: "Xbox", mic: "Yes", vibe: "Ranked grinder" },
    { username: "ApexAce", game: "Apex Legends", platform: "PlayStation", mic: "No", vibe: "Casual player, text only" },
    { username: "TekkenMaster", game: "Tekken 8", platform: "PC", mic: "Yes", vibe: "Combos specialist" },
    { username: "SpeedRacerX", game: "Need For Speed: Most Wanted", platform: "PC", mic: "No", vibe: "Street racer" },
    { username: "PixelWarrior", game: "Seven Deadly Sins", platform: "PC", mic: "No", vibe: "Competitive but chill" },
    { username: "CreeperQueen", game: "Fortnite", platform: "PC", mic: "No", vibe: "Creative builder" },
    { username: "LeagueLord", game: "Dragon Ball Sparkling Zero", platform: "PC", mic: "No", vibe: "Looking for ranked duo" },
    { username: "BlockBuilder", game: "Mortal Kombat 11", platform: "Xbox", mic: "Yes", vibe: "Survival mode expert" },
    { username: "SoccerStar", game: "FC 27", platform: "PlayStation", mic: "No", vibe: "Tactical player" },
    { username: "DevilMayCryFan", game: "Devil May Cry 5", platform: "Xbox", mic: "Yes", vibe: "Style rank grinder" },
    { username: "FPSLegend", game: "Call Of Duty Black Opps 3", platform: "PC", mic: "No", vibe: "Sniper specialist" },
    { username: "RacerPro", game: "Need For Speed: Most Wanted", platform: "Xbox", mic: "Yes", vibe: "Drift king" },
    { username: "FighterX", game: "Tekken 8", platform: "PlayStation", mic: "No", vibe: "Casual fighter" },
    { username: "LegendGamer", game: "Apex Legends", platform: "Xbox", mic: "Yes", vibe: "Ranked grinder" }
];

// --- 2. Shared Helper: Dropdown Menu ---
function setupDropdownMenu() {
    const profileIcon = document.getElementById('profile-icon');
    const dropdownMenu = document.getElementById('dropdown-menu');

    if (profileIcon && dropdownMenu) {
        if (profileIcon.dataset.dropdownReady === "true") return;
        profileIcon.dataset.dropdownReady = "true";

        profileIcon.addEventListener('click', function(event) {
            event.stopPropagation();
            const isHidden = dropdownMenu.classList.contains('hidden');
            if (isHidden) {
                const rect = profileIcon.getBoundingClientRect();
                dropdownMenu.style.top = (rect.bottom + 10) + 'px';
                dropdownMenu.style.left = rect.left + 'px';
                dropdownMenu.classList.remove('hidden');
            } else {
                dropdownMenu.classList.add('hidden');
            }
        });

        document.addEventListener('click', function(event) {
            if (!dropdownMenu.contains(event.target) && !profileIcon.contains(event.target)) {
                dropdownMenu.classList.add('hidden');
            }
        });
    }
}

// ==========================================================
// SHARED: Runs on Every Page
// ==========================================================
document.addEventListener('DOMContentLoaded', function() {

    // 1. Setup the profile dropdown on every page
    setupDropdownMenu();

    // 2. Save the current URL when the user clicks "User Profile"
    const userProfileLinks = document.querySelectorAll('a[href="userprofile.html"]');
    userProfileLinks.forEach(link => {
        link.addEventListener('click', function() {
            sessionStorage.setItem('squadSyncPreviousPage', window.location.href);
        });
    });
});

// ==========================================================
// PAGE: index.html (Login)
// ==========================================================
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        if (email && password) {
            localStorage.setItem('squadSyncLoggedIn', 'true');
            window.location.href = "profile.html";
        } else {
            alert("Please enter both email and password.");
        }
    });
}

// ==========================================================
// PAGE: profile.html (Profile Creation)
// ==========================================================
document.addEventListener('DOMContentLoaded', function() {
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        const availabilityGrid = document.getElementById('availability-grid');
        let selectedDays = [];

        // --- Availability Grid (click to toggle days) ---
        if (availabilityGrid) {
            availabilityGrid.addEventListener('click', function(event) {
                if (event.target.classList.contains('day-slot')) {
                    const day = event.target.getAttribute('data-day');
                    event.target.classList.toggle('selected');
                    if (selectedDays.includes(day)) {
                        selectedDays = selectedDays.filter(d => d !== day);
                    } else {
                        selectedDays.push(day);
                    }
                }
            });
        }

        // --- Save Profile on Submit ---
        profileForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Grab all form values
            const usernameEl = document.getElementById('username');
            const gameEl = document.getElementById('game');
            const platformEl = document.getElementById('platform');
            const micEl = document.getElementById('mic');

            const username = usernameEl ? usernameEl.value.trim() : "";
            const game = gameEl ? gameEl.value : "";
            const platform = platformEl ? platformEl.value : "";
            const mic = micEl ? micEl.value : "";

            // Validation
            if (!username) {
                alert("Please enter a Gamer Tag (username).");
                return;
            }
            if (!game) {
                alert("Please select your favourite game.");
                return;
            }
            if (!platform) {
                alert("Please select your platform.");
                return;
            }
            if (selectedDays.length === 0) {
                alert("Please select at least one day you are available to play.");
                return;
            }

            // Build the user object
            const user = {
                username: username,
                game: game,
                platform: platform,
                mic: mic,
                availability: selectedDays
            };

            // Save to localStorage
            localStorage.setItem('squadSyncUser', JSON.stringify(user));
            localStorage.removeItem('squadSyncMatch');
            localStorage.removeItem('squadSyncFullSquad');

            // Show confirmation and redirect to Lobby
            document.getElementById('profile-form').classList.add('hidden');
            document.getElementById('profile-message').classList.remove('hidden');

            setTimeout(() => {
                window.location.href = "lobby.html";
            }, 1000);
        });
    }
});

// ==========================================================
// PAGE: lobby.html (Fortnite-Style Lobby)
// ==========================================================
const lobbyBtn = document.getElementById('find-match-btn');
if (lobbyBtn) {
    const lobbyUsername = document.getElementById('lobby-username');
    const lobbyGame = document.getElementById('lobby-game');
    const lobbyPlatform = document.getElementById('lobby-platform');
    const lobbyMic = document.getElementById('lobby-mic');
    const slotYou = document.getElementById('slot-you');
    const squadCount = document.getElementById('squad-count');
    const lobbyStatus = document.getElementById('lobby-status-text');
    const slot2 = document.getElementById('slot-2');
    const slot3 = document.getElementById('slot-3');
    const slot4 = document.getElementById('slot-4');

    const savedUser = localStorage.getItem('squadSyncUser');
    const currentUser = savedUser ? JSON.parse(savedUser) : null;

    if (currentUser) {
        lobbyUsername.textContent = currentUser.username;
        lobbyGame.textContent = `Game: ${currentUser.game}`;
        lobbyPlatform.textContent = `Platform: ${currentUser.platform}`;
        lobbyMic.textContent = `Mic: ${currentUser.mic}`;
        slotYou.textContent = currentUser.username;
    } else {
        lobbyUsername.textContent = "No Profile";
        lobbyStatus.textContent = "Please create a profile first.";
        lobbyBtn.disabled = true;
    }

    const savedSquad = localStorage.getItem('squadSyncFullSquad');
    const fullSquad = savedSquad ? JSON.parse(savedSquad) : null;

    if (fullSquad) {
        slot2.classList.remove('empty');
        slot2.classList.add('filled');
        slot2.innerHTML = `<div class="slot-icon">🎮</div><p class="slot-name">${fullSquad.member1.username}</p><p class="slot-status">Ready</p>`;

        slot3.classList.remove('empty');
        slot3.classList.add('filled');
        slot3.innerHTML = `<div class="slot-icon">🎮</div><p class="slot-name">${fullSquad.member2.username}</p><p class="slot-status">Ready</p>`;

        slot4.classList.remove('empty');
        slot4.classList.add('filled');
        slot4.innerHTML = `<div class="slot-icon">🎮</div><p class="slot-name">${fullSquad.member3.username}</p><p class="slot-status">Ready</p>`;

        squadCount.textContent = "(4/4)";
        lobbyStatus.innerHTML = `<span style="color:#50E3C2;">Squad Full! Click to enter the game.</span>`;

        lobbyBtn.textContent = "▶";
        lobbyBtn.disabled = false;
        lobbyBtn.style.background = "linear-gradient(135deg, #059669, #50E3C2)";
        lobbyBtn.style.color = "#0F0518";

        lobbyBtn.onclick = function() {
            window.location.href = "chat.html";
        };
    } else {
        lobbyBtn.textContent = "X";
        lobbyStatus.innerHTML = `Press X to Ready Up`;

        lobbyBtn.onclick = function() {
            window.location.href = "findmatch.html";
        };
    }
}

// ==========================================================
// PAGE: findmatch.html (Loading Screen)
// ==========================================================
const progressBar = document.getElementById('progress-bar');
if (progressBar) {
    const loadingTitle = document.getElementById('loading-title');
    const loadingStatus = document.getElementById('loading-status');
    const successMessage = document.getElementById('success-message');
    const loadingSubtitle = document.getElementById('loading-subtitle');

    const savedUser = localStorage.getItem('squadSyncUser');
    const currentUser = savedUser ? JSON.parse(savedUser) : null;

    const statusMessages = [
        "Checking game preferences...",
        "Scanning compatible platforms...",
        "Verifying microphone settings...",
        "Evaluating player vibe...",
        "Squad members found!"
    ];

    let progress = 0;
    let statusIndex = 0;

    const loadingInterval = setInterval(() => {
        progress += 10;
        progressBar.style.width = progress + '%';

        if (progress % 20 === 0 && statusIndex < statusMessages.length) {
            loadingStatus.textContent = statusMessages[statusIndex];
            statusIndex++;
        }

        if (progress >= 100) {
            clearInterval(loadingInterval);

            if (currentUser) {
                // Match by game AND mic preference
                let matchedPlayer = fakePlayers.find(player =>
                    player.game === currentUser.game &&
                    player.mic === currentUser.mic
                );

                // Fallback: match by game only
                if (!matchedPlayer) {
                    matchedPlayer = fakePlayers.find(player => player.game === currentUser.game);
                }

                // Final fallback: any player
                if (!matchedPlayer) {
                    matchedPlayer = fakePlayers[0];
                }

                localStorage.setItem('squadSyncMatch', JSON.stringify(matchedPlayer));

                // Build a squad of 4 — the user + 3 others (avoid duplicates)
                const otherPlayers = fakePlayers.filter(p => p.username !== matchedPlayer.username);
                const randomPlayer1 = otherPlayers[Math.floor(Math.random() * otherPlayers.length)];
                const remainingPlayers = otherPlayers.filter(p => p.username !== randomPlayer1.username);
                const randomPlayer2 = remainingPlayers[Math.floor(Math.random() * remainingPlayers.length)];

                const fullSquad = {
                    you: currentUser,
                    member1: matchedPlayer,
                    member2: randomPlayer1,
                    member3: randomPlayer2
                };
                localStorage.setItem('squadSyncFullSquad', JSON.stringify(fullSquad));
            }

            loadingTitle.classList.add('hidden');
            loadingSubtitle.classList.add('hidden');
            loadingStatus.classList.add('hidden');
            progressBar.parentElement.classList.add('hidden');
            successMessage.classList.remove('hidden');

            setTimeout(() => {
                window.location.href = "lobby.html";
            }, 2000);
        }
    }, 300);
}

// ==========================================================
// PAGE: chat.html (Chat Room)
// ==========================================================
const chatInput = document.getElementById('chat-input');
if (chatInput) {
    const chatBox = document.getElementById('chat-box');
    const sendChatBtn = document.getElementById('send-chat-btn');
    const icebreakerBtn = document.getElementById('icebreaker-btn');
    const chatStatus = document.getElementById('chat-status');

    const savedUser = localStorage.getItem('squadSyncUser');
    const savedMatch = localStorage.getItem('squadSyncMatch');
    const currentUser = savedUser ? JSON.parse(savedUser) : null;
    const currentMatch = savedMatch ? JSON.parse(savedMatch) : null;

    const icebreakers = [
        "What is your favourite game of all time?",
        "Are you a 'rush in and fight' player or a 'plan carefully' player?",
        "What is the funniest gaming moment you've ever had?",
        "If you could only play one game for the rest of your life, what would it be?",
        "Do you prefer playing games in the morning or late at night?",
        "Who is your all-time favourite video game character?"
    ];

    if (currentUser && currentMatch) {
        chatStatus.innerHTML = `You are connected with <strong style="color: #50E3C2;">${currentMatch.username}</strong>. Say hello!`;
        addSystemMessage(`You have been matched with ${currentMatch.username}. Say hi!`);
    } else {
        chatStatus.textContent = "No active squad match found. Please go to 'Find Match' first.";
        document.querySelector('.chat-input-area').classList.add('hidden');
    }

    function addMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message');

        if (sender === 'user') {
            messageDiv.classList.add('message-user');
            messageDiv.textContent = `You: ${message}`;
        } else {
            messageDiv.classList.add('message-system');
            messageDiv.textContent = `${currentMatch.username}: ${message}`;
        }

        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function addSystemMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message', 'message-system');
        messageDiv.style.fontStyle = "italic";
        messageDiv.style.opacity = "0.8";
        messageDiv.style.background = "transparent";
        messageDiv.style.border = "none";
        messageDiv.textContent = message;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function simulateReply() {
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('typing-indicator');
        typingDiv.id = 'typing-indicator';
        typingDiv.textContent = `${currentMatch.username} is typing...`;
        chatBox.appendChild(typingDiv);
        chatBox.scrollTop = chatBox.scrollHeight;

        setTimeout(() => {
            const indicator = document.getElementById('typing-indicator');
            if (indicator) indicator.remove();

            const replies = [
                "Hey! Glad we matched. Ready to play?",
                "Nice to meet you! What time works for you?",
                "Awesome, let's dominate!",
                "Hi! I prefer text chat too, so this is perfect.",
                "Cool profile! What rank are you?",
                "Sounds good! Let's jump into a game.",
                "Hey! Which platform do you play on?"
            ];
            const randomReply = replies[Math.floor(Math.random() * replies.length)];
            addMessage(randomReply, 'system');
        }, 2000);
    }

    sendChatBtn.addEventListener('click', function() {
        const message = chatInput.value.trim();
        if (message !== "") {
            addMessage(message, 'user');
            chatInput.value = "";
            simulateReply();
        }
    });

    chatInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            sendChatBtn.click();
        }
    });

    icebreakerBtn.addEventListener('click', function() {
        const randomQuestion = icebreakers[Math.floor(Math.random() * icebreakers.length)];
        chatInput.value = randomQuestion;
        chatInput.focus();
    });
}

// ==========================================================
// PAGE: userProfile.html (User Profile with Stats)
// ==========================================================
const gameSelect = document.getElementById('game-select');
if (gameSelect) {
    const gameStats = {
        "Seven Deadly Sins": {
            level: 45, levelMax: 100, hours: 210, hoursProgress: 60,
            achievements: 36, achievementsMax: 60,
            recentAchievements: [
                { icon: "⚔️", title: "Holy Knight", desc: "Complete the Holy Knight questline", date: "2 days ago" },
                { icon: "🔥", title: "Berserker Mode", desc: "Win 20 battles with Meliodas", date: "5 days ago" },
                { icon: "🛡️", title: "Sin Collector", desc: "Unlock all Seven Sins characters", date: "1 week ago" },
                { icon: "🏆", title: "Tournament Win", desc: "Win a full tournament bracket", date: "2 weeks ago" }
            ]
        },
        "FC 27": {
            level: 62, levelMax: 100, hours: 398, hoursProgress: 78,
            achievements: 44, achievementsMax: 60,
            recentAchievements: [
                { icon: "⚽", title: "Hat-Trick Hero", desc: "Score 3 goals in one match", date: "1 day ago" },
                { icon: "🏅", title: "League Champion", desc: "Win the Premier League", date: "3 days ago" },
                { icon: "🥇", title: "Golden Boot", desc: "Finish top scorer in a season", date: "1 week ago" },
                { icon: "🌍", title: "World Cup Winner", desc: "Win the World Cup", date: "2 weeks ago" }
            ]
        },
        "Devil May Cry 5": {
            level: 38, levelMax: 100, hours: 187, hoursProgress: 55,
            achievements: 30, achievementsMax: 60,
            recentAchievements: [
                { icon: "😈", title: "Devil Hunter", desc: "Defeat 100 demons", date: "2 days ago" },
                { icon: "🗡️", title: "S-Rank Style", desc: "Get an S-Rank in a mission", date: "4 days ago" },
                { icon: "🔥", title: "Son of Sparda", desc: "Complete the game as Dante", date: "1 week ago" },
                { icon: "💀", title: "Hell and Hell", desc: "Complete Hell and Hell difficulty", date: "3 weeks ago" }
            ]
        },
        "Dragon Ball Sparkling Zero": {
            level: 51, levelMax: 100, hours: 275, hoursProgress: 68,
            achievements: 40, achievementsMax: 60,
            recentAchievements: [
                { icon: "🥋", title: "Super Saiyan", desc: "Transform into Super Saiyan 3", date: "Yesterday" },
                { icon: "💥", title: "Kamehameha", desc: "Land 500 Kamehamehas", date: "3 days ago" },
                { icon: "⚡", title: "Shenron Summon", desc: "Summon Shenron for the first time", date: "5 days ago" },
                { icon: "🏆", title: "World Tournament", desc: "Win the World Tournament", date: "2 weeks ago" }
            ]
        },
        "Fortnite": {
            level: 72, levelMax: 100, hours: 620, hoursProgress: 90,
            achievements: 54, achievementsMax: 60,
            recentAchievements: [
                { icon: "👑", title: "Victory Royale", desc: "Win 50 Battle Royale matches", date: "1 day ago" },
                { icon: "🏗️", title: "Build Master", desc: "Place 10,000 structures", date: "4 days ago" },
                { icon: "🎯", title: "Sharpshooter", desc: "Get 1000 eliminations", date: "1 week ago" },
                { icon: "🌪️", title: "Storm Survivor", desc: "Win without storm damage", date: "2 weeks ago" }
            ]
        },
        "Mortal Kombat 11": {
            level: 48, levelMax: 100, hours: 240, hoursProgress: 62,
            achievements: 35, achievementsMax: 60,
            recentAchievements: [
                { icon: "☠️", title: "Fatality Master", desc: "Perform 100 Fatalities", date: "2 days ago" },
                { icon: "🐉", title: "Elder God", desc: "Complete the story mode", date: "5 days ago" },
                { icon: "🔥", title: "Kombat League", desc: "Reach Grandmaster rank", date: "1 week ago" },
                { icon: "🏆", title: "Klassic Tower", desc: "Complete all Klassic Towers", date: "3 weeks ago" }
            ]
        },
        "Call Of Duty Black Opps 3": {
            level: 58, levelMax: 100, hours: 342, hoursProgress: 74,
            achievements: 42, achievementsMax: 60,
            recentAchievements: [
                { icon: "🎖️", title: "Prestige Master", desc: "Reach Prestige 10", date: "1 day ago" },
                { icon: "🧟", title: "Zombie Slayer", desc: "Survive 50 rounds in Zombies", date: "4 days ago" },
                { icon: "🔫", title: "Marksman", desc: "Get 500 headshots", date: "1 week ago" },
                { icon: "💣", title: "Explosives Expert", desc: "Get 100 grenade kills", date: "2 weeks ago" }
            ]
        },
        "Apex Legends": {
            level: 55, levelMax: 100, hours: 328, hoursProgress: 72,
            achievements: 43, achievementsMax: 60,
            recentAchievements: [
                { icon: "👑", title: "Champion", desc: "Win 25 matches as squad leader", date: "3 days ago" },
                { icon: "🎖️", title: "Kill Leader", desc: "Get 20 kills in a single match", date: "6 days ago" },
                { icon: "🚀", title: "Fast Drop", desc: "Land at 5 hot zones in one week", date: "1 week ago" },
                { icon: "💥", title: "Finisher", desc: "Eliminate 500 enemies", date: "3 weeks ago" }
            ]
        },
        "Tekken 8": {
            level: 44, levelMax: 100, hours: 198, hoursProgress: 58,
            achievements: 33, achievementsMax: 60,
            recentAchievements: [
                { icon: "🥋", title: "Combo King", desc: "Perform a 10-hit combo", date: "2 days ago" },
                { icon: "🔥", title: "Perfect Victory", desc: "Win without taking damage", date: "4 days ago" },
                { icon: "🏆", title: "Arcade Master", desc: "Complete Arcade mode", date: "1 week ago" },
                { icon: "⚡", title: "Rage Art", desc: "Perform 100 Rage Arts", date: "2 weeks ago" }
            ]
        },
        "Need For Speed: Most Wanted": {
            level: 40, levelMax: 100, hours: 175, hoursProgress: 52,
            achievements: 28, achievementsMax: 60,
            recentAchievements: [
                { icon: "🏎️", title: "Most Wanted", desc: "Defeat the #1 racer", date: "Yesterday" },
                { icon: "🚓", title: "Cop Evader", desc: "Escape a level 5 pursuit", date: "3 days ago" },
                { icon: "🔥", title: "Speed Demon", desc: "Reach 300 km/h", date: "1 week ago" },
                { icon: "🏁", title: "Race Champion", desc: "Win 50 races", date: "2 weeks ago" }
            ]
        }
    };

    const profileUsername = document.getElementById('profile-username');
    const levelNumber = document.getElementById('level-number');
    const levelProgress = document.getElementById('level-progress');
    const levelCaption = document.getElementById('level-caption');
    const hoursNumber = document.getElementById('hours-number');
    const hoursProgress = document.getElementById('hours-progress');
    const hoursCaption = document.getElementById('hours-caption');
    const achievementsNumber = document.getElementById('achievements-number');
    const achievementsProgress = document.getElementById('achievements-progress');
    const achievementsCaption = document.getElementById('achievements-caption');
    const achievementList = document.getElementById('achievement-list');

    const savedUser = localStorage.getItem('squadSyncUser');
    if (savedUser) {
        const user = JSON.parse(savedUser);
        profileUsername.textContent = user.username;
    } else {
        profileUsername.textContent = "Guest Player";
    }

    function updateStats(gameName) {
        const stats = gameStats[gameName];
        if (!stats) return;

        levelNumber.textContent = stats.level;
        levelProgress.style.width = stats.level + '%';
        const levelsToMax = stats.levelMax - stats.level;
        levelCaption.textContent = `${levelsToMax} levels to Master rank`;

        hoursNumber.textContent = stats.hours;
        hoursProgress.style.width = stats.hoursProgress + '%';
        hoursCaption.textContent = `More active than ${stats.hoursProgress}% of players`;

        achievementsNumber.textContent = stats.achievements;
        achievementsProgress.style.width = (stats.achievements / stats.achievementsMax * 100) + '%';
        const remaining = stats.achievementsMax - stats.achievements;
        achievementsCaption.textContent = `${remaining} achievements remaining`;

        achievementList.innerHTML = '';
        stats.recentAchievements.forEach(ach => {
            const item = document.createElement('div');
            item.classList.add('achievement-item');
            item.innerHTML = `
                <div class="achievement-icon">${ach.icon}</div>
                <div class="achievement-details">
                    <h4>${ach.title}</h4>
                    <p>${ach.desc}</p>
                </div>
                <div class="achievement-date">${ach.date}</div>
            `;
            achievementList.appendChild(item);
        });
    }

    if (savedUser) {
        const user = JSON.parse(savedUser);
        gameSelect.value = user.game || "Fortnite";
        updateStats(gameSelect.value);
    } else {
        updateStats("Fortnite");
    }

    gameSelect.addEventListener('change', function() {
        updateStats(this.value);
    });
}

// ==========================================================
// USER PROFILE — Smart Back Button
// ==========================================================
const backToLoginBtn = document.getElementById('back-to-login');
if (backToLoginBtn) {
    backToLoginBtn.addEventListener('click', function() {
        const previousPage = sessionStorage.getItem('squadSyncPreviousPage');

        if (previousPage) {
            window.location.href = previousPage;
        } else {
            window.location.href = "Login.html";
        }
    });
}

// ==========================================================
// PAGE: library.html (Library Page)
// ==========================================================
const orderNowBtn = document.getElementById('order-now-btn');
if (orderNowBtn) {
    orderNowBtn.addEventListener('click', function() {
        window.location.href = 'order.html';
    });
}

// ==========================================================
// PAGE: settings.html (Settings Page)
// ==========================================================
const saveSettingsBtn = document.getElementById('save-settings-btn');
if (saveSettingsBtn) {
    const savedUser = localStorage.getItem('squadSyncUser');
    const user = savedUser ? JSON.parse(savedUser) : null;

    const settingsUsername = document.getElementById('settings-username');
    const settingsEmail = document.getElementById('settings-email');
    const settingsGame = document.getElementById('settings-game');
    const settingsPlatform = document.getElementById('settings-platform');
    const settingsMic = document.getElementById('settings-mic');

    const toggleMatches = document.getElementById('toggle-matches');
    const toggleChat = document.getElementById('toggle-chat');
    const toggleWeekly = document.getElementById('toggle-weekly');
    const togglePublic = document.getElementById('toggle-public');
    const toggleOnline = document.getElementById('toggle-online');
    const toggleInvites = document.getElementById('toggle-invites');

    if (user) {
        settingsUsername.value = user.username || "";
        settingsEmail.value = user.email || "";
        settingsGame.value = user.game || "";
        settingsPlatform.value = user.platform || "";
        settingsMic.value = user.mic || "Yes";
    }

    const savedPrefs = localStorage.getItem('squadSyncPreferences');
    if (savedPrefs) {
        const prefs = JSON.parse(savedPrefs);
        toggleMatches.checked = prefs.matches ?? true;
        toggleChat.checked = prefs.chat ?? true;
        toggleWeekly.checked = prefs.weekly ?? false;
        togglePublic.checked = prefs.publicProfile ?? true;
        toggleOnline.checked = prefs.onlineStatus ?? true;
        toggleInvites.checked = prefs.invites ?? true;
    }

    saveSettingsBtn.addEventListener('click', function() {
        if (!settingsUsername.value.trim()) {
            alert("Please enter a display name.");
            return;
        }

        const updatedUser = {
            username: settingsUsername.value.trim(),
            email: settingsEmail.value.trim(),
            game: settingsGame.value,
            platform: settingsPlatform.value,
            mic: settingsMic.value,
            availability: user?.availability || []
        };
        localStorage.setItem('squadSyncUser', JSON.stringify(updatedUser));

        const updatedPrefs = {
            matches: toggleMatches.checked,
            chat: toggleChat.checked,
            weekly: toggleWeekly.checked,
            publicProfile: togglePublic.checked,
            onlineStatus: toggleOnline.checked,
            invites: toggleInvites.checked
        };
        localStorage.setItem('squadSyncPreferences', JSON.stringify(updatedPrefs));

        const message = document.getElementById('settings-message');
        message.classList.remove('hidden');

        setTimeout(() => {
            message.classList.add('hidden');
        }, 3000);
    });
}

// ==========================================================
// PAGE: order.html (Order Now Page)
// ==========================================================
const placeOrderBtn = document.getElementById('place-order-btn');
if (placeOrderBtn) {
    const gameRadios = document.querySelectorAll('input[name="game"]');
    const planRadios = document.querySelectorAll('input[name="plan"]');

    const summaryGame = document.getElementById('summary-game');
    const summaryPlan = document.getElementById('summary-plan');
    const summaryBase = document.getElementById('summary-base');
    const summaryMultiplier = document.getElementById('summary-multiplier');
    const summaryTotal = document.getElementById('summary-total');

    const cardName = document.getElementById('card-name');
    const cardNumber = document.getElementById('card-number');
    const cardExpiry = document.getElementById('card-expiry');
    const cardCvc = document.getElementById('card-cvc');

    const orderSuccess = document.getElementById('order-success');
    const orderIdDisplay = document.getElementById('order-id-display');

    function updateSummary() {
        let selectedGame = null;
        let basePrice = 0;
        gameRadios.forEach(radio => {
            if (radio.checked) {
                selectedGame = radio.value;
                basePrice = parseFloat(radio.getAttribute('data-price'));
            }
        });

        let selectedPlan = "Standard";
        let multiplier = 1;
        planRadios.forEach(radio => {
            if (radio.checked) {
                selectedPlan = radio.value;
                multiplier = parseInt(radio.getAttribute('data-multiplier'));
            }
        });

        const total = basePrice * multiplier;

        summaryGame.textContent = selectedGame || "—";
        summaryPlan.textContent = selectedPlan;
        summaryBase.textContent = `$${basePrice.toFixed(2)}`;
        summaryMultiplier.textContent = `× ${multiplier}`;
        summaryTotal.textContent = `$${total.toFixed(2)}`;
    }

    gameRadios.forEach(radio => radio.addEventListener('change', updateSummary));
    planRadios.forEach(radio => radio.addEventListener('change', updateSummary));

    updateSummary();

    cardNumber.addEventListener('input', function() {
        let value = this.value.replace(/\s/g, '').replace(/\D/g, '');
        let formatted = value.match(/.{1,4}/g)?.join(' ') || '';
        this.value = formatted;
    });

    cardExpiry.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }
        this.value = value;
    });

    cardCvc.addEventListener('input', function() {
        this.value = this.value.replace(/\D/g, '');
    });

    placeOrderBtn.addEventListener('click', function() {
        let hasGame = false;
        gameRadios.forEach(radio => { if (radio.checked) hasGame = true; });
        if (!hasGame) {
            alert("Please select a game first.");
            return;
        }

        if (!cardName.value.trim() || !cardNumber.value.trim() || !cardExpiry.value.trim() || !cardCvc.value.trim()) {
            alert("Please fill in all payment details.");
            return;
        }

        const orderId = 'SS-' + Math.random().toString(36).substring(2, 8).toUpperCase();

        let selectedGame = "";
        let basePrice = 0;
        gameRadios.forEach(radio => {
            if (radio.checked) {
                selectedGame = radio.value;
                basePrice = parseFloat(radio.getAttribute('data-price'));
            }
        });

        let selectedPlan = "";
        let multiplier = 1;
        planRadios.forEach(radio => {
            if (radio.checked) {
                selectedPlan = radio.value;
                multiplier = parseInt(radio.getAttribute('data-multiplier'));
            }
        });

        const order = {
            id: orderId,
            game: selectedGame,
            plan: selectedPlan,
            total: (basePrice * multiplier).toFixed(2),
            date: new Date().toISOString(),
            cardholder: cardName.value.trim()
        };

        localStorage.setItem('squadSyncLastOrder', JSON.stringify(order));

        document.querySelector('.summary-card').classList.add('hidden');
        orderSuccess.classList.remove('hidden');
        orderIdDisplay.textContent = `Order #${orderId}`;

        orderSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
}

// ==========================================================
// PAGE: gamedetail.html (Game Detail Page)
// ==========================================================
const gameHeroImage = document.getElementById('game-hero-image');
if (gameHeroImage) {
    const gameTitle = document.getElementById('game-title');
    const gameTagline = document.getElementById('game-tagline');
    const gameVideo = document.getElementById('game-video');
    const gameDescription = document.getElementById('game-description');
    const gameTags = document.getElementById('game-tags');
    const launchBtn = document.getElementById('launch-btn');

    // --- Game details database ---
    const gameDetails = {
        "Dragon Ball Sparkling Zero": {
            image: "images/dbz.jpg",
            tagline: "The ultimate Dragon Ball fighting experience",
            description: "Dragon Ball: Sparking! Zero brings back the beloved Budokai Tenkaichi-style gameplay with stunning modern visuals. Relive iconic moments from the entire Dragon Ball saga with over 150 playable characters. Engage in 3D arena battles, master aerial combos, and experience the most authentic Dragon Ball fighter ever made.",
            tags: ["Fighting", "Anime", "3D Arena", "Multiplayer"],
            video: "images/DragonBall.mp4"
        },
        "Seven Deadly Sins": {
            image: "images/nanatsu.jpg",
            tagline: "Unleash the power of the Seven Deadly Sins",
            description: "The Seven Deadly Sins: Grand Cross is an anime-inspired RPG based on the hit manga and anime series. Assemble your team of legendary knights, each with unique abilities, and battle through the kingdom of Liones to stop the Holy Knights.",
            tags: ["RPG", "Anime", "Turn-Based", "Story Rich"],
            video: "https://www.youtube.com/embed/8eY9XG8kHYc"
        },
        "FC 27": {
            image: "images/fifa 26.jpg",
            tagline: "The world's game, redefined",
            description: "EA Sports FC 27 brings the most authentic football experience to date. Featuring HyperMotion technology, real-world physics, and over 19,000 athletes across 700 teams.",
            tags: ["Sports", "Football", "Competitive", "Multiplayer"],
            video: "https://www.youtube.com/embed/w1j1tVqWJKk"
        },
        "Devil May Cry 5": {
            image: "images/devil.jpg",
            tagline: "Stylish action. Demonic power. Legendary combos.",
            description: "Devil May Cry 5 is the latest chapter in the iconic action series. Play as Nero, Dante, and the mysterious V as they battle demonic forces threatening the world.",
            tags: ["Action", "Hack & Slash", "Stylish", "Single-Player"],
            video: "https://www.youtube.com/embed/6EE5bR7Tw2g"
        },
        "Fortnite": {
            image: "images/fortnite.jpg",
            tagline: "Drop in. Build up. Win the Battle Royale.",
            description: "Fortnite is a free-to-play Battle Royale where 100 players fight to be the last one standing. Build structures, gather resources, and use a huge arsenal of weapons to survive.",
            tags: ["Battle Royale", "Free-to-Play", "Building", "Multiplayer"],
            video: "https://www.youtube.com/embed/2gUtfBmw86Y"
        },
        "Mortal Kombat 11": {
            image: "images/kombat.jpg",
            tagline: "The most brutal Kombat yet",
            description: "Mortal Kombat 11 continues the legendary fighting franchise with brutal new Fatalities, cinematic story mode, and the deepest character customisation system in the series.",
            tags: ["Fighting", "Gore", "Competitive", "Story Mode"],
            video: "https://www.youtube.com/embed/UZ6eFEjFfJ0"
        },
        "Call Of Duty Black Opps 3": {
            image: "images/COD.jpg",
            tagline: "The definitive Black Ops experience",
            description: "Call of Duty: Black Ops III delivers an intense campaign, iconic multiplayer, and the beloved Zombies mode. Set in a dark future where biotechnology has altered the battlefield.",
            tags: ["FPS", "Multiplayer", "Zombies", "Campaign"],
            video: "https://www.youtube.com/embed/yRzXAoNyyIA"
        },
        "Apex Legends": {
            image: "images/leveling.jpg",
            tagline: "Squad-based Battle Royale, perfected",
            description: "Apex Legends is a hero-shooter Battle Royale from Respawn Entertainment. Choose from a roster of Legends, each with unique abilities, and team up with two other players to be the last squad standing.",
            tags: ["Battle Royale", "Hero Shooter", "Free-to-Play", "Squad"],
            video: "https://www.youtube.com/embed/oQtHENM_GZU"
        },
        "Tekken 8": {
            image: "images/Tekken.jpg",
            tagline: "Fighting as it was meant to be",
            description: "Tekken 8 brings the legendary King of Iron Fist Tournament to a new generation with stunning visuals powered by Unreal Engine 5.",
            tags: ["Fighting", "3D", "Competitive", "Story Mode"],
            video: "https://www.youtube.com/embed/2OgqWzlLOaU"
        },
        "Need For Speed: Most Wanted": {
            image: "images/MostWanted.jpg",
            tagline: "Race. Escape. Become the Most Wanted.",
            description: "Need for Speed: Most Wanted is the iconic racing game where you race, evade the cops, and climb the Blacklist to become the city's Most Wanted.",
            tags: ["Racing", "Open World", "Police Chase", "Customisation"],
            video: "https://www.youtube.com/embed/v5jFdL-68_c"
        }
    };

    // --- Read the game name from the URL ---
    const urlParams = new URLSearchParams(window.location.search);
    const gameName = urlParams.get('game') || "Dragon Ball Sparkling Zero";
    const details = gameDetails[gameName];

    // --- Populate the page ---
    if (details) {
        gameHeroImage.src = details.image;
        gameTitle.textContent = gameName;
        gameTagline.textContent = details.tagline;
        gameVideo.src = details.video;
        gameDescription.textContent = details.description;

        // Render tags
        gameTags.innerHTML = '';
        details.tags.forEach(tag => {
            const tagEl = document.createElement('span');
            tagEl.classList.add('game-tag');
            tagEl.textContent = tag;
            gameTags.appendChild(tagEl);
        });

        // Update page title
        document.title = `${gameName} - SquadSync`;

        // Wire up the Launch button
        launchBtn.addEventListener('click', function() {
            const savedUser = localStorage.getItem('squadSyncUser');
            if (savedUser) {
                const user = JSON.parse(savedUser);
                user.game = gameName;
                localStorage.setItem('squadSyncUser', JSON.stringify(user));
            }
            localStorage.removeItem('squadSyncMatch');
            localStorage.removeItem('squadSyncFullSquad');
            window.location.href = "lobby.html";
        });
    } else {
        gameTitle.textContent = "Game Not Found";
        gameTagline.textContent = "Sorry, we couldn't load this game's details.";
        gameDescription.textContent = "Please return to the library and try again.";
    }
}

// ==========================================================
// LIBRARY — Click handler for game cards
// ==========================================================
const gameCards = document.querySelectorAll('.game-card[data-game]');
if (gameCards.length > 0) {
    gameCards.forEach(card => {
        card.addEventListener('click', function() {
            const gameName = this.getAttribute('data-game');
            window.location.href = `gamedetail.html?game=${encodeURIComponent(gameName)}`;
        });
    });
}