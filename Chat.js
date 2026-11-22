import { createElement as h, useState, useEffect, useRef } from 'react';
import { Card, Empty } from './ui.js';

export function Chat({chats,cid,setCid,send,clear,del}){
  const [txt,setTxt]=useState(''),[hist,setHist]=useState(false),end=useRef();
  const cur=chats.find(c=>c.id===cid),msgs=cur?cur.msgs:[];
  useEffect(()=>{end.current&&end.current.scrollIntoView({behavior:'smooth'})},[msgs.length,cid]);
  const go=()=>{if(!txt.trim())return;send(txt.trim());setTxt('')};
  return h('div',{className:'page cp'},
    h('div',{className:'row sp wr'},h('div',null,h('h1',null,'AI Assistant'),h('span',{className:'tag'},'LOCAL DEMO · rule-based, no AI model')),
      h('div',{className:'row'},h('button',{className:'btn gh sm',onClick:()=>setHist(!hist)},'History ('+chats.length+')'),h('button',{className:'btn sm',onClick:()=>{setCid(null);setHist(false)}},'+ New'),cur&&h('button',{className:'btn dg sm',onClick:clear},'Clear'))),
    hist&&h(Card,{c:'mt',style:{maxHeight:'35vh',overflowY:'auto',flex:'none'}},chats.length?chats.map(c=>h('div',{key:c.id,className:'row sp',style:{padding:'6px 0'}},h('button',{className:'ni',style:{padding:'4px 0',color:c.id==cid?'var(--a)':'var(--tx)'},onClick:()=>{setCid(c.id);setHist(false)}},c.title||'Untitled'),h('button',{className:'btn dg sm',onClick:()=>del(c.id)},'Delete'))):h('div',{className:'mu'},'No saved chats yet.')),
    h('div',{className:'chat mt'},
      h('div',{className:'msgs'},msgs.length?msgs.map((m,i)=>h('div',{key:i,className:'bub '+m.r},m.t)):h(Empty,{i:'✦',t:'Start a conversation. Try “help”, “12*7” or “content ideas”.'}),h('div',{ref:end})),
      h('div',{className:'row'},h('input',{className:'in',placeholder:'Message the local assistant…',value:txt,onChange:e=>setTxt(e.target.value),onKeyDown:e=>e.key=='Enter'&&go()}),h('button',{className:'btn',onClick:go},'Send'))));
}
