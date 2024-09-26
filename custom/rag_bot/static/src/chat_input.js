/** @odoo-module **/

import { Component, useState, onMounted, useRef } from "@odoo/owl";

function extractContent(responseString) {
        const contentMatch = responseString.match(/content="([^"]*)"/);
        return contentMatch ? contentMatch[1] : responseString;
}

function formatTextWithLineBreaks(text) {
    return text.replace(/\n/g, '<br>'); 
}
    
export class ChatInput extends Component {
    static template = "rag_bot.InputView";

    setup() {
        this.state = useState({ chatInputText: "", responseText: ""  });
        this.inputRef = useRef('inputRef');
        this.outputRef = useRef('responseRef');

        onMounted(() => {
            console.log("Component mounted, state initialized:", this.state);
            console.log("Component mounted, inputRef:", this.inputRef);
        });
    }

    async submitInput(ev) {
        ev.preventDefault(); // Prevent default action of adding a newline does not work
        if (ev.key === 'Enter') {
         
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
                const jsonResponse = await response.json();
                console.log('Backend response:', jsonResponse);
                    // Update the state with the response to display it in the UI
                    if (jsonResponse.result.status === "success") {
                        this.state.responseText = extractContent(jsonResponse.result.response);
                    } else {
                        this.state.responseText = "Error processing input.";
                    }
    
                    // Clear the input field
                    this.inputRef.el.value = ""; 
                    this.outputRef.el.innerHTML = formatTextWithLineBreaks(this.state.responseText)

                    // Display the content in an HTML element (responseRef)
                    // document.querySelector('[t-ref="responseRef"]').textContent = extractContent(responseString);
            } catch (error) {
                console.error('Error sending input to backend:', error);
            }
          
        }
    }
}
