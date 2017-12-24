/*
 * 口也
 *
 * 仿造 pia.js 製作
 */
'use strict';

const BridgeMsg = require('./transport/BridgeMsg.js');

module.exports = (pluginManager, options) => {
    const bridge = pluginManager.plugins.transport;

    const eat = (action, context) => {
        context.reply(`${action} ${context.param}`);

        // 如果開啟了互聯，而且是在公開群組中使用本命令，那麼讓其他群也看見掀桌
        if (bridge && !context.isPrivate) {
            bridge.send(new BridgeMsg(context, {
                text: `${action} ${context.param}`,
                isNotice: true,
            }));
        }

        return Promise.resolve();
    };

    const e = context => eat('🍴（≧□≦）🍴', context);
    const f = context => eat('🐸', context);
    const a = context => eat('🐸💢', context);
    const g = context => eat('🐸👓', context);

    if (bridge) {
        bridge.addCommand('!eat', e, options);
        bridge.addCommand('!frog', f, options);
        bridge.addCommand('!agrfrog', a, options);
        bridge.addCommand('!glssfrog', g, options);
    } else {
        for (let [type, handler] of pluginManager.handlers) {
            handler.addCommand('!eat', e);
            handler.addCommand('!frog', f);
            handler.addCommand('!agrfrog', a);
            handler.addCommand('!glssfrog', g);
        }
    }
};
