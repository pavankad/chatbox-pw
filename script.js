class ChatBox {
    constructor() {
        this.initializeElements();
        this.bindEvents();
        this.messageCount = 0;
        this.isMinimized = false;
        this.botResponses = [
            "That's interesting! Tell me more.",
            "I understand. How can I help you with that?",
            "Great question! Let me think about that.",
            "I'm here to help. What would you like to know?",
            "Thanks for sharing that with me.",
            "That sounds important. Can you elaborate?",
            "I see what you mean. What's your next step?",
            "Interesting perspective! What do you think about...?",
            "I'm listening. Please continue.",
            "That's a good point. Have you considered...?"
        ];
    }

    initializeElements() {
        // Chat elements
        this.chatContainer = document.getElementById('chatContainer') || document.querySelector('.chat-container');
        this.chatMessages = document.getElementById('chatMessages');
        this.messageInput = document.getElementById('messageInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.typingIndicator = document.getElementById('typingIndicator');
        
        // Control buttons
        this.minimizeBtn = document.getElementById('minimizeBtn');
        this.closeBtn = document.getElementById('closeBtn');
        this.chatToggle = document.getElementById('chatToggle');
        this.notificationBadge = document.getElementById('notificationBadge');
        
        // Action buttons
        this.emojiBtn = document.getElementById('emojiBtn');
        this.attachBtn = document.getElementById('attachBtn');
        this.hraBtn = document.getElementById('hraBtn');
        this.newTaskBtn = document.getElementById('newTaskBtn');
        
        // Task form elements
        this.taskFormOverlay = document.getElementById('taskFormOverlay');
        this.taskForm = document.querySelector('.task-form');
        this.closeFormBtn = document.getElementById('closeFormBtn');
        this.cancelTaskBtn = document.getElementById('cancelTaskBtn');
        this.submitTaskBtn = document.getElementById('submitTaskBtn');
        this.taskType = document.getElementById('taskType');
        this.taskDate = document.getElementById('taskDate');
    }

    bindEvents() {
        // Send message events
        this.sendBtn?.addEventListener('click', () => this.handleSendMessage());
        this.messageInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleSendMessage();
            }
        });

        // Input events
        this.messageInput?.addEventListener('input', () => this.handleInputChange());

        // Control events
        this.minimizeBtn?.addEventListener('click', () => this.minimizeChat());
        this.closeBtn?.addEventListener('click', () => this.closeChat());
        this.chatToggle?.addEventListener('click', () => this.showChat());

        // Action button events
        this.emojiBtn?.addEventListener('click', () => this.handleEmojiClick());
        this.attachBtn?.addEventListener('click', () => this.handleAttachClick());
        this.hraBtn?.addEventListener('click', () => this.handleHRAClick());
        this.newTaskBtn?.addEventListener('click', () => this.handleNewTaskClick());
        
        // Task form events
        this.closeFormBtn?.addEventListener('click', () => this.closeTaskForm());
        this.cancelTaskBtn?.addEventListener('click', () => this.closeTaskForm());
        this.submitTaskBtn?.addEventListener('click', () => this.handleTaskSubmit());
        this.taskFormOverlay?.addEventListener('click', (e) => {
            if (e.target === this.taskFormOverlay) {
                this.closeTaskForm();
            }
        });
        
        // Prevent form clicks from closing the modal
        this.taskForm?.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        
        // Form input events
        this.taskType?.addEventListener('change', () => this.validateTaskForm());
        this.taskDate?.addEventListener('change', () => this.validateTaskForm());
        
        // Keyboard events for task form
        this.taskFormOverlay?.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeTaskForm();
            } else if (e.key === 'Enter' && !this.submitTaskBtn?.disabled) {
                this.handleTaskSubmit();
            }
        });

        // Focus input when chat is clicked
        this.chatContainer?.addEventListener('click', () => {
            if (!this.isMinimized) {
                this.messageInput?.focus();
            }
        });
    }

    handleSendMessage() {
        const message = this.messageInput?.value.trim();
        if (!message) return;

        // Add user message
        this.addMessage(message, 'user');
        
        // Clear input
        this.messageInput.value = '';
        this.updateSendButton();

        // Show typing indicator and simulate bot response
        this.showTypingIndicator();
        this.simulateBotResponse();
    }

    addMessage(text, sender) {
        if (!this.chatMessages) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        avatarDiv.innerHTML = sender === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        const textDiv = document.createElement('div');
        textDiv.className = 'message-text';
        textDiv.textContent = text;
        
        const timeDiv = document.createElement('div');
        timeDiv.className = 'message-time';
        timeDiv.textContent = this.getCurrentTime();
        
        contentDiv.appendChild(textDiv);
        contentDiv.appendChild(timeDiv);
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);
        
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
        
        this.messageCount++;
        this.updateNotificationBadge();
    }

    showTypingIndicator() {
        if (this.typingIndicator) {
            this.typingIndicator.classList.add('show');
            this.scrollToBottom();
        }
    }

    hideTypingIndicator() {
        if (this.typingIndicator) {
            this.typingIndicator.classList.remove('show');
        }
    }

    simulateBotResponse() {
        // Simulate typing delay
        const typingTime = Math.random() * 2000 + 1000; // 1-3 seconds
        
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.botResponses[Math.floor(Math.random() * this.botResponses.length)];
            this.addMessage(response, 'bot');
        }, typingTime);
    }

    handleInputChange() {
        this.updateSendButton();
    }

    updateSendButton() {
        if (!this.sendBtn || !this.messageInput) return;
        
        const hasText = this.messageInput.value.trim().length > 0;
        this.sendBtn.disabled = !hasText;
        this.sendBtn.style.opacity = hasText ? '1' : '0.5';
    }

    minimizeChat() {
        if (!this.chatContainer || !this.chatToggle) return;
        
        this.chatContainer.classList.add('minimized');
        this.chatToggle.classList.add('show');
        this.isMinimized = true;
    }

    showChat() {
        if (!this.chatContainer || !this.chatToggle) return;
        
        this.chatContainer.classList.remove('minimized');
        this.chatToggle.classList.remove('show');
        this.isMinimized = false;
        this.messageInput?.focus();
        this.hideNotificationBadge();
    }

    closeChat() {
        if (!this.chatContainer) return;
        
        this.chatContainer.style.display = 'none';
        // In a real application, you might want to save the chat state
        console.log('Chat closed');
    }

    handleEmojiClick() {
        // Simple emoji insertion
        const emojis = ['😊', '😂', '🤔', '👍', '❤️', '🎉', '🔥', '💯'];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        
        if (this.messageInput) {
            const currentValue = this.messageInput.value;
            const cursorPos = this.messageInput.selectionStart;
            const newValue = currentValue.slice(0, cursorPos) + randomEmoji + currentValue.slice(cursorPos);
            this.messageInput.value = newValue;
            this.messageInput.focus();
            this.messageInput.setSelectionRange(cursorPos + randomEmoji.length, cursorPos + randomEmoji.length);
            this.updateSendButton();
        }
    }

    handleAttachClick() {
        // Simulate file attachment
        const fileTypes = ['Document', 'Image', 'Video', 'Audio'];
        const randomType = fileTypes[Math.floor(Math.random() * fileTypes.length)];
        
        this.addMessage(`📎 ${randomType} attached`, 'user');
        
        // Simulate bot response to attachment
        setTimeout(() => {
            this.addMessage(`I can see you've shared a ${randomType.toLowerCase()}. How can I help you with it?`, 'bot');
        }, 1000);
    }

    handleHRAClick() {
        // Handle HRA (Health Risk Assessment) quick action
        this.addMessage('🏥 Health Risk Assessment requested', 'user');
        
        // Show typing indicator and simulate bot response
        this.showTypingIndicator();
        setTimeout(() => {
            this.hideTypingIndicator();
            this.addMessage('I\'ll help you with your Health Risk Assessment. Let me gather some information about your current health status and lifestyle factors.', 'bot');
        }, 1500);
    }

    handleSDOHClick() {
        // Handle SDOH (Social Determinants of Health) quick action
        this.addMessage('🏠 Social Determinants of Health inquiry', 'user');
        
        // Show typing indicator and simulate bot response
        this.showTypingIndicator();
        setTimeout(() => {
            this.hideTypingIndicator();
            this.addMessage('I\'ll assist you with Social Determinants of Health information. This includes factors like housing, education, income, and community resources that affect your health.', 'bot');
        }, 1500);
    }

    handleNewTaskClick() {
        // Show the task form modal
        this.showTaskForm();
    }

    showTaskForm() {
        if (this.taskFormOverlay) {
            this.taskFormOverlay.classList.add('show');
            // Reset form
            this.resetTaskForm();
            // Focus on first input
            setTimeout(() => {
                this.taskType?.focus();
            }, 100);
        }
    }

    closeTaskForm() {
        if (this.taskFormOverlay) {
            this.taskFormOverlay.classList.remove('show');
            this.resetTaskForm();
        }
    }

    resetTaskForm() {
        if (this.taskType) this.taskType.value = '';
        if (this.taskDate) this.taskDate.value = '';
        this.validateTaskForm();
    }

    validateTaskForm() {
        if (!this.submitTaskBtn || !this.taskType || !this.taskDate) return;
        
        const isValid = this.taskType.value && this.taskDate.value;
        this.submitTaskBtn.disabled = !isValid;
    }

    handleTaskSubmit() {
        if (!this.taskType || !this.taskDate) return;
        
        const type = this.taskType.value;
        const date = this.taskDate.value;
        
        if (!type || !date) {
            return;
        }
        
        // Format the date for display
        const formattedDate = new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Add user message with task details
        this.addMessage(`📋 New ${type} task created for ${formattedDate}`, 'user');
        
        // Close the form
        this.closeTaskForm();
        
        // Show typing indicator and simulate bot response
        this.showTypingIndicator();
        setTimeout(() => {
            this.hideTypingIndicator();
            this.addMessage(`Perfect! I've created a new ${type} task scheduled for ${formattedDate}. I'll make sure to remind you as the date approaches.`, 'bot');
        }, 1500);
    }

    scrollToBottom() {
        if (this.chatMessages) {
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        }
    }

    getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    updateNotificationBadge() {
        if (this.isMinimized && this.notificationBadge) {
            this.notificationBadge.textContent = this.messageCount;
            this.notificationBadge.classList.remove('hide');
        }
    }

    hideNotificationBadge() {
        if (this.notificationBadge) {
            this.notificationBadge.classList.add('hide');
            this.messageCount = 0;
        }
    }

    // Public methods for external interaction
    sendMessage(text) {
        if (text && text.trim()) {
            this.addMessage(text.trim(), 'user');
            this.showTypingIndicator();
            this.simulateBotResponse();
        }
    }

    addBotMessage(text) {
        if (text && text.trim()) {
            this.addMessage(text.trim(), 'bot');
        }
    }

    clearChat() {
        if (this.chatMessages) {
            this.chatMessages.innerHTML = `
                <div class="message bot-message">
                    <div class="message-avatar">
                        <i class="fas fa-robot"></i>
                    </div>
                    <div class="message-content">
                        <div class="message-text">Hello! How can I help you today?</div>
                        <div class="message-time">${this.getCurrentTime()}</div>
                    </div>
                </div>
            `;
        }
        this.messageCount = 0;
        this.hideNotificationBadge();
    }
}

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.chatBox = new ChatBox();
    
    // Optional: Add some demo functionality
    console.log('ChatBox initialized! You can interact with it using:');
    console.log('chatBox.sendMessage("Hello from console!")');
    console.log('chatBox.addBotMessage("Bot message from console!")');
    console.log('chatBox.clearChat()');
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChatBox;
}
