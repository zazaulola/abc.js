/**
 * Abc Fabric
 * 
 * Syntax:
 *   abc({... d }) ==> <Element>
 * 
 * DEFINITION PARAMS:
 *
 *   d.d   element document
 *   d.n   element name
 *   d.x   element namespace (xmlns)
 *   d.c   element classes
 *   d.p   element param attributes
 *   d.e   element events
 *   d.k   element object key values
 *   d.s   element styles
 *   d.h   innerHTML
 *   d.f   insert first
 *   d.l   insert last
 *   d.b   insert before
 *   d.a   insert after
 *   d.r   replace with
 *   d.i   tags inside
 *   d.z   zip list
 *   d.m   mixin list
 *   d.o   observers
 *   d.v   verbose
 * 
 * @function abc
 * @param {object} d
 * @returns {Element}
 */ 


const abc = (d) => {
  const c = (n='div',d=document,x='http://www.w3.org/1999/xhtml')=>d.createElementNS(x,n),
        o = (v,c)=>(Array.isArray(v)?v:[v]).map(c),
        r = k=>k.replace(/-(\w)/g,m=>m[1].toUpperCase()),
        e = (c,f)=>Object.entries(c).forEach(f);
  if("string"==typeof d)return c(!1,d);
  if(Array.isArray(d))return d.map(abc);
  if(d instanceof Element)return d;
  const _=c(d.n,d.d,d.x),z = [_];
  if(d.c)o('string'==typeof d.c?d.c.split(/\s+/g):d.c,c=>_.classList.add(c));
  if(d.p)e(d.p,p=>_.setAttribute(...p));
  if(d.e)e(d.e,e=>_.addEventListener(...e));
  if(d.s)e(d.s,([s,v])=>_.style[r(s)]=v);
  if(d.k)Object.assign(_,d.k);
  if(d.h)_.innerHTML=d.h;
  if(d.t)_.textContent=d.h;
  if(d.f)$(d.f).firstChild.before(_);
  if(d.l)$(d.l).appendChild(_);
  if(d.b)$(d.b).before(_);
  if(d.a)$(d.a).after(_);
  if(d.r)$(d.r).replaceWith(_);
  if(d.i)o(abc(d.i),e=>(z.push(e),_.appendChild(e)));
  if(d.m)o(d.m,m=>m.call(d,_));
  if(d.o)o(d.o,o=>_.addEventListener(o,e=>(d.v||console.log)(_,o,e)));
  return d.z ? z : _;
}
