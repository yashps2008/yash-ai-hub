import { createElement as h, useState } from 'react';
import { Card } from './ui.js';
import { AC } from './util.js';

export function Settings({prof,setProf,reset,say}){
  const [sure,setSure]=useState(false);
  const ok=(()=>{try{localStorage.setItem('yah_t','1');localStorage.removeItem('yah_t');return true}catch(e){return false}})();
  return h('div',{className:'page gap'},h('h1',null,'Settings'),
    h(Card,{c:'gap'},h('h2',null,'Profile'),h('label',{className:'f'},'Display name',h('input',{className:'in',value:prof.name,onChange:e=>setProf({...prof,name:e.target.value})})),h('button',{className:'btn gh sm',style:{justifySelf:'start'},onClick:()=>say('Profile saved')},'Saved automatically ✓')),
    h(Card,{c:'gap'},h('h2',null,'Theme accent'),h('div',{className:'row'},Object.keys(AC).map(k=>h('button',{key:k,'aria-label':k,className:'sw'+(prof.accent==k?' on':''),style:{background:'linear-gradient(135deg,'+AC[k][0]+','+AC[k][1]+')'},onClick:()=>{setProf({...prof,accent:k});say('Theme: '+k)}}))),h('div',{className:'mu'},'Dark mode is the default and only base theme.')),
    h(Card,{c:'gap'},h('h2',null,'Privacy'),h('div',{className:'mu'},'This is a private, single-user dashboard. There is no sign-up, no social feature, no analytics and no server. Everything is stored in this browser’s localStorage and never leaves your device. Clearing browser data erases it.')),
    h(Card,{c:'gap'},h('h2',null,'App information'),h('span',{className:'tag'+(ok?' on':''),style:{justifySelf:'start'}},ok?'STORAGE OK · data persists':'STORAGE BLOCKED · data won’t persist'),h('div',{className:'mu'},'YASH AI HUB v0.1 · Demo build · React 18 · Single file, easy to export.\nAssistant: local rules, no AI API.\nInstagram: NOT connected — demo only.'.split('\n').map((t,i)=>h('div',{key:i},t)))),
    h(Card,{c:'gap'},h('h2',null,'Danger zone'),h('button',{className:'btn dg',style:{justifySelf:'start'},onClick:()=>{if(sure){reset();setSure(false)}else{setSure(true);say('Tap again to confirm reset')}}},sure?'Confirm: erase all data':'Reset all data')));
}
