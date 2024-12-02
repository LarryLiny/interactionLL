document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-btn');
    const resizeHandle = document.querySelector('.resize-handle');
    const rightSection = document.querySelector('.right-section');

    // 聊天功能
    function addMessage(text, type) {
        const li = document.createElement('li');
        li.className = `message ${type}`;
        li.textContent = text;
        chatMessages.appendChild(li);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    async function handleUserInput() {
        const text = userInput.value.trim();
        if (!text) return;

        addMessage(`你：${text}`, 'user');
        userInput.value = '';

        await new Promise(resolve => setTimeout(resolve, 1000));
        const edisonResponse = `作为一个发明家，我认为${text}这个问题很有趣。在我的时代，我们...`;
        addMessage(`爱迪生：${edisonResponse}`, 'bot');
    }

    // 拖动调整功能
    function initializeResizeHandler() {
        let startY = 0;
        let startHeight = 0;

        function onMouseDown(e) {
            e.preventDefault();
            startY = e.type === 'mousedown' ? e.clientY : e.touches[0].clientY;
            startHeight = rightSection.offsetHeight;
            
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('touchmove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
            document.addEventListener('touchend', onMouseUp);
        }

        function onMouseMove(e) {
            e.preventDefault();
            const currentY = e.type === 'mousemove' ? e.clientY : e.touches[0].clientY;
            const diff = startY - currentY;
            
            // 限制高度在30%到70%之间
            const minHeight = window.innerHeight * 0.3;
            const maxHeight = window.innerHeight * 0.7;
            const newHeight = Math.min(Math.max(startHeight + diff, minHeight), maxHeight);
            
            rightSection.style.height = `${newHeight}px`;
        }

        function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('touchmove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('touchend', onMouseUp);
        }

        // 添加触摸和鼠标事件监听
        resizeHandle.addEventListener('mousedown', onMouseDown);
        resizeHandle.addEventListener('touchstart', onMouseDown);
    }

    // 事件监听器
    sendButton.addEventListener('click', handleUserInput);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleUserInput();
        }
    });

    // 初始化拖动功能
    initializeResizeHandler();
}); 