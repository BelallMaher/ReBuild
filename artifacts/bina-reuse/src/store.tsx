import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { listings, type Listing } from './data';
type CartLine = {id:string; quantity:number};
type Order = {id:string; date:string; total:number; items:number; city:string};
type StoreValue = {cart:CartLine[]; favorites:string[]; orders:Order[]; add:(id:string)=>void; setQty:(id:string,n:number)=>void; remove:(id:string)=>void; toggleFavorite:(id:string)=>void; complete:(city:string)=>void; products:Listing[]};
const Store = createContext<StoreValue | null>(null);
function read<T>(key:string, fallback:T):T { try { const raw=localStorage.getItem(key); return raw?JSON.parse(raw) as T:fallback; } catch { return fallback; } }
export function StoreProvider({children}:{children:ReactNode}) {
 const [cart,setCart]=useState<CartLine[]>(()=>read('bina-cart',[]));
 const [favorites,setFavorites]=useState<string[]>(()=>read('bina-favorites',[]));
 const [orders,setOrders]=useState<Order[]>(()=>read('bina-orders',[]));
 useEffect(()=>localStorage.setItem('bina-cart',JSON.stringify(cart)),[cart]);
 useEffect(()=>localStorage.setItem('bina-favorites',JSON.stringify(favorites)),[favorites]);
 useEffect(()=>localStorage.setItem('bina-orders',JSON.stringify(orders)),[orders]);
 const value=useMemo<StoreValue>(()=>({
  cart,favorites,orders,products:listings,
  add:(id)=>setCart(prev=>prev.some(x=>x.id===id)?prev.map(x=>x.id===id?{...x,quantity:x.quantity+1}:x):[...prev,{id,quantity:1}]),
  setQty:(id,n)=>setCart(prev=>prev.map(x=>x.id===id?{...x,quantity:Math.max(1,n)}:x)),
  remove:(id)=>setCart(prev=>prev.filter(x=>x.id!==id)),
  toggleFavorite:(id)=>setFavorites(prev=>prev.includes(id)?prev.filter(x=>x!==id):[...prev,id]),
  complete:(city)=>{const total=cart.reduce((sum,line)=>sum+(listings.find(p=>p.id===line.id)?.price||0)*line.quantity,0);setOrders(prev=>[{id:`BN-${Date.now().toString().slice(-6)}`,date:new Date().toLocaleDateString('ar-SA'),total,items:cart.reduce((s,x)=>s+x.quantity,0),city},...prev]);setCart([]);}
 }),[cart,favorites,orders]);
 return <Store.Provider value={value}>{children}</Store.Provider>;
}
export function useStore(){const value=useContext(Store);if(!value)throw new Error('StoreProvider missing');return value;}
