import { useState, useEffect } from 'react';

export const uid=()=>Math.random().toString(36).slice(2,9);
export const AC={violet:['#8b5cf6','#3b82f6'],blue:['#3b82f6','#22d3ee'],rose:['#f43f5e','#8b5cf6'],mint:['#10b981','#3b82f6']};
export function useLS(k,d){const[v,s]=useState(()=>{try{const r=localStorage.getItem(k);return r?JSON.parse(r):d}catch(e){return d}});useEffect(()=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}},[v]);return[v,s]}
export const ago=t=>{const m=Math.round((Date.now()-t)/6e4);return m<1?'just now':m<60?m+'m ago':m<1440?Math.round(m/60)+'h ago':new Date(t).toLocaleDateString()};
export const okUrl=u=>/^https?:\/\/\S+\.\S+/.test(u);
export const norm=u=>u&&!/^https?:\/\//i.test(u)?'https://'+u:u;
