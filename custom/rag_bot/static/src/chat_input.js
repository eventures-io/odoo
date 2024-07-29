/** @odoo-module **/

import { Component, useState, onMounted, useRef } from "@odoo/owl";

export class ChatInput extends Component {
    static template = "rag_bot.InputView";

    setup() {
        this.state = useState({ chatInputText: "" });
        this.inputRef = useRef('inputRef');

        onMounted(() => {
            console.log("Component mounted, state initialized:", this.state);
            console.log("Component mounted, inputRef:", this.inputRef);
        });
    }

    async submitInput(ev) {
        if (ev.key === 'Enter') {
            ev.preventDefault(); // Prevent default action of adding a newline does not work
            console.log('ev', ev);
            this.state.chatInputText = ev.target.value;
            console.log("state updated:", this.state.chatInputText);

            const payload = {params: {input: this.state.chatInputText}};
            console.log('sending json payload: ', JSON.stringify(payload));

            try {
                const response = await fetch('/ragbot/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload)
                });
                const result = await response.json();
                console.log('Backend response:', result);
            } catch (error) {
                console.error('Error sending input to backend:', error);
            }
          
        }
    }
}

// ChatInput.template = "rag_bot.InputView";