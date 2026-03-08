import { useState, useEffect, useRef } from "react";

// ─── RESPONSIVE HOOK ──────────────────────────────────────────────────────────
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= breakpoint);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [breakpoint]);
  return isMobile;
}

// ─── GLOBAL CSS ───────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
  :root {
    --cream:#FDF6EC; --sage:#7A9E7E; --sage-dark:#4F7A54; --sage-light:#C4D9C6;
    --terracotta:#D4714A; --terracotta-light:#F2C4A8;
    --gold:#C9A84C; --off-white:#FAFAF7; --text-dark:#2A1F1A;
    --text-mid:#5C4A3D; --text-light:#9C8070; --border:#E8DDD4;
  }
  *{margin:0;padding:0;box-sizing:border-box;}
  html{scroll-behavior:smooth;}
  body{font-family:'DM Sans',sans-serif;background:var(--cream);color:var(--text-dark);overflow-x:hidden;}
  ::-webkit-scrollbar{width:6px;} ::-webkit-scrollbar-track{background:var(--cream);}
  ::-webkit-scrollbar-thumb{background:var(--sage-light);border-radius:10px;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes bounce{0%,80%,100%{transform:scale(0.7);opacity:.5}40%{transform:scale(1);opacity:1}}
  @keyframes slideDown{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}

  .mobile-menu {
    display:none; position:fixed; top:70px; left:0; right:0; z-index:99;
    background:rgba(253,246,236,0.98); backdrop-filter:blur(16px);
    border-bottom:1px solid var(--border); padding:1.5rem 5vw 2rem;
    flex-direction:column; gap:0; animation:slideDown 0.2s ease;
  }
  .mobile-menu.open { display:flex; }
  .mobile-menu a {
    text-decoration:none; color:var(--text-mid); font-size:1rem;
    font-weight:500; padding:0.9rem 0; border-bottom:1px solid var(--border);
    display:block;
  }
  .mobile-menu a:last-child { border-bottom:none; }
  .mobile-menu .m-cta {
    background:var(--sage-dark); color:white !important;
    padding:0.9rem 1.5rem; border-radius:50px; text-align:center;
    margin-top:1rem; border-bottom:none !important;
  }
  select option { color: #2A1F1A; background: white; }
`;

// ─── DATA ─────────────────────────────────────────────────────────────────────
const ARTICLES = {
  en: [
    { cat:"Weight Loss", emoji:"🔥", bg:"orange", title:"10 Golden Rules for Effective Weight Loss", summary:"Science proves successful weight loss isn't just eating less — it's eating right.", time:"5 min read",
      content:`<p>Weight loss requires patience and the right strategy. Here are 10 science-backed principles:</p><h4>1. Create a Sensible Calorie Deficit</h4><p>To lose 0.5kg/week, you need a ~500 kcal/day deficit. Don't cut too aggressively as it slows metabolism.</p><h4>2. Prioritise Protein</h4><p>Protein keeps you full and protects muscle during weight loss. Aim for 1.6–2g per kg of body weight daily.</p><h4>3. Eat More Vegetables</h4><p>Vegetables are low in calories but rich in fibre and micronutrients. Add them to every meal to increase fullness without increasing calories.</p><h4>4. Stay Hydrated</h4><p>Drink 2–3 litres of water per day. Thirst is often mistaken for hunger. Drinking water before meals helps you eat less.</p><h4>5. Get Enough Sleep</h4><p>Sleep deprivation increases ghrelin (hunger hormone) and decreases leptin (fullness hormone), causing uncontrolled eating.</p><h4>6. Avoid Refined Sugar</h4><p>Sugar in fizzy drinks and sweets causes rapid blood sugar spikes and subsequent hunger. Replace with fresh fruit.</p><h4>7. Exercise Regularly</h4><p>Combining cardio and strength training burns fat more effectively. Aim for 150–300 minutes of moderate cardio per week.</p>` },
    { cat:"Nutrition", emoji:"🥗", bg:"green", title:"The Healthy Plate Method — Perfect Portion Ratios", summary:"Harvard's healthy plate method helps you eat nutritionally balanced without counting complex calories.", time:"4 min read",
      content:`<p>Harvard's "Healthy Eating Plate" is a visual, science-backed tool for building balanced meals.</p><h4>½ Plate — Vegetables & Fruit</h4><p>Diverse colours: green (spinach, broccoli), red (tomatoes, red peppers), orange (carrots, pumpkin). More colour = more micronutrients. Limit potatoes due to high starch content.</p><h4>¼ Plate — Whole Grains</h4><p>Choose brown rice, oats, wholegrain bread instead of white rice. Whole grains keep you full longer, stabilise blood sugar and provide more fibre.</p><h4>¼ Plate — Healthy Protein</h4><p>Prioritise fish (especially salmon, mackerel), skinless chicken, eggs, tofu, legumes. Limit red meat and avoid processed meats.</p><h4>Healthy Fats</h4><p>Olive oil, avocado, walnuts, almonds provide unsaturated fats good for heart health. Use in moderation.</p>` },
    { cat:"Science", emoji:"⚡", bg:"blue", title:"Understanding TDEE — How Many Calories Do You Really Burn?", summary:"TDEE is the total number of calories your body burns in 24 hours — the most important number in weight management.", time:"5 min read",
      content:`<p>TDEE (Total Daily Energy Expenditure) is the sum of all the energy your body uses in 24 hours.</p><h4>The 4 Components of TDEE</h4><p><strong>1. BMR (60–70%):</strong> Energy for basic bodily functions — breathing, circulation, organ function — even while sleeping.</p><p><strong>2. TEF (10%):</strong> Thermic Effect of Food — energy needed to digest and absorb food. Protein uses the most (25–30%).</p><p><strong>3. Exercise (15–30%):</strong> Energy from intentional physical activity like running, swimming, cycling.</p><p><strong>4. NEAT (15–50%):</strong> Non-Exercise Activity Thermogenesis — energy from walking, standing, fidgeting. This varies the most between people.</p>` },
    { cat:"Fitness", emoji:"💪", bg:"purple", title:"Strength Training and Weight Loss — Why Muscle Is Gold", summary:"Building muscle is the most effective long-term fat loss strategy — even better than cardio alone.", time:"4 min read",
      content:`<p>If you want to lose weight sustainably, strength training is non-negotiable.</p><h4>How Muscle Burns Fat</h4><p>Each kilogram of muscle burns 13–15 kcal at rest per day. Compare this to fat which burns only 4 kcal. A person with 5 kg more muscle burns an extra 45–75 kcal daily without doing anything extra.</p><h4>The Afterburn Effect</h4><p>After a strength training session, your body continues burning extra calories for 24–48 hours to repair muscle fibres. This is called EPOC.</p><h4>Beginner Strength Programme</h4><ul><li>3 sessions/week, focusing on compound movements</li><li>Squat, Deadlift, Bench Press, Row, Overhead Press</li><li>3–4 sets × 8–12 reps per exercise</li></ul>` },
    { cat:"Psychology", emoji:"🧠", bg:"pink", title:"Mindful Eating — Transforming Your Relationship with Food", summary:"Mindful eating helps you recognise true hunger versus emotional hunger, preventing unconscious overeating.", time:"4 min read",
      content:`<p>Mindful Eating is the practice of paying attention to the eating experience — taste, texture, fullness — rather than eating on autopilot.</p><h4>True Hunger vs Emotional Hunger</h4><p>True hunger appears gradually, intensifies over time, and subsides when you eat anything. Emotional hunger appears suddenly, often craves specific foods and doesn't go away even after eating.</p><h4>Slow Eating Techniques</h4><ul><li>Put down utensils between each bite</li><li>Chew at least 20 times before swallowing</li><li>Don't use your phone while eating</li><li>Eat from a smaller plate</li></ul>` },
    { cat:"Nutrition", emoji:"🍳", bg:"yellow", title:"The Perfect Breakfast — Secret to Weight Control", summary:"A protein-rich breakfast helps control cravings all day and stabilises energy from morning to afternoon.", time:"3 min read",
      content:`<p>Breakfast isn't mandatory for everyone, but if you eat it, do it right.</p><h4>Why Protein Is King in the Morning</h4><p>Eating 30–40g of protein in the morning reduces ghrelin (hunger hormone) and increases PYY (fullness hormone) throughout the day — resulting in eating less overall without feeling hungry.</p><h4>5 Quick High-Protein Breakfasts</h4><ul><li>🥚 <strong>Scrambled eggs + spinach</strong> — 25g protein, 300 kcal</li><li>🥛 <strong>Greek yoghurt + granola + berries</strong> — 20g protein, 350 kcal</li><li>🫙 <strong>Overnight oats + chia seeds</strong> — 30g protein, 400 kcal</li><li>🥞 <strong>Protein pancakes + berries</strong> — 28g protein, 380 kcal</li><li>🫓 <strong>Wholegrain toast + peanut butter + banana</strong> — 18g protein, 420 kcal</li></ul>` },
  ],
  vi: [
    { cat:"Giảm Cân", emoji:"🔥", bg:"orange", title:"10 Nguyên Tắc Vàng Để Giảm Cân Hiệu Quả", summary:"Khoa học đã chứng minh giảm cân thành công không chỉ là ăn ít đi — mà còn là ăn đúng.", time:"5 phút đọc",
      content:`<p>Giảm cân đòi hỏi sự kiên nhẫn và chiến lược đúng. Đây là 10 nguyên tắc được khoa học chứng minh:</p><h4>1. Tạo Thâm Hụt Calo Hợp Lý</h4><p>Để giảm 0.5kg/tuần, cần thâm hụt ~500 kcal/ngày. Đừng cắt giảm quá nhiều vì sẽ làm chậm trao đổi chất.</p><h4>2. Ưu Tiên Protein</h4><p>Protein giúp no lâu hơn và bảo vệ cơ bắp trong quá trình giảm cân. Mục tiêu 1.6–2g protein/kg cân nặng mỗi ngày.</p><h4>3. Ăn Nhiều Rau Xanh</h4><p>Rau xanh ít calo nhưng nhiều chất xơ và vi chất. Thêm rau vào mọi bữa ăn để tăng độ no mà không tăng calo.</p>` },
    { cat:"Dinh Dưỡng", emoji:"🥗", bg:"green", title:"Đĩa Thức Ăn Lành Mạnh — Cách Chia Tỷ Lệ Hoàn Hảo", summary:"Phương pháp đĩa thức ăn của Harvard giúp ăn cân bằng dinh dưỡng mà không cần đếm calo phức tạp.", time:"4 phút đọc",
      content:`<p>Phương pháp "Đĩa Thức Ăn Lành Mạnh" của Harvard là công cụ trực quan và khoa học.</p><h4>1/2 Đĩa — Rau & Trái Cây</h4><p>Đa dạng màu sắc: xanh lá, đỏ, cam. Càng nhiều màu = càng nhiều vi chất. Hạn chế khoai tây vì hàm lượng tinh bột cao.</p><h4>1/4 Đĩa — Ngũ Cốc Nguyên Hạt</h4><p>Chọn gạo lứt, yến mạch, bánh mì nguyên cám thay vì gạo trắng. Ngũ cốc nguyên hạt giúp no lâu và ổn định đường huyết.</p>` },
    { cat:"Khoa Học", emoji:"⚡", bg:"blue", title:"Hiểu TDEE — Bạn Thực Sự Đốt Bao Nhiêu Calo?", summary:"TDEE là tổng calo cơ thể đốt trong 24 giờ — con số quan trọng nhất trong quản lý cân nặng.", time:"5 phút đọc",
      content:`<p>TDEE (Tổng Năng Lượng Tiêu Thụ Hàng Ngày) là tổng năng lượng cơ thể sử dụng trong 24 giờ.</p><h4>4 Thành Phần Của TDEE</h4><p><strong>1. BMR (60–70%):</strong> Năng lượng cho các chức năng cơ bản — hô hấp, tuần hoàn, hoạt động nội tạng.</p><p><strong>2. TEF (10%):</strong> Hiệu ứng nhiệt của thức ăn — năng lượng cần để tiêu hoá và hấp thụ thức ăn. Protein dùng nhiều nhất (25–30%).</p>` },
    { cat:"Thể Lực", emoji:"💪", bg:"purple", title:"Tập Tạ Và Giảm Cân — Tại Sao Cơ Bắp Là Vàng", summary:"Xây dựng cơ bắp là chiến lược giảm mỡ bền vững nhất về lâu dài — tốt hơn cả cardio đơn thuần.", time:"4 phút đọc",
      content:`<p>Nếu muốn giảm cân bền vững, tập tạ là không thể bỏ qua.</p><h4>Cơ Bắp Đốt Mỡ Như Thế Nào</h4><p>Mỗi kg cơ bắp đốt 13–15 kcal mỗi ngày khi nghỉ ngơi. So với mỡ chỉ đốt 4 kcal. Người có thêm 5kg cơ bắp đốt thêm 45–75 kcal mỗi ngày mà không cần làm gì.</p>` },
    { cat:"Tâm Lý", emoji:"🧠", bg:"pink", title:"Ăn Có Ý Thức — Thay Đổi Mối Quan Hệ Với Thức Ăn", summary:"Ăn có ý thức giúp nhận ra đói thật sự vs đói cảm xúc, ngăn chặn ăn vô thức.", time:"4 phút đọc",
      content:`<p>Mindful Eating là thực hành chú ý đến trải nghiệm ăn uống — hương vị, kết cấu, cảm giác no — thay vì ăn theo thói quen.</p><h4>Đói Thật Vs Đói Cảm Xúc</h4><p>Đói thật xuất hiện từ từ, tăng dần theo thời gian. Đói cảm xúc xuất hiện đột ngột, thường thèm thức ăn cụ thể và không hết dù đã ăn.</p>` },
    { cat:"Dinh Dưỡng", emoji:"🍳", bg:"yellow", title:"Bữa Sáng Hoàn Hảo — Bí Quyết Kiểm Soát Cân Nặng", summary:"Bữa sáng giàu protein giúp kiểm soát cơn thèm ăn cả ngày và ổn định năng lượng từ sáng đến chiều.", time:"3 phút đọc",
      content:`<p>Bữa sáng không bắt buộc cho tất cả mọi người, nhưng nếu ăn thì hãy ăn đúng cách.</p><h4>Tại Sao Protein Là Vua Vào Buổi Sáng</h4><p>Ăn 30–40g protein vào buổi sáng giúp giảm ghrelin (hormone đói) và tăng PYY (hormone no) suốt cả ngày — kết quả là ăn ít hơn mà không cảm thấy đói.</p>` },
  ]
};

const TIPS = {
  en: [
    { emoji:"🌙", title:"Don't Eat After 8 PM", desc:"Metabolism slows at night. Eating late increases fat storage even with the same calorie intake." },
    { emoji:"🥢", title:"Smaller Plate, Fuller Feeling", desc:"Research proves that eating from a smaller plate makes your brain perceive more food, naturally leading you to eat less." },
    { emoji:"🎨", title:"The More Colourful, the Better", desc:"Each colour of fruit and vegetable represents different phytochemicals. A colourful meal = a complete range of micronutrients." },
    { emoji:"⏰", title:"Eat at Regular Times", desc:"Your body's circadian rhythm improves digestion when you eat at consistent times." },
    { emoji:"🧂", title:"Reduce Salt to Prevent Bloating", desc:"Salt retains water and causes bloating. Keep intake below 5g/day and choose natural seasonings like garlic, ginger, and lemon." },
    { emoji:"🍵", title:"Green Tea After Meals", desc:"EGCG in green tea stimulates fat burning and improves insulin sensitivity. 2–3 cups per day is ideal." },
    { emoji:"📱", title:"Keep a Food Journal", desc:"People who track their food intake lose twice as much weight. Use apps like MyFitnessPal to make it easy." },
    { emoji:"🛒", title:"Shop with a List", desc:"Go to the supermarket when full and with a list ready. This avoids impulse-buying unhealthy foods." },
  ],
  vi: [
    { emoji:"🌙", title:"Không Ăn Sau 8 Giờ Tối", desc:"Trao đổi chất chậm lại vào ban đêm. Ăn muộn làm tăng tích trữ mỡ dù cùng lượng calo." },
    { emoji:"🥢", title:"Đĩa Nhỏ Hơn, No Hơn", desc:"Nghiên cứu chứng minh ăn từ đĩa nhỏ hơn khiến não nhận thức nhiều thức ăn hơn, tự nhiên ăn ít đi." },
    { emoji:"🎨", title:"Càng Nhiều Màu Sắc Càng Tốt", desc:"Mỗi màu sắc của rau củ quả đại diện cho nhóm chất dinh dưỡng khác nhau." },
    { emoji:"⏰", title:"Ăn Đúng Giờ Mỗi Ngày", desc:"Nhịp sinh học cơ thể cải thiện tiêu hoá khi bạn ăn vào thời điểm nhất quán." },
    { emoji:"🧂", title:"Giảm Muối Để Tránh Phù Nề", desc:"Muối giữ nước và gây phù nề. Giữ lượng dưới 5g/ngày và chọn gia vị tự nhiên như tỏi, gừng, chanh." },
    { emoji:"🍵", title:"Trà Xanh Sau Bữa Ăn", desc:"EGCG trong trà xanh kích thích đốt mỡ và cải thiện độ nhạy insulin. 2–3 ly mỗi ngày là lý tưởng." },
    { emoji:"📱", title:"Ghi Nhật Ký Thức Ăn", desc:"Người theo dõi thức ăn giảm cân gấp đôi so với người không ghi. Dùng app MyFitnessPal để dễ hơn." },
    { emoji:"🛒", title:"Đi Chợ Với Danh Sách", desc:"Đi siêu thị khi no và có danh sách sẵn. Tránh mua đồ ăn không lành mạnh theo cảm hứng." },
  ]
};

const BASE_MEALS = {
  breakfast: [
    { name:"Scrambled Eggs on Toast", desc:"Fluffy eggs on wholegrain toast", prepTime:"8 min", baseCals:450, protein:28, carbs:38, fat:20, tags:["vegetarian","high-protein"],
      ingredients:[{name:"Eggs",amount:"3 large",baseCals:210},{name:"Wholegrain bread",amount:"2 slices",baseCals:165},{name:"Butter",amount:"1 tsp",baseCals:35}],
      steps:["Beat 3 eggs with salt and pepper.","Melt butter in a non-stick pan over medium-low heat.","Pour in eggs, stir gently for 2–3 min until just set.","Toast the bread and serve eggs on top."] },
    { name:"Greek Yogurt & Banana Bowl", desc:"Creamy yogurt with banana, honey and oats", prepTime:"3 min", baseCals:380, protein:20, carbs:55, fat:6, tags:["vegetarian","high-protein"],
      ingredients:[{name:"Greek yogurt",amount:"200g",baseCals:130},{name:"Banana",amount:"1 medium",baseCals:105},{name:"Rolled oats",amount:"40g",baseCals:140}],
      steps:["Slice banana.","Spoon yogurt into a bowl.","Layer banana on top, sprinkle oats, drizzle honey."] },
    { name:"Overnight Oats", desc:"Prep the night before — oats soaked in milk", prepTime:"5 min (night before)", baseCals:400, protein:16, carbs:62, fat:8, tags:["vegetarian"],
      ingredients:[{name:"Rolled oats",amount:"80g",baseCals:290},{name:"Milk",amount:"150ml",baseCals:70},{name:"Frozen berries",amount:"80g",baseCals:40}],
      steps:["Mix oats and milk in a jar.","Stir in berries.","Cover and refrigerate overnight. Eat cold in the morning."] },
    { name:"Peanut Butter Banana Toast", desc:"Wholegrain toast with peanut butter and banana", prepTime:"4 min", baseCals:440, protein:14, carbs:58, fat:16, tags:["vegetarian"],
      ingredients:[{name:"Wholegrain bread",amount:"2 slices",baseCals:165},{name:"Peanut butter",amount:"2 tbsp",baseCals:190},{name:"Banana",amount:"1 small",baseCals:80}],
      steps:["Toast the bread.","Spread peanut butter on both slices.","Slice banana and lay on top."] },
    { name:"Egg & Veggie Omelette", desc:"Quick 3-egg omelette with vegetables", prepTime:"10 min", baseCals:350, protein:22, carbs:8, fat:24, tags:["vegetarian","high-protein","low-carb"],
      ingredients:[{name:"Eggs",amount:"3 large",baseCals:210},{name:"Spinach",amount:"50g",baseCals:15},{name:"Cheese",amount:"20g",baseCals:80}],
      steps:["Beat eggs with salt and pepper.","Heat oil in a pan, wilt the veg for 1 min.","Pour eggs over veg, tilt pan to spread.","Sprinkle cheese, fold in half when edges are set."] },
  ],
  lunch: [
    { name:"Tuna Rice Bowl", desc:"Flaked tuna over steamed rice with cucumber", prepTime:"10 min", baseCals:520, protein:38, carbs:64, fat:8, tags:["high-protein"],
      ingredients:[{name:"Canned tuna",amount:"150g drained",baseCals:165},{name:"Cooked rice",amount:"180g",baseCals:235},{name:"Cucumber",amount:"80g",baseCals:12}],
      steps:["Cook rice.","Drain and flake tuna.","Slice cucumber.","Serve tuna and cucumber over rice with soy sauce and sesame oil."] },
    { name:"Chicken & Veggie Wrap", desc:"Rotisserie chicken, lettuce, tomato in a flour tortilla", prepTime:"7 min", baseCals:540, protein:35, carbs:48, fat:20, tags:["high-protein"],
      ingredients:[{name:"Flour tortilla",amount:"1 large",baseCals:210},{name:"Cooked chicken",amount:"120g",baseCals:200},{name:"Lettuce & tomato",amount:"100g",baseCals:20}],
      steps:["Shred the chicken.","Lay tortilla flat, spread mayo.","Add chicken, lettuce and tomato. Roll tightly."] },
    { name:"Egg Fried Rice", desc:"Quick fried rice with eggs and frozen veg", prepTime:"12 min", baseCals:500, protein:20, carbs:68, fat:16, tags:["vegetarian"],
      ingredients:[{name:"Cooked rice",amount:"200g",baseCals:260},{name:"Eggs",amount:"2 large",baseCals:140},{name:"Frozen mixed veg",amount:"80g",baseCals:40}],
      steps:["Heat oil in a wok over high heat.","Add frozen veg, stir-fry 2 min.","Push veg aside, scramble eggs.","Add rice and soy sauce, toss 3 min."] },
    { name:"Lentil Soup", desc:"Hearty red lentil soup — great for batch cooking", prepTime:"20 min", baseCals:380, protein:22, carbs:58, fat:6, tags:["vegetarian","low-carb"],
      ingredients:[{name:"Red lentils",amount:"100g dry",baseCals:350},{name:"Onion & garlic",amount:"100g",baseCals:50},{name:"Vegetable stock",amount:"500ml",baseCals:20}],
      steps:["Sauté onion and garlic for 3 min.","Add lentils and stock, bring to a boil.","Simmer 15 min until lentils are soft.","Season with cumin, salt, pepper."] },
    { name:"Salmon & Quinoa Bowl", desc:"Baked salmon fillet with fluffy quinoa and greens", prepTime:"15 min", baseCals:580, protein:42, carbs:42, fat:20, tags:["high-protein","low-carb"],
      ingredients:[{name:"Salmon fillet",amount:"150g",baseCals:300},{name:"Quinoa cooked",amount:"150g",baseCals:180},{name:"Baby spinach",amount:"60g",baseCals:15}],
      steps:["Season salmon and bake at 200°C for 12 min.","Fluff cooked quinoa.","Assemble bowl with quinoa, spinach, and salmon.","Drizzle with lemon and olive oil."] },
  ],
  dinner: [
    { name:"Stir-Fry Chicken & Broccoli", desc:"Quick wok stir-fry with chicken, broccoli and oyster sauce", prepTime:"15 min", baseCals:480, protein:42, carbs:28, fat:18, tags:["high-protein","low-carb"],
      ingredients:[{name:"Chicken breast",amount:"160g",baseCals:270},{name:"Broccoli",amount:"200g",baseCals:70},{name:"Oyster sauce",amount:"2 tbsp",baseCals:40}],
      steps:["Slice chicken thinly.","Heat oil in a wok over high heat.","Stir-fry chicken 3 min until cooked.","Add broccoli and sauce, toss 2 min."] },
    { name:"Beef & Veggie Stew", desc:"Comforting beef stew with root vegetables", prepTime:"20 min", baseCals:520, protein:38, carbs:32, fat:22, tags:[],
      ingredients:[{name:"Beef chunks",amount:"150g",baseCals:310},{name:"Carrots & potato",amount:"200g",baseCals:140},{name:"Beef stock",amount:"300ml",baseCals:30}],
      steps:["Brown beef in a hot pan.","Add vegetables and stock.","Simmer 15 min until tender.","Season to taste."] },
    { name:"Pasta with Tomato & Tuna", desc:"Simple pasta tossed with canned tomatoes and tuna", prepTime:"15 min", baseCals:550, protein:34, carbs:72, fat:10, tags:["high-protein"],
      ingredients:[{name:"Wholegrain pasta",amount:"80g dry",baseCals:280},{name:"Canned tomatoes",amount:"200g",baseCals:50},{name:"Canned tuna",amount:"100g",baseCals:110}],
      steps:["Cook pasta per packet instructions.","Simmer canned tomatoes with garlic for 5 min.","Drain tuna and stir into sauce.","Toss with pasta and serve."] },
    { name:"Baked Salmon with Veggies", desc:"One-pan baked salmon with roasted vegetables", prepTime:"20 min", baseCals:490, protein:40, carbs:22, fat:26, tags:["high-protein","low-carb"],
      ingredients:[{name:"Salmon fillet",amount:"180g",baseCals:360},{name:"Zucchini & peppers",amount:"200g",baseCals:60},{name:"Olive oil",amount:"1 tbsp",baseCals:120}],
      steps:["Toss vegetables in olive oil and season.","Place salmon on same baking tray.","Bake at 200°C for 15 min.","Serve immediately."] },
    { name:"Tofu Stir-Fry", desc:"Crispy tofu with mixed vegetables in a savory sauce", prepTime:"15 min", baseCals:420, protein:24, carbs:30, fat:20, tags:["vegetarian","high-protein","low-carb"],
      ingredients:[{name:"Firm tofu",amount:"200g",baseCals:160},{name:"Mixed vegetables",amount:"200g",baseCals:80},{name:"Soy sauce & sesame oil",amount:"3 tbsp",baseCals:60}],
      steps:["Press and cube tofu.","Pan-fry tofu until golden on all sides.","Add vegetables and sauce.","Serve over rice or alone."] },
  ],
  snack: [
    { name:"Apple & Almond Butter", desc:"Crisp apple slices with almond butter for dipping", prepTime:"2 min", baseCals:250, protein:6, carbs:28, fat:14, tags:["vegetarian"],
      ingredients:[{name:"Apple",amount:"1 medium",baseCals:80},{name:"Almond butter",amount:"1.5 tbsp",baseCals:140}],
      steps:["Slice the apple.","Serve with almond butter for dipping."] },
    { name:"Greek Yogurt with Honey", desc:"Protein-rich snack with a touch of sweetness", prepTime:"1 min", baseCals:180, protein:15, carbs:22, fat:3, tags:["vegetarian","high-protein"],
      ingredients:[{name:"Greek yogurt",amount:"150g",baseCals:100},{name:"Honey",amount:"1 tsp",baseCals:21}],
      steps:["Spoon yogurt into a bowl.","Drizzle with honey."] },
    { name:"Rice Cakes & Hummus", desc:"Light and satisfying — perfect for afternoons", prepTime:"2 min", baseCals:220, protein:8, carbs:32, fat:6, tags:["vegetarian"],
      ingredients:[{name:"Rice cakes",amount:"3 pieces",baseCals:100},{name:"Hummus",amount:"60g",baseCals:110}],
      steps:["Arrange rice cakes.","Top with hummus."] },
    { name:"Boiled Eggs", desc:"Simple, portable high-protein snack", prepTime:"10 min", baseCals:150, protein:12, carbs:1, fat:10, tags:["vegetarian","high-protein","low-carb"],
      ingredients:[{name:"Eggs",amount:"2 medium",baseCals:140}],
      steps:["Boil eggs for 7–8 min for hard-boiled.","Cool under cold water and peel."] },
  ]
};

const T = {
  en: {
    nav:["Articles","Weekly Menu","Meal Plan","Tips","Get Started"],
    heroTag:"🌿 Science-Based Nutrition", heroH1:"Eat <em>Smart</em>,<br>Live Well Every Day",
    heroCardTitle:"Today's Menu",
    heroP:"Discover balanced nutrition, weekly meal plans, and personalised weight loss strategies — all backed by science.",
    heroBtnP:"Create My Weight Plan", heroBtnS:"Read Articles →",
    articlesTag:"📚 Nutrition Knowledge", articlesTitle:"Featured Articles",
    articlesSub:"In-depth articles on nutrition, health, and effective, safe weight loss strategies.",
    readMore:"Read more →",
    menuTag:"🍽️ AI Meal Plan Generator", menuTitle:"Your Personalised 7-Day Meal Plan",
    menuSub:"Quick, simple meals for busy people — under 20 min to prepare. Click any meal card to see ingredients & how to cook it.",
    calLabel:"🔥 Daily calorie target", mealsLabel:"🥩 Meals per day",
    meals3:"3 meals (no snack)", meals4:"4 meals (+ 1 snack)", meals5:"5 meals (+ 2 snacks)",
    generate:"Generate Plan", newIdeas:"New Meal Ideas",
    dietLabel:"Diet:", dietNone:"🍽️ All foods", dietVeg:"🌿 Vegetarian", dietHP:"💪 High Protein", dietLC:"🥑 Low Carb",
    menuEmpty:"Enter your daily calorie target and hit Generate — a full 7-day plan of quick, realistic meals. Click any card to see the recipe.",
    generating:"Building your weekly meal plan…",
    plannerTag:"⚖️ Science-Based Calculator", plannerTitle:"Build Your Diet Plan<br>Around Your Goals",
    plannerSub:"Uses the Mifflin-St Jeor equation (most accurate BMR formula per JADA 2005) to calculate your TDEE and personalise your calorie targets.",
    tabLose:"🔥 Lose Weight", tabMaintain:"⚖️ Maintain", tabGain:"💪 Gain Muscle",
    sectionBody:"YOUR BODY", weightLabel:"Weight (kg)", goalWeightLabel:"Goal weight (kg)", targetWeightLabel:"Target weight (kg)",
    heightLabel:"Height (cm)", ageLabel:"Age", genderLabel:"Biological sex",
    female:"Female", male:"Male",
    sectionLifestyle:"YOUR LIFESTYLE", activityLabel:"Activity level",
    act1:"Sedentary — desk job (×1.2)", act2:"Lightly active — 1–3x/week (×1.375)",
    act3:"Moderately active — 3–5x/week (×1.55)", act4:"Very active — 6–7x/week (×1.725)", act5:"Extremely active — physical job (×1.9)",
    paceLabel:"Weight loss pace", gainPaceLabel:"Weight gain pace",
    pace1:"Gentle (±0.25 kg/week) — recommended", pace2:"Moderate (±0.5 kg/week)", pace3:"Fast (±0.75 kg/week)", pace4:"Aggressive (±1 kg/week) — use with caution",
    calcBtn:"✨ Calculate My TDEE & Plan",
    howCalc:"HOW WE CALCULATED THIS", bmrLabel:"Basal Metabolic Rate (Mifflin-St Jeor)", tdeeLabel:"Total Daily Energy Expenditure", targetLabel:"Daily Calorie Target",
    dailyTarget:"DAILY TARGET", kcalDay:"kcal / day",
    zonesTitle:"CALORIE ZONES", zoneLose:"Fat loss zone", zoneMaintain:"Maintenance zone", zoneGain:"Muscle gain zone",
    macroTitle:"MACRO SPLIT", macroProtein:"Protein", macroCarbs:"Carbs", macroFat:"Fat",
    projTitle:"WEIGHT PROJECTION", milestoneNow:"Now", milestoneStart:"Starting weight", milestoneGoal:"🎯 Goal reached!",
    disclaimer:"This tool provides general estimates only. Consult a healthcare professional before making significant dietary changes.",
    tipsTag:"💡 Quick Tips", tipsTitle:"Smart Habits for Better Health",
    tipsSub:"Small daily habits that add up to big results over time.",
    footer:"© 2025 NutriLife. For educational purposes only — not medical advice.",
    ingredients:"Ingredients", steps:"Steps",
    calPerDay:"kcal/day target", protein:"Protein", carbs:"Carbs", fat:"Fat",
    days:["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    slots3:["Breakfast","Lunch","Dinner"], slots4:["Breakfast","Lunch","Snack","Dinner"], slots5:["Breakfast","Morning Snack","Lunch","Afternoon Snack","Dinner"],
    alertCal:"Please enter a calorie target between 1000 and 5000.", alertWeight:"Please fill in weight, height and age.",
    alertGoal:"Please enter your goal weight.", alertLose:"Goal weight must be less than current weight to lose weight.",
    alertGain:"Target weight must be greater than current weight to gain muscle.",
    pctWay:"% of the way"
  },
  vi: {
    nav:["Bài Viết","Thực Đơn Tuần","Lên Kế Hoạch","Mẹo Hay","Bắt Đầu Ngay"],
    heroTag:"🌿 Dinh Dưỡng Khoa Học", heroH1:"Ăn Uống <em>Thông Minh</em>,<br>Sống Khoẻ Mỗi Ngày",
    heroCardTitle:"Thực Đơn Hôm Nay",
    heroP:"Khám phá chế độ dinh dưỡng cân bằng, thực đơn theo tuần và kế hoạch giảm cân cá nhân hoá — tất cả dựa trên khoa học.",
    heroBtnP:"Lập Kế Hoạch Cân Nặng", heroBtnS:"Đọc Bài Viết →",
    articlesTag:"📚 Kiến Thức Dinh Dưỡng", articlesTitle:"Bài Viết Nổi Bật",
    articlesSub:"Những bài viết chuyên sâu về dinh dưỡng, sức khoẻ và cách giảm cân hiệu quả, an toàn.",
    readMore:"Đọc thêm →",
    menuTag:"🍽️ Tạo Thực Đơn Bằng AI", menuTitle:"Thực Đơn 7 Ngày Cá Nhân Hoá",
    menuSub:"Bữa ăn đơn giản, nhanh cho người bận rộn — dưới 20 phút. Nhấn vào thẻ để xem nguyên liệu & cách nấu.",
    calLabel:"🔥 Mục tiêu calo mỗi ngày", mealsLabel:"🥩 Số bữa mỗi ngày",
    meals3:"3 bữa (không ăn vặt)", meals4:"4 bữa (+ 1 ăn vặt)", meals5:"5 bữa (+ 2 ăn vặt)",
    generate:"Tạo Thực Đơn", newIdeas:"Ý Tưởng Mới",
    dietLabel:"Chế độ ăn:", dietNone:"🍽️ Không giới hạn", dietVeg:"🌿 Chay", dietHP:"💪 Nhiều Protein", dietLC:"🥑 Ít Carb",
    menuEmpty:"Nhập mục tiêu calo và nhấn Tạo — thực đơn 7 ngày với các bữa ăn nhanh, thực tế. Nhấn vào thẻ để xem công thức.",
    generating:"Đang tạo thực đơn cho bạn…",
    plannerTag:"⚖️ Tính Toán Khoa Học", plannerTitle:"Lập Chế Độ Ăn<br>Theo Mục Tiêu",
    plannerSub:"Sử dụng phương trình Mifflin-St Jeor (công thức BMR chính xác nhất theo JADA 2005) để tính TDEE và mục tiêu calo cá nhân hoá.",
    tabLose:"🔥 Giảm Cân", tabMaintain:"⚖️ Duy Trì", tabGain:"💪 Tăng Cơ",
    sectionBody:"THÔNG SỐ CƠ THỂ", weightLabel:"Cân nặng (kg)", goalWeightLabel:"Cân nặng mục tiêu (kg)", targetWeightLabel:"Cân nặng muốn đạt (kg)",
    heightLabel:"Chiều cao (cm)", ageLabel:"Tuổi", genderLabel:"Giới tính",
    female:"Nữ", male:"Nam",
    sectionLifestyle:"LỐI SỐNG", activityLabel:"Mức độ vận động",
    act1:"Ít vận động — ngồi nhiều (×1.2)", act2:"Nhẹ — tập 1-3 lần/tuần (×1.375)",
    act3:"Vừa phải — tập 3-5 lần/tuần (×1.55)", act4:"Năng động — tập 6-7 lần/tuần (×1.725)", act5:"Rất năng động — lao động thể chất (×1.9)",
    paceLabel:"Tốc độ giảm cân", gainPaceLabel:"Tốc độ tăng cân",
    pace1:"Nhẹ nhàng (±0.25 kg/tuần) — khuyến nghị", pace2:"Vừa phải (±0.5 kg/tuần)", pace3:"Nhanh (±0.75 kg/tuần)", pace4:"Tích cực (±1 kg/tuần) — cẩn thận",
    calcBtn:"✨ Tính TDEE & Kế Hoạch Của Tôi",
    howCalc:"CÁCH TÍNH TOÁN", bmrLabel:"Tỷ lệ Trao Đổi Chất Cơ Bản (Mifflin-St Jeor)", tdeeLabel:"Tổng Năng Lượng Tiêu Thụ Hàng Ngày", targetLabel:"Mục Tiêu Calo Mỗi Ngày",
    dailyTarget:"MỤC TIÊU HÀNG NGÀY", kcalDay:"kcal / ngày",
    zonesTitle:"VÙNG CALO", zoneLose:"Vùng giảm mỡ", zoneMaintain:"Vùng duy trì", zoneGain:"Vùng tăng cơ",
    macroTitle:"TỶ LỆ MACRO", macroProtein:"Protein", macroCarbs:"Carbs", macroFat:"Chất Béo",
    projTitle:"DỰ ĐOÁN CÂN NẶNG", milestoneNow:"Hiện tại", milestoneStart:"Cân nặng hiện tại", milestoneGoal:"🎯 Đạt mục tiêu!",
    disclaimer:"Công cụ này chỉ cung cấp ước tính chung. Tham khảo chuyên gia y tế trước khi thay đổi chế độ ăn.",
    tipsTag:"💡 Mẹo Nhanh", tipsTitle:"Thói Quen Tốt Cho Sức Khoẻ Tốt Hơn",
    tipsSub:"Những thói quen nhỏ hàng ngày tích lũy thành kết quả lớn theo thời gian.",
    footer:"© 2025 NutriLife. Chỉ dành cho mục đích giáo dục — không phải lời khuyên y tế.",
    ingredients:"Nguyên liệu", steps:"Cách làm",
    calPerDay:"kcal/ngày mục tiêu", protein:"Protein", carbs:"Carbs", fat:"Chất Béo",
    days:["Thứ 2","Thứ 3","Thứ 4","Thứ 5","Thứ 6","Thứ 7","Chủ Nhật"],
    slots3:["Sáng","Trưa","Tối"], slots4:["Sáng","Trưa","Xế","Tối"], slots5:["Sáng","Ăn vặt sáng","Trưa","Ăn vặt chiều","Tối"],
    alertCal:"Vui lòng nhập mục tiêu calo từ 1000 đến 5000.", alertWeight:"Vui lòng nhập cân nặng, chiều cao và tuổi.",
    alertGoal:"Vui lòng nhập cân nặng mục tiêu.", alertLose:"Cân nặng mục tiêu phải nhỏ hơn hiện tại để giảm cân.",
    alertGain:"Cân nặng mục tiêu phải lớn hơn hiện tại để tăng cơ.",
    pctWay:"% hành trình"
  }
};

// ─── UTILS ────────────────────────────────────────────────────────────────────
const DIET_FILTERS={none:()=>true,vegetarian:m=>m.tags?.includes("vegetarian"),"high-protein":m=>m.tags?.includes("high-protein"),"low-carb":m=>m.tags?.includes("low-carb")};
function scaleMeal(meal,targetCals){if(!meal)return null;const r=targetCals/meal.baseCals;return{...meal,calories:Math.round(meal.baseCals*r),protein:Math.round(meal.protein*r),carbs:Math.round(meal.carbs*r),fat:Math.round(meal.fat*r)};}
function pickMeal(type,used,diet){const filter=DIET_FILTERS[diet]||(()=>true);const pool=(BASE_MEALS[type]||[]).filter(filter);const av=pool.filter(m=>!used.has(m.name));const src=av.length>0?av:pool;return src[Math.floor(Math.random()*src.length)];}
const bgMap={orange:"linear-gradient(135deg,#fde8d8,#f5c5a3)",green:"linear-gradient(135deg,#d4edda,#a8d5b0)",yellow:"linear-gradient(135deg,#fef9e7,#f9e4a0)",blue:"linear-gradient(135deg,#dbeafe,#bfdbfe)",pink:"linear-gradient(135deg,#fce7f3,#f9a8d4)",purple:"linear-gradient(135deg,#ede9fe,#c4b5fd)"};
const mealEmojis={breakfast:"🍳",lunch:"🥗",snack:"🍎",dinner:"🥘"};

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState("en");
  const t = T[lang];
  return (<><style>{CSS}</style><Nav lang={lang} setLang={setLang} t={t}/><Hero t={t}/><Articles lang={lang} t={t}/><MealPlanner lang={lang} t={t}/><Planner t={t}/><Tips lang={lang} t={t}/><Footer t={t}/></>);
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav({ lang, setLang, t }) {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const links = [["#articles",t.nav[0]],["#menu",t.nav[1]],["#planner",t.nav[2]],["#tips",t.nav[3]]];
  // close menu on outside click
  useEffect(() => {
    if (!open) return;
    const h = () => setOpen(false);
    document.addEventListener("click", h);
    return () => document.removeEventListener("click", h);
  }, [open]);
  return (
    <>
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,background:"rgba(253,246,236,0.95)",backdropFilter:"blur(12px)",borderBottom:"1px solid var(--border)",padding:"0 5vw",display:"flex",alignItems:"center",justifyContent:"space-between",height:70}}>
        <a href="/" style={{fontFamily:"'Playfair Display',serif",fontSize:"1.5rem",fontWeight:900,color:"var(--sage-dark)",textDecoration:"none",letterSpacing:"-0.5px"}}>Nutri<span style={{color:"var(--terracotta)"}}>Life</span></a>
        {!isMobile && (
          <ul style={{display:"flex",gap:"2rem",listStyle:"none",alignItems:"center"}}>
            {links.map(([href,label]) => <li key={href}><a href={href} style={{textDecoration:"none",color:"var(--text-mid)",fontSize:"0.9rem",fontWeight:500}}>{label}</a></li>)}
            <li><a href="#planner" style={{background:"var(--sage-dark)",color:"white",padding:"0.5rem 1.2rem",borderRadius:50,textDecoration:"none",fontSize:"0.9rem",fontWeight:600}}>{t.nav[4]}</a></li>
          </ul>
        )}
        <div style={{display:"flex",alignItems:"center",gap:"0.75rem"}}>
          <div style={{display:"flex",background:"rgba(255,255,255,0.7)",border:"2px solid var(--border)",borderRadius:50,padding:3,gap:2}}>
            {["en","vi"].map(l => (
              <button key={l} onClick={()=>setLang(l)} style={{padding:"0.3rem 0.7rem",borderRadius:50,border:"none",fontFamily:"'DM Sans',sans-serif",fontSize:"0.78rem",fontWeight:700,cursor:"pointer",background:lang===l?"var(--sage-dark)":"transparent",color:lang===l?"white":"var(--text-light)"}}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          {isMobile && (
            <button onClick={e=>{e.stopPropagation();setOpen(o=>!o);}} style={{background:"none",border:"none",cursor:"pointer",padding:"6px",display:"flex",flexDirection:"column",gap:5}}>
              {[0,1,2].map(i => (
                <span key={i} style={{display:"block",width:22,height:2,background:"var(--text-dark)",borderRadius:2,transition:"all 0.2s",
                  transform:open?(i===0?"rotate(45deg) translate(5px,5px)":i===2?"rotate(-45deg) translate(5px,-5px)":"none"):"none",
                  opacity:open&&i===1?0:1}}/>
              ))}
            </button>
          )}
        </div>
      </nav>
      {/* Mobile drawer */}
      <div className={`mobile-menu${open?" open":""}`} onClick={e=>e.stopPropagation()}>
        {links.map(([href,label]) => <a key={href} href={href} onClick={()=>setOpen(false)}>{label}</a>)}
        <a href="#planner" className="m-cta" onClick={()=>setOpen(false)}>{t.nav[4]}</a>
      </div>
    </>
  );
}

// ─── SECTION HEADER ───────────────────────────────────────────────────────────
function SH({ tag, title, sub, m }) {
  return (
    <div style={{marginBottom:m?"2rem":"3.5rem"}}>
      <div style={{fontSize:"0.75rem",fontWeight:600,letterSpacing:"0.15em",textTransform:"uppercase",color:"var(--terracotta)",marginBottom:"0.8rem"}}>{tag}</div>
      <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:m?"clamp(1.7rem,6vw,2.2rem)":"clamp(2rem,4vw,3rem)",marginBottom:"1rem"}} dangerouslySetInnerHTML={{__html:title}}/>
      <p style={{fontSize:"1rem",color:"var(--text-light)",maxWidth:520,lineHeight:1.7}}>{sub}</p>
    </div>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero({ t }) {
  const m = useIsMobile();
  return (
    <section style={{minHeight:"100vh",display:"grid",gridTemplateColumns:m?"1fr":"1fr 1fr",alignItems:"center",padding:m?"100px 5vw 60px":"100px 5vw 60px",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:-100,right:-100,width:700,height:700,background:"radial-gradient(circle,var(--sage-light) 0%,transparent 70%)",opacity:0.4,borderRadius:"50%",pointerEvents:"none"}}/>
      <div style={{position:"relative",zIndex:2}}>
        <span style={{display:"inline-block",background:"var(--terracotta-light)",color:"var(--terracotta)",fontSize:"0.75rem",fontWeight:600,letterSpacing:"0.15em",textTransform:"uppercase",padding:"0.4rem 1rem",borderRadius:50,marginBottom:"1.5rem",animation:"fadeUp 0.8s ease both"}}>{t.heroTag}</span>
        <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:m?"clamp(2.2rem,8vw,3rem)":"clamp(2.8rem,5vw,4.5rem)",lineHeight:1.1,marginBottom:"1.5rem",animation:"fadeUp 0.8s 0.1s ease both"}}
          dangerouslySetInnerHTML={{__html:t.heroH1.replace("<em>","<em style='color:var(--sage-dark);font-style:italic'>")}}/>
        <p style={{fontSize:"1.05rem",lineHeight:1.7,color:"var(--text-mid)",maxWidth:480,marginBottom:"2.5rem",animation:"fadeUp 0.8s 0.2s ease both"}}>{t.heroP}</p>
        <div style={{display:"flex",gap:"1rem",flexWrap:"wrap",animation:"fadeUp 0.8s 0.3s ease both"}}>
          <a href="#planner" style={{background:"var(--sage-dark)",color:"white",padding:"0.9rem 2rem",border:"none",borderRadius:50,fontSize:"1rem",fontWeight:600,textDecoration:"none",display:"inline-block"}}>{t.heroBtnP}</a>
          <a href="#articles" style={{background:"transparent",color:"var(--text-mid)",padding:"0.9rem 2rem",border:"2px solid var(--border)",borderRadius:50,fontSize:"1rem",fontWeight:500,textDecoration:"none",display:"inline-block"}}>{t.heroBtnS}</a>
        </div>
      </div>
      {!m && (
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",position:"relative",animation:"fadeIn 1s 0.4s ease both"}}>
          <div style={{position:"absolute",top:-20,left:-40,background:"white",borderRadius:16,padding:"1rem 1.2rem",boxShadow:"0 10px 40px rgba(0,0,0,0.1)",fontSize:"0.85rem",fontWeight:600,color:"var(--sage-dark)"}}>🥗 1,800 kcal/day</div>
          <div style={{background:"white",borderRadius:24,padding:"2rem",boxShadow:"0 30px 80px rgba(0,0,0,0.08)",maxWidth:320,width:"100%"}}>
            <span style={{fontSize:"4rem",display:"block",marginBottom:"1rem"}}>🥙</span>
            <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"1.3rem",marginBottom:"0.5rem"}}>{t.heroCardTitle}</h3>
            <p style={{fontSize:"0.9rem",color:"var(--text-light)",lineHeight:1.5}}>Nutritionally balanced with Protein, Carbs &amp; Healthy Fats</p>
            <div style={{display:"flex",gap:"0.5rem",marginTop:"1.5rem"}}>
              {[["45g","Protein"],["120g","Carbs"],["28g","Fat"]].map(([n,l]) => (
                <div key={l} style={{flex:1,background:"var(--cream)",borderRadius:12,padding:"0.7rem",textAlign:"center"}}>
                  <div style={{fontWeight:700,color:"var(--sage-dark)",fontSize:"1.1rem"}}>{n}</div>
                  <div style={{fontSize:"0.7rem",color:"var(--text-light)"}}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{position:"absolute",bottom:-20,right:-40,background:"white",borderRadius:16,padding:"1rem 1.2rem",boxShadow:"0 10px 40px rgba(0,0,0,0.1)",fontSize:"0.85rem",fontWeight:600,color:"var(--terracotta)"}}>⚡ -0.5kg/week</div>
        </div>
      )}
    </section>
  );
}

// ─── ARTICLES ─────────────────────────────────────────────────────────────────
function Articles({ lang, t }) {
  const m = useIsMobile();
  const [modal, setModal] = useState(null);
  return (
    <section id="articles" style={{padding:m?"60px 5vw":"90px 5vw",background:"var(--off-white)"}}>
      <SH tag={t.articlesTag} title={t.articlesTitle} sub={t.articlesSub} m={m}/>
      <div style={{display:"grid",gridTemplateColumns:m?"1fr":"repeat(auto-fill,minmax(300px,1fr))",gap:m?"1rem":"2rem"}}>
        {ARTICLES[lang].map((a,i) => (
          <div key={i} style={{background:"white",borderRadius:20,overflow:"hidden",boxShadow:"0 4px 20px rgba(0,0,0,0.05)",cursor:"pointer",transition:"transform 0.3s,box-shadow 0.3s"}}
            onClick={()=>setModal(a)}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-6px)";e.currentTarget.style.boxShadow="0 16px 40px rgba(0,0,0,0.1)"}}
            onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 4px 20px rgba(0,0,0,0.05)"}}>
            <div style={{height:m?130:180,display:"flex",alignItems:"center",justifyContent:"center",fontSize:m?"3.5rem":"5rem",background:bgMap[a.bg]||bgMap.green}}>{a.emoji}</div>
            <div style={{padding:"1.2rem 1.5rem 1.5rem"}}>
              <div style={{fontSize:"0.7rem",fontWeight:600,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--sage)",marginBottom:"0.5rem"}}>{a.cat}</div>
              <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"1.05rem",lineHeight:1.35,marginBottom:"0.6rem"}}>{a.title}</h3>
              <p style={{fontSize:"0.85rem",color:"var(--text-light)",lineHeight:1.6}}>{a.summary}</p>
              <div style={{marginTop:"1rem",paddingTop:"1rem",borderTop:"1px solid var(--border)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontSize:"0.78rem",color:"var(--text-light)"}}>{a.time}</span>
                <button style={{fontSize:"0.78rem",fontWeight:600,color:"var(--sage-dark)",background:"none",border:"none",cursor:"pointer"}}>{t.readMore}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {modal && (
        <div style={{position:"fixed",inset:0,zIndex:1000,background:"rgba(0,0,0,0.5)",backdropFilter:"blur(4px)",display:"flex",alignItems:m?"flex-end":"center",justifyContent:"center",padding:m?"0":"2rem",animation:"fadeIn 0.2s ease"}}
          onClick={e=>{if(e.target===e.currentTarget)setModal(null)}}>
          <div style={{background:"white",borderRadius:m?"24px 24px 0 0":"24px",maxWidth:680,width:"100%",maxHeight:m?"88vh":"80vh",overflowY:"auto",padding:m?"1.5rem":"2.5rem",position:"relative",animation:"fadeUp 0.3s ease"}}>
            <button onClick={()=>setModal(null)} style={{position:"absolute",top:"1.2rem",right:"1.2rem",background:"var(--cream)",border:"none",borderRadius:"50%",width:36,height:36,cursor:"pointer",fontSize:"1.1rem",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--text-mid)"}}>✕</button>
            <div style={{fontSize:"0.75rem",fontWeight:600,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--sage)",marginBottom:"0.8rem"}}>{modal.cat}</div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:m?"1.4rem":"1.8rem",marginBottom:"1rem",paddingRight:"2.5rem"}}>{modal.title}</h2>
            <div style={{fontSize:"0.95rem",color:"var(--text-mid)",lineHeight:1.8}} dangerouslySetInnerHTML={{__html:modal.content}}/>
          </div>
        </div>
      )}
    </section>
  );
}

// ─── MEAL PLANNER ─────────────────────────────────────────────────────────────
function MealPlanner({ lang, t }) {
  const m = useIsMobile();
  const [calories, setCalories] = useState("");
  const [mealsPerDay, setMealsPerDay] = useState("4");
  const [diet, setDiet] = useState("none");
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeDay, setActiveDay] = useState(0);
  const [recipe, setRecipe] = useState(null);

  const splits={"3":[0.28,0.38,0.34],"4":[0.25,0.35,0.10,0.30],"5":[0.22,0.08,0.32,0.08,0.30]};
  const types={"3":["breakfast","lunch","dinner"],"4":["breakfast","lunch","snack","dinner"],"5":["breakfast","snack","lunch","snack","dinner"]};

  function genPlan() {
    const cals=parseInt(calories);
    if(!cals||cals<1000||cals>5000){alert(t.alertCal);return;}
    const slots=t[`slots${mealsPerDay}`];
    const tp=types[mealsPerDay];
    const sp=splits[mealsPerDay];
    const used={};tp.forEach(x=>{used[x]=new Set();});
    const days=t.days.map(day=>{
      const meals=slots.map((label,si)=>{
        const type=tp[si];
        const raw=pickMeal(type,used[type],diet);
        if(raw)used[type].add(raw.name);
        return{type:label,mealType:type,...(raw?scaleMeal(raw,Math.round(cals*sp[si])):null)};
      });
      return{day,meals,totalCals:meals.reduce((s,x)=>s+(x.calories||0),0)};
    });
    setPlan({days,targetCals:cals});setActiveDay(0);
  }

  async function refreshAI() {
    const cals=parseInt(calories);
    if(!cals||cals<1000||cals>5000){alert(t.alertCal);return;}
    setLoading(true);
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:4000,messages:[{role:"user",content:`Generate a small meal library in ${lang==="en"?"English":"Vietnamese"}.Include ONLY: breakfast×3, lunch×3, dinner×3, snack×3.Each: name, desc, prepTime, baseCals, protein, carbs, fat, tags, ingredients[{name,amount,baseCals}], steps[].Respond ONLY with valid JSON:{"breakfast":[...],"lunch":[...],"dinner":[...],"snack":[]}`}]})});
      const data=await res.json();
      Object.assign(BASE_MEALS,JSON.parse(data.content.map(c=>c.text||"").join("").replace(/```json|```/g,"").trim()));
    }catch(e){console.error(e);}
    setLoading(false);genPlan();
  }

  const inp={background:"var(--cream)",border:"2px solid var(--border)",borderRadius:12,padding:"0.75rem 1rem",fontFamily:"'DM Sans',sans-serif",fontSize:"1rem",fontWeight:600,color:"var(--text-dark)",outline:"none",width:"100%"};

  return (
    <section id="menu" style={{padding:m?"60px 5vw":"90px 5vw",background:"var(--off-white)"}}>
      <SH tag={t.menuTag} title={t.menuTitle} sub={t.menuSub} m={m}/>
      <div style={{background:"white",borderRadius:24,padding:m?"1.2rem":"2rem 2.5rem",boxShadow:"0 4px 24px rgba(0,0,0,0.06)",marginBottom:"2rem",border:"1px solid var(--border)"}}>
        <div style={{display:"grid",gridTemplateColumns:m?"1fr":"1fr 1fr",gap:"1rem",marginBottom:"1rem"}}>
          <div><label style={{display:"block",fontSize:"0.75rem",fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:"var(--text-light)",marginBottom:"0.4rem"}}>{t.calLabel}</label>
            <input style={inp} type="number" min="1000" max="5000" step="50" placeholder="e.g. 1800" value={calories} onChange={e=>setCalories(e.target.value)}/></div>
          <div><label style={{display:"block",fontSize:"0.75rem",fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:"var(--text-light)",marginBottom:"0.4rem"}}>{t.mealsLabel}</label>
            <select style={inp} value={mealsPerDay} onChange={e=>setMealsPerDay(e.target.value)}>
              {[["3",t.meals3],["4",t.meals4],["5",t.meals5]].map(([v,l])=><option key={v} value={v}>{l}</option>)}
            </select></div>
        </div>
        <div style={{display:"flex",gap:"0.8rem",marginBottom:"1rem"}}>
          <button onClick={genPlan} style={{flex:1,background:"linear-gradient(135deg,var(--sage-dark),#3a6040)",color:"white",border:"none",borderRadius:12,padding:"0.8rem",fontFamily:"'DM Sans',sans-serif",fontSize:"0.9rem",fontWeight:700,cursor:"pointer"}}>⚡ {t.generate}</button>
          <button onClick={refreshAI} disabled={loading} style={{flex:1,background:"linear-gradient(135deg,var(--terracotta),#c05e38)",color:"white",border:"none",borderRadius:12,padding:"0.8rem",fontFamily:"'DM Sans',sans-serif",fontSize:"0.9rem",fontWeight:700,cursor:"pointer",opacity:loading?0.6:1}}>✨ {t.newIdeas}</button>
        </div>
        <div style={{display:"flex",gap:"0.5rem",flexWrap:"wrap",paddingTop:"1rem",borderTop:"1px solid var(--border)"}}>
          <span style={{fontSize:"0.72rem",fontWeight:700,textTransform:"uppercase",color:"var(--text-light)",alignSelf:"center"}}>{t.dietLabel}</span>
          {[["none",t.dietNone],["vegetarian",t.dietVeg],["high-protein",t.dietHP],["low-carb",t.dietLC]].map(([val,label])=>(
            <button key={val} onClick={()=>setDiet(val)} style={{padding:"0.35rem 0.8rem",borderRadius:50,border:`2px solid ${diet===val?"var(--sage-dark)":"var(--border)"}`,background:diet===val?"var(--sage-dark)":"white",fontSize:"0.78rem",fontWeight:600,cursor:"pointer",color:diet===val?"white":"var(--text-mid)"}}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {loading && <div style={{textAlign:"center",padding:"4rem 2rem"}}><div style={{display:"flex",justifyContent:"center",gap:6}}>{[0,1,2].map(i=><span key={i} style={{display:"inline-block",width:10,height:10,background:"var(--sage)",borderRadius:"50%",animation:`bounce 1.2s ${i*0.2}s infinite`}}/>)}</div><div style={{marginTop:"1.2rem",fontSize:"0.95rem",color:"var(--text-light)"}}>{t.generating}</div></div>}

      {!plan&&!loading&&<div style={{textAlign:"center",padding:"4rem 2rem",color:"var(--text-light)"}}><div style={{fontSize:"4rem",marginBottom:"1rem",opacity:0.5}}>🥗</div><p style={{maxWidth:360,margin:"0 auto",lineHeight:1.6}}>{t.menuEmpty}</p></div>}

      {plan&&!loading&&(
        <div style={{animation:"fadeUp 0.4s ease"}}>
          <div style={{display:"flex",gap:"1rem",background:"white",borderRadius:16,padding:"1rem 1.5rem",marginBottom:"1.5rem",boxShadow:"0 2px 12px rgba(0,0,0,0.05)"}}>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}><span style={{fontWeight:700,fontSize:"1.1rem",color:"var(--sage-dark)"}}>{plan.targetCals}</span><span style={{fontSize:"0.72rem",color:"var(--text-light)"}}>{t.calPerDay}</span></div>
            <div style={{width:1,background:"var(--border)"}}/>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}><span style={{fontWeight:700,fontSize:"1.1rem",color:"var(--sage-dark)"}}>{mealsPerDay}</span><span style={{fontSize:"0.72rem",color:"var(--text-light)"}}>meals/day</span></div>
          </div>
          {/* Scrollable day nav on mobile */}
          <div style={{display:"flex",gap:"0.5rem",overflowX:"auto",paddingBottom:"0.5rem",marginBottom:"1.5rem",WebkitOverflowScrolling:"touch"}}>
            {plan.days.map((d,i)=>(
              <button key={i} onClick={()=>setActiveDay(i)} style={{padding:"0.5rem 1rem",borderRadius:50,border:`2px solid ${i===activeDay?"var(--sage-dark)":"var(--border)"}`,background:i===activeDay?"var(--sage-dark)":"white",color:i===activeDay?"white":"var(--text-mid)",fontWeight:600,fontSize:"0.82rem",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",flexShrink:0,whiteSpace:"nowrap"}}>
                {m?d.day.slice(0,3):d.day}
              </button>
            ))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:m?"1fr 1fr":"repeat(auto-fill,minmax(230px,1fr))",gap:m?"0.8rem":"1.5rem"}}>
            {plan.days[activeDay].meals.map((meal,i)=>(
              <div key={i} style={{background:"white",borderRadius:20,padding:m?"1rem":"1.5rem",boxShadow:"0 4px 16px rgba(0,0,0,0.05)",cursor:"pointer",border:"1px solid var(--border)",transition:"transform 0.2s"}}
                onClick={()=>setRecipe(meal)}
                onMouseEnter={e=>e.currentTarget.style.transform="translateY(-4px)"}
                onMouseLeave={e=>e.currentTarget.style.transform="none"}>
                <div style={{fontSize:"0.68rem",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:"var(--text-light)",marginBottom:"0.4rem"}}>{meal.type}</div>
                <span style={{fontSize:m?"1.8rem":"2.2rem",display:"block",marginBottom:"0.5rem"}}>{mealEmojis[meal.mealType]||"🍽️"}</span>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:m?"0.9rem":"1rem",marginBottom:"0.4rem",lineHeight:1.3}}>{meal.name}</div>
                <div style={{fontSize:"0.8rem",color:"var(--sage-dark)",fontWeight:700,marginBottom:"0.7rem"}}>{meal.calories} kcal · {meal.prepTime}</div>
                <div style={{display:"flex",gap:"0.4rem"}}>
                  {[[meal.protein+"g",t.protein],[meal.carbs+"g",t.carbs],[meal.fat+"g",t.fat]].map(([n,l])=>(
                    <div key={l} style={{flex:1,background:"var(--cream)",borderRadius:8,padding:"0.3rem",textAlign:"center"}}>
                      <div style={{fontWeight:700,fontSize:"0.78rem"}}>{n}</div>
                      <div style={{fontSize:"0.58rem",color:"var(--text-light)"}}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {recipe&&(
        <div style={{position:"fixed",inset:0,zIndex:1000,background:"rgba(0,0,0,0.6)",backdropFilter:"blur(4px)",display:"flex",alignItems:m?"flex-end":"center",justifyContent:"center",padding:m?"0":"2rem",animation:"fadeIn 0.2s ease"}}
          onClick={e=>{if(e.target===e.currentTarget)setRecipe(null)}}>
          <div style={{background:"white",borderRadius:m?"24px 24px 0 0":"28px",maxWidth:560,width:"100%",maxHeight:m?"90vh":"85vh",overflowY:"auto",animation:"fadeUp 0.3s ease"}}>
            <div style={{background:"linear-gradient(135deg,var(--sage-dark),#3a6040)",padding:m?"1.5rem":"2.5rem 2rem 2rem",borderRadius:m?"24px 24px 0 0":"28px 28px 0 0",color:"white",position:"relative"}}>
              <button onClick={()=>setRecipe(null)} style={{position:"absolute",top:"1rem",right:"1rem",background:"rgba(255,255,255,0.2)",border:"none",borderRadius:"50%",width:34,height:34,cursor:"pointer",fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center",color:"white"}}>✕</button>
              <div style={{fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:"rgba(255,255,255,0.6)",marginBottom:"0.4rem"}}>{recipe.type}</div>
              <div style={{fontSize:"2.5rem",marginBottom:"0.4rem"}}>{mealEmojis[recipe.mealType]||"🍽️"}</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:m?"1.2rem":"1.5rem",fontWeight:700,marginBottom:"0.4rem"}}>{recipe.name}</div>
              <div style={{fontSize:"0.82rem",color:"rgba(255,255,255,0.7)"}}>{recipe.calories} kcal · {recipe.prepTime} · P:{recipe.protein}g C:{recipe.carbs}g F:{recipe.fat}g</div>
            </div>
            <div style={{padding:m?"1.2rem":"2rem"}}>
              {recipe.ingredients&&<><h4 style={{fontFamily:"'Playfair Display',serif",fontSize:"1rem",marginBottom:"0.8rem"}}>{t.ingredients}</h4><ul style={{paddingLeft:"1.2rem",marginBottom:"1.5rem"}}>{recipe.ingredients.map((ing,i)=><li key={i} style={{marginBottom:"0.4rem",fontSize:"0.88rem",color:"var(--text-mid)"}}><strong>{ing.name}</strong> — {ing.amount}</li>)}</ul></>}
              {recipe.steps&&<><h4 style={{fontFamily:"'Playfair Display',serif",fontSize:"1rem",marginBottom:"0.8rem"}}>{t.steps}</h4><ol style={{paddingLeft:"1.2rem"}}>{recipe.steps.map((step,i)=><li key={i} style={{marginBottom:"0.6rem",fontSize:"0.88rem",color:"var(--text-mid)",lineHeight:1.6}}>{step}</li>)}</ol></>}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ─── PLANNER ──────────────────────────────────────────────────────────────────
function Planner({ t }) {
  const m = useIsMobile();
  const [goal, setGoal] = useState("lose");
  const [form, setForm] = useState({curWeight:"",goalWeight:"",height:"",age:"",gender:"female",activity:"1.55",pace:"500"});
  const [result, setResult] = useState(null);
  const resultRef = useRef(null);
  const upd=(k,v)=>setForm(f=>({...f,[k]:v}));

  function calc() {
    const cw=parseFloat(form.curWeight),gw=parseFloat(form.goalWeight),h=parseFloat(form.height),age=parseFloat(form.age);
    if(!cw||!h||!age){alert(t.alertWeight);return;}
    if(goal!=="maintain"&&!gw){alert(t.alertGoal);return;}
    if(goal==="lose"&&gw>=cw){alert(t.alertLose);return;}
    if(goal==="gain"&&gw<=cw){alert(t.alertGain);return;}
    const bmr=form.gender==="male"?(10*cw)+(6.25*h)-(5*age)+5:(10*cw)+(6.25*h)-(5*age)-161;
    const bmrR=Math.round(bmr);
    const tdee=Math.round(bmr*parseFloat(form.activity));
    const pace=parseInt(form.pace);
    const target=goal==="lose"?Math.max(1200,tdee-pace):goal==="maintain"?tdee:tdee+pace;
    const pG=Math.round(cw*(goal==="gain"?2.2:1.8)),pCal=pG*4,fCal=Math.round(target*0.25),fG=Math.round(fCal/9);
    const cCal=Math.max(0,target-pCal-fCal),cG=Math.round(cCal/4);
    const tot=pCal+fCal+cCal;
    const pPct=Math.round(pCal/tot*100),cPct=Math.round(cCal/tot*100),fPct=Math.round(fCal/tot*100);
    const diff=goal!=="maintain"?Math.abs(gw-cw):0;
    const weeks=goal!=="maintain"?Math.ceil(diff/(pace/7700)):0;
    const checkpoints=goal!=="maintain"?[0,0.25,0.5,0.75,1].map(p=>({w:Math.round((cw+(gw-cw)*p)*10)/10,wk:Math.round(p*weeks),pct:p})):[];
    setResult({bmrR,tdee,target,goal,pG,pPct,cG,cPct,fG,fPct,diff:diff.toFixed(1),weeks,checkpoints,cw,pace,
      bmrF:`(10×${cw}) + (6.25×${h}) − (5×${age}) ${form.gender==="male"?"+5":"−161"} = ${bmrR} kcal`,
      tdeeF:`${bmrR} × ${form.activity} = ${tdee} kcal`});
    if(m) setTimeout(()=>resultRef.current?.scrollIntoView({behavior:"smooth",block:"start"}),100);
  }

  const gc={lose:"var(--terracotta)",maintain:"var(--sage)",gain:"var(--gold)"};
  const fi={width:"100%",background:"rgba(255,255,255,0.1)",border:"1.5px solid rgba(255,255,255,0.18)",borderRadius:12,padding:"0.8rem 1rem",color:"white",fontFamily:"'DM Sans',sans-serif",fontSize:"0.92rem",outline:"none"};
  const RC=({bg,children})=><div style={{background:bg||"rgba(0,0,0,0.25)",borderRadius:20,padding:"1.5rem",border:"1px solid rgba(255,255,255,0.1)",marginBottom:"1.2rem"}}>{children}</div>;
  const CT=({children})=><div style={{fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:"rgba(255,255,255,0.45)",marginBottom:"1rem"}}>{children}</div>;

  return (
    <section id="planner" style={{padding:m?"60px 5vw":"90px 5vw",background:"linear-gradient(135deg,#2A3F2D 0%,#1A2B1C 60%,#2A1F1A 100%)"}}>
      <div style={{fontSize:"0.75rem",fontWeight:600,letterSpacing:"0.15em",textTransform:"uppercase",color:"var(--terracotta-light)",marginBottom:"0.8rem"}}>{t.plannerTag}</div>
      <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:m?"clamp(1.7rem,6vw,2.2rem)":"clamp(2rem,4vw,3rem)",color:"white",marginBottom:"1rem"}} dangerouslySetInnerHTML={{__html:t.plannerTitle}}/>
      <p style={{fontSize:"1rem",color:"rgba(255,255,255,0.6)",maxWidth:520,lineHeight:1.7,marginBottom:m?"2rem":"3.5rem"}}>{t.plannerSub}</p>

      <div style={{display:"grid",gridTemplateColumns:m?"1fr":"1fr 1fr",gap:m?"1.5rem":"2.5rem",alignItems:"start"}}>
        {/* Form */}
        <div style={{background:"rgba(255,255,255,0.07)",backdropFilter:"blur(12px)",borderRadius:24,padding:m?"1.2rem":"2rem",border:"1px solid rgba(255,255,255,0.13)"}}>
          {/* Goal tabs */}
          <div style={{display:"flex",background:"rgba(0,0,0,0.2)",borderRadius:16,padding:5,marginBottom:"2rem",gap:4}}>
            {[["lose",t.tabLose],["maintain",t.tabMaintain],["gain",t.tabGain]].map(([g,label])=>(
              <button key={g} onClick={()=>setGoal(g)} style={{flex:1,padding:m?"0.5rem 0.2rem":"0.65rem",border:"none",borderRadius:12,fontFamily:"'DM Sans',sans-serif",fontSize:m?"0.7rem":"0.82rem",fontWeight:700,cursor:"pointer",background:goal===g?(g==="lose"?"var(--terracotta)":g==="maintain"?"var(--sage)":"var(--gold)"):"transparent",color:goal===g?"white":"rgba(255,255,255,0.5)"}}>
                {label}
              </button>
            ))}
          </div>
          {/* Body fields */}
          <div style={{fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:"rgba(255,255,255,0.4)",marginBottom:"1rem",paddingBottom:"0.5rem",borderBottom:"1px solid rgba(255,255,255,0.1)"}}>{t.sectionBody}</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.8rem",marginBottom:"0.8rem"}}>
            <div><label style={{display:"block",fontSize:"0.78rem",fontWeight:600,marginBottom:"0.4rem",color:"rgba(255,255,255,0.8)"}}>⚖️ {t.weightLabel}</label><input style={fi} type="number" placeholder="70" value={form.curWeight} onChange={e=>upd("curWeight",e.target.value)}/></div>
            {goal!=="maintain"&&<div><label style={{display:"block",fontSize:"0.78rem",fontWeight:600,marginBottom:"0.4rem",color:"rgba(255,255,255,0.8)"}}>🎯 {goal==="gain"?t.targetWeightLabel:t.goalWeightLabel}</label><input style={fi} type="number" placeholder="60" value={form.goalWeight} onChange={e=>upd("goalWeight",e.target.value)}/></div>}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.8rem",marginBottom:"0.8rem"}}>
            <div><label style={{display:"block",fontSize:"0.78rem",fontWeight:600,marginBottom:"0.4rem",color:"rgba(255,255,255,0.8)"}}>📏 {t.heightLabel}</label><input style={fi} type="number" placeholder="165" value={form.height} onChange={e=>upd("height",e.target.value)}/></div>
            <div><label style={{display:"block",fontSize:"0.78rem",fontWeight:600,marginBottom:"0.4rem",color:"rgba(255,255,255,0.8)"}}>🎂 {t.ageLabel}</label><input style={fi} type="number" placeholder="30" value={form.age} onChange={e=>upd("age",e.target.value)}/></div>
          </div>
          <div style={{marginBottom:"0.8rem"}}><label style={{display:"block",fontSize:"0.78rem",fontWeight:600,marginBottom:"0.4rem",color:"rgba(255,255,255,0.8)"}}>🧬 {t.genderLabel}</label><select style={fi} value={form.gender} onChange={e=>upd("gender",e.target.value)}><option value="female">{t.female}</option><option value="male">{t.male}</option></select></div>
          {/* Lifestyle fields */}
          <div style={{fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:"rgba(255,255,255,0.4)",margin:"1.2rem 0 1rem",paddingTop:"1rem",borderTop:"1px solid rgba(255,255,255,0.1)"}}>{t.sectionLifestyle}</div>
          <div style={{marginBottom:"0.8rem"}}><label style={{display:"block",fontSize:"0.78rem",fontWeight:600,marginBottom:"0.4rem",color:"rgba(255,255,255,0.8)"}}>🏃 {t.activityLabel}</label>
            <select style={fi} value={form.activity} onChange={e=>upd("activity",e.target.value)}>
              {[["1.2",t.act1],["1.375",t.act2],["1.55",t.act3],["1.725",t.act4],["1.9",t.act5]].map(([v,l])=><option key={v} value={v}>{l}</option>)}
            </select></div>
          {goal!=="maintain"&&<div style={{marginBottom:"0.8rem"}}><label style={{display:"block",fontSize:"0.78rem",fontWeight:600,marginBottom:"0.4rem",color:"rgba(255,255,255,0.8)"}}>📅 {goal==="gain"?t.gainPaceLabel:t.paceLabel}</label>
            <select style={fi} value={form.pace} onChange={e=>upd("pace",e.target.value)}>
              {[["250",t.pace1],["500",t.pace2],["750",t.pace3],["1000",t.pace4]].map(([v,l])=><option key={v} value={v}>{l}</option>)}
            </select></div>}
          <button onClick={calc} style={{width:"100%",background:"linear-gradient(135deg,var(--terracotta),#c05e38)",color:"white",border:"none",borderRadius:50,padding:"1rem",fontSize:"1rem",fontWeight:700,cursor:"pointer",marginTop:"1rem",fontFamily:"'DM Sans',sans-serif",boxShadow:"0 6px 20px rgba(212,113,74,0.4)"}}>{t.calcBtn}</button>
        </div>

        {/* Results */}
        <div ref={resultRef}>
          {result ? (
            <div style={{animation:"fadeUp 0.5s ease"}}>
              <RC><CT>{t.howCalc}</CT>
                {[[1,t.bmrLabel,`${result.bmrR} kcal`,result.bmrF],[2,t.tdeeLabel,`${result.tdee} kcal`,result.tdeeF],[3,t.targetLabel,`${result.target} kcal`,""]].map(([n,label,val,formula])=>(
                  <div key={n} style={{display:"flex",alignItems:"center",gap:"0.8rem",marginBottom:"0.8rem"}}>
                    <div style={{width:28,height:28,borderRadius:"50%",background:"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.75rem",fontWeight:700,flexShrink:0,color:"rgba(255,255,255,0.6)"}}>{n}</div>
                    <div style={{flex:1}}><div style={{fontSize:"0.75rem",color:"rgba(255,255,255,0.5)"}}>{label}</div><div style={{fontSize:"1rem",fontWeight:700,color:"white"}}>{val}</div>{formula&&<div style={{fontSize:"0.7rem",color:"rgba(255,255,255,0.35)",fontFamily:"monospace"}}>{formula}</div>}</div>
                  </div>
                ))}
              </RC>
              <RC bg="rgba(255,255,255,0.08)">
                <div style={{textAlign:"center"}}>
                  <div style={{fontSize:"0.72rem",fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",color:"rgba(255,255,255,0.5)",marginBottom:"0.3rem"}}>{t.dailyTarget}</div>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:"3rem",fontWeight:900,color:gc[result.goal],lineHeight:1}}>{result.target.toLocaleString()}</div>
                  <div style={{fontSize:"0.9rem",color:"rgba(255,255,255,0.5)",marginTop:"0.2rem"}}>{t.kcalDay}</div>
                  <div style={{fontSize:"0.82rem",color:"rgba(255,255,255,0.4)",marginTop:"0.8rem"}}>{result.goal==="maintain"?`Stay at ${result.cw} kg · eat exactly your TDEE`:`${result.goal==="lose"?"Lose":"Gain"} ${result.diff} kg in ~${result.weeks} weeks · ${result.pace} kcal/day ${result.goal==="lose"?"deficit":"surplus"}`}</div>
                </div>
              </RC>
              <RC><CT>{t.zonesTitle}</CT>
                <div style={{display:"flex",borderRadius:12,overflow:"hidden",height:14,marginBottom:"1rem",gap:2}}>
                  {[["var(--terracotta)",1.5],["var(--sage)",0.8],["var(--gold)",1.2]].map(([c,f],i)=><div key={i} style={{height:"100%",flex:f,background:c,borderRadius:3}}/>)}
                </div>
                {[[gc.lose,t.zoneLose,`${Math.max(1200,result.tdee-750)}–${result.tdee-200} kcal`],[gc.maintain,t.zoneMaintain,`${result.tdee-200}–${result.tdee+200} kcal`],[gc.gain,t.zoneGain,`${result.tdee+200}–${result.tdee+750} kcal`]].map(([c,label,range])=>(
                  <div key={label} style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"0.6rem"}}>
                    <div style={{display:"flex",alignItems:"center",gap:"0.5rem"}}><div style={{width:10,height:10,borderRadius:"50%",background:c,flexShrink:0}}/><span style={{fontSize:"0.82rem",color:"rgba(255,255,255,0.75)"}}>{label}</span></div>
                    <span style={{fontSize:"0.85rem",fontWeight:700,color:"white"}}>{range}</span>
                  </div>
                ))}
              </RC>
              <RC bg="rgba(255,255,255,0.07)"><CT>{t.macroTitle}</CT>
                {[[t.macroProtein,result.pPct,"linear-gradient(90deg,#e07b5a,var(--terracotta))",`${result.pG}g (${result.pPct}%)`],[t.macroCarbs,result.cPct,"linear-gradient(90deg,#7fc68a,var(--sage))",`${result.cG}g (${result.cPct}%)`],[t.macroFat,result.fPct,"linear-gradient(90deg,#d4b84a,var(--gold))",`${result.fG}g (${result.fPct}%)`]].map(([name,pct,bg,grams])=>(
                  <div key={name} style={{display:"flex",alignItems:"center",gap:"0.8rem",marginBottom:"0.9rem"}}>
                    <div style={{fontSize:"0.82rem",fontWeight:600,color:"rgba(255,255,255,0.8)",width:60,flexShrink:0}}>{name}</div>
                    <div style={{flex:1,background:"rgba(255,255,255,0.1)",borderRadius:50,height:8,overflow:"hidden"}}><div style={{height:"100%",borderRadius:50,background:bg,width:`${pct}%`,transition:"width 0.6s ease"}}/></div>
                    <div style={{fontSize:"0.82rem",fontWeight:700,color:"white",width:60,textAlign:"right",flexShrink:0}}>{grams}</div>
                  </div>
                ))}
              </RC>
              {result.checkpoints.length>0&&(
                <RC><CT>{t.projTitle}</CT>
                  {result.checkpoints.map((cp,i)=>{
                    const isLast=i===result.checkpoints.length-1;
                    const dc=i===0?"var(--sage)":isLast?"var(--gold)":"var(--terracotta)";
                    const note=i===0?t.milestoneStart:isLast?t.milestoneGoal:`${Math.round(cp.pct*100)}${t.pctWay}`;
                    return(
                      <div key={i} style={{display:"flex",alignItems:"flex-start",gap:"1rem"}}>
                        <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                          <div style={{width:12,height:12,borderRadius:"50%",background:dc,flexShrink:0,marginTop:4,border:"2px solid rgba(255,255,255,0.3)"}}/>
                          {!isLast&&<div style={{width:2,flex:1,minHeight:28,background:"rgba(255,255,255,0.1)",margin:"3px 0"}}/>}
                        </div>
                        <div style={{paddingBottom:"1.2rem"}}>
                          <div style={{fontSize:"0.72rem",color:"rgba(255,255,255,0.4)"}}>{cp.wk===0?t.milestoneNow:`Week ${cp.wk}`}</div>
                          <div style={{fontSize:"1rem",fontWeight:700,color:"white"}}>{cp.w} kg</div>
                          <div style={{fontSize:"0.78rem",color:"rgba(255,255,255,0.5)"}}>{note}</div>
                        </div>
                      </div>
                    );
                  })}
                </RC>
              )}
              <div style={{fontSize:"0.75rem",color:"rgba(255,255,255,0.35)",lineHeight:1.5,borderTop:"1px solid rgba(255,255,255,0.08)",paddingTop:"1rem"}}>{t.disclaimer}</div>
            </div>
          ):(
            !m&&<div style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:200,color:"rgba(255,255,255,0.3)",textAlign:"center"}}><div><div style={{fontSize:"3rem",marginBottom:"1rem"}}>🎯</div>Fill in the form to see your results</div></div>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── TIPS ─────────────────────────────────────────────────────────────────────
function Tips({ lang, t }) {
  const m = useIsMobile();
  return (
    <section id="tips" style={{padding:m?"60px 5vw":"90px 5vw",background:"var(--off-white)"}}>
      <SH tag={t.tipsTag} title={t.tipsTitle} sub={t.tipsSub} m={m}/>
      <div style={{display:"grid",gridTemplateColumns:m?"1fr 1fr":"repeat(auto-fill,minmax(250px,1fr))",gap:m?"1rem":"1.5rem"}}>
        {TIPS[lang].map((tip,i)=>(
          <div key={i} style={{background:"white",borderRadius:20,padding:m?"1.2rem":"2rem",boxShadow:"0 4px 16px rgba(0,0,0,0.05)",transition:"transform 0.3s"}}
            onMouseEnter={e=>e.currentTarget.style.transform="translateY(-5px)"}
            onMouseLeave={e=>e.currentTarget.style.transform="none"}>
            <span style={{fontSize:m?"2rem":"2.5rem",marginBottom:"0.8rem",display:"block"}}>{tip.emoji}</span>
            <h4 style={{fontFamily:"'Playfair Display',serif",fontSize:m?"0.95rem":"1.05rem",marginBottom:"0.5rem"}}>{tip.title}</h4>
            <p style={{fontSize:"0.85rem",color:"var(--text-light)",lineHeight:1.6}}>{tip.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer({ t }) {
  const m = useIsMobile();
  return (
    <footer style={{background:"var(--text-dark)",color:"rgba(255,255,255,0.6)",padding:m?"2rem 5vw":"3rem 5vw 2rem",display:"flex",flexDirection:m?"column":"row",justifyContent:"space-between",alignItems:m?"flex-start":"center",gap:"1rem"}}>
      <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.4rem",color:"white",fontWeight:900}}>Nutri<span style={{color:"var(--terracotta)"}}>Life</span></div>
      <p style={{fontSize:"0.85rem"}}>{t.footer}</p>
    </footer>
  );
}