/** @odoo-module **/

import { Component, markup, useState, onMounted } from "@odoo/owl";
import { Counter } from "./counter/counter";
import { Card } from "./card/card";
import { TodoList } from "./todo_list/todo_list";

export class Playground extends Component {
    static template = "awesome_owl.playground";
    static components = { Counter, Card, TodoList };

    setup() {
        this.str1 = "<div class='text-primary'>some content</div>";
        this.str2 = markup("<div class='text-primary'>some content</div>");
        this.sum = useState({ value: 2 });

        onMounted(() => {
            console.log("playground mounted, state initialized:", this.state);
 
        });
    }

    incrementSum() {
        this.sum.value++;
    }
}
