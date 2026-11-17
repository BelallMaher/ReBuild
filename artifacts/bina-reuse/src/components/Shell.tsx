import { useState, type ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, ShoppingBag, Heart, ChevronLeft, Recycle, ArrowUpRight } from 'lucide-react';
import { useStore } from '../store';
const links=[['/materials','تصفّح المواد'],['/services','خدماتنا'],['/pricing','الأسعار'],['/blog','المعرفة'],['/faq','المساعدة']];
export function Shell({children}:{children:ReactNode}){
 const [open,setOpen]=useState(false); const [location]=useLocation(); const {cart,favorites}=useStore();
 return <div dir="rtl" className="app-shell">
  <div className="topline">المواد الفائضة تستحق فرصة ثانية <span>— اكتشف مواد قريبة منك</span></div>
  <header className="site-header">
   <div className="header-inner">
    <Link href="/" className="brand" data-testid="link-home"><span className="brand-mark"><Recycle size={23}/></span><span><b>بِناء</b><small>سوق مواد البناء المستدامة</small></span></Link>
    <nav className={`main-nav ${open?'nav-open':''}`} aria-label="التنقل الرئيسي">
     {links.map(([href,label])=><Link key={href} href={href} onClick={()=>setOpen(false)} className={location===href?'active':''} data-testid={`nav-${href.slice(1)}`}>{label}</Link>)}
     <Link href="/account" onClick={()=>setOpen(false)} className="mobile-account" data-testid="nav-account-mobile">حسابي <ChevronLeft size={15}/></Link>
      <Link href="/login" onClick={()=>setOpen(false)} className="mobile-account" data-testid="nav-login-mobile">تسجيل الدخول <ChevronLeft size={15}/></Link>
      <Link href="/register" onClick={()=>setOpen(false)} className="mobile-account" data-testid="nav-register-mobile">إنشاء حساب <ChevronLeft size={15}/></Link>
    </nav>
    <div className="header-actions">
     <Link href="/account" className="account-link" data-testid="nav-account">حسابي</Link>
      <Link href="/login" className="account-link" data-testid="nav-login">دخول</Link>
      <Link href="/register" className="header-register" data-testid="nav-register">إنشاء حساب</Link>
     <Link href="/materials?favorite=1" className="icon-link" aria-label="المفضلة" data-testid="nav-favorites"><Heart size={19}/><span className="count">{favorites.length||''}</span></Link>
     <Link href="/cart" className="icon-link cart-icon" aria-label="السلة" data-testid="nav-cart"><ShoppingBag size={19}/><span className="count">{cart.reduce((s,x)=>s+x.quantity,0)||''}</span></Link>
     <Link href="/sell" className="sell-button" data-testid="nav-sell">أضف موادك <ArrowUpRight size={16}/></Link>
     <button className="menu-button" onClick={()=>setOpen(!open)} aria-label={open?'إغلاق القائمة':'فتح القائمة'} data-testid="button-mobile-menu">{open?<X/>:<Menu/>}</button>
    </div>
   </div>
  </header>
  <main>{children}</main>
  <footer className="site-footer"><div className="footer-top"><div className="footer-brand"><span className="brand-mark"><Recycle size={22}/></span><div><b>بِناء</b><p>نحو مواقع بناء أقل هدراً<br/>ومواد أكثر قيمة.</p></div></div><div><strong>استكشف</strong>{links.slice(0,3).map(([h,l])=><Link key={h} href={h} data-testid={`footer-link-${h.slice(1)}`}>{l}</Link>)}</div><div><strong>نحن هنا</strong><Link href="/faq" data-testid="footer-link-faq">الأسئلة الشائعة</Link><Link href="/account" data-testid="footer-link-account">حسابي وطلباتي</Link><a href="mailto:hello@binaa.example" data-testid="footer-link-email">hello@binaa.example</a></div><div className="footer-note">كل قطعة لها حكاية أخرى.<div className="footer-stamp">إعادة استخدام<br/>بذكاء محلي</div></div></div><div className="footer-bottom"><span>© بِناء ٢٠٢٥ — تجربة تجريبية محلية</span><span>صُنع بعناية في المملكة العربية السعودية</span></div></footer>
 </div>
}
