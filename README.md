SquadSync - Student Gaming Matchmaker
📖 Project Overview
SquadSync is a web-based matchmaking prototype designed to help students find compatible gaming partners. Many gamers experience social anxiety or "toxic" encounters when playing with random strangers online. SquadSync solves this by matching users based on their favourite game, platform, microphone preference, and weekly availability.

This project was built as a prototype for a Portfolio of Evidence (POE) assignment, focusing on modern UI/UX design principles, accessibility, and interactive front-end development.

⚙️ How It Works (Step-by-Step User Journey)
SquadSync is designed as a seamless flow from account creation to playing with a squad. Here is exactly how the system works:

1. Login (Login.html)
The Process: The user enters an email and password.

Behind the Scenes: The system accepts any credentials (for prototype purposes) and sets a local state to remember that the user is logged in. It then redirects the user to the Profile Creation page.

2. Profile Creation (profile.html)
The Process: The user enters their Gamer Tag, selects their favourite game (e.g., Dragon Ball Sparkling Zero), platform, and microphone preference. They then click the days of the week they are available.

Behind the Scenes: The system validates that all fields are filled and at least one day is selected. If successful, it saves this data into the browser's localStorage (the user's "Vibe Profile"). This data is now accessible to every other page on the website.

3. The Lobby (Lobby.html)
The Process: The user arrives at a "Fortnite-style" lobby. They see their own profile card on the left and four empty squad slots on the right. They click the big "X" button to ready up.

Behind the Scenes: The system reads the saved profile data and displays the user's Gamer Tag and game. When the "X" is clicked, it triggers the matchmaking sequence.

4. Finding a Match (FindMatch.html)
The Process: The screen changes to a loading screen with a spinning circle, a progress bar, and changing text (e.g., "Scanning platforms...").

Behind the Scenes: The system uses a simulated delay. It filters through a database of fake players to find someone who matches the user's exact Game and Microphone preference. Once a match is found, it builds a full squad of 4 players and saves them. It then redirects the user back to the Lobby.

5. The Full Squad (Lobby.html)
The Process: The user is back in the lobby, but now all four squad slots are filled with glowing green borders showing their matched teammates. The "X" button has turned into a green "▶" (Play) button.

Behind the Scenes: The system checks the saved squad data and dynamically populates the empty slots. Clicking the Play button takes the user into the Chat room.

6. Squad Chat (chat.html)
The Process: The user can type messages to their new squad. There is also a "💡 Icebreaker" button.

Behind the Scenes: When the user sends a message, the system displays it in a purple bubble. To simulate a real person, it shows a "[Squadmate] is typing..." indicator for 2 seconds before generating an automated reply. The Icebreaker button randomly generates a conversation starter and places it in the chat box.

7. The Game Library (library.html)
The Process: Accessed via the profile dropdown menu. The user can view a featured game card. Clicking a card opens a detailed page.

Behind the Scenes: The system passes the selected game's name into the URL (the web address). The next page uses this name to load the correct image, video trailer, and description.

8. User Dashboard (userProfile.html)
The Process: The user can view their Level, Hours Played, and Achievements (out of 60). There is a dropdown to switch between different games.

Behind the Scenes: The system holds a database of statistics for every game. When the user changes the dropdown, the system instantly recalculates the progress bars and updates the on-screen numbers without reloading the page.

9. Settings & Checkout (settings.html & order.html)
Settings: The user can change their account details or toggle privacy switches. The system saves these new preferences to memory.

Order Now: The user selects a premium plan and enters mock payment details. The system features auto-formatting (adding spaces to the card number) and generates a fake Order ID when completed.

✨ Key Features
Secure Login: A visually striking split-screen login page with a futuristic aesthetic.

Vibe Profile Creation: Users create a personalized profile by selecting their game and availability.

Dynamic Lobby: A "Fortnite-style" lobby that visually fills up with squadmates.

Simulated Matchmaking: A loading screen that provides live status updates.

Interactive Chat: A chat room with a simulated typing indicator and an Icebreaker generator.

User Dashboard: A dynamic profile page displaying game-specific stats.

Game Library & Checkout: A browsable library featuring game details, trailers, and a mock checkout system.

Settings & Privacy: A comprehensive settings page with animated toggle switches.

🎨 Design & UX Highlights
Glassmorphism UI: The interface uses semi-transparent, frosted-glass panels over immersive purple backgrounds.

State Management: The site uses browser memory (localStorage) to remember the user's profile across different pages.

Visibility of System Status: Interactive elements like the loading bar provide constant feedback to the user.

Error Prevention: Form validation stops users from submitting incomplete profiles or payment details.

♿ Accessibility (WCAG 2.0)
Keyboard Navigation: The entire site is fully operable using only the keyboard.

Visual Focus States: Glowing purple borders indicate which element is currently selected.

Text Alternatives: All images contain descriptive alt text for screen readers.

📂 Project Structure
text
SquadSync_Prototype/
│
├── Login.html              # The split-screen login page
├── profile.html            # User profile creation form
├── Lobby.html              # Fortnite-style squad lobby
├── FindMatch.html          # Matchmaking loading screen
├── chat.html               # Simulated chat room
├── userProfile.html        # User stats and achievements dashboard
├── library.html            # Game library dashboard
├── gamedetail.html         # Dynamic game details and trailer page
├── settings.html           # Account and privacy settings
├── order.html              # Mock checkout/payment page
│
├── login-style.css         # Global stylesheet for all pages
├── script.js               # Shared JavaScript logic and interactivity
│
└── images/                 # Folder containing all game covers and backgrounds
🚀 How to Run the Prototype
Download or clone this repository to your local machine.

Ensure all HTML files, the CSS file, the JavaScript file, and the images folder are in the same directory.

Open Login.html in any modern web browser (Chrome, Edge, Firefox, Safari).

Test Flow:

Enter any email/password to log in.

Create your profile (ensure you select at least one availability day).

You will be redirected to the Lobby. Click the "X" to ready up.

Watch the matchmaking screen, then view your full squad in the Lobby.

Click the green "▶" button to enter the Chat.

Use the profile dropdown (top left) to explore the Library, User Profile, and Settings.

🛠️ Built With
HTML5 (Semantic structure)

CSS3 (Flexbox, CSS Grid, Glassmorphism, Animations)

JavaScript (DOM manipulation, LocalStorage, Event Listeners)
