/** @odoo-module **/

import { Component, useState, onMounted, useRef } from "@odoo/owl";

export class ChatInput extends Component {
    static template = "rag_bot.InputView";

    setup() {
        this.state = useState({ chatInputText: "tadaa" });
        this.inputRef = useRef('inputRef');

        onMounted(() => {
            console.log("Component mounted, state initialized:", this.state);
            console.log("Component mounted, inputRef:", this.inputRef);
        });
    }

    submitInput(ev) {
        if (ev.key === 'Enter') {
            ev.preventDefault(); // Prevent default action of adding a newline
            console.log('ev', ev);
            this.state.chatInputText = ev.target.value;
            console.log("state updated:", this.state);
          
        }
    }
}

// ChatInput.template = "rag_bot.InputView";