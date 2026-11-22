// Local, rule-based demo assistant. NOT an AI model. Replace reply() with an API call later.
export function reply(t,name,autos){
  const s=t.toLowerCase(),c=t.match(/(-?\d+(?:\.\d+)?)\s*([+\-*x\/×÷])\s*(-?\d+(?:\.\d+)?)/);
  if(c){const a=+c[1],b=+c[3],o=c[2];const r=o=='+'?a+b:o=='-'?a-b:o=='/'||o=='÷'?(b?a/b:'undefined'):a*b;return a+' '+o+' '+b+' = '+r}
  if(/^(hi|hello|hey|namaste)/.test(s))return 'Hello '+name+'! I’m the local demo assistant. Try “help”.';
  if(/time|date|today/.test(s))return 'Your device says: '+new Date().toLocaleString();
  if(/automation/.test(s))return 'You have '+autos.length+' demo automation(s), '+autos.filter(a=>a.enabled).length+' enabled. Open the Instagram tab to create or edit them.';
  if(/idea|caption|content/.test(s))return 'Content ideas (template list):\n• Behind-the-scenes reel\n• “3 mistakes” carousel\n• Q&A with a comment keyword\n• Before/after story';
  if(/privacy|data/.test(s))return 'All your data lives only in this browser’s localStorage. Nothing is uploaded.';
  if(/help|what can/.test(s))return 'I’m a simple rule-based demo. I can: do basic maths (12*7), tell the time, summarise your automations, and share content ideas. A real AI model can be wired in later.';
  return 'I’m a local demo with fixed rules, so I can’t really understand that yet. Try “help”.';
}
