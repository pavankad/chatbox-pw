# ChatBox

A modern, responsive chatbox component built with HTML, CSS, and JavaScript.

## Features

- 💬 Real-time messaging interface
- 🤖 Simulated bot responses
- 📱 Responsive design (mobile-friendly)
- 🎨 Modern gradient design
- ⚡ Smooth animations
- 🔔 Notification badges
- 😊 Emoji support
- 📎 File attachment simulation
- 🌙 Dark mode support
- ⚡ Typing indicators

## Files

- `index.html` - Main HTML structure
- `style.css` - Complete styling with animations and responsive design
- `script.js` - JavaScript functionality and interactions

## How to Use

1. Open `index.html` in your web browser
2. Start typing in the input field
3. Press Enter or click the send button to send messages
4. The bot will automatically respond after a short delay

## Controls

- **Send Message**: Type and press Enter or click the paper plane icon
- **Minimize**: Click the minimize button (-) in the header
- **Close**: Click the close button (×) in the header
- **Emoji**: Click the emoji button to add random emojis
- **Attach**: Click the paperclip to simulate file attachments

## JavaScript API

The chatbox exposes several methods for programmatic control:

```javascript
// Send a message programmatically
chatBox.sendMessage("Hello from code!");

// Add a bot message directly
chatBox.addBotMessage("Response from bot");

// Clear all messages
chatBox.clearChat();
```

## Customization

### Colors
The chatbox uses CSS custom properties and can be easily customized by modifying the gradient colors in the CSS file:

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Bot Responses
You can customize bot responses by modifying the `botResponses` array in `script.js`:

```javascript
this.botResponses = [
    "Your custom response 1",
    "Your custom response 2",
    // Add more responses...
];
```

### Styling
All styles are contained in `style.css` and use modern CSS features like:
- CSS Grid and Flexbox
- CSS Animations
- Custom scrollbars
- Media queries for responsiveness

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Dependencies

- Font Awesome 6.0.0 (for icons)
- No other external dependencies required

## License

This project is open source and available under the MIT License.
# chatbox-pw
