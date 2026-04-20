document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const chatList = document.getElementById("chatList");
    const chatBox = document.getElementById("chatBox");
    const backBtn = document.getElementById("backBtn");
    const messageBox = document.getElementById("messageBox");
    const mainInput = document.getElementById("mainInput");
    const sendBtn = document.getElementById("sendBtn");
    const sendIcon = document.getElementById("sendIcon");
    const chatUserName = document.getElementById("chatUserName");
    const chatUserImg = document.getElementById("chatUserImg");
    const statusText = document.querySelector(".status-text");

    let currentChatBlock = null;

    // Chat data (Mock initial messages)
    const chatHistory = {
        "Jaani": [{ text: "How to create a instagram id", type: "incoming", time: "10:00" }],
        "Renuka": [{ text: "Kaise h bhaiya", type: "incoming", time: "02:20" }],
        "Jay": [{ text: "Project kiya", type: "incoming", time: "12:07" }],
        "arshifa": [{ text: "I love you", type: "incoming", time: "12:00" }],
        "Sayista": [{ text: "Hello", type: "incoming", time: "01:00" }],
        "anushka sen": [{ text: "Hello baby", type: "incoming", time: "03:00" }]
    };

    // Open Chat System
    const initChatListeners = () => {
        const chatBlocks = document.querySelectorAll(".chatlist .block");
        chatBlocks.forEach(block => {
            block.addEventListener("click", () => {
                const name = block.getAttribute("data-name");
                const img = block.getAttribute("data-img");
                if (!name) return; // Skip if it's a non-chat block

                currentChatBlock = block;
                
                // Update Header
                chatUserName.innerText = name;
                chatUserImg.src = img;
                statusText.innerText = "Online";
                
                // Highlight active chat
                chatBlocks.forEach(b => b.classList.remove("active"));
                block.classList.add("active");
                
                // Reset Badge
                const badge = block.querySelector(".badge");
                if (badge) {
                    badge.style.display = "none";
                    block.classList.remove("unread");
                }
                
                // Load Messages
                loadMessages(name);
                
                // Show ChatBox
                chatBox.classList.add("show");
                
                // Focus input
                setTimeout(() => mainInput.focus(), 300);
            });
        });
    };

    initChatListeners();

    // Close Chat
    backBtn.addEventListener("click", () => {
        chatBox.classList.remove("show");
        if (currentChatBlock) {
            currentChatBlock.classList.remove("active");
        }
    });

    // Load Messages Function
    function loadMessages(name) {
        messageBox.innerHTML = "";
        const messages = chatHistory[name] || [];
        messages.forEach(msg => {
            addMessageToUI(msg.text, msg.type, msg.time);
        });
        scrollToBottom();
    }

    // Add Message to UI
    function addMessageToUI(text, type, time) {
        const msgDiv = document.createElement("div");
        msgDiv.className = `message ${type}`;
        msgDiv.innerHTML = `${text}<span class="time">${time}</span>`;
        messageBox.appendChild(msgDiv);
        scrollToBottom();
    }

    // Send Message System
    function sendMessage() {
        const text = mainInput.value.trim();
        if (!text || !currentChatBlock) return;

        const now = new Date();
        const timeStr = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
        const name = chatUserName.innerText;

        // Add to history
        if (!chatHistory[name]) chatHistory[name] = [];
        chatHistory[name].push({ text, type: "outgoing", time: timeStr });

        // Update UI
        addMessageToUI(text, "outgoing", timeStr);
        mainInput.value = "";
        updateChatList(currentChatBlock, text, timeStr);
        
        // Switch back to mic icon
        sendIcon.setAttribute("name", "mic");
        
        // Auto Reply Simulation
        simulateReply(name);
    }

    // Handle Enter and Send Click
    mainInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendMessage();
    });

    sendBtn.addEventListener("click", sendMessage);

    // Dynamic Icon Switch (Mic to Send)
    mainInput.addEventListener("input", () => {
        if (mainInput.value.trim().length > 0) {
            sendIcon.setAttribute("name", "send");
        } else {
            sendIcon.setAttribute("name", "mic");
        }
    });

    // Scroll Behavior
    function scrollToBottom() {
        messageBox.scrollTop = messageBox.scrollHeight;
    }

    // Update Chat List (Preview, Time, Position)
    function updateChatList(block, text, time) {
        const preview = block.querySelector(".message_p p");
        const timeEl = block.querySelector(".time");
        
        if (preview) preview.innerText = text;
        if (timeEl) timeEl.innerText = time;
        
        // Move to top
        chatList.prepend(block);
    }

    // Auto Reply Simulation
    function simulateReply(name) {
        statusText.innerText = "typing...";
        
        setTimeout(() => {
            const replies = [
                "That's interesting!",
                "Cool, tell me more.",
                "Haha, I agree!",
                "I'll get back to you soon.",
                "Let's catch up later.",
                "Okay! 👍"
            ];
            const replyText = replies[Math.floor(Math.random() * replies.length)];
            const now = new Date();
            const timeStr = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;

            // Add to history
            if (!chatHistory[name]) chatHistory[name] = [];
            chatHistory[name].push({ text: replyText, type: "incoming", time: timeStr });

            // If chat is open, show in UI
            if (chatBox.classList.contains("show") && chatUserName.innerText === name) {
                addMessageToUI(replyText, "incoming", timeStr);
                statusText.innerText = "Online";
            } else {
                // Update badge if chat is closed
                updateBadge(name);
            }
            
            // Update List Preview
            const block = document.querySelector(`.block[data-name="${name}"]`);
            if (block) updateChatList(block, replyText, timeStr);
            
        }, 1500);
    }

    function updateBadge(name) {
        const block = document.querySelector(`.block[data-name="${name}"]`);
        if (block) {
            const badge = block.querySelector(".badge");
            if (badge) {
                let count = parseInt(badge.innerText) || 0;
                badge.innerText = count + 1;
                badge.style.display = "flex";
                block.classList.add("unread");
            }
        }
    }
});
