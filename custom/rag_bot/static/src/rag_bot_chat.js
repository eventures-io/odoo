/** @odoo-module **/

import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";

class RagbotChat extends Component {
    static template = "rag_bot.ChatView";
}

registry.category("actions").add("rag_bot.chat", RagbotChat);