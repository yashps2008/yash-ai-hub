import { createElement as h } from 'react';
import { Card, Empty } from './ui.js';
import { ago } from './util.js';

export function Dash({prof,autos,chats,log,go,newAuto}){
  const hr=new Date().getHours(),g=hr<12?'Good morning':hr<18?'Good afternoon':'Good evening';
  const st=[['Automations',autos.length],['Enabled',autos.filter(a=>a.enabled).length],['Chats',chats.length],['Log events',log.length]];
  const q=[['✦','AI Assistant','Chat with the local demo',()=>go('chat')],['＋','New automation','Open the builder',newAuto],['◎','Instagram','Manage automations',()=>go('ig')],['⚙','Settings','Profile & theme',()=>go('set')]];
  return h('div',{className:'page gap'},
    h('div',null,h('div',{className:'mu'},g),h('h1',null,'Welcome back, '+(prof.name.trim()||'there')),h('div',{className:'mu'},'Your private control center.')),
    h('div',{className:'grid g4'},st.map(x=>h(Card,{key:x[0],c:'stat'},h('b',null,x[1]),h('span',{className:'mu'},x[0])))),
    h('h2',null,'Quick actions'),
    h('div',{className:'grid'},q.map(x=>h(Card,{key:x[1],c:'tap',onClick:x[3]},h('div',{style:{fontSize:22,color:'var(--a)'}},x[0]),h('div',{style:{fontWeight:600}},x[1]),h('div',{className:'mu'},x[2])))),
    h('h2',null,'Recent activity'),
    h(Card,null,log.length?log.slice(0,5).map(l=>h('div',{key:l.id,className:'row sp',style:{padding:'6px 0'}},h('span',{className:'row'},h('i',{className:'dot'}),l.t),h('span',{className:'mu'},ago(l.at)))):h(Empty,{i:'∅',t:'No activity yet. Create an automation or start a chat.'})));
}
