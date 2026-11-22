import { createElement as h } from 'react';
export const Card=p=>h('div',{className:'card '+(p.c||''),style:p.style,onClick:p.onClick},p.children);
export const Toggle=p=>h('div',{className:'row sp'},h('div',null,h('div',null,p.label),p.sub&&h('div',{className:'mu'},p.sub)),h('button',{className:'tg'+(p.on?' on':''),onClick:()=>p.set(!p.on),'aria-label':p.label}));
export const Empty=p=>h('div',{className:'emp'},h('div',null,p.i),h('div',null,p.t),p.children);
export const Demo=()=>h('div',{className:'ban'},'DEMO MODE — Instagram is not connected. Automations are stored only on this device and no comments are read and no DMs are sent.');
