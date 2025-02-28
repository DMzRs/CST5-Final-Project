//to load whenever the messages icon is clicked
document.addEventListener("DOMContentLoaded", function () {
    loadInbox().then(() => loadGroupChats());
    setInterval(reloadChats, 5000); // Reload both inbox and group chats every second
});

// Function to reload both private and group chats
function reloadChats() {
    loadInbox().then(() => loadGroupChats());
}

// Function to search inbox messages
function searchInbox() {
    const searchInput = document.getElementById("searchInbox").value.toLowerCase();
    const chatItems = document.querySelectorAll("#inbox .last-message");

    chatItems.forEach(chat => {
        const chatName = chat.querySelector(".names-msg h3").innerText.toLowerCase();
        const lastMessage = chat.querySelector(".names-msg h4").innerText.toLowerCase();

        if (chatName.includes(searchInput) || lastMessage.includes(searchInput)) {
            chat.style.display = "flex"; // Show matching chats
        } else {
            chat.style.display = "none"; // Hide non-matching chats
        }
    });
}

// Attach event listener to the search bar
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInbox");
    if (searchInput) {
        searchInput.addEventListener("input", searchInbox);
    }
});

//fucntion to load private messages
function loadInbox() {
    return fetch("../SQL/dbquery/inbox.php")
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error("Error:", data.error);
                return;
            }
            displayInbox(data);
            
            // Automatically select the first chat if chat_id is not set
            if (data.length > 0) {
                const firstChatId = data[0].chat_id;
                if (!getChatIdFromURL()) {
                    openChat(firstChatId);
                }
            }
        })
        .catch(error => console.error("Fetch Error:", error));
}

// Function to get chat_id from URL
function getChatIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("chat_id");
}

//function to load group chat
function loadGroupChats() {
    fetch("../SQL/dbquery/inboxGroup.php")
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error("Error:", data.error);
                return;
            }
            displayGroups(data);
        })
        .catch(error => console.error("Fetch Error:", error));
}

// Display private messages
function displayInbox(inbox) {
    const inboxContainer = document.getElementById("inbox");
    inboxContainer.innerHTML = ""; // Clear previous content

    if (inbox.length === 0) {
        inboxContainer.innerHTML = "<p>No recent chats</p>";
        return;
    }

    inbox.forEach(user => {
        const profilePic = user.profile_picture 
            ? `${user.profile_picture}` 
            : "images/profile_img/default_profile.jpg"; // Default profile picture

        const lastMessage = user.latest_message 
            ? (user.latest_message.length > 20 
                ? user.latest_message.substring(0, 20) + "..." 
                : user.latest_message) 
            : "No messages yet";
        const messageTime = user.message_timestamp ? formatDate(user.message_timestamp) : ""; // Avoid formatting null timestamps

        const chatItem = document.createElement("div");
        chatItem.classList.add("last-message");

        chatItem.innerHTML = `
            <div class="img-container">
                <img src="${profilePic}" alt="${user.firstName}" class="profile-pic">
            </div>
            <div class="names-msg">
                <h3>${user.firstName} ${user.lastName}</h3>
                <h4>${lastMessage}</h4>
            </div>
            <div class="timeSent">
                <h4>${messageTime}</h4>
            </div>
        `;

        chatItem.addEventListener("click", function () {
            openChat(user.chat_id);
        });

        inboxContainer.appendChild(chatItem);
    });
}

// Display group chats
function displayGroups(groups) {
    const inboxContainer = document.getElementById("inbox");

    if (groups.length === 0) {
        inboxContainer.innerHTML += ""; // Append instead of replacing
        return;
    }

    groups.forEach(group => {
        const groupPic = group.group_picture 
            ? `${group.group_picture}`  
            : "images/group_img/default_group.jpg"; // Default group picture

        const latestMessage = group.latest_message 
            ? (group.latest_message.length > 20 
                ? group.latest_message.substring(0, 20) + "..." 
                : group.latest_message) 
            : "No messages yet";
    
        const timestamp = group.message_timestamp ? formatDate(group.message_timestamp) : "";

        const chatItem = document.createElement("div");
        chatItem.classList.add("last-message");

        chatItem.innerHTML = `
            <div class="img-container">
                <img src="${groupPic}" alt="${group.chat_name}" class="profile-pic">
            </div>
            <div class="names-msg">
                <h3>${group.chat_name}</h3>
                <h4>${latestMessage}</h4>
            </div>
            <div class="timeSent">
                ${timestamp ? `<h4>${timestamp}</h4>` : ""}
            </div>
        `;

        chatItem.addEventListener("click", function () {
            openChat(group.chat_id);
        });

        inboxContainer.appendChild(chatItem);
    });
}


function formatDate(timestamp) {
    if (!timestamp) return "No messages yet";
    const date = new Date(timestamp);
    return date.toISOString().split("T")[0]; // Extracts YYYY-MM-DD
}

function openChat(chatId) {
    window.location.href = `messagePage.php?chat_id=${chatId}`;
}
