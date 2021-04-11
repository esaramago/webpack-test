import Vue from "vue";
import "bootstrap.native";
import component1 from "./components/component1.vue";
import component2 from "./components/component2/component2.vue";

import { Rectangle } from "./components/rectangle";

const square = new Rectangle(10, 10);

const App = new Vue({
    el: "#app",
    components: {
        component1,
        component2
    },
    data: {
        message: `Square area is ${square.area}.`
    }
});