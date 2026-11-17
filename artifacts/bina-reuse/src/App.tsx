import { useEffect, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { Shell } from './components/Shell';
import { StoreProvider } from './store';
import { AccountPage, BlogPage, CartPage, CheckoutPage, FaqPage, HomePage, LoginPage, MaterialsPage, NotFoundPage, PricingPage, ProductPage, RegisterPage, SellPage, ServicesPage, setPageMeta } from './pages/Pages';

const queryClient = new QueryClient();
function RoutedErrorBoundary({children}:{children:ReactNode}) {
 const [location]=useLocation();
 return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}
function SeoController() {
 const [location]=useLocation();
 useEffect(()=>{
  const ensure=(selector:string,tag:string,attrs:Record<string,string>)=>{
   let node=document.head.querySelector(selector);
   if(!node){node=document.createElement(tag);Object.entries(attrs).forEach(([key,value])=>node?.setAttribute(key,value));document.head.appendChild(node);}
   return node;
  };
  ensure('meta[name="description"]','meta',{name:'description',content:'سوق سعودي لمواد البناء الفائضة. اشترِ وبع مواد محلية بحالة واضحة، وامنح الفائض فرصة جديدة مع بِناء.'});
  const publicBase=import.meta.env.VITE_PUBLIC_SITE_URL;
  if(publicBase){
   const pageUrl=`${publicBase.replace(/\/$/,'')}${location.split('?')[0]}`;
   ensure('link[rel="canonical"]','link',{rel:'canonical',href:pageUrl}).setAttribute('href',pageUrl);
   ensure('meta[property="og:url"]','meta',{property:'og:url',content:pageUrl}).setAttribute('content',pageUrl);
  }
  ensure('meta[property="og:type"]','meta',{property:'og:type',content:'website'});
  ensure('meta[property="og:site_name"]','meta',{property:'og:site_name',content:'بِناء'});
   const ogImage=publicBase?`${publicBase.replace(/\/$/,'')}/og-binaa.svg`:`${import.meta.env.BASE_URL}og-binaa.svg`;
   ensure('meta[property="og:image"]','meta',{property:'og:image',content:ogImage}).setAttribute('content',ogImage);
  ensure('meta[name="twitter:card"]','meta',{name:'twitter:card',content:'summary_large_image'});
   ensure('meta[name="twitter:image"]','meta',{name:'twitter:image',content:ogImage}).setAttribute('content',ogImage);
  setPageMeta(location.split('?')[0]);
 },[location]);
 return null;
}
function Router() {
 return <RoutedErrorBoundary><SeoController/><Shell><Switch>
  <Route path="/" component={HomePage}/>
  <Route path="/materials" component={MaterialsPage}/>
  <Route path="/materials/:id" component={ProductPage}/>
  <Route path="/cart" component={CartPage}/>
  <Route path="/checkout" component={CheckoutPage}/>
  <Route path="/register" component={RegisterPage}/>
  <Route path="/login" component={LoginPage}/>
  <Route path="/sell" component={SellPage}/>
  <Route path="/pricing" component={PricingPage}/>
  <Route path="/services" component={ServicesPage}/>
  <Route path="/blog" component={BlogPage}/>
  <Route path="/faq" component={FaqPage}/>
  <Route path="/account" component={AccountPage}/>
  <Route component={NotFoundPage}/>
 </Switch></Shell></RoutedErrorBoundary>;
}
function App() {
 return <QueryClientProvider client={queryClient}><TooltipProvider><StoreProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/,'')}><Router/></WouterRouter><Toaster/></StoreProvider></TooltipProvider></QueryClientProvider>;
}
export default App;
