<?php
    session_start();
    include_once('authenticate.php');
    $chatId = isset($_GET['chat_id']) ? $_GET['chat_id'] : null;
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles/messagePage.css?v=<?php echo time(); ?>">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <script src="https://cdn.socket.io/4.5.4/socket.io.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <title>Messages</title>
</head>
<body>
    <?php include('templates/navbar.php'); ?>
    <section class="background">
        <div class="inbox-container">
            <div class="search-inbox-container">
                <input type="text" name="searchInbox" id="searchInbox" placeholder="Search">
            </div>
            <div class="last-chat-header">
                <h3>Last Chats</h3>
            </div>
            <div class="inbox" id="inbox">
                <!-- diri sulod ang inbox sa previous messages sa friend or if walay msg friends lang -->
            </div>
        </div>
        <div class="main-message-container">
            <div class="main-message">
                <!-- container for chats -->
            </div>
            <div class="send-message-container">
                <div class="activity">
                    <h3>
                        <!-- container for activity -->
                    </h3>
                </div>
                <div class="send-message">
                    <div class="type-message">
                        <form action="">
                        <input type="hidden" name="sender_id" id="sender_id" value="<?php echo htmlspecialchars($_SESSION['currentUserId']); ?>">
                        <input type="hidden" name="chat_id" id="chat_id" value="<?php echo htmlspecialchars($chatId); ?>">
                        <textarea name="message" id="message" placeholder="Type a message..." rows="1" ></textarea>
                        </form>
                    </div>
                    <button class="send-icon" id="sendBtn">
                        <img src="images/icons/send_icon.png" alt="send">
                    </button>
                    <button class="send-attachment" id="sendAttachmentBtn">
                        <img src="images/icons/add_attachment_icon.png" alt="add_file">
                    </button>
                </div>
            </div>
        </div>
        <div class="message-info-container">
            <div class="profile-container">
                <div class="profile">
                    <img src="images/profile_img/default_profile.jpg" alt="profile">
                    <div class="online">
                    </div>
                </div>
                <div class="profileName">
                    <h2>James Oliver</h2>
                </div>
            </div>
            <div class="extras">
            <button class="create-chat">
                <h2>Create a group </h2>
            </button>
            </div>
        </div>
    </section>
    <script src="jsFiles/inboxLoader.js"></script>
    <script src="jsFiles/frontendMessageHandler.js"></script>
</body>
</html>