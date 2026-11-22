import { createElement as h, useState } from 'react';
import { Card, Empty, Demo } from './ui.js';
import { ago } from './util.js';

export function IG({autos,log,newAuto,edit,toggle,del,clearLog}){const [cd,setCd]=useState(null);
  return h('div',{className:'page gap'},
    h('div',{className:'row sp wr'},h('div',null,h('h1',null,'Instagram Automation'),h('div',{className:'mu'},'Comment → DM flows')),h('button',{className:'btn',onClick:newAuto},'+ Create Automation')),
    h(Demo),
    h('div',{className:'grid g4'},[['Total',autos.length],['Enabled',autos.filter(a=>a.enabled).length],['Paused',autos.filter(a=>!a.enabled).length],['Links',autos.reduce((n,a)=>n+a.links.length,0)]].map(x=>h(Card,{key:x[0],c:'stat'},h('b',null,x[1]),h('span',{className:'mu'},x[0])))),
    autos.length?autos.map(a=>h(Card,{key:a.id},
      h('div',{className:'row sp'},h('div',null,h('h2',null,a.name),h('div',{className:'mu'},a.post+' · '+(a.trigger=='any'?'Any comment':'Keywords: '+a.keywords.join(', ')))),h('span',{className:'tag'+(a.enabled?' on':'')},a.enabled?'ENABLED · DEMO':'PAUSED · DEMO')),
      h('div',{className:'mu',style:{margin:'8px 0'}},(a.dm?'Initial DM on':'Initial DM off')+' · '+(a.follow?'Follow check on':'No follow check')+' · '+a.links.length+' link(s)'),
      h('div',{className:'row wr'},h('button',{className:'btn gh sm',onClick:()=>edit(a)},'Edit'),h('button',{className:'btn gh sm',onClick:()=>toggle(a.id)},a.enabled?'Disable':'Enable'),h('button',{className:'btn dg sm',onClick:()=>cd==a.id?del(a.id):setCd(a.id)},cd==a.id?'Confirm delete?':'Delete')))):
      h(Card,null,h(Empty,{i:'◎',t:'No automations yet. Build your first comment-to-DM flow.'},h('button',{className:'btn mt',onClick:newAuto},'Create Automation'))),
    h('div',{className:'row sp'},h('h2',null,'Activity log'),log.length>0&&h('button',{className:'btn gh sm',onClick:clearLog},'Clear log')),
    h(Card,null,log.length?log.slice(0,20).map(l=>h('div',{key:l.id,className:'row sp',style:{padding:'5px 0'}},h('span',null,l.t),h('span',{className:'mu'},ago(l.at)))):h(Empty,{i:'∅',t:'No events. Only your own actions are logged — no real Instagram activity exists in demo mode.'})));
}
