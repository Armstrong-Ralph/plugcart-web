import { useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

const articles: Record<string, { title: string; content: string }> = {
  "prevent-acne-breakouts": {
    title: "SkinPlug 101 - Ep 1: How to Prevent Acne & Breakouts",
    content: `This is simply pure memory from my year(s) of personal research, experiments, and these are things I feel a lot of people should know - It could potentially save a lot of people 😉

And, please, us guys, don't say 'skincare is feminine only'. Skincare isn't 'feminine' - it's simply 'hygiene' 🙏💯.

**First off, did you know bathing with hot water every day can trigger acne?** 🫠 It dries out your skin, which then over-produces oil... and boom, breakouts.

**Also, be careful with where you buy skincare online** (from fishy sources, most especially) ⚠️. If it looks too cheap, it's most likely fake. For example, on Jumia, you'll see 'CeraVe' for like 4k/5k 😹, but the real one costs 5x more. Using fakes can wreck your skin big time.

👉🏼 **A breakout just means when pimples suddenly start appearing on your skin** (face, chest, back, etc.).

**Avoid using bathing soap, beauty bar** (unless they're specifically meant for face), or body lotion on the face. They're not meant for face use 😕. You're just ruining your skin at this point. You can start wondering why you get acne or breakouts on your face all of a sudden. It can be because of the cream you're using, and you may not be able to tell.

This is non-acne related, but still hygiene for the boys. I'm not sure this relates to girls as well (obviously I'm not a girl, so I wouldn't know for sure 😅😂), but if your pubic region AKA down there gives off funny smells; it could be 'cause of any of these things (hence, their solution)👇🏻:

- **Use unscented/fragrance-free soaps** to wash 'em. The area naturally cleans itself, so all you really need is a mild, fragrance-free soap and water, 'cause fragrance can irritate or throw off the natural pH balance. This irritation can cause itching, dryness, or infections 😬.
- An example of unscented soap you can use is, **Dove Sensitive Skin Beauty Bar** ✨
- **Always trim your pubic hairs**, like why keep 'em 🤨. Go bald, in fact 😌. Why? Pubic hairs trap sweats, dirt, and bacteria. They can cause bad odor, itching, and even bumps (ingrown hairs). Man to man, you can not be having a girl come over and still got that bush on 😣
- **A trimmer is a way better investment than 'shaving sticks or razors'** (both in monetary terms and in hygiene) ☹️ - the pain, bleeding, and all of that. Nah, you can not be having that when you're shaving - it's meant to be painless. Anyway, invest in one and thank me later 🧏‍♂️.
- Last, but not least, **I recommend you use cold water to wash off your pubic region**.. using hot water most times, makes your region give off some funny smells - I can't lie 😂 (I hope I explained it well, and went deep into this)

Remember, this is all from personal experience and research. As I remember more, I'll share more content!`,
  },
  "find-your-skin-type": {
    title: "SkinPlug 101 - Ep 2: Find Your Skin Type in 60 Seconds",
    content: `**If you've ever said, "This product doesn't work" or "It made my face worse," chances are you're not using products for YOUR skin type.**

Dry? Oily? Combo? Sensitive? Let's break down how to find yours in under 2 mins 😳

**Let's test your skin type real quick — no stress. Pick the option that sounds MOST like you:**

**1. After washing your face and waiting 30 mins (no product), how does your skin feel?**
- A) Feels tight or dry
- B) Feels oily/shiny all over
- C) Oily in some areas (like forehead/nose) but dry in others
- D) Itches, stings, or reacts easily

**2. How often do you break out?**
- A) Hardly ever
- B) A lot (especially when it's hot)
- C) Sometimes, mostly around the T-zone
- D) Even mild products cause reactions or bumps

**3. How does your skin look by midday?**
- A) Flaky or dull
- B) Super oily/shiny
- C) Shiny in T-zone only
- D) Red or irritated

**Results:**
- **Mostly A's? >> Dry Skin** 👍
- **Mostly B's? >> Oily Skin** ❤️
- **Mostly C's? >> Combination Skin** 😮
- **Mostly D's? >> Sensitive Skin** 😢

**What your skin actually needs:**

**DRY SKIN**
If your face feels tight, rough, or looks flaky, especially after washing, then you've got dry skin.

*What your skin actually needs:*
💧 Moisture. Products that hydrate and help your skin hold onto that moisture.

*Your glow-up combo:*
1. **Hydrating Cleanser** - creamy or lotion-type (no foaming)
2. **Rich Moisturizer** - packed with ingredients like hyaluronic acid or ceramides

**Cleansers to use for dry skin:**
- **CeraVe Hydrating Cleanser:** Creamy texture, contains ceramides + hyaluronic acid, doesn't strip your skin, super gentle
- **Simple Moisturising Facial Wash:** No harsh chemicals, budget-friendly, great for sensitive, dry skin

**Moisturizers to use for dry skin:**
- **CeraVe Moisturizing Cream:** Rich, non-greasy, contains ceramides + hyaluronic acid, restores the skin barrier, very effective for extremely dry skin
- **Simple Hydrating Light Moisturizer:** Contains pro-Vitamin B5 and Vitamin E, lightweight, non-greasy, and absorbs easily, budget-friendly

**COMBINATION SKIN**
Combo skin is basically a mix of dry/normal skin and oily skin - two totally different things happening on the same face 😪. Your cheeks might feel dry or normal, but your forehead, nose, and chin (the T-zone) are out here doing oil factory work 😕💔

So yeah... it's a confusing skin type, but it just needs balance - not too drying, not too heavy.

**CeraVe Foaming Cleanser:**
- Has Niacinamide + Ceramides
- Niacinamide = a skin-brightening, oil-controlling vitamin (also helps with acne & dark spots) ✨️
- Ceramides = natural fats your skin already has, but sometimes loses (they help lock in moisture and protect your skin barrier) 🛡
- Balances combo skin perfectly
- Lasts long, so worth the price

**XHC Tea Tree Foaming Facial Wash:**
- Mild tea tree effect (helps oily T-zone)
- Budget-friendly
- Best used once a day if your cheeks feel tight

**Some Moisturizers you can use along:**
- **Simple Hydrating Light Moisturizer** – lightweight, non-greasy, budget-friendly`,
  },
};

export default function SkinPlugArticle() {
  const [match, params] = useRoute("/skinplug/:slug");
  const slug = params?.slug as string;
  const article = articles[slug];

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <Link href="/skinplug">
            <a>
              <Button className="bg-purple-600 hover:bg-purple-700">Back to SkinPlug</Button>
            </a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/skinplug">
          <a className="flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-8 font-semibold">
            <ArrowLeft size={20} />
            Back to SkinPlug
          </a>
        </Link>

        <article className="bg-white rounded-lg shadow-md p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">{article.title}</h1>
          <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
            {article.content}
          </div>
        </article>

        <div className="mt-12 text-center">
          <Link href="/skinplug">
            <a>
              <Button className="bg-purple-600 hover:bg-purple-700">Read More Articles</Button>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
