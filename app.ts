/// <reference path="mithril.d.ts" />

import * as m from "mithril";
import * as _ from "immutable";

(function() {
    'use strict';

    const controller = function() {
        let messages = m.prop([]);
        let text = m.prop("");

        const pushMessage = function(msg: String) {
            messages().push(msg) // 破壊的変更死ね
            m.redraw.strategy("all")
        }

        const conn = new WebSocket('ws://localhost:9080/room/any?name=someone');

        conn.onopen = function(e) {
            console.log("socket open!");
        }

        conn.onerror = function(e) {
            console.log(e);
            // 何か再接続の処理とか取れば良いのかな
        }
        
        conn.onmessage = function(e) {
            console.log("receive message: " + e.data);
            pushMessage(e.data);
        };

        return {
            messages: messages,
            text: text,

            sendMessage: function() {
                let t = text();
                text("");

                console.log("message " + t + " is sent!")
                conn.send(t);
                pushMessage(t);
            }
        };
    }

    const view = function(ctrl) {
        return m("div", [
            m("div", [
                m("input[type=text]", { oninput: m.withAttr("value", ctrl.text) }),
                m("button", { onclick: ctrl.sendMessage }, "送信")
            ]),
            m("div", [
                m("ul", ctrl.messages().map(msg => // 何かimmutable js使ったら上手く行かなかったので仕方なく
                    m("li", msg)
                ))
            ])
        ]);
    }

    m.mount(document.getElementById("content"), { controller: controller, view: view })
})();