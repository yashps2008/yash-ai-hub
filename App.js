import { createElement as h, Fragment, useState, useEffect } from 'react';
import { uid, AC, useLS } from './util.js';
import { reply } from './assistant.js';
import { Dash } from './Dash.js';
import { Chat } from './Chat.js';
import { IG } from './IG.js';
import { Builder, blank } from './Builder.js';
import { Settings } from './Settings.js';

export default function App(){
  const [view,setView]=useState('dash'),[draft,setDraft]=useState(null);
  const [prof,setProf]=useLS('yah_prof',{name:'Yash',accent:'violet'}),[autos,setAutos]=useLS('yah_autos',[]),[chats,setChats]=useLS('yah_chats',[]),[log,setLog]=useLS('yah_log',[]);
  const [cid,setCid]=useState(null),[toast,setToast]=useState(null);
  const say=m=>{setToast(m);clearTimeout(window._t);window._t=setTimeout(()=>setToast(null),2200)};
  const lg=t=>setLog(l=>[{id:uid(),t,at:Date.now()},...l].slice(0,50));
  useEffect(()=>{const a=AC[prof.accent]||AC.violet,r=document.documentElement.style;r.setProperty('--a',a[0]);r.setProperty('--b',a[1])},[prof.accent]);
  const go=v=>{setView(v);setDraft(null)};
  const newAuto=()=>{setDraft({d:blank(),isNew:true});setView('build')};
  const patch=(id,f)=>setChats(cs=>cs.map(c=>c.id==id?f(c):c));
  const send=text=>{let id=cid;if(!id||!chats.find(c=>c.id==id)){id=uid();setCid(id);setChats(cs=>[{id,title:text.slice(0,30),msgs:[]},...cs])}
    patch(id,c=>({...c,msgs:[...c.msgs,{r:'u',t:text}]}));
    setTimeout(()=>patch(id,c=>({...c,msgs:[...c.msgs,{r:'a',t:reply(text,prof.name,autos)}]})),450)};
  const save=a=>{const ex=autos.some(x=>x.id==a.id);setAutos(xs=>ex?xs.map(x=>x.id==a.id?a:x):[a,...xs]);lg((ex?'Updated':'Created')+' automation “'+a.name+'” (demo)');say('Automation saved');go('ig')};
  const toggle=id=>{const a=autos.find(x=>x.id==id);setAutos(xs=>xs.map(x=>x.id==id?{...x,enabled:!x.enabled}:x));lg((a.enabled?'Disabled':'Enabled')+' “'+a.name+'” (demo flag)');say(a.enabled?'Disabled':'Enabled (demo — nothing is sent)')};
  const del=id=>{const a=autos.find(x=>x.id==id);setAutos(xs=>xs.filter(x=>x.id!=id));lg('Deleted automation “'+(a?a.name:'')+'”');say('Automation deleted');go('ig')};
  const reset=()=>{[setProf,setAutos,setChats,setLog].forEach((s,i)=>s([{name:'Yash',accent:'violet'},[],[],[]][i]));setCid(null);say('All data erased')};
  const nav=[['dash','⌂','Home'],['chat','✦','Assistant'],['ig','◎','Instagram'],['set','⚙','Settings']];
  const cur=view=='build'?'ig':view;
  const page=view=='dash'?h(Dash,{prof,autos,chats,log,go,newAuto}):
    view=='chat'?h(Chat,{chats,cid,setCid,send,clear:()=>{patch(cid,c=>({...c,msgs:[]}));say('Conversation cleared')},del:id=>{setChats(cs=>cs.filter(c=>c.id!=id));if(cid==id)setCid(null);say('Chat deleted')}}):
    view=='ig'?h(IG,{autos,log,newAuto,edit:a=>{setDraft({d:a,isNew:false});setView('build')},toggle,del,clearLog:()=>{setLog([]);say('Log cleared')}}):
    view=='build'&&draft?h(Builder,{key:draft.d.id,init:draft.d,isNew:draft.isNew,save,del,say,cancel:()=>go('ig')}):
    h(Settings,{prof,setProf,reset,say});
  const btn=(n,c)=>h('button',{key:n[0],className:'ni'+(cur==n[0]?' on':''),onClick:()=>go(n[0])},h('span',{style:{fontSize:18}},n[1]),n[2]);
  return h(Fragment,null,
    h('aside',{className:'side'},h('div',{className:'logo'},h('i',null,'✦'),'YASH AI HUB'),nav.map(btn)),
    h('main',{className:'main'},page),
    h('nav',{className:'bot'},nav.map(btn)),
    toast&&h('div',{className:'toast'},toast));
}
