# Auth Demo

مشروع بتعلّم بيه React Router (Data Mode) مع Supabase. فيه تسجيل ودخول، وأول يوزر بيبقى Admin والباقي Client، وصفحة profile، وصفحة posts بـ TanStack Query.

## المكتبات
React، React Router، Supabase، React Hook Form، Zod، TanStack Query، Tailwind، Vite.

## التشغيل
1. `npm install`
2. اعمل مشروع على Supabase، وفي Authentication ثم Email عطّل Confirm email أثناء التطوير.
3. شغّل ملفات `supabase/migrations/` بالترتيب في SQL Editor (التفاصيل في `supabase/README.md`).
4. انسخ `.env.example` لـ `.env` وحط `VITE_SUPABASE_URL` و`VITE_SUPABASE_PUBLISHABLE_KEY`.
5. `npm run dev`

## ملاحظات
- صفحة posts بتستخدم JSONPlaceholder، وهو API وهمي مابيحفظش حاجة، فالبوستات الجديدة بتتخزن محليًا وبتختفي مع Refresh.
- مفيش اختبارات آلية لسه.