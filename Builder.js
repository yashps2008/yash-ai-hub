import { createElement as h, useState } from 'react';
import { Card, Toggle, Demo } from './ui.js';
import { uid, okUrl, norm } from '../lib/util.js';

export const blank=()=>({id:uid(),name:'',post:'Select post/reel…',trigger:'keyword',keywords:[],dm:true,follow:false,msg:'Hey! Thanks for commenting 🙌 Here are the links you asked for:',links:[],enabled:false});
export function Builder({init,save,cancel,del,isNew,say}){
  const [d,setD]=useState(init),[kw,setKw]=useState(''),[cd,setCd]=useState(false);
  const up=o=>setD(x=>({...x,...o}));
  const addKw=()=>{const ks=kw.split(',').map(x=>x.trim().toLowerCase()).filter(Boolean);if(!ks.length)return;const nw=[...new Set(ks)].filter(k=>!d.keywords.includes(k));if(!nw.length)return say('Keyword already added');up({keywords:[...d.keywords,...nw]});setKw('')};
  const setL=(i,o)=>up({links:d.links.map((l,j)=>j==i?{...l,...o}:l)});
  const mv=(i,n)=>{const a=[...d.links];if(n<0||n>=a.length)return;[a[i],a[n]]=[a[n],a[i]];up({links:a})};
  const go=()=>{
    if(!d.name.trim())return say('Give the automation a name');
    if(d.trigger=='keyword'&&!d.keywords.length)return say('Add at least one keyword');
    if(d.post.startsWith('Select'))return say('Choose a post/reel placeholder');
    const links=d.links.map(l=>({...l,title:l.title.trim(),url:norm(l.url.trim())}));
    for(const l of links)if(!l.title||!okUrl(l.url))return say('Each link needs a title and a valid URL');
    save({...d,name:d.name.trim(),links});
  };
  return h('div',{className:'page gap'},
    h('div',{className:'row sp'},h('h1',null,isNew?'New Automation':'Edit Automation'),h('button',{className:'btn gh sm',onClick:cancel},'← Back')),h(Demo),
    h(Card,{c:'gap'},
      h('label',{className:'f'},'Automation name',h('input',{className:'in',value:d.name,placeholder:'e.g. Free guide giveaway',onChange:e=>up({name:e.target.value})})),
      h('label',{className:'f'},'Post / reel (placeholder — no account connected)',h('select',{className:'in',value:d.post,onChange:e=>up({post:e.target.value})},['Select post/reel…','Demo Reel #1','Demo Reel #2','Demo Post #1','Demo Post #2'].map(o=>h('option',{key:o,style:{background:'#111'}},o))))),
    h(Card,{c:'gap'},h('h2',null,'Trigger'),
      h('div',{className:'row'},[['keyword','Keyword match'],['any','Any comment']].map(t=>h('button',{key:t[0],className:'btn sm'+(d.trigger==t[0]?'':' gh'),onClick:()=>up({trigger:t[0]})},t[1]))),
      d.trigger=='keyword'&&h('div',{className:'gap'},h('div',{className:'row'},h('input',{className:'in',value:kw,placeholder:'Type keyword, press Enter',onChange:e=>setKw(e.target.value),onKeyDown:e=>e.key=='Enter'&&addKw()}),h('button',{className:'btn gh',onClick:addKw},'Add')),
        h('div',{className:'row wr'},d.keywords.length?d.keywords.map(k=>h('span',{key:k,className:'chip'},k,h('button',{onClick:()=>up({keywords:d.keywords.filter(x=>x!=k)})},'✕'))):h('span',{className:'mu'},'No keywords yet.')))),
    h(Card,{c:'gap'},h(Toggle,{label:'Send initial DM',sub:'Message sent to the commenter',on:d.dm,set:v=>up({dm:v})}),h(Toggle,{label:'Follow verification (optional)',sub:'Ask the user to follow before sending links',on:d.follow,set:v=>up({follow:v})}),h(Toggle,{label:'Enabled',sub:'Demo flag only — nothing is sent',on:d.enabled,set:v=>up({enabled:v})})),
    h(Card,{c:'gap'},h('h2',null,'DM message'),h('textarea',{className:'in',rows:4,value:d.msg,onChange:e=>up({msg:e.target.value})})),
    h(Card,{c:'gap'},h('div',{className:'row sp'},h('h2',null,'Links ('+d.links.length+'/10)'),h('button',{className:'btn gh sm',disabled:d.links.length>=10,onClick:()=>up({links:[...d.links,{id:uid(),title:'',url:'',desc:''}]})},'+ Add link')),
      d.links.length?d.links.map((l,i)=>h('div',{key:l.id,className:'lk'},
        h('input',{className:'in',placeholder:'Title',value:l.title,onChange:e=>setL(i,{title:e.target.value})}),
        h('input',{className:'in',placeholder:'https://…',value:l.url,style:l.url&&!okUrl(norm(l.url.trim()))?{borderColor:'#f43f5e'}:null,onChange:e=>setL(i,{url:e.target.value})}),
        h('input',{className:'in',placeholder:'Description (optional)',value:l.desc,onChange:e=>setL(i,{desc:e.target.value})}),
        h('div',{className:'row'},h('button',{className:'btn gh sm','aria-label':'Move up',disabled:i==0,onClick:()=>mv(i,i-1)},'↑'),h('button',{className:'btn gh sm','aria-label':'Move down',disabled:i==d.links.length-1,onClick:()=>mv(i,i+1)},'↓'),h('button',{className:'btn dg sm',onClick:()=>up({links:d.links.filter((_,j)=>j!=i)})},'Delete')))):h('div',{className:'mu'},'No links yet. Add up to 10.')),
    h(Card,{c:'gap'},h('h2',null,'DM preview'),
      d.dm?h('div',{className:'dm'},h('div',{className:'m'},d.msg||'(empty message)'),d.follow&&h('div',{className:'l mu'},'☑ “Follow to unlock links” step'),d.links.map(l=>h('div',{key:l.id,className:'l'},h('div',{style:{fontWeight:600}},l.title||'Untitled link'),h('div',{className:'mu'},l.desc),h('div',{style:{color:'var(--b)',fontSize:12,wordBreak:'break-all'}},l.url||'https://…')))):h('div',{className:'mu'},'Initial DM is off.')),
    h('div',{className:'row wr'},h('button',{className:'btn',onClick:go},'Save automation'),!isNew&&h('button',{className:'btn dg',onClick:()=>cd?del(d.id):(setCd(true),say('Tap again to confirm delete'))},cd?'Confirm delete':'Delete')));
}
