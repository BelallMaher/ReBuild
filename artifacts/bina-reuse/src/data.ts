export type Listing = {
  id: string; title: string; category: string; price: number; quantity: number; unit: string;
  condition: string; city: string; description: string; seller: string; phone: string; email: string;
  images: string[]; tone: string;
};

export const categories = ['الكل', 'خرسانة', 'خشب', 'معادن', 'أبواب ونوافذ', 'عوازل', 'أدوات'];
export const cities = ['الكل', 'الرياض', 'جدة', 'الدمام', 'مكة المكرمة', 'المدينة المنورة'];
const palettes = [
  ['#d8b994','#b78250','#645447'], ['#c9b697','#8a6b4d','#3f4f43'], ['#b8c6c0','#687b72','#394c46'],
  ['#d4b9a6','#a36e55','#55453d'], ['#d5c98c','#a59b59','#535342'], ['#bdc6c5','#778a8a','#465457'],
  ['#cfb98f','#947e57','#514b3e'], ['#c6a58c','#986f55','#55433c'],
];
const art = (palette: string[], i: number) => `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="840" height="600" viewBox="0 0 840 600"><rect width="840" height="600" fill="${palette[0]}"/><path d="M0 388L840 294V600H0z" fill="${palette[1]}"/><path d="M0 488l840-104v31L0 519z" fill="${palette[2]}" opacity=".48"/><path d="M${150+i*9} 120h280v280H${150+i*9}z" fill="${palette[2]}" opacity=".76"/><path d="M${170+i*9} 140h240v18H${170+i*9}zM${170+i*9} 180h240v12H${170+i*9}zM${170+i*9} 210h240v12H${170+i*9}z" fill="#eee7d6" opacity=".5"/><circle cx="650" cy="152" r="78" fill="#f2dfbb" opacity=".42"/><path d="M0 548l840-95" stroke="#efe4d0" stroke-width="2" opacity=".5"/><text x="44" y="548" font-family="sans-serif" font-size="19" fill="#f7f0e3" opacity=".8">بِناء · مواد لها حياة ثانية</text></svg>`)}`;
const raw: Omit<Listing,'images'|'tone'>[] = [
  {id:'concrete-01',title:'بلاط رصيف خرساني — دفعة كاملة',category:'خرسانة',price:18,quantity:240,unit:'م²',condition:'جديد فائض',city:'الرياض',description:'بلاط رصيف متين بلون رملي، فائض من مشروع سكني. محفوظ على طبالي ومتاح للتحميل من الموقع.',seller:'مؤسسة أساس العمران',phone:'+966501234567',email:'sales@asas.example'},
  {id:'wood-02',title:'ألواح خشب سويدي للتجهيزات',category:'خشب',price:42,quantity:68,unit:'لوح',condition:'ممتاز',city:'جدة',description:'ألواح سويدية مستقيمة وجافة، مناسبة للديكور والأعمال الداخلية. تباع باللوح أو كامل الكمية.',seller:'ورشة مدى للنجارة',phone:'+966552345678',email:'hello@mada.example'},
  {id:'metal-03',title:'مواسير حديد مجلفن ٢ إنش',category:'معادن',price:27,quantity:125,unit:'قطعة',condition:'جيد جداً',city:'الدمام',description:'مواسير مجلفنة فائضة من أعمال تمديدات. أطوال ٦ أمتار، خالية من الصدأ ومخزنة داخل مستودع.',seller:'شركة روافد الشرقية',phone:'+966563456789',email:'trade@rawafid.example'},
  {id:'door-04',title:'أبواب خشب داخلية مع الإطار',category:'أبواب ونوافذ',price:340,quantity:12,unit:'باب',condition:'جديد فائض',city:'الرياض',description:'أبواب داخلية بلون بلوط فاتح مع الإطار والمفصلات. لم تركب، المقاس القياسي ٩٠ × ٢١٠ سم.',seller:'مخازن خطوة',phone:'+966574567890',email:'store@khotwa.example'},
  {id:'insulation-05',title:'رولات عزل مائي بيتومينية',category:'عوازل',price:96,quantity:36,unit:'رول',condition:'جديد فائض',city:'مكة المكرمة',description:'رولات عزل بيتومينية أصلية بحالة ممتازة، مخزنة بعيداً عن الشمس. السعر للرول الواحد.',seller:'مقاولات قمم',phone:'+966585678901',email:'info@qimam.example'},
  {id:'tools-06',title:'سقالات معدنية قابلة للفك',category:'أدوات',price:1250,quantity:8,unit:'طقم',condition:'مستعمل نظيف',city:'المدينة المنورة',description:'أطقم سقالات مستخدمة في مشروع واحد وتم فحصها. يشمل كل طقم القواعد والوصلات.',seller:'مؤسسة مدى البناء',phone:'+966596789012',email:'team@mada-build.example'},
  {id:'concrete-07',title:'بلوك أسمنتي ٢٠ سم',category:'خرسانة',price:2.4,quantity:1800,unit:'حبة',condition:'جديد فائض',city:'جدة',description:'بلوك أسمنتي مقاس ٢٠ سم، فائض من توريد مشروع. التسليم من المستودع.',seller:'مصنع ركائز',phone:'+966507890123',email:'sales@rakaez.example'},
  {id:'metal-08',title:'صفائح ألمنيوم مقصوصة',category:'معادن',price:115,quantity:22,unit:'لوح',condition:'جيد جداً',city:'الدمام',description:'صفائح ألمنيوم سماكة ٢ ملم، قصات متنوعة بحالة جيدة تصلح لأعمال الورش.',seller:'ورشة خط المعادن',phone:'+966518901234',email:'hi@metalline.example'},
];
export const listings: Listing[] = raw.map((item,i)=>({...item,images:[art(palettes[i],i),art(palettes[(i+2)%palettes.length],i+1)],tone:palettes[i][2]}));
export const money = (n:number) => `${new Intl.NumberFormat('ar-SA',{maximumFractionDigits:2}).format(n)} ر.س`;
