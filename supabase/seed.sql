-- ============================================================
-- AHEAD Initiatives CMS — Seed data
-- Content migrated verbatim from the existing site/repository.
-- No organisational facts invented. Sections still awaiting
-- AHEAD-supplied content are seeded as status='draft'.
-- Idempotent: safe to re-run (upserts on natural keys).
-- ============================================================

-- site_sections
insert into public.site_sections (slug, parent_slug, title, subtitle, body, extra, sort_order, status)
values ('hero', null, '{"en":"Addressing Hunger, Empowerment and Development"}'::jsonb, '{"en":"A registered not-for-profit strengthening local self-governance, natural resource management, and contextual education to combat hunger and poverty in Eastern India."}'::jsonb, '{}'::jsonb, '{"stats":[{"value":"25+","label":"Gram Panchayat Partnerships"},{"value":"82","label":"Published Materials"},{"value":"16+","label":"Years of Impact"},{"value":"30+","label":"Core Team Members"}]}'::jsonb, 0, 'published')
on conflict (slug) do update set title=excluded.title, subtitle=excluded.subtitle, body=excluded.body, extra=excluded.extra, sort_order=excluded.sort_order;
insert into public.site_sections (slug, parent_slug, title, subtitle, body, extra, sort_order, status)
values ('story', null, '{"en":"Our Story"}'::jsonb, '{"en":"History & Purpose"}'::jsonb, '{"en":"Ahead Initiatives brings together over a hundred years of experience in Rural Development, stretching from exemplary grassroots Action Research & Capacity Building to successful evidence based Advocacy, which has led to policy changes in Local Governance.\n\nIt has been constituted as a Not-for-Profit Association under Section 25 of the Companies Act, 1956 to ensure greater transparency, accountability and monitoring which would help inspire public confidence and participation. It hopes to transform itself into a widely held Not-for-Profit Association which, while focusing on basic issues of Hunger will also endeavour to bridge the cultural divide and work towards redefining a more sustainable development paradigm."}'::jsonb, '{"registration":{"cin":"U85300WB2009NPL134655","licence":"100531","fcra":"147120965","registered":"20 April 2009"}}'::jsonb, 10, 'published')
on conflict (slug) do update set title=excluded.title, subtitle=excluded.subtitle, body=excluded.body, extra=excluded.extra, sort_order=excluded.sort_order;
insert into public.site_sections (slug, parent_slug, title, subtitle, body, extra, sort_order, status)
values ('philosophy', null, '{"en":"Philosophy & Mission"}'::jsonb, '{}'::jsonb, '{"en":"**Vision:** To promote a society where people of diverse cultures are able to define their own development paradigm and fulfil their economic, social, cultural, and spiritual aspirations.\n\n**Mission:**\n- Alleviate poverty by addressing Hunger and Food & Nutritional insecurity as the primary focus of our development endeavour.\n- Engage with development in the context and through the medium of human cultures."}'::jsonb, '{}'::jsonb, 20, 'published')
on conflict (slug) do update set title=excluded.title, subtitle=excluded.subtitle, body=excluded.body, extra=excluded.extra, sort_order=excluded.sort_order;
insert into public.site_sections (slug, parent_slug, title, subtitle, body, extra, sort_order, status)
values ('work', null, '{"en":"Areas of Work"}'::jsonb, '{"en":"Our Initiatives"}'::jsonb, '{}'::jsonb, '{}'::jsonb, 30, 'published')
on conflict (slug) do update set title=excluded.title, subtitle=excluded.subtitle, body=excluded.body, extra=excluded.extra, sort_order=excluded.sort_order;
insert into public.site_sections (slug, parent_slug, title, subtitle, body, extra, sort_order, status)
values ('work-hunger', 'work', '{"en":"Addressing Hunger"}'::jsonb, '{}'::jsonb, '{"en":"Advocating a Local Self Governance Approach to sustainable and decentralized Natural Resource Management as the principal means of addressing food, nutrition and livelihood insecurity."}'::jsonb, '{"icon":"Wheat","color":"#e07a5f","legacy_href":"/initiatives#hunger"}'::jsonb, 31, 'published')
on conflict (slug) do update set title=excluded.title, subtitle=excluded.subtitle, body=excluded.body, extra=excluded.extra, sort_order=excluded.sort_order;
insert into public.site_sections (slug, parent_slug, title, subtitle, body, extra, sort_order, status)
values ('work-education', 'work', '{"en":"Contextual Education"}'::jsonb, '{}'::jsonb, '{"en":"Supplementing rural education with contextually appropriate localised input through partnerships with 25 Gram Panchayats and the Nabodisha platform for rural teachers."}'::jsonb, '{"icon":"GraduationCap","color":"#2d6a4f","legacy_href":"/initiatives#education"}'::jsonb, 32, 'published')
on conflict (slug) do update set title=excluded.title, subtitle=excluded.subtitle, body=excluded.body, extra=excluded.extra, sort_order=excluded.sort_order;
insert into public.site_sections (slug, parent_slug, title, subtitle, body, extra, sort_order, status)
values ('work-culture', 'work', '{"en":"Culture & Development"}'::jsonb, '{}'::jsonb, '{"en":"Recognising culture as intrinsic to sustainable human development, engaging schools and communities to preserve cultural heritage and foster creative expression."}'::jsonb, '{"icon":"Palette","color":"#1E3F66","legacy_href":"/initiatives#culture"}'::jsonb, 33, 'published')
on conflict (slug) do update set title=excluded.title, subtitle=excluded.subtitle, body=excluded.body, extra=excluded.extra, sort_order=excluded.sort_order;
insert into public.site_sections (slug, parent_slug, title, subtitle, body, extra, sort_order, status)
values ('work-srijangan', 'work', '{"en":"Srijangan"}'::jsonb, '{}'::jsonb, '{"en":"Transforming neighbourhood primary schools into open creative learning spaces for lifelong learning for all ages, accessible to the homebound poor."}'::jsonb, '{"icon":"Sparkles","color":"#7c3aed","legacy_href":"/initiatives#srijangan"}'::jsonb, 34, 'published')
on conflict (slug) do update set title=excluded.title, subtitle=excluded.subtitle, body=excluded.body, extra=excluded.extra, sort_order=excluded.sort_order;
insert into public.site_sections (slug, parent_slug, title, subtitle, body, extra, sort_order, status)
values ('work-strategy', 'work', '{"en":"Local Self Governance"}'::jsonb, '{}'::jsonb, '{"en":"Strengthening Local Self-Government to become inclusive, participatory, just and efficient institutions through CSO-Panchayat and Corporate partnerships."}'::jsonb, '{"icon":"Landmark","color":"#0891b2","legacy_href":"/initiatives#strategy"}'::jsonb, 35, 'published')
on conflict (slug) do update set title=excluded.title, subtitle=excluded.subtitle, body=excluded.body, extra=excluded.extra, sort_order=excluded.sort_order;
insert into public.site_sections (slug, parent_slug, title, subtitle, body, extra, sort_order, status)
values ('field', null, '{"en":"Field Stories"}'::jsonb, '{"en":"Proof of Work"}'::jsonb, '{}'::jsonb, '{"note":"Awaiting AHEAD-supplied field stories via admin panel."}'::jsonb, 40, 'draft')
on conflict (slug) do update set title=excluded.title, subtitle=excluded.subtitle, body=excluded.body, extra=excluded.extra, sort_order=excluded.sort_order;
insert into public.site_sections (slug, parent_slug, title, subtitle, body, extra, sort_order, status)
values ('publications', null, '{"en":"Publications & Knowledge Resources"}'::jsonb, '{}'::jsonb, '{}'::jsonb, '{}'::jsonb, 50, 'published')
on conflict (slug) do update set title=excluded.title, subtitle=excluded.subtitle, body=excluded.body, extra=excluded.extra, sort_order=excluded.sort_order;
insert into public.site_sections (slug, parent_slug, title, subtitle, body, extra, sort_order, status)
values ('blog', null, '{"en":"Latest Updates"}'::jsonb, '{"en":"Blog"}'::jsonb, '{}'::jsonb, '{}'::jsonb, 60, 'draft')
on conflict (slug) do update set title=excluded.title, subtitle=excluded.subtitle, body=excluded.body, extra=excluded.extra, sort_order=excluded.sort_order;
insert into public.site_sections (slug, parent_slug, title, subtitle, body, extra, sort_order, status)
values ('media', null, '{"en":"Videos & Media"}'::jsonb, '{}'::jsonb, '{}'::jsonb, '{"youtube_channel":"@aheadinitiatives4836"}'::jsonb, 70, 'draft')
on conflict (slug) do update set title=excluded.title, subtitle=excluded.subtitle, body=excluded.body, extra=excluded.extra, sort_order=excluded.sort_order;
insert into public.site_sections (slug, parent_slug, title, subtitle, body, extra, sort_order, status)
values ('social', null, '{"en":"Social Updates"}'::jsonb, '{}'::jsonb, '{}'::jsonb, '{"linkedin":"https://www.linkedin.com/company/theahead-initiatives/"}'::jsonb, 80, 'draft')
on conflict (slug) do update set title=excluded.title, subtitle=excluded.subtitle, body=excluded.body, extra=excluded.extra, sort_order=excluded.sort_order;
insert into public.site_sections (slug, parent_slug, title, subtitle, body, extra, sort_order, status)
values ('reports', null, '{"en":"Reports & Transparency"}'::jsonb, '{"en":"Financials, FCRA, Compliances, Policies"}'::jsonb, '{}'::jsonb, '{}'::jsonb, 90, 'published')
on conflict (slug) do update set title=excluded.title, subtitle=excluded.subtitle, body=excluded.body, extra=excluded.extra, sort_order=excluded.sort_order;
insert into public.site_sections (slug, parent_slug, title, subtitle, body, extra, sort_order, status)
values ('partners', null, '{"en":"Partnerships"}'::jsonb, '{"en":"CSR & Institutional Collaboration"}'::jsonb, '{}'::jsonb, '{"note":"Partner list to be confirmed by AHEAD before publishing."}'::jsonb, 100, 'draft')
on conflict (slug) do update set title=excluded.title, subtitle=excluded.subtitle, body=excluded.body, extra=excluded.extra, sort_order=excluded.sort_order;
insert into public.site_sections (slug, parent_slug, title, subtitle, body, extra, sort_order, status)
values ('contact', null, '{"en":"Contact & Support"}'::jsonb, '{}'::jsonb, '{}'::jsonb, '{"address":"32/6 Gariahat Road (S), Kolkata – 700031, West Bengal, India","phone":"033-40670369","email":"ahead@aheadinitiatives.in"}'::jsonb, 110, 'published')
on conflict (slug) do update set title=excluded.title, subtitle=excluded.subtitle, body=excluded.body, extra=excluded.extra, sort_order=excluded.sort_order;

-- documents: unique key emulation via title+category (delete stale seed rows first is avoided; use not exists)
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Annual Report and Financial Statements 2025', null, 'annual_report', null, null, '2025', null, 'en', 'local', '/pdf/Annual%20Report%20and%20Financial%20Statements%202025.pdf', null, true, 0
where not exists (select 1 from public.documents where title = 'Annual Report and Financial Statements 2025' and category = 'annual_report');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Annual Report and Financial Statements 2024', null, 'annual_report', null, null, '2024', null, 'en', 'local', '/pdf/Annual%20Report%20and%20Financial%20Statements%202024.pdf', null, true, 0
where not exists (select 1 from public.documents where title = 'Annual Report and Financial Statements 2024' and category = 'annual_report');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Annual Report and Financial Statements 2023', null, 'annual_report', null, null, '2023', null, 'en', 'local', '/pdf/2023.pdf', null, true, 0
where not exists (select 1 from public.documents where title = 'Annual Report and Financial Statements 2023' and category = 'annual_report');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Annual Report and Financial Statements 2022', null, 'annual_report', null, null, '2022', null, 'en', 'local', '/pdf/2022.pdf', null, true, 0
where not exists (select 1 from public.documents where title = 'Annual Report and Financial Statements 2022' and category = 'annual_report');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Annual Report and Financial Statements 2021', null, 'annual_report', null, null, '2021', null, 'en', 'local', '/pdf/2021.pdf', null, true, 0
where not exists (select 1 from public.documents where title = 'Annual Report and Financial Statements 2021' and category = 'annual_report');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Annual Report and Financial Statements 2020', null, 'annual_report', null, null, '2020', null, 'en', 'local', '/pdf/2020.pdf', null, true, 0
where not exists (select 1 from public.documents where title = 'Annual Report and Financial Statements 2020' and category = 'annual_report');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Annual Report and Financial Statements 2019', null, 'annual_report', null, null, '2019', null, 'en', 'local', '/pdf/2019.pdf', null, true, 0
where not exists (select 1 from public.documents where title = 'Annual Report and Financial Statements 2019' and category = 'annual_report');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Annual Report and Financial Statements 2018', null, 'annual_report', null, null, '2018', null, 'en', 'local', '/pdf/2018.pdf', null, true, 0
where not exists (select 1 from public.documents where title = 'Annual Report and Financial Statements 2018' and category = 'annual_report');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Annual Report and Financial Statements 2017', null, 'annual_report', null, null, '2017', null, 'en', 'local', '/pdf/2017.pdf', null, true, 0
where not exists (select 1 from public.documents where title = 'Annual Report and Financial Statements 2017' and category = 'annual_report');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'FCRA Q1 Fund Receipts FY 24-25', null, 'fcra_quarterly', null, null, 'FY 2024-25', 'Q1', 'en', 'external', null, 'https://www.aheadinitiatives.in/pdf/FCRA%20Q1%20fund%20receipts%20FY%2024-25.pdf', true, 0
where not exists (select 1 from public.documents where title = 'FCRA Q1 Fund Receipts FY 24-25' and category = 'fcra_quarterly');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'FCRA Q4 Fund Receipts FY 23-24', null, 'fcra_quarterly', null, null, 'FY 2023-24', 'Q4', 'en', 'external', null, 'https://www.aheadinitiatives.in/pdf/FCRA%20Q4%20fund%20receipts%20FY%2023-24.pdf', true, 0
where not exists (select 1 from public.documents where title = 'FCRA Q4 Fund Receipts FY 23-24' and category = 'fcra_quarterly');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'FCRA Q3 Fund Receipts FY 23-24', null, 'fcra_quarterly', null, null, 'FY 2023-24', 'Q3', 'en', 'external', null, 'https://www.aheadinitiatives.in/pdf/FCRA%20Q3%20fund%20receipts%20FY%2023-24.pdf', true, 0
where not exists (select 1 from public.documents where title = 'FCRA Q3 Fund Receipts FY 23-24' and category = 'fcra_quarterly');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'FCRA Q2 Fund Receipts FY 23/24', null, 'fcra_quarterly', null, null, 'FY 2023-24', 'Q2', 'en', 'external', null, 'https://www.aheadinitiatives.in/pdf/FCRA%2023-24%20Q2.pdf', true, 0
where not exists (select 1 from public.documents where title = 'FCRA Q2 Fund Receipts FY 23/24' and category = 'fcra_quarterly');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'FCRA Q1 Fund Receipts FY 23/24', null, 'fcra_quarterly', null, null, 'FY 2023-24', 'Q1', 'en', 'external', null, 'https://www.aheadinitiatives.in/pdf/FCRA%2023-24%20Q1.pdf', true, 0
where not exists (select 1 from public.documents where title = 'FCRA Q1 Fund Receipts FY 23/24' and category = 'fcra_quarterly');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'FCRA Q4 Fund Receipts FY 22/23', null, 'fcra_quarterly', null, null, 'FY 2022-23', 'Q4', 'en', 'external', null, 'https://www.aheadinitiatives.in/pdf/FCRA%2022-23%20Q4.pdf', true, 0
where not exists (select 1 from public.documents where title = 'FCRA Q4 Fund Receipts FY 22/23' and category = 'fcra_quarterly');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'FCRA Q3 Fund Receipts FY 22/23', null, 'fcra_quarterly', null, null, 'FY 2022-23', 'Q3', 'en', 'external', null, 'https://www.aheadinitiatives.in/pdf/FCRA%2022-23%20Q3.pdf', true, 0
where not exists (select 1 from public.documents where title = 'FCRA Q3 Fund Receipts FY 22/23' and category = 'fcra_quarterly');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'FCRA Q2 Fund Receipts FY 22/23', null, 'fcra_quarterly', null, null, 'FY 2022-23', 'Q2', 'en', 'external', null, 'https://www.aheadinitiatives.in/pdf/FCRA%2022-23%20Q2.pdf', true, 0
where not exists (select 1 from public.documents where title = 'FCRA Q2 Fund Receipts FY 22/23' and category = 'fcra_quarterly');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'FCRA Q1 Fund Receipts FY 22/23', null, 'fcra_quarterly', null, null, 'FY 2022-23', 'Q1', 'en', 'local', '/pdf/fcra/fcra-quarterly-fy2022-23-q1.pdf', null, true, 0
where not exists (select 1 from public.documents where title = 'FCRA Q1 Fund Receipts FY 22/23' and category = 'fcra_quarterly');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'FCRA Q4 Fund Receipts FY 21/22', null, 'fcra_quarterly', null, null, 'FY 2021-22', 'Q4', 'en', 'external', null, 'https://www.aheadinitiatives.in/pdf/FCRA%2021-22%20Q4.pdf', true, 0
where not exists (select 1 from public.documents where title = 'FCRA Q4 Fund Receipts FY 21/22' and category = 'fcra_quarterly');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'FCRA Q3 Fund Receipts FY 21/22', null, 'fcra_quarterly', null, null, 'FY 2021-22', 'Q3', 'en', 'external', null, 'https://www.aheadinitiatives.in/pdf/FCRA%2021-22%20Q3.pdf', true, 0
where not exists (select 1 from public.documents where title = 'FCRA Q3 Fund Receipts FY 21/22' and category = 'fcra_quarterly');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'FCRA Q2 Fund Receipts FY 21/22', null, 'fcra_quarterly', null, null, 'FY 2021-22', 'Q2', 'en', 'external', null, 'https://www.aheadinitiatives.in/pdf/FCRA%2021-22%20Q2.pdf', true, 0
where not exists (select 1 from public.documents where title = 'FCRA Q2 Fund Receipts FY 21/22' and category = 'fcra_quarterly');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'FCRA Q1 Fund Receipts FY 21/22', null, 'fcra_quarterly', null, null, 'FY 2021-22', 'Q1', 'en', 'local', '/pdf/fcra/fcra-quarterly-fy2021-22-q1.pdf', null, true, 0
where not exists (select 1 from public.documents where title = 'FCRA Q1 Fund Receipts FY 21/22' and category = 'fcra_quarterly');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'FCRA Q4 Fund Receipts FY 20/21', null, 'fcra_quarterly', null, null, 'FY 2020-21', 'Q4', 'en', 'local', '/pdf/fcra/fcra-quarterly-fy2020-21-q4.pdf', null, true, 0
where not exists (select 1 from public.documents where title = 'FCRA Q4 Fund Receipts FY 20/21' and category = 'fcra_quarterly');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'FCRA Q3 Fund Receipts FY 20/21', null, 'fcra_quarterly', null, null, 'FY 2020-21', 'Q3', 'en', 'local', '/pdf/fcra/fcra-quarterly-fy2020-21-q3.pdf', null, true, 0
where not exists (select 1 from public.documents where title = 'FCRA Q3 Fund Receipts FY 20/21' and category = 'fcra_quarterly');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'FCRA Q2 Fund Receipts FY 20/21', null, 'fcra_quarterly', null, null, 'FY 2020-21', 'Q2', 'en', 'local', '/pdf/fcra/fcra-quarterly-fy2020-21-q2.pdf', null, true, 0
where not exists (select 1 from public.documents where title = 'FCRA Q2 Fund Receipts FY 20/21' and category = 'fcra_quarterly');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'FCRA Q1 Fund Receipts FY 20/21', null, 'fcra_quarterly', null, null, 'FY 2020-21', 'Q1', 'en', 'local', '/pdf/fcra/fcra-quarterly-fy2020-21-q1.pdf', null, true, 0
where not exists (select 1 from public.documents where title = 'FCRA Q1 Fund Receipts FY 20/21' and category = 'fcra_quarterly');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'FCRA Q4 Fund Receipts FY 19/20', null, 'fcra_quarterly', null, null, 'FY 2019-20', 'Q4', 'en', 'local', '/pdf/fcra/fcra-quarterly-fy2019-20-q4.pdf', null, true, 0
where not exists (select 1 from public.documents where title = 'FCRA Q4 Fund Receipts FY 19/20' and category = 'fcra_quarterly');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'FCRA Q3 Fund Receipts FY 19/20', null, 'fcra_quarterly', null, null, 'FY 2019-20', 'Q3', 'en', 'local', '/pdf/fcra/fcra-quarterly-fy2019-20-q3.pdf', null, true, 0
where not exists (select 1 from public.documents where title = 'FCRA Q3 Fund Receipts FY 19/20' and category = 'fcra_quarterly');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'FCRA Q2 Fund Receipts FY 19/20', null, 'fcra_quarterly', null, null, 'FY 2019-20', 'Q2', 'en', 'local', '/pdf/fcra/fcra-quarterly-fy2019-20-q2.pdf', null, true, 0
where not exists (select 1 from public.documents where title = 'FCRA Q2 Fund Receipts FY 19/20' and category = 'fcra_quarterly');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'FCRA Q1 Fund Receipts FY 19/20', null, 'fcra_quarterly', null, null, 'FY 2019-20', 'Q1', 'en', 'local', '/pdf/fcra/fcra-quarterly-fy2019-20-q1.pdf', null, true, 0
where not exists (select 1 from public.documents where title = 'FCRA Q1 Fund Receipts FY 19/20' and category = 'fcra_quarterly');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'FCRA Q4 Fund Receipts FY 18/19', null, 'fcra_quarterly', null, null, 'FY 2018-19', 'Q4', 'en', 'local', '/pdf/fcra/fcra-quarterly-fy2018-19-q4.pdf', null, true, 0
where not exists (select 1 from public.documents where title = 'FCRA Q4 Fund Receipts FY 18/19' and category = 'fcra_quarterly');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'FCRA Q3 Fund Receipts FY 18/19', null, 'fcra_quarterly', null, null, 'FY 2018-19', 'Q3', 'en', 'local', '/pdf/fcra/fcra-quarterly-fy2018-19-q3.pdf', null, true, 0
where not exists (select 1 from public.documents where title = 'FCRA Q3 Fund Receipts FY 18/19' and category = 'fcra_quarterly');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'FCRA Q2 Fund Receipts FY 18/19', null, 'fcra_quarterly', null, null, 'FY 2018-19', 'Q2', 'en', 'local', '/pdf/fcra/fcra-quarterly-fy2018-19-q2.pdf', null, true, 0
where not exists (select 1 from public.documents where title = 'FCRA Q2 Fund Receipts FY 18/19' and category = 'fcra_quarterly');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'FCRA Q1 Fund Receipts FY 18/19', null, 'fcra_quarterly', null, null, 'FY 2018-19', 'Q1', 'en', 'local', '/pdf/fcra/fcra-quarterly-fy2018-19-q1.pdf', null, true, 0
where not exists (select 1 from public.documents where title = 'FCRA Q1 Fund Receipts FY 18/19' and category = 'fcra_quarterly');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'FCRA Q4 Fund Receipts FY 17/18', null, 'fcra_quarterly', null, null, 'FY 2017-18', 'Q4', 'en', 'local', '/pdf/fcra/fcra-quarterly-fy2017-18-q4.pdf', null, true, 0
where not exists (select 1 from public.documents where title = 'FCRA Q4 Fund Receipts FY 17/18' and category = 'fcra_quarterly');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'FCRA Q3 Fund Receipts FY 17/18', null, 'fcra_quarterly', null, null, 'FY 2017-18', 'Q3', 'en', 'local', '/pdf/fcra/fcra-quarterly-fy2017-18-q3.pdf', null, true, 0
where not exists (select 1 from public.documents where title = 'FCRA Q3 Fund Receipts FY 17/18' and category = 'fcra_quarterly');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'FCRA Q2 Fund Receipts FY 17/18', null, 'fcra_quarterly', null, null, 'FY 2017-18', 'Q2', 'en', 'local', '/pdf/fcra/fcra-quarterly-fy2017-18-q2.pdf', null, true, 0
where not exists (select 1 from public.documents where title = 'FCRA Q2 Fund Receipts FY 17/18' and category = 'fcra_quarterly');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'FCRA Q1 Fund Receipts FY 17/18', null, 'fcra_quarterly', null, null, 'FY 2017-18', 'Q1', 'en', 'local', '/pdf/fcra/fcra-quarterly-fy2017-18-q1.pdf', null, true, 0
where not exists (select 1 from public.documents where title = 'FCRA Q1 Fund Receipts FY 17/18' and category = 'fcra_quarterly');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'FCRA Q4 Fund Receipts FY 16/17', null, 'fcra_quarterly', null, null, 'FY 2016-17', 'Q4', 'en', 'local', '/pdf/fcra/fcra-quarterly-fy2016-17-q4.pdf', null, true, 0
where not exists (select 1 from public.documents where title = 'FCRA Q4 Fund Receipts FY 16/17' and category = 'fcra_quarterly');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'FCRA Q3 Fund Receipts FY 16/17', null, 'fcra_quarterly', null, null, 'FY 2016-17', 'Q3', 'en', 'local', '/pdf/fcra/fcra-quarterly-fy2016-17-q3.pdf', null, true, 0
where not exists (select 1 from public.documents where title = 'FCRA Q3 Fund Receipts FY 16/17' and category = 'fcra_quarterly');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'FCRA Q2 Fund Receipts FY 16/17', null, 'fcra_quarterly', null, null, 'FY 2016-17', 'Q2', 'en', 'local', '/pdf/fcra/fcra-quarterly-fy2016-17-q2.pdf', null, true, 0
where not exists (select 1 from public.documents where title = 'FCRA Q2 Fund Receipts FY 16/17' and category = 'fcra_quarterly');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'FCRA Q1 Fund Receipts FY 16/17', null, 'fcra_quarterly', null, null, 'FY 2016-17', 'Q1', 'en', 'local', '/pdf/fcra/fcra-quarterly-fy2016-17-q1.pdf', null, true, 0
where not exists (select 1 from public.documents where title = 'FCRA Q1 Fund Receipts FY 16/17' and category = 'fcra_quarterly');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'FCRA Financial Statements FY 24-25', null, 'fcra_annual', null, null, 'FY 2024-25', null, 'en', 'external', null, 'https://www.aheadinitiatives.in/pdf/FCRA%20Financial%20Statements%20for%20FY%2024-25.pdf', true, 0
where not exists (select 1 from public.documents where title = 'FCRA Financial Statements FY 24-25' and category = 'fcra_annual');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'FCRA Financial Statements FY 23-24', null, 'fcra_annual', null, null, 'FY 2023-24', null, 'en', 'external', null, 'https://www.aheadinitiatives.in/pdf/Audited%20Statement%20of%20Accounts%20FCRA%202023-24.pdf', true, 0
where not exists (select 1 from public.documents where title = 'FCRA Financial Statements FY 23-24' and category = 'fcra_annual');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'FCRA Financial Statements FY 22-23', null, 'fcra_annual', null, null, 'FY 2022-23', null, 'en', 'external', null, 'https://www.aheadinitiatives.in/pdf/FCRA%20Financial%20Statements%20for%20FY%2022-23.pdf', true, 0
where not exists (select 1 from public.documents where title = 'FCRA Financial Statements FY 22-23' and category = 'fcra_annual');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'FCRA Financial Statements FY 21-22', null, 'fcra_annual', null, null, 'FY 2021-22', null, 'en', 'external', null, 'https://www.aheadinitiatives.in/pdf/FCRA_2022.pdf', true, 0
where not exists (select 1 from public.documents where title = 'FCRA Financial Statements FY 21-22' and category = 'fcra_annual');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'FCRA Financial Statements FY 20-21', null, 'fcra_annual', null, null, 'FY 2020-21', null, 'en', 'local', '/pdf/fcra/fcra-annual-fy2020-21.pdf', null, true, 0
where not exists (select 1 from public.documents where title = 'FCRA Financial Statements FY 20-21' and category = 'fcra_annual');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'FCRA Financial Statements FY 19-20', null, 'fcra_annual', null, null, 'FY 2019-20', null, 'en', 'local', '/pdf/fcra/fcra-annual-fy2019-20.pdf', null, true, 0
where not exists (select 1 from public.documents where title = 'FCRA Financial Statements FY 19-20' and category = 'fcra_annual');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'FCRA Financial Statements FY 18-19', null, 'fcra_annual', null, null, 'FY 2018-19', null, 'en', 'local', '/pdf/fcra/fcra-annual-fy2018-19.pdf', null, true, 0
where not exists (select 1 from public.documents where title = 'FCRA Financial Statements FY 18-19' and category = 'fcra_annual');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'FCRA Financial Statements FY 17-18', null, 'fcra_annual', null, null, 'FY 2017-18', null, 'en', 'local', '/pdf/fcra/fcra-annual-fy2017-18.pdf', null, true, 0
where not exists (select 1 from public.documents where title = 'FCRA Financial Statements FY 17-18' and category = 'fcra_annual');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'FCRA Financial Statements FY 16-17', null, 'fcra_annual', null, null, 'FY 2016-17', null, 'en', 'local', '/pdf/fcra/fcra-annual-fy2016-17.pdf', null, true, 0
where not exists (select 1 from public.documents where title = 'FCRA Financial Statements FY 16-17' and category = 'fcra_annual');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'AOC for FY 24-25', null, 'mca_filing', 'aoc', null, null, null, 'en', 'external', null, 'https://www.aheadinitiatives.in/pdf/AOC%20for%20FY%2024-25.pdf', true, 0
where not exists (select 1 from public.documents where title = 'AOC for FY 24-25' and category = 'mca_filing');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'AOC-4 FY 23-24', null, 'mca_filing', 'aoc', null, null, null, 'en', 'external', null, 'https://www.aheadinitiatives.in/pdf/AOC-4%20FY%2023-24.pdf', true, 0
where not exists (select 1 from public.documents where title = 'AOC-4 FY 23-24' and category = 'mca_filing');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'AOC-4 FY 22-23', null, 'mca_filing', 'aoc', null, null, null, 'en', 'external', null, 'https://www.aheadinitiatives.in/pdf/AOC-4%20FY%2022-23.pdf', true, 0
where not exists (select 1 from public.documents where title = 'AOC-4 FY 22-23' and category = 'mca_filing');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'AOC for FY 21/22', null, 'mca_filing', 'aoc', null, null, null, 'en', 'external', null, 'https://www.aheadinitiatives.in/pdf/AOC%20for%20FY%2021/22.pdf', true, 0
where not exists (select 1 from public.documents where title = 'AOC for FY 21/22' and category = 'mca_filing');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'AOC for FY 20/21', null, 'mca_filing', 'aoc', null, null, null, 'en', 'external', null, 'https://www.aheadinitiatives.in/pdf/AOC%20for%20FY%2020/21.pdf', true, 0
where not exists (select 1 from public.documents where title = 'AOC for FY 20/21' and category = 'mca_filing');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'AOC for FY 19/20', null, 'mca_filing', 'aoc', null, null, null, 'en', 'external', null, 'https://www.aheadinitiatives.in/pdf/AOC%20for%20FY%2019/20.pdf', true, 0
where not exists (select 1 from public.documents where title = 'AOC for FY 19/20' and category = 'mca_filing');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'AOC for FY 18/19', null, 'mca_filing', 'aoc', null, null, null, 'en', 'external', null, 'https://www.aheadinitiatives.in/pdf/AOC%20for%20FY%2018/19.pdf', true, 0
where not exists (select 1 from public.documents where title = 'AOC for FY 18/19' and category = 'mca_filing');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'AOC for FY 17/18', null, 'mca_filing', 'aoc', null, null, null, 'en', 'external', null, 'https://www.aheadinitiatives.in/pdf/AOC%20for%20FY%2017/18.pdf', true, 0
where not exists (select 1 from public.documents where title = 'AOC for FY 17/18' and category = 'mca_filing');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'AOC for FY 16/17', null, 'mca_filing', 'aoc', null, null, null, 'en', 'external', null, 'https://www.aheadinitiatives.in/pdf/AOC%20for%20FY%2016/17.pdf', true, 0
where not exists (select 1 from public.documents where title = 'AOC for FY 16/17' and category = 'mca_filing');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'MGT-7 for FY 24-25', null, 'mca_filing', 'mgt', null, null, null, 'en', 'external', null, 'https://www.aheadinitiatives.in/pdf/MGT-7%20for%20FY%2024-25.pdf', true, 0
where not exists (select 1 from public.documents where title = 'MGT-7 for FY 24-25' and category = 'mca_filing');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'MGT-7 FY 23-24', null, 'mca_filing', 'mgt', null, null, null, 'en', 'external', null, 'https://www.aheadinitiatives.in/pdf/MGT-7%20FY%2023-24.pdf', true, 0
where not exists (select 1 from public.documents where title = 'MGT-7 FY 23-24' and category = 'mca_filing');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'MGT-7 for FY 22-23', null, 'mca_filing', 'mgt', null, null, null, 'en', 'external', null, 'https://www.aheadinitiatives.in/pdf/MGT-7%20for%20FY%2022-23.pdf', true, 0
where not exists (select 1 from public.documents where title = 'MGT-7 for FY 22-23' and category = 'mca_filing');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'MGT-7 for FY 21/22', null, 'mca_filing', 'mgt', null, null, null, 'en', 'external', null, 'https://www.aheadinitiatives.in/pdf/MGT-7%20for%20FY%2021/22.pdf', true, 0
where not exists (select 1 from public.documents where title = 'MGT-7 for FY 21/22' and category = 'mca_filing');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'MGT-7 for FY 20/21', null, 'mca_filing', 'mgt', null, null, null, 'en', 'external', null, 'https://www.aheadinitiatives.in/pdf/MGT-7%20for%20FY%2020/21.pdf', true, 0
where not exists (select 1 from public.documents where title = 'MGT-7 for FY 20/21' and category = 'mca_filing');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'MGT-7 for FY 19/20', null, 'mca_filing', 'mgt', null, null, null, 'en', 'external', null, 'https://www.aheadinitiatives.in/pdf/MGT-7%20for%20FY%2019/20.pdf', true, 0
where not exists (select 1 from public.documents where title = 'MGT-7 for FY 19/20' and category = 'mca_filing');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'MGT-7 for FY 18/19', null, 'mca_filing', 'mgt', null, null, null, 'en', 'external', null, 'https://www.aheadinitiatives.in/pdf/MGT-7%20for%20FY%2018/19.pdf', true, 0
where not exists (select 1 from public.documents where title = 'MGT-7 for FY 18/19' and category = 'mca_filing');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'MGT-7 for FY 17/18', null, 'mca_filing', 'mgt', null, null, null, 'en', 'external', null, 'https://www.aheadinitiatives.in/pdf/MGT-7%20for%20FY%2017/18.pdf', true, 0
where not exists (select 1 from public.documents where title = 'MGT-7 for FY 17/18' and category = 'mca_filing');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'MGT-7 for FY 16/17', null, 'mca_filing', 'mgt', null, null, null, 'en', 'external', null, 'https://www.aheadinitiatives.in/pdf/MGT-7%20for%20FY%2016/17.pdf', true, 0
where not exists (select 1 from public.documents where title = 'MGT-7 for FY 16/17' and category = 'mca_filing');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Acknowledgement of IT returns for FY 24-25', null, 'it_return', null, null, null, null, 'en', 'external', null, 'https://www.aheadinitiatives.in/pdf/Acknowledgement%20of%20IT%20returns%20for%20FY%2024-25.pdf', true, 0
where not exists (select 1 from public.documents where title = 'Acknowledgement of IT returns for FY 24-25' and category = 'it_return');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Acknowledgement of IT returns for FY 23-24', null, 'it_return', null, null, null, null, 'en', 'external', null, 'https://www.aheadinitiatives.in/pdf/Acknowledgement%20of%20IT%20returns%20for%20FY%2023-24.pdf', true, 0
where not exists (select 1 from public.documents where title = 'Acknowledgement of IT returns for FY 23-24' and category = 'it_return');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Acknowledgement of IT returns for FY 22-23', null, 'it_return', null, null, null, null, 'en', 'external', null, 'https://www.aheadinitiatives.in/pdf/Acknowledgement%20of%20IT%20returns%20for%20FY%2022-23.pdf', true, 0
where not exists (select 1 from public.documents where title = 'Acknowledgement of IT returns for FY 22-23' and category = 'it_return');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Acknowledgement of IT return for FY 21/22', null, 'it_return', null, null, null, null, 'en', 'external', null, 'https://www.aheadinitiatives.in/pdf/Acknowledgement%20of%20IT%20return%20for%20FY%2021/22.pdf', true, 0
where not exists (select 1 from public.documents where title = 'Acknowledgement of IT return for FY 21/22' and category = 'it_return');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Acknowledgement of IT return for FY 20/21', null, 'it_return', null, null, null, null, 'en', 'external', null, 'https://www.aheadinitiatives.in/pdf/Acknowledgement%20of%20IT%20return%20for%20FY%2020/21.pdf', true, 0
where not exists (select 1 from public.documents where title = 'Acknowledgement of IT return for FY 20/21' and category = 'it_return');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Acknowledgement of IT return for FY 19/20', null, 'it_return', null, null, null, null, 'en', 'external', null, 'https://www.aheadinitiatives.in/pdf/Acknowledgement%20of%20IT%20return%20for%20FY%2019/20.pdf', true, 0
where not exists (select 1 from public.documents where title = 'Acknowledgement of IT return for FY 19/20' and category = 'it_return');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Acknowledgement of IT return for FY 18/19', null, 'it_return', null, null, null, null, 'en', 'external', null, 'https://www.aheadinitiatives.in/pdf/Acknowledgement%20of%20IT%20return%20for%20FY%2018/19.pdf', true, 0
where not exists (select 1 from public.documents where title = 'Acknowledgement of IT return for FY 18/19' and category = 'it_return');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Acknowledgement of IT return for FY 17/18', null, 'it_return', null, null, null, null, 'en', 'external', null, 'https://www.aheadinitiatives.in/pdf/Acknowledgement%20of%20IT%20return%20for%20FY%2017/18.pdf', true, 0
where not exists (select 1 from public.documents where title = 'Acknowledgement of IT return for FY 17/18' and category = 'it_return');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Acknowledgement of IT return for FY 16/17', null, 'it_return', null, null, null, null, 'en', 'external', null, 'https://www.aheadinitiatives.in/pdf/Acknowledgement%20of%20IT%20return%20for%20FY%2016/17.pdf', true, 0
where not exists (select 1 from public.documents where title = 'Acknowledgement of IT return for FY 16/17' and category = 'it_return');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'AHEAD Retainer Policy 2025', null, 'policy', null, null, null, null, 'en', 'external', null, 'https://www.aheadinitiatives.in/pdf/policies/AHEAD%20Retainer%20Policy%202025.pdf', true, 0
where not exists (select 1 from public.documents where title = 'AHEAD Retainer Policy 2025' and category = 'policy');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'AHEAD Anti Corruption Policy Jan 2024', null, 'policy', null, null, null, null, 'en', 'external', null, 'https://www.aheadinitiatives.in/pdf/policies/AHEAD%20Anti%20Corruption%20Policy%20Jan%202024.pdf', true, 0
where not exists (select 1 from public.documents where title = 'AHEAD Anti Corruption Policy Jan 2024' and category = 'policy');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'AHEAD Child Safeguarding Policy Jan 2024', null, 'policy', null, null, null, null, 'en', 'external', null, 'https://www.aheadinitiatives.in/pdf/policies/AHEAD%20Child%20Safeguarding%20Policy%20Jan%202024.pdf', true, 0
where not exists (select 1 from public.documents where title = 'AHEAD Child Safeguarding Policy Jan 2024' and category = 'policy');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'AHEAD Code of Ethics Jan 2024', null, 'policy', null, null, null, null, 'en', 'external', null, 'https://www.aheadinitiatives.in/pdf/policies/AHEAD%20Code%20of%20Ethics%20Jan%202024.pdf', true, 0
where not exists (select 1 from public.documents where title = 'AHEAD Code of Ethics Jan 2024' and category = 'policy');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'AHEAD Initiatives Finance Policy Jan 2024', null, 'policy', null, null, null, null, 'en', 'external', null, 'https://www.aheadinitiatives.in/pdf/policies/AHEAD%20Initiatives%20Finance%20Policy%20Jan%202024.pdf', true, 0
where not exists (select 1 from public.documents where title = 'AHEAD Initiatives Finance Policy Jan 2024' and category = 'policy');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'AHEAD Anti-Terrorism Policy Feb 2024', null, 'policy', null, null, null, null, 'en', 'external', null, 'https://www.aheadinitiatives.in/pdf/policies/AHEAD%20Anti-terrorism-policy%20February%202024.pdf', true, 0
where not exists (select 1 from public.documents where title = 'AHEAD Anti-Terrorism Policy Feb 2024' and category = 'policy');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'AHEAD Initiatives HR Policy Jan 2024', null, 'policy', null, null, null, null, 'en', 'external', null, 'https://www.aheadinitiatives.in/pdf/policies/AHEAD%20Initiatives%20HR%20Policy%20Jan%202024.pdf', true, 0
where not exists (select 1 from public.documents where title = 'AHEAD Initiatives HR Policy Jan 2024' and category = 'policy');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'AHEAD Whistleblower Policy Jan 2024', null, 'policy', null, null, null, null, 'en', 'external', null, 'https://www.aheadinitiatives.in/pdf/policies/AHEAD%20Whistleblower%20Policy%202024.pdf', true, 0
where not exists (select 1 from public.documents where title = 'AHEAD Whistleblower Policy Jan 2024' and category = 'policy');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'AHEAD Policy Against Sexual Harassment at Workplace Jan 2024', null, 'policy', null, null, null, null, 'en', 'external', null, 'https://www.aheadinitiatives.in/pdf/policies/AHEAD%20POLICY%20AGAINST%20SEXUAL%20HARASSMENT%20AT%20WORKPLACE%20Jan%202024.pdf', true, 0
where not exists (select 1 from public.documents where title = 'AHEAD Policy Against Sexual Harassment at Workplace Jan 2024' and category = 'policy');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'AHEAD Procurement Policy 2024', null, 'policy', null, null, null, null, 'en', 'external', null, 'https://www.aheadinitiatives.in/pdf/policies/AHEAD%20Procurement%20Policy%202024.pdf', true, 0
where not exists (select 1 from public.documents where title = 'AHEAD Procurement Policy 2024' and category = 'policy');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Memorandum & Articles of Association', null, 'other', 'moa', null, null, null, 'en', 'local', '/pdf/moa.pdf', null, true, 0
where not exists (select 1 from public.documents where title = 'Memorandum & Articles of Association' and category = 'other');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'AHEAD Initiatives Brochure', null, 'other', 'brochure', null, null, null, 'en', 'local', '/pdf/brochure.pdf', null, true, 0
where not exists (select 1 from public.documents where title = 'AHEAD Initiatives Brochure' and category = 'other');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Local Government in Ancient India', 'English translation', 'publication', 'english_publications', 'Radha Kumud Mukherjee', null, null, 'en', 'local', null, null, false, 0
where not exists (select 1 from public.documents where title = 'Local Government in Ancient India' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Culture Spirituality and Development', 'A dialogue on redefining the development paradigm', 'publication', 'english_publications', null, null, null, 'en', 'local', null, null, false, 1
where not exists (select 1 from public.documents where title = 'Culture Spirituality and Development' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'PRI-SHG Synergy', 'Consultative Study on Synergy between Panchayati Raj Institutions and Self Help Groups (2009)', 'publication', 'english_publications', null, null, null, 'en', 'local', null, null, false, 2
where not exists (select 1 from public.documents where title = 'PRI-SHG Synergy' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Culture Spirituality and Development (Bengali)', 'Redefining the development paradigm', 'publication', 'bengali_publications', null, null, null, 'bn', 'local', null, null, false, 3
where not exists (select 1 from public.documents where title = 'Culture Spirituality and Development (Bengali)' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'UNESCO''s Great Thinkers in Education (Bengali)', 'A UNESCO compilation of great thinkers in education throughout the world, throughout the ages', 'publication', 'bengali_publications', null, null, null, 'bn', 'local', null, null, false, 4
where not exists (select 1 from public.documents where title = 'UNESCO''s Great Thinkers in Education (Bengali)' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Shantiniketan Sriniketan (Bengali)', 'An insight into Rabindranath''s philosophy of education and how it was realised', 'publication', 'bengali_publications', null, null, null, 'bn', 'local', null, null, false, 5
where not exists (select 1 from public.documents where title = 'Shantiniketan Sriniketan (Bengali)' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Come lets Act (Bengali)', 'A manual for street theatre, stage theatre and jatra for rural areas to foster creativity and communication', 'publication', 'bengali_publications', null, null, null, 'bn', 'local', null, null, false, 6
where not exists (select 1 from public.documents where title = 'Come lets Act (Bengali)' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Natural Resource Management and tree based livelihoods (Bengali)', 'Published by the West Bengal Government for use in MGNREGA Initiatives', 'publication', 'bengali_publications', null, null, null, 'bn', 'local', null, null, false, 7
where not exists (select 1 from public.documents where title = 'Natural Resource Management and tree based livelihoods (Bengali)' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'An Introduction to Activity Based Learning innovations in pedagogy – 1 (Classes 3 to 5)', 'School Curriculum and Syllabus based opportunities for contextually appropriate Activity Based Learning', 'publication', 'bengali_publications', null, null, null, 'bn', 'local', null, null, false, 8
where not exists (select 1 from public.documents where title = 'An Introduction to Activity Based Learning innovations in pedagogy – 1 (Classes 3 to 5)' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Activity Based Learning innovations in pedagogy for Class 3', 'School Curriculum and Syllabus based opportunities for Activity Based Learning', 'publication', 'bengali_publications', null, null, null, 'bn', 'local', null, null, false, 9
where not exists (select 1 from public.documents where title = 'Activity Based Learning innovations in pedagogy for Class 3' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Activity Based Learning innovations in pedagogy for Class 4', 'School Curriculum and Syllabus based opportunities for Activity Based Learning', 'publication', 'bengali_publications', null, null, null, 'bn', 'local', null, null, false, 10
where not exists (select 1 from public.documents where title = 'Activity Based Learning innovations in pedagogy for Class 4' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Activity Based Learning innovations in pedagogy for Class 5', 'School Curriculum and Syllabus based opportunities for Activity Based Learning', 'publication', 'bengali_publications', null, null, null, 'bn', 'local', null, null, false, 11
where not exists (select 1 from public.documents where title = 'Activity Based Learning innovations in pedagogy for Class 5' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Akashi''s Panchayat (Bengali)', 'A comic book story of a young woman''s journey as a successful Gram Panchayat Pradhan', 'publication', 'bengali_publications', null, null, null, 'bn', 'local', null, null, false, 12
where not exists (select 1 from public.documents where title = 'Akashi''s Panchayat (Bengali)' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Draft Resolutions for the Gram Sabha/Sansad', 'An array of issues for neighbourhood meetings and resolutions for the gram sabha for consideration', 'publication', 'bengali_publications', null, null, null, 'bn', 'local', null, null, false, 13
where not exists (select 1 from public.documents where title = 'Draft Resolutions for the Gram Sabha/Sansad' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Ecology and Rural Education (Bengali)', 'Ecology and Rural Education Manual for Rural Teachers produced by FAO of the United Nations', 'publication', 'bengali_publications', null, null, null, 'bn', 'local', null, null, false, 14
where not exists (select 1 from public.documents where title = 'Ecology and Rural Education (Bengali)' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Nutrition Education for primary school children (Bengali)', 'A FAO (UN) primer on an often neglected aspect of a child''s education', 'publication', 'bengali_publications', null, null, null, 'bn', 'local', null, null, false, 15
where not exists (select 1 from public.documents where title = 'Nutrition Education for primary school children (Bengali)' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'A Teachers Tale (Bengali)', 'Story of how a young rural teacher transforms a moribund school with the help of the Gram Panchayat', 'publication', 'bengali_publications', null, null, null, 'bn', 'local', null, null, false, 16
where not exists (select 1 from public.documents where title = 'A Teachers Tale (Bengali)' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Mala''s Story (Bengali)', 'A young bride takes on transforming her new neighbourhood to the virtues of homestead vegetable gardens and Natural Resource Management', 'publication', 'bengali_publications', null, null, null, 'bn', 'local', null, null, false, 17
where not exists (select 1 from public.documents where title = 'Mala''s Story (Bengali)' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'A primer on the Mangroves of the Sunderbans (Bengali)', 'Primer on the Mangroves of the Sunderbans', 'publication', 'bengali_publications', 'Dr. Kumud Ranjan Naskar', null, null, 'bn', 'local', null, null, false, 18
where not exists (select 1 from public.documents where title = 'A primer on the Mangroves of the Sunderbans (Bengali)' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Mastermashai Samopeshu [Dear Teacher] (Bengali)', 'An epistle to his teacher from a marginalised child in a rural school', 'publication', 'bengali_publications', null, null, null, 'bn', 'local', null, null, false, 19
where not exists (select 1 from public.documents where title = 'Mastermashai Samopeshu [Dear Teacher] (Bengali)' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Seeds - the Freedom of knowledge (Bengali)', 'A simple primer on collection and preservation of heirloom seeds', 'publication', 'bengali_publications', null, null, null, 'bn', 'local', null, null, false, 20
where not exists (select 1 from public.documents where title = 'Seeds - the Freedom of knowledge (Bengali)' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Miyawaki''s Rapid Afforestation (Bengali)', 'A translation of Afforest manual on Miyawaki''s methodology', 'publication', 'bengali_publications', null, null, null, 'bn', 'local', null, null, false, 21
where not exists (select 1 from public.documents where title = 'Miyawaki''s Rapid Afforestation (Bengali)' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Natural Dyes - their Production and Use (Part 1)', 'A collection of valuable information on the production and use of natural dyes', 'publication', 'bengali_publications', null, null, null, 'bn', 'local', null, null, false, 22
where not exists (select 1 from public.documents where title = 'Natural Dyes - their Production and Use (Part 1)' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Natural Dyes - their Production and Use (Part 2)', 'A collection of valuable information on the production and use of natural dyes', 'publication', 'bengali_publications', null, null, null, 'bn', 'local', null, null, false, 23
where not exists (select 1 from public.documents where title = 'Natural Dyes - their Production and Use (Part 2)' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Perennials for the Home Garden', 'Information on how to include a few perennials in a home Garden', 'publication', 'bengali_publications', null, null, null, 'bn', 'local', null, null, false, 24
where not exists (select 1 from public.documents where title = 'Perennials for the Home Garden' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Training Modules for Gram Rojgar Sevaks (GRS) and MGNREGS Supervisors (Draft)', 'Training modules for facilitating Asset Creation under MGNREGS', 'publication', 'bengali_publications', null, null, null, 'bn', 'local', null, null, false, 25
where not exists (select 1 from public.documents where title = 'Training Modules for Gram Rojgar Sevaks (GRS) and MGNREGS Supervisors (Draft)' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'NCF (2005)', 'National Curriculum Framework 2005 (Bengali)', 'publication', 'bengali_publications', null, null, null, 'bn', 'local', null, null, false, 26
where not exists (select 1 from public.documents where title = 'NCF (2005)' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Proverbs of Khanna (Bengali)', 'Traditional knowledge of Bengal on agriculture, etc distilled as quatrains for posterity', 'publication', 'bengali_publications', null, null, null, 'bn', 'local', null, null, false, 27
where not exists (select 1 from public.documents where title = 'Proverbs of Khanna (Bengali)' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Nursery (Bengali)', 'A compendium to strengthen an essential skill for rural areas', 'publication', 'bengali_publications', null, null, null, 'bn', 'local', null, null, false, 28
where not exists (select 1 from public.documents where title = 'Nursery (Bengali)' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'The interim Report on School Education in West Bengal 2011 (Bengali)', 'The Government''s report that was a turning point for school education', 'publication', 'bengali_publications', null, null, null, 'bn', 'local', null, null, false, 29
where not exists (select 1 from public.documents where title = 'The interim Report on School Education in West Bengal 2011 (Bengali)' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'The West Bengal Government''s Syllabus and Curriculum for Classes 1-5 (Bengali)', 'A consolidated government publication', 'publication', 'bengali_publications', null, null, null, 'bn', 'local', null, null, false, 30
where not exists (select 1 from public.documents where title = 'The West Bengal Government''s Syllabus and Curriculum for Classes 1-5 (Bengali)' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'The West Bengal Government''s Syllabus and Curriculum for Classes 6-8 (Bengali)', 'A consolidated government publication', 'publication', 'bengali_publications', null, null, null, 'bn', 'local', null, null, false, 31
where not exists (select 1 from public.documents where title = 'The West Bengal Government''s Syllabus and Curriculum for Classes 6-8 (Bengali)' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Activity Based Modules for Classes 3 & 4 (Bengali)', 'A compilation of activity based modules to make learning more vibrant and contextual', 'publication', 'bengali_publications', null, null, null, 'bn', 'local', null, null, false, 32
where not exists (select 1 from public.documents where title = 'Activity Based Modules for Classes 3 & 4 (Bengali)' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Activity Based Modules for Classes 5 to 8 (Bengali)', 'A compilation of activity based modules to make learning more vibrant and contextual', 'publication', 'bengali_publications', null, null, null, 'bn', 'local', null, null, false, 33
where not exists (select 1 from public.documents where title = 'Activity Based Modules for Classes 5 to 8 (Bengali)' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Leaflet on Miyawaki''s Afforestation', 'Distilled from the Bengali booklet', 'publication', 'bengali_publications', null, null, null, 'bn', 'local', null, null, false, 34
where not exists (select 1 from public.documents where title = 'Leaflet on Miyawaki''s Afforestation' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Salt tolerant crop list (Bengali)', 'A list compiled by FAO', 'publication', 'bengali_publications', null, null, null, 'bn', 'local', null, null, false, 35
where not exists (select 1 from public.documents where title = 'Salt tolerant crop list (Bengali)' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Crops through the seasons of Bengal', 'Leaflet for rural schoolchildren', 'publication', 'bengali_publications', null, null, null, 'bn', 'local', null, null, false, 36
where not exists (select 1 from public.documents where title = 'Crops through the seasons of Bengal' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Nursery (Bengali) - Leaflet', 'A leaflet for schoolchildren', 'publication', 'bengali_publications', null, null, null, 'bn', 'local', null, null, false, 37
where not exists (select 1 from public.documents where title = 'Nursery (Bengali) - Leaflet' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Azolla (Bengali)', 'A leaflet', 'publication', 'bengali_publications', null, null, null, 'bn', 'local', null, null, false, 38
where not exists (select 1 from public.documents where title = 'Azolla (Bengali)' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Vermicompost', 'A leaflet for schoolchildren', 'publication', 'bengali_publications', null, null, null, 'bn', 'local', null, null, false, 39
where not exists (select 1 from public.documents where title = 'Vermicompost' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Novel Methods of Bamboo Propagation (Bengali)', 'A rapid surefire method of Bamboo propagation from branching shoots', 'publication', 'bengali_publications', null, null, null, 'bn', 'local', null, null, false, 40
where not exists (select 1 from public.documents where title = 'Novel Methods of Bamboo Propagation (Bengali)' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'System of Rice Intensification [SRI] (Bengali)', 'A leaflet', 'publication', 'bengali_publications', null, null, null, 'bn', 'local', null, null, false, 41
where not exists (select 1 from public.documents where title = 'System of Rice Intensification [SRI] (Bengali)' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'System of Wheat Intensification [SWI] (Bengali)', 'A leaflet', 'publication', 'bengali_publications', null, null, null, 'bn', 'local', null, null, false, 42
where not exists (select 1 from public.documents where title = 'System of Wheat Intensification [SWI] (Bengali)' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Animal Husbandry Healthcare (Bengali)', 'A booklet', 'publication', 'bengali_publications', null, null, null, 'bn', 'local', null, null, false, 43
where not exists (select 1 from public.documents where title = 'Animal Husbandry Healthcare (Bengali)' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Breeding chicks [First 28 days] (Bengali)', 'A booklet', 'publication', 'bengali_publications', null, null, null, 'bn', 'local', null, null, false, 44
where not exists (select 1 from public.documents where title = 'Breeding chicks [First 28 days] (Bengali)' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Nabodisha - Latest Issue', 'The latest issue', 'publication', 'nabodisha', null, null, null, 'en', 'local', null, null, false, 45
where not exists (select 1 from public.documents where title = 'Nabodisha - Latest Issue' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Nabodisha - April 2020', 'April 2020', 'publication', 'nabodisha', null, null, null, 'en', 'local', null, null, false, 46
where not exists (select 1 from public.documents where title = 'Nabodisha - April 2020' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Nabodisha - December 2019', 'December 2019', 'publication', 'nabodisha', null, null, null, 'en', 'local', null, null, false, 47
where not exists (select 1 from public.documents where title = 'Nabodisha - December 2019' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Nabodisha - September 2018', 'September 2018', 'publication', 'nabodisha', null, null, null, 'en', 'local', null, null, false, 48
where not exists (select 1 from public.documents where title = 'Nabodisha - September 2018' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Nabodisha - January 2018', 'January 2018', 'publication', 'nabodisha', null, null, null, 'en', 'local', null, null, false, 49
where not exists (select 1 from public.documents where title = 'Nabodisha - January 2018' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Nabodisha - March 2017', 'March 2017', 'publication', 'nabodisha', null, null, null, 'en', 'local', null, null, false, 50
where not exists (select 1 from public.documents where title = 'Nabodisha - March 2017' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Nabodisha - December 2016', 'December 2016', 'publication', 'nabodisha', null, null, null, 'en', 'local', null, null, false, 51
where not exists (select 1 from public.documents where title = 'Nabodisha - December 2016' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Nabodisha - April 2016', 'April 2016', 'publication', 'nabodisha', null, null, null, 'en', 'local', null, null, false, 52
where not exists (select 1 from public.documents where title = 'Nabodisha - April 2016' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Nabodisha - Special Compendium 2015', 'Special Compendium issue 2015', 'publication', 'nabodisha', null, null, null, 'en', 'local', null, null, false, 53
where not exists (select 1 from public.documents where title = 'Nabodisha - Special Compendium 2015' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Nabodisha - December 2015', 'December 2015', 'publication', 'nabodisha', null, null, null, 'en', 'local', null, null, false, 54
where not exists (select 1 from public.documents where title = 'Nabodisha - December 2015' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Nabodisha - March 2015', 'March 2015', 'publication', 'nabodisha', null, null, null, 'en', 'local', null, null, false, 55
where not exists (select 1 from public.documents where title = 'Nabodisha - March 2015' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Nabodisha - Special Compendium 2014', 'Special Compendium Issue 2014', 'publication', 'nabodisha', null, null, null, 'en', 'local', null, null, false, 56
where not exists (select 1 from public.documents where title = 'Nabodisha - Special Compendium 2014' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Nabodisha - September 2014', 'September 2014', 'publication', 'nabodisha', null, null, null, 'en', 'local', null, null, false, 57
where not exists (select 1 from public.documents where title = 'Nabodisha - September 2014' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Nabodisha - April 2014', 'April 2014', 'publication', 'nabodisha', null, null, null, 'en', 'local', null, null, false, 58
where not exists (select 1 from public.documents where title = 'Nabodisha - April 2014' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Nabodisha - January 2014', 'January 2014', 'publication', 'nabodisha', null, null, null, 'en', 'local', null, null, false, 59
where not exists (select 1 from public.documents where title = 'Nabodisha - January 2014' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Nabodisha - October 2013', 'October 2013', 'publication', 'nabodisha', null, null, null, 'en', 'local', null, null, false, 60
where not exists (select 1 from public.documents where title = 'Nabodisha - October 2013' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Nabodisha - July 2013', 'July 2013', 'publication', 'nabodisha', null, null, null, 'en', 'local', null, null, false, 61
where not exists (select 1 from public.documents where title = 'Nabodisha - July 2013' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Nabodisha - April 2013', 'April 2013', 'publication', 'nabodisha', null, null, null, 'en', 'local', null, null, false, 62
where not exists (select 1 from public.documents where title = 'Nabodisha - April 2013' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Nabodisha - December 2012', 'December 2012', 'publication', 'nabodisha', null, null, null, 'en', 'local', null, null, false, 63
where not exists (select 1 from public.documents where title = 'Nabodisha - December 2012' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Mednabari GP Education Initiative Report (Bengali)', 'A report by the GP documenting the partnership initiative with Ahead Initiatives', 'publication', 'other_materials', null, null, null, 'bn', 'local', null, null, false, 64
where not exists (select 1 from public.documents where title = 'Mednabari GP Education Initiative Report (Bengali)' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Kalchini Panchayat Samiti Education Initiative Report (Bengali)', 'A report by Kalchini PS documenting the partnership initiative', 'publication', 'other_materials', null, null, null, 'bn', 'local', null, null, false, 65
where not exists (select 1 from public.documents where title = 'Kalchini Panchayat Samiti Education Initiative Report (Bengali)' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Kantabari GP Education Initiative Report (Bengali)', 'A report by the GP documenting the partnership initiative', 'publication', 'other_materials', null, null, null, 'bn', 'local', null, null, false, 66
where not exists (select 1 from public.documents where title = 'Kantabari GP Education Initiative Report (Bengali)' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Tonto GP Food & Livelihood Security Report (Hindi)', 'A report by the GP documenting the partnership initiative', 'publication', 'other_materials', null, null, null, 'en', 'local', null, null, false, 67
where not exists (select 1 from public.documents where title = 'Tonto GP Food & Livelihood Security Report (Hindi)' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Kusmi GP Food & Livelihood Security Report (Oriya)', 'A report by the GP documenting the partnership initiative', 'publication', 'other_materials', null, null, null, 'en', 'local', null, null, false, 68
where not exists (select 1 from public.documents where title = 'Kusmi GP Food & Livelihood Security Report (Oriya)' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Udaipur GP Food & Livelihood Security Report (Bengali)', 'A report by the GP documenting the partnership initiative', 'publication', 'other_materials', null, null, null, 'bn', 'local', null, null, false, 69
where not exists (select 1 from public.documents where title = 'Udaipur GP Food & Livelihood Security Report (Bengali)' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Baroghoria GP Food & Livelihood Security Report (Bengali)', 'A report by the GP documenting the partnership initiative', 'publication', 'other_materials', null, null, null, 'bn', 'local', null, null, false, 70
where not exists (select 1 from public.documents where title = 'Baroghoria GP Food & Livelihood Security Report (Bengali)' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Jharalta II GP Food & Livelihood Security Report (Bengali)', 'A report by the GP documenting the partnership initiative', 'publication', 'other_materials', null, null, null, 'bn', 'local', null, null, false, 71
where not exists (select 1 from public.documents where title = 'Jharalta II GP Food & Livelihood Security Report (Bengali)' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Magurmari I GP Food & Livelihood Security Report (Bengali)', 'A report by the GP documenting the partnership initiative', 'publication', 'other_materials', null, null, null, 'bn', 'local', null, null, false, 72
where not exists (select 1 from public.documents where title = 'Magurmari I GP Food & Livelihood Security Report (Bengali)' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Boaldar GP Food & Livelihood Security Report (Bengali)', 'A report by the GP documenting the partnership initiative', 'publication', 'other_materials', null, null, null, 'bn', 'local', null, null, false, 73
where not exists (select 1 from public.documents where title = 'Boaldar GP Food & Livelihood Security Report (Bengali)' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Serendhi GP Education Initiative Report (Bengali)', 'A report by the GP documenting the partnership initiative', 'publication', 'other_materials', null, null, null, 'bn', 'local', null, null, false, 74
where not exists (select 1 from public.documents where title = 'Serendhi GP Education Initiative Report (Bengali)' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Burda Kalimati GP Education Initiative Report (Bengali)', 'A report by the GP documenting the partnership initiative', 'publication', 'other_materials', null, null, null, 'bn', 'local', null, null, false, 75
where not exists (select 1 from public.documents where title = 'Burda Kalimati GP Education Initiative Report (Bengali)' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Boaldhar GP Education Initiative Report (Bengali)', 'A report by the GP documenting the partnership initiative', 'publication', 'other_materials', null, null, null, 'bn', 'local', null, null, false, 76
where not exists (select 1 from public.documents where title = 'Boaldhar GP Education Initiative Report (Bengali)' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Bhetaguri-I GP Education Initiative Report (Bengali)', 'A report by the GP documenting the partnership initiative', 'publication', 'other_materials', null, null, null, 'bn', 'local', null, null, false, 77
where not exists (select 1 from public.documents where title = 'Bhetaguri-I GP Education Initiative Report (Bengali)' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Satali GP Education Initiative Report (Bengali)', 'A report by the GP documenting the partnership initiative', 'publication', 'other_materials', null, null, null, 'bn', 'local', null, null, false, 78
where not exists (select 1 from public.documents where title = 'Satali GP Education Initiative Report (Bengali)' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Burda Kalimati GP Food & Livelihood Security Report (Bengali)', 'A report by the GP documenting the partnership initiative', 'publication', 'other_materials', null, null, null, 'bn', 'local', null, null, false, 79
where not exists (select 1 from public.documents where title = 'Burda Kalimati GP Food & Livelihood Security Report (Bengali)' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Nakaijuri GP Food & Livelihood Security Report (Bengali)', 'A report by the GP documenting the partnership initiative', 'publication', 'other_materials', null, null, null, 'bn', 'local', null, null, false, 80
where not exists (select 1 from public.documents where title = 'Nakaijuri GP Food & Livelihood Security Report (Bengali)' and category = 'publication');
insert into public.documents (title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, file_available, sort_order)
select 'Salbari II GP Food & Livelihood Security Report (Bengali)', 'A report by the GP documenting the partnership initiative', 'publication', 'other_materials', null, null, null, 'bn', 'local', null, null, false, 81
where not exists (select 1 from public.documents where title = 'Salbari II GP Food & Livelihood Security Report (Bengali)' and category = 'publication');

-- media_items (hero images already in repo)
insert into public.media_items (title, alt_text, collection, source, file_path, sort_order)
select 'Children playing at sunset in rural India', '{"en":"Children playing at sunset in rural India"}'::jsonb, 'hero', 'local', '/hero/hero-children-sunset.jpg', 0
where not exists (select 1 from public.media_items where file_path = '/hero/hero-children-sunset.jpg');
insert into public.media_items (title, alt_text, collection, source, file_path, sort_order)
select 'Children learning with slates in a rural school', '{"en":"Children learning with slates in a rural school"}'::jsonb, 'hero', 'local', '/hero/hero-education.jpg', 1
where not exists (select 1 from public.media_items where file_path = '/hero/hero-education.jpg');
insert into public.media_items (title, alt_text, collection, source, file_path, sort_order)
select 'Aerial view of lush green farmlands in Eastern India', '{"en":"Aerial view of lush green farmlands in Eastern India"}'::jsonb, 'hero', 'local', '/hero/hero-farmland.jpg', 2
where not exists (select 1 from public.media_items where file_path = '/hero/hero-farmland.jpg');
insert into public.media_items (title, alt_text, collection, source, file_path, sort_order)
select 'AHEAD Initiatives Logo', '{"en":"AHEAD Initiatives logo"}'::jsonb, 'brand', 'local', '/logo.jpg', 0
where not exists (select 1 from public.media_items where file_path = '/logo.jpg');

-- people (emails stored but show_email=false pending consent confirmation)
insert into public.people (name, role, group_name, email, show_email, sort_order, status)
select 'Dibya Gopal Ghatak', 'Director', 'board', 'dgghatak@aheadinitiatives.in', false, 0, 'published'
where not exists (select 1 from public.people where name = 'Dibya Gopal Ghatak' and group_name = 'board');
insert into public.people (name, role, group_name, email, show_email, sort_order, status)
select 'Dibyendu Sarkar (Retd. IAS)', 'Chief Executive Officer', 'board', 'dibyen@aheadinitiatives.in', false, 1, 'published'
where not exists (select 1 from public.people where name = 'Dibyendu Sarkar (Retd. IAS)' and group_name = 'board');
insert into public.people (name, role, group_name, email, show_email, sort_order, status)
select 'Dilip Ghosh (Retd. IAS)', 'Director', 'board', 'dilipghosh1952@gmail.com', false, 2, 'published'
where not exists (select 1 from public.people where name = 'Dilip Ghosh (Retd. IAS)' and group_name = 'board');
insert into public.people (name, role, group_name, email, show_email, sort_order, status)
select 'Suman Talukdar', 'Director', 'board', 'suman_taluk@yahoo.co.in', false, 3, 'published'
where not exists (select 1 from public.people where name = 'Suman Talukdar' and group_name = 'board');
insert into public.people (name, role, group_name, email, show_email, sort_order, status)
select 'Dr. Indrani De', 'Director', 'board', 'indrani.de87@gmail.com', false, 4, 'published'
where not exists (select 1 from public.people where name = 'Dr. Indrani De' and group_name = 'board');
insert into public.people (name, role, group_name, email, show_email, sort_order, status)
select 'Sukamal Mukherjee', 'Director', 'board', 'sukamal@hotmail.com', false, 5, 'published'
where not exists (select 1 from public.people where name = 'Sukamal Mukherjee' and group_name = 'board');
insert into public.people (name, role, group_name, email, show_email, sort_order, status)
select 'Dr. Udita Ghosh Sarkar', 'Director', 'board', 'udita.dgs@gmail.com', false, 6, 'published'
where not exists (select 1 from public.people where name = 'Dr. Udita Ghosh Sarkar' and group_name = 'board');
insert into public.people (name, role, group_name, email, show_email, sort_order, status)
select 'Swapan Das', 'Project Director Education, Project Administrator EDU & AS', 'project_directors', 'swapankumardas@aheadinitiatives.in', false, 0, 'published'
where not exists (select 1 from public.people where name = 'Swapan Das' and group_name = 'project_directors');
insert into public.people (name, role, group_name, email, show_email, sort_order, status)
select 'Sumit Kumar Sanyal', 'Dy. Project Director FS-IV, Co-Project Administrator AS & Handicraft', 'project_directors', 'sumitkumarsanyal@aheadinitiatives.in', false, 1, 'published'
where not exists (select 1 from public.people where name = 'Sumit Kumar Sanyal' and group_name = 'project_directors');
insert into public.people (name, role, group_name, email, show_email, sort_order, status)
select 'Rajkumar Maity', 'Director, Accounts & Admin', 'project_directors', 'rajkumarmaity@aheadinitiatives.in', false, 2, 'published'
where not exists (select 1 from public.people where name = 'Rajkumar Maity' and group_name = 'project_directors');
insert into public.people (name, role, group_name, email, show_email, sort_order, status)
select 'Kalpana Sardar', 'Field Manager', 'field_team', 'kalpanasardar@aheadinitiatives.in', false, 0, 'published'
where not exists (select 1 from public.people where name = 'Kalpana Sardar' and group_name = 'field_team');
insert into public.people (name, role, group_name, email, show_email, sort_order, status)
select 'Debahutii Mukherjee', 'Administration Assistant', 'field_team', 'debahutimukherjee@aheadinitiatives.in', false, 1, 'published'
where not exists (select 1 from public.people where name = 'Debahutii Mukherjee' and group_name = 'field_team');
insert into public.people (name, role, group_name, email, show_email, sort_order, status)
select 'Mrinmoy Bhattacharjee', 'Coordinator ICT', 'field_team', 'mrinmoy@aheadinitiatives.in', false, 2, 'published'
where not exists (select 1 from public.people where name = 'Mrinmoy Bhattacharjee' and group_name = 'field_team');
insert into public.people (name, role, group_name, email, show_email, sort_order, status)
select 'Dinanath Singha', 'Field Manager', 'field_team', 'dinanathsingha@aheadinitiatives.in', false, 3, 'published'
where not exists (select 1 from public.people where name = 'Dinanath Singha' and group_name = 'field_team');
insert into public.people (name, role, group_name, email, show_email, sort_order, status)
select 'Biswajit Nath', 'Field Director', 'field_team', 'biswajitnath@aheadinitiatives.in', false, 4, 'published'
where not exists (select 1 from public.people where name = 'Biswajit Nath' and group_name = 'field_team');
insert into public.people (name, role, group_name, email, show_email, sort_order, status)
select 'Manik Singha', 'Senior Field Manager', 'field_team', 'maniksingha@aheadinitiatives.in', false, 5, 'published'
where not exists (select 1 from public.people where name = 'Manik Singha' and group_name = 'field_team');
insert into public.people (name, role, group_name, email, show_email, sort_order, status)
select 'Indrajit Mitra', 'Senior Field Manager', 'field_team', 'indrajitmitra@aheadinitiatives.in', false, 6, 'published'
where not exists (select 1 from public.people where name = 'Indrajit Mitra' and group_name = 'field_team');
insert into public.people (name, role, group_name, email, show_email, sort_order, status)
select 'Mamul Hassan Gazi', 'Field Manager', 'field_team', 'mamulhassan@aheadinitiatives.in', false, 7, 'published'
where not exists (select 1 from public.people where name = 'Mamul Hassan Gazi' and group_name = 'field_team');
insert into public.people (name, role, group_name, email, show_email, sort_order, status)
select 'Sayed Tapan Azad', 'Sr. Field Manager', 'field_team', 'sayedtapanazad@aheadinitiatives.in', false, 8, 'published'
where not exists (select 1 from public.people where name = 'Sayed Tapan Azad' and group_name = 'field_team');
insert into public.people (name, role, group_name, email, show_email, sort_order, status)
select 'Tapas Mete', 'Sr. Field Manager', 'field_team', 'tapasmete@aheadinitiatives.in', false, 9, 'published'
where not exists (select 1 from public.people where name = 'Tapas Mete' and group_name = 'field_team');
insert into public.people (name, role, group_name, email, show_email, sort_order, status)
select 'Adrish Das', 'Manager, Studio & Production', 'field_team', 'adrishdas@aheadinitiatives.in', false, 10, 'published'
where not exists (select 1 from public.people where name = 'Adrish Das' and group_name = 'field_team');
insert into public.people (name, role, group_name, email, show_email, sort_order, status)
select 'Debjani Roy', 'Field Director', 'field_team', 'debjaniroy@aheadinitiatives.in', false, 11, 'published'
where not exists (select 1 from public.people where name = 'Debjani Roy' and group_name = 'field_team');
insert into public.people (name, role, group_name, email, show_email, sort_order, status)
select 'Malay Ghosal', 'Field Director (NRM)', 'field_team', 'malayghoshal@aheadinitiatives.in', false, 12, 'published'
where not exists (select 1 from public.people where name = 'Malay Ghosal' and group_name = 'field_team');
insert into public.people (name, role, group_name, email, show_email, sort_order, status)
select 'Himanshu Kayal', 'Sr. NRM Director', 'field_team', 'himanshukayal@aheadinitiatives.in', false, 13, 'published'
where not exists (select 1 from public.people where name = 'Himanshu Kayal' and group_name = 'field_team');
insert into public.people (name, role, group_name, email, show_email, sort_order, status)
select 'Sukumar Gaine', 'Sr. Field Director', 'field_team', 'sukumargaine@aheadinitiatives.in', false, 14, 'published'
where not exists (select 1 from public.people where name = 'Sukumar Gaine' and group_name = 'field_team');
insert into public.people (name, role, group_name, email, show_email, sort_order, status)
select 'Arunesh Majumder', 'Dy Project Director, Education, Director Research & Advocacy', 'field_team', 'aruneshmajumder@aheadinitiatives.in', false, 15, 'published'
where not exists (select 1 from public.people where name = 'Arunesh Majumder' and group_name = 'field_team');

-- settings
insert into public.settings (key, value) values ('org', '{"name":"AHEAD Initiatives","legal":"Not-for-Profit company under Section 25 of the Companies Act, 1956","cin":"U85300WB2009NPL134655","licence":"100531","fcra":"147120965","address":"32/6 Gariahat Road (S), Kolkata – 700031, West Bengal, India","phone":"033-40670369","email":"ahead@aheadinitiatives.in"}'::jsonb)
on conflict (key) do update set value = excluded.value;
insert into public.settings (key, value) values ('channels', '{"youtube_handle":"@aheadinitiatives4836","youtube_channel_id":"","linkedin":"https://www.linkedin.com/company/theahead-initiatives/","nabodisha":"https://www.nabodisha.in","legacy_site":"https://www.aheadinitiatives.in"}'::jsonb)
on conflict (key) do update set value = excluded.value;
insert into public.settings (key, value) values ('seo', '{"default_title":"AHEAD Initiatives — Addressing Hunger, Empowerment and Development","default_description":"AHEAD Initiatives is a registered not-for-profit in Eastern India focused on local self-governance, natural resource management, and contextual education."}'::jsonb)
on conflict (key) do update set value = excluded.value;
