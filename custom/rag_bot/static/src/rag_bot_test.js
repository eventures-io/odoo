/** @odoo-module **/

import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";

class RagbotTest extends Component {
    static template = "rag_bot.TestView";
}

registry.category("actions").add("rag_bot.test", RagbotTest);