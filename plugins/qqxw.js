/*
* 小薇
*
* 仿 qqxiaoice.js 製作
*/

'use strict';

const BridgeMsg = require('./transport/BridgeMsg.js');

module.exports = (pluginManager, options) => {
    const bridge = pluginManager.plugins.transport;

    if (!bridge || !pluginManager.handlers.has('QQ')) {
        return;
    }

    let qqHandler = pluginManager.handlers.get('QQ');
    let command = options.command || '!xw';
    let types = {};

    for (let t in (options.types || {})) {
        let client = BridgeMsg.parseUID(t);
        if (client.uid) {
            types[client.uid] = options.types[t].toLowerCase();
        }
    }

    bridge.addCommand(command, (context) => {
        if (!context.isPrivate) {
            for (let c of context.extra.mapto) {
                let client = BridgeMsg.parseUID(c);
                let qq = null;
                if (client.client === 'QQ') {
                    if (types[client.uid] === 'xiaowei') {
                        qq = '3558435022';
                    }
                    if (qq) {
                        qqHandler.say(client.id, `[CQ:at,qq=${qq}] ${qqHandler.escape(context.param)}`, {
                            noEscape: true,
                        });
                    }
                }
            }
        }
    }, options);
};
