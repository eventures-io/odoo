/** @odoo-module **/

import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { ChatInput } from "./chat_input";

class RagbotChat extends Component {
    static template = "rag_bot.ChatView";
    static components = {ChatInput}
}

registry.category("actions").add("rag_bot.chat", RagbotChat);