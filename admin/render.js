// Renders content.json into the marked blocks of index.html
(function(root){
function e(t){return String(t==null?'':t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function item(t){var m=/^([^:：]{1,30})[:：]\s*(.+)$/.exec(t);return m?'<b>'+e(m[1])+':</b> '+e(m[2]):e(t)}
var R={
notice:function(c){return c.notice&&c.notice.trim()?'<div class="notice">📢 '+e(c.notice.trim())+'</div>':''},
perks:function(c){return (c.perks||[]).filter(Boolean).map(function(p){return '<span class="perk">✓ '+e(p)+'</span>'}).join('')},
services:function(c){return '\n'+c.services.map(function(s){return '<div class="card">'+e(s.title)+(s.desc?'<small>'+e(s.desc)+'</small>':'')+'</div>'}).join('\n')+'\n'},
svcopts:function(c){return c.services.map(function(s){return '<option>'+e(s.title)+'</option>'}).join('')},
team:function(c){return c.team.map(function(t,i){return '<div class="team"'+(i?' style="margin-top:12px"':'')+'><img src="'+e(t.img)+'" alt="'+e(t.name+'، '+t.role)+'" loading="lazy"><div><b>'+e(t.name)+'</b><span>'+e(t.role)+'</span>'+(t.text?'<p>'+e(t.text)+'</p>':'')+'</div></div>'}).join('\n')+'\n'},
gallery:function(c){return c.gallery.map(function(g,i){return '<figure><img decoding="async"'+(i?' loading="lazy"':'')+' src="'+e(g.img)+'" alt="'+e(g.caption)+'">'+(g.caption?'<figcaption>'+e(g.caption)+'</figcaption>':'')+'</figure>'}).join('')},
dots:function(c){return c.gallery.map(function(g,i){return '<button type="button" aria-label="عکس '+(i+1)+'"></button>'}).join('')},
hours:function(c){return c.hours.map(function(h){return '<div class="row"><span>'+e(h.label)+'</span><span>'+e(h.value)+'</span></div>'}).join('\n')+'\n'},
reviews:function(c){return c.reviews.map(function(r){return '<div class="quote"><p>«'+e(r.text)+'»</p><span>'+e(r.name)+'</span></div>'}).join('\n')+'\n'},
tips:function(c){return c.tips.map(function(t){return '<div class="tip"><h3>'+e(t.title)+'</h3><ol>\n'+t.items.filter(Boolean).map(function(x){return '<li>'+item(x)+'</li>'}).join('\n')+'</ol></div>'}).join('\n')+'\n'},
faq:function(c){return c.faq.map(function(f){return '<details><summary>'+e(f.q)+'</summary><p>'+e(f.a)+'</p></details>'}).join('\n')+'\n'}
};
function apply(html,c){Object.keys(R).forEach(function(k){var a='<!--c:'+k+'-->',b='<!--/c:'+k+'-->',i=html.indexOf(a),j=html.indexOf(b);if(i<0||j<0)throw new Error('marker '+k);html=html.slice(0,i+a.length)+R[k](c)+html.slice(j)});return html}
root.EltiamRender={apply:apply};
if(typeof module!=='undefined')module.exports=root.EltiamRender;
})(typeof window!=='undefined'?window:globalThis);
