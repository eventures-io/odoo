/** @odoo-module **/

import { Component, useState, onMounted } from "@odoo/owl";

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

    addTodo(ev) {
        if (ev.keyCode === 13 && ev.target.value != "") {
          
            ev.target.value = "";
        }
    }

    submitInput(ev) {
        // if (ev.key === 'Enter') {

            ev.preventDefault(); // Prevent default action of adding a newline
            console.log("Input text:", this.state.chatInputText);
            console.log('ev.key:', ev.key);
            // this.trigger('log-text', { text: this.state.chatInputText });
        // }
    }
}

// ChatInput.template = "rag_bot.InputView";