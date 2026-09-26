# UPG backend aur analytics corrections — 2026-09-27

## Masla aur badlaav

- Concurrent same-submission requests Google Sheets mein duplicate rows bana sakti thin. Ab deterministic SHA-256 named-range marker aur 34-column row ek atomic `batchUpdate` mein save hotay hain. Legacy rows ka lookup barqarar hai. Error/timeout par exact submission-row recovery hoti hai; marker akela successful storage ka saboot nahin.
- Nayi real leads ke liye CRM ki Los Angeles calendar date se aglay weekday ki follow-up date save hoti hai. Holidays ka calendar shamil nahin. Spam/system-test records ko sales follow-up assign nahin hota.
- GSC property totals ab ungrouped query se aatay hain. Visible query/page aur non-brand data ko subset label diya gaya hai.
- GA4 unique users channel rows se sum nahin hotay. Quote-specific aur generic form-start events alag hain. Reporting windows GA4 ke New York aur GSC ke Pacific timezone par hain; CRM UTC serials reporting timezone mein convert hotay hain.
- Exact known QA tags report se exclude hotay hain; standalone `qa` ya customer ke normal `test` lafz par exclusion nahin hota.
- GA bootstrap sirf exact `checkout.stripe.com` referrer par `ignore_referrer` set karta hai. Consent aur baqi acquisition sources ka existing behavior barqarar hai.
- Dependency audit ke confirmed advisories ke liye Next.js aur matching ESLint config ka minimum 16.3.3 (lockfile 16.3.6), Sharp 0.35.4 aur affected transitive packages patch kiye gaye. AVIF advisory: https://github.com/vercel/next.js/security/advisories/GHSA-2xp9-vwfh-vxw4

## Live configuration aur data correction

- GA4 mein UPG Acquisition primary channel group ke WithUPG brand alias aur Stripe payment-provider returns ke separate rules hain. Raw source/medium history preserve hai; purani attribution rewrite nahin hui.
- CRM mein explicitly tagged integration-test records sales follow-up se exclude hue. Missing review dates set hui aur purani notes preserve hain. Qualification, customer contact ya sale infer nahin ki gayi.
- Existing weekly monitor ka schedule aur task preserve hain. Woh reviewed collector `/Users/mac/.codex/tools/upg-organic-weekly-report-20260927.py` chalata hai; stale iCloud checkout ki WIP overwrite nahin hui. Collector update karte waqt reviewed repository source ke hash se match verify karein.

## Saboot

- Separate module instances ke concurrent/retry/legacy/auth/error tests pass.
- Private synthetic Google Sheet par real concurrent batches ne ek row save ki; duplicate reject aur invalid-batch rollback verify hue. Final exported function ka exact payload, date formatting aur formula-like literal text bhi read-back se verify hua.
- Live aggregate report ko direct Google totals se reconcile kiya gaya. Actual business metrics aur operational evidence local audit artifacts mein hain.

## Operational boundaries

- Idempotency markers permanent hain. Unhein manually delete na karein; capacity/API failure par write fail closed rehta hai. Har accepted submission ek named range add karta hai.
- Uniqueness guard-aware writers par apply hoti hai. Old unguarded deployment par traffic wapas bhejna protection ko kamzor karega.
- Email delivery exactly-once queue nahin hai. CRM-only success ka conversion contract preserve hai; consent/blocking ki wajah se GA4 aur CRM counts mukhtalif ho sakte hain.
- Synthetic Google API proof local authorized OAuth se hai. Fresh real production lead/payment/email submit nahin kiya gaya; deployed service-account end-to-end delivery ko is proof ke barabar na samjhein.
