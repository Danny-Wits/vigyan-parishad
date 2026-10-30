-- Vigyan Parishad J&K Seed Data
-- Comprehensive seed file matching UI reference specifications

-- 1. Announcements
insert into announcements (title, date, link, is_active, display_order) values
('National Science Seminar 2026 | 23rd November 2026 | Registrations Open ->', '23rd November 2026', '/events/national-science-seminar-2026', true, 1),
('J&K Young Scientist Award - Applications Invited | Last Date: 15th Dec 2026 | View Details ->', '15th Dec 2026', '/membership', true, 2),
('State Level Children Science Congress 2026 Announced | Check Guidelines ->', '10th Jan 2027', '/events', true, 3);

-- 2. Events
insert into events (slug, title, category, event_date, date_display, day_month, year, time, venue, subtitle, description, highlights, image_url, participants, organized_by, is_featured) values
(
  'national-science-seminar-2026',
  'National Science Seminar 2026',
  'SEMINAR',
  '2026-11-22',
  '22 November 2026',
  '22 NOV',
  '2026',
  '10:00 AM - 5:00 PM',
  'University of Jammu, J&K',
  'Exploring innovations, research and opportunities for a better tomorrow.',
  'The National Science Seminar 2026 brings together researchers, educators and students to discuss emerging trends, innovations and the role of science in society. Key focus areas include renewable energy in mountain regions, AI in biodiversity monitoring, and indigenous scientific traditions of Jammu & Kashmir.',
  '[{"id":"1","title":"Expert Talks","desc":"Addresses by leading scientists from IITs, IISc, and CSIR."},{"id":"2","title":"Research Presentations","desc":"Over 50 selected oral and poster papers on Himalayan science."},{"id":"3","title":"Student Participation","desc":"Special forum for young scholars and youth innovator awards."},{"id":"4","title":"Networking Opportunities","desc":"Cross-disciplinary collaboration tables with research institutes."}]'::jsonb,
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
  '120+ Participants',
  'Vigyan Parishad J&K',
  true
),
(
  'ai-for-young-minds',
  'AI for Young Minds',
  'WORKSHOP',
  '2026-10-10',
  '10 October 2026',
  '10 OCT',
  '2026',
  '09:30 AM - 4:00 PM',
  'NIT Srinagar, J&K',
  'Empowering high school and collegiate innovators with foundational artificial intelligence.',
  'An interactive coding and concept bootcamp introducing high school and undergraduate students to modern machine learning, Python data manipulation, neural network fundamentals, and ethical considerations in computer vision.',
  '[{"id":"1","title":"Hands-on Labs","desc":"Interactive Google Colab notebooks."},{"id":"2","title":"Python Fundamentals","desc":"Data structures and scientific packages."},{"id":"3","title":"Live Mentoring","desc":"Direct guidance from AI researchers."},{"id":"4","title":"Certificate of Merit","desc":"Awarded upon completion of mini-project."}]'::jsonb,
  'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
  '85+ Participants',
  'Vigyan Parishad J&K',
  false
),
(
  'science-exhibition-2026',
  'Science Exhibition 2026',
  'EXHIBITION',
  '2026-09-05',
  '05 September 2026',
  '05 SEP',
  '2026',
  '10:00 AM - 6:00 PM',
  'Govt College for Women, Parade, Jammu',
  'State-wide exhibition of innovative working models and grassroots science.',
  'Bringing together over 60 schools and colleges across Jammu, Kashmir, and Ladakh to showcase prototypes in renewable energy, water conservation, and agricultural IoT.',
  '[{"id":"1","title":"Live Prototypes","desc":"Over 80 operating student models."},{"id":"2","title":"Jury Evaluation","desc":"Judging panel of senior university professors."},{"id":"3","title":"Cash Awards","desc":"Prizes for top innovation in each category."},{"id":"4","title":"Public Demonstrations","desc":"Open to the public and school groups."}]'::jsonb,
  'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
  '300+ Participants',
  'Vigyan Parishad J&K',
  false
),
(
  'frontiers-in-himalayan-research',
  'Frontiers in Himalayan Research',
  'TALK',
  '2026-08-18',
  '18 August 2026',
  '18 AUG',
  '2026',
  '11:00 AM - 1:30 PM',
  'University of Kashmir, Srinagar',
  'Distinguished lecture series on glaciology and high-altitude climate science.',
  'Renowned geoscientists present the latest satellite remote sensing data and glacier retreat models across the Pir Panjal and Karakoram ranges.',
  '[{"id":"1","title":"Keynote Address","desc":"Key insights from regional geoscientists."},{"id":"2","title":"Panel Discussion","desc":"Himalayan hydrology and climate trends."},{"id":"3","title":"Q&A Session","desc":"Interactive audience dialogue."},{"id":"4","title":"Policy Brief","desc":"Shared recommendations for climate adaptation."}]'::jsonb,
  'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80',
  '150+ Participants',
  'Vigyan Parishad J&K',
  false
),
(
  'hands-on-science-workshop',
  'Hands-on Science Workshop',
  'OUTREACH',
  '2026-07-12',
  '12 July 2026',
  '12 JUL',
  '2026',
  '10:00 AM - 3:30 PM',
  'District Science Centre, Leh, Ladakh',
  'Interactive science experiments and experiential learning for rural schools.',
  'Fostering scientific curiosity through do-it-yourself physics and chemistry experiment kits distributed to schools in remote valleys.',
  '[{"id":"1","title":"Kit Distribution","desc":"Science kits given to participating schools."},{"id":"2","title":"Interactive Experiments","desc":"Hands-on optics, electricity and mechanics."},{"id":"3","title":"Teacher Training","desc":"Empowering educators with low-cost teaching aids."},{"id":"4","title":"Student Competitions","desc":"Fun science quizzes and model builds."}]'::jsonb,
  'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
  '90+ Participants',
  'Vigyan Parishad J&K',
  false
),
(
  'popular-science-talk-series',
  'Popular Science Talk Series',
  'OBSERVATION',
  '2026-05-20',
  '20 May 2026',
  '20 MAY',
  '2026',
  '07:00 PM - 10:30 PM',
  'High Altitude Astronomical Observatory, Hanle',
  'Sky-watching, telescope observation and introductory astrophysics session.',
  'A night of telescope observations, astrophotography demonstrations, and discussions on dark sky sanctuaries in Ladakh.',
  '[{"id":"1","title":"Deep Sky Observation","desc":"Telescopic viewing of Saturn and nebulae."},{"id":"2","title":"Telescope Training","desc":"Basics of celestial navigation and focal lengths."},{"id":"3","title":"Astrophotography","desc":"Capturing the Milky Way with DSLR cameras."},{"id":"4","title":"Stargazing Guide","desc":"Star charts and constellation mapping."}]'::jsonb,
  'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=80',
  '60+ Participants',
  'Vigyan Parishad J&K',
  false
);

-- 3. Publications
insert into publications (slug, title, category, author, publication_date, date_display, file_size, views, pages, doi, abstract, keywords, cover_image, pdf_url) values
(
  'climate-change-and-ecosystems-of-jk',
  'Climate Change and Ecosystems of Jammu & Kashmir',
  'RESEARCH PAPER',
  'Dr. A. Sharma',
  '2024-11-22',
  '22 November 2024',
  '2.4 MB',
  320,
  28,
  '10.1234/vpjk.2024.01',
  'This paper presents a comprehensive analysis of the impact of climate change on the ecosystems of Jammu & Kashmir, highlighting key vulnerabilities and suggesting policy measures for sustainable environmental management.',
  '["Climate Change", "Ecosystems", "Jammu & Kashmir", "Sustainability"]'::jsonb,
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
  '#'
),
(
  'annual-report-2023-24',
  'Annual Report 2023–24',
  'REPORT',
  'Vigyan Parishad Secretariat',
  '2024-03-15',
  '15 Mar 2024',
  '5.1 MB',
  480,
  64,
  '10.1234/vpjk.2024.ar',
  'Comprehensive report documenting activities, student outreach milestones, research publications, and fiscal disclosures for the 2023-2024 academic year.',
  '["Annual Report", "Governance", "Audits", "Achievements"]'::jsonb,
  'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
  '#'
),
(
  'national-science-seminar-2024',
  'National Science Seminar 2024',
  'PROCEEDINGS',
  'Academic Council',
  '2024-01-10',
  '10 Jan 2024',
  '8.7 MB',
  215,
  142,
  '10.1234/vpjk.2024.sem',
  'Compiled peer-reviewed conference papers presented during the annual state scientific assembly covering mountain biosciences and physical sciences.',
  '["Conference Proceedings", "Mountain Sciences", "Physics", "Biotechnology"]'::jsonb,
  'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80',
  '#'
),
(
  'vigyan-parishad-newsletter-vol-5',
  'Vigyan Parishad Newsletter (Vol. 5)',
  'NEWSLETTER',
  'Media & Outreach Cell',
  '2023-12-05',
  '05 Dec 2023',
  '1.8 MB',
  390,
  16,
  '10.1234/vpjk.2023.nl5',
  'Bi-monthly newsletter featuring interviews with regional innovators, scholarship announcements, and young scientist spotlights across the state.',
  '["Newsletter", "Student News", "Innovators", "Science Highlights"]'::jsonb,
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
  '#'
),
(
  'innovations-in-science-education',
  'Innovations in Science Education',
  'ARTICLE',
  'Dr. Namrata Karlupia',
  '2023-09-18',
  '18 Sep 2023',
  '1.2 MB',
  512,
  12,
  '10.1234/vpjk.2023.edu',
  'Pedagogical frameworks for modernizing science curricula in secondary schools using vernacular languages and experiential learning kits.',
  '["Education", "Curriculum", "Pedagogy", "STEM"]'::jsonb,
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80',
  '#'
),
(
  'role-of-science-in-sustainable-development',
  'Role of Science in Sustainable Development',
  'PRESENTATION',
  'Prof. Vibhakar Mansotra',
  '2023-08-02',
  '02 Aug 2023',
  '3.4 MB',
  640,
  36,
  '10.1234/vpjk.2023.sus',
  'Keynote slides presented at the regional sustainability summit highlighting carbon neutral goals for Himalayan valleys and eco-tourism impacts.',
  '["Sustainability", "Climate Action", "Green Technology", "Himalayas"]'::jsonb,
  'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80',
  '#'
);

-- 4. Gallery Albums
insert into gallery_albums (slug, title, category, date_display, event_date, venue, participant_count, description, cover_image) values
(
  'national-science-seminar-2026',
  'National Science Seminar 2026',
  'SEMINAR',
  '22 Nov 2026',
  '2026-11-22',
  'University of Jammu, J&K',
  '120+ Participants',
  'A national seminar bringing together researchers, educators and students to discuss innovations and the future of science.',
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80'
),
(
  'science-exhibition-2026',
  'Science Exhibition 2026',
  'EXHIBITION',
  '10 Sep 2026',
  '2026-09-10',
  'Govt College for Women, Parade, Jammu',
  '250+ Students',
  'Annual science exhibition highlighting student science models, prototypes, and sustainable innovations.',
  'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80'
),
(
  'community-science-program',
  'Community Science Program',
  'OUTREACH',
  '18 Aug 2026',
  '2026-08-18',
  'Kashmir Valley Field Stations',
  '180+ Villagers & Students',
  'Engaging rural youth and farming communities in soil health testing, rainwater harvesting, and scientific crop rotation.',
  'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80'
),
(
  'ai-for-young-minds',
  'AI for Young Minds',
  'WORKSHOP',
  '12 Jul 2026',
  '2026-07-12',
  'NIT Srinagar, J&K',
  '90+ Participants',
  'Hands-on technical coding sessions, robotics demonstrations, and AI workshops for young enthusiasts.',
  'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80'
),
(
  'hands-on-science-workshop',
  'Hands-on Science Workshop',
  'PROGRAM',
  '05 May 2026',
  '2026-05-05',
  'District Science Centre, Leh',
  '110+ Students',
  'Experiential learning lab day demonstrating physics laws, chemistry reactions, and solar energy kits.',
  'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80'
),
(
  'astronomy-and-space-session',
  'Astronomy & Space Session',
  'OBSERVATION',
  '20 Apr 2026',
  '2026-04-20',
  'Hanle Dark Sky Reserve, Ladakh',
  '75+ Stargazers',
  'Night-sky telescope observation and astrophysical lectures under the high-altitude skies of Ladakh.',
  'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=80'
);

-- 5. Gallery Photos (Linked dynamically via album slug)
-- Album 1: National Science Seminar 2026 (12 Photos)
insert into gallery_photos (album_id, photo_url, caption, display_order)
select id, 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80', 'Keynote address by guest dignitaries', 1 from gallery_albums where slug = 'national-science-seminar-2026'
union all
select id, 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80', 'Full auditorium of delegates and scholars', 2 from gallery_albums where slug = 'national-science-seminar-2026'
union all
select id, 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80', 'Interactive Q&A during technical session', 3 from gallery_albums where slug = 'national-science-seminar-2026'
union all
select id, 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80', 'Poster presentation judging by faculty panel', 4 from gallery_albums where slug = 'national-science-seminar-2026'
union all
select id, 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80', 'Panel discussion on Himalayan ecology', 5 from gallery_albums where slug = 'national-science-seminar-2026'
union all
select id, 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&q=80', 'Young Scientist Award felicitation', 6 from gallery_albums where slug = 'national-science-seminar-2026'
union all
select id, 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=80', 'Networking during tea break', 7 from gallery_albums where slug = 'national-science-seminar-2026'
union all
select id, 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80', 'Valedictory remarks and vote of thanks', 8 from gallery_albums where slug = 'national-science-seminar-2026'
union all
select id, 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80', 'Delegation group photograph', 9 from gallery_albums where slug = 'national-science-seminar-2026'
union all
select id, 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80', 'Executive committee briefing', 10 from gallery_albums where slug = 'national-science-seminar-2026'
union all
select id, 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80', 'Hands-on tech demonstration stall', 11 from gallery_albums where slug = 'national-science-seminar-2026'
union all
select id, 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80', 'Closing ceremony and certificate distribution', 12 from gallery_albums where slug = 'national-science-seminar-2026';

-- Album 2: Science Exhibition 2026 (6 Photos)
insert into gallery_photos (album_id, photo_url, caption, display_order)
select id, 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80', 'Inauguration of student pavilion', 1 from gallery_albums where slug = 'science-exhibition-2026'
union all
select id, 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80', 'Solar thermal model demonstration', 2 from gallery_albums where slug = 'science-exhibition-2026'
union all
select id, 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80', 'Robotics & sensor-based irrigation exhibit', 3 from gallery_albums where slug = 'science-exhibition-2026'
union all
select id, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80', 'Student team explaining prototype to judges', 4 from gallery_albums where slug = 'science-exhibition-2026'
union all
select id, 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80', 'Chemistry lab experiments display', 5 from gallery_albums where slug = 'science-exhibition-2026'
union all
select id, 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80', 'Awards ceremony for best school project', 6 from gallery_albums where slug = 'science-exhibition-2026';

-- Album 3: Community Science Program (4 Photos)
insert into gallery_photos (album_id, photo_url, caption, display_order)
select id, 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=80', 'Soil pH and moisture testing on field', 1 from gallery_albums where slug = 'community-science-program'
union all
select id, 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80', 'Farmers and students interactive workshop', 2 from gallery_albums where slug = 'community-science-program'
union all
select id, 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80', 'High-altitude greenhouse horticulture demonstration', 3 from gallery_albums where slug = 'community-science-program'
union all
select id, 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80', 'Community water testing in mountain streams', 4 from gallery_albums where slug = 'community-science-program';

-- Album 4: AI for Young Minds (4 Photos)
insert into gallery_photos (album_id, photo_url, caption, display_order)
select id, 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80', 'High school students building object detector', 1 from gallery_albums where slug = 'ai-for-young-minds'
union all
select id, 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80', 'Python coding session on machine learning', 2 from gallery_albums where slug = 'ai-for-young-minds'
union all
select id, 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80', 'Team collaboration on computer vision hackathon', 3 from gallery_albums where slug = 'ai-for-young-minds'
union all
select id, 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80', 'Mentor reviewing neural network architecture', 4 from gallery_albums where slug = 'ai-for-young-minds';

-- Album 5: Hands-on Science Workshop (4 Photos)
insert into gallery_photos (album_id, photo_url, caption, display_order)
select id, 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80', 'Physics experiment demonstrations', 1 from gallery_albums where slug = 'hands-on-science-workshop'
union all
select id, 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80', 'DIY optics and laser prism kits', 2 from gallery_albums where slug = 'hands-on-science-workshop'
union all
select id, 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1200&q=80', 'Classroom science puzzle challenges', 3 from gallery_albums where slug = 'hands-on-science-workshop'
union all
select id, 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1200&q=80', 'Solar oven assembly competition', 4 from gallery_albums where slug = 'hands-on-science-workshop';

-- Album 6: Astronomy & Space Session (4 Photos)
insert into gallery_photos (album_id, photo_url, caption, display_order)
select id, 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80', 'Stargazing at Hanle Observatory', 1 from gallery_albums where slug = 'astronomy-and-space-session'
union all
select id, 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80', 'High-power telescope alignment', 2 from gallery_albums where slug = 'astronomy-and-space-session'
union all
select id, 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80', 'Astrophotography of constellations over Himalayas', 3 from gallery_albums where slug = 'astronomy-and-space-session'
union all
select id, 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=1200&q=80', 'Night-sky briefing and star map orientation', 4 from gallery_albums where slug = 'astronomy-and-space-session';

-- 6. Members
insert into members (name, role, institution, photo_url, display_order) values
('Prof. Vibhakar Mansotra', 'Academician', 'Department of Computer Science & IT, University of Jammu', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', 1),
('Dr. Namrata Karlupia', 'Researcher', 'School of Biotechnology, SKUAST-Jammu', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80', 2),
('Dr. Jasbir Singh', 'Faculty', 'Department of Physics, University of Jammu', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80', 3),
('Dr. Rhea Mahajan', 'Scientist', 'Council of Scientific & Industrial Research (IIIM)', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80', 4),
('Prof. Sheikh Bashir Ahmad', 'Senior Advisor', 'Department of Earth Sciences, University of Kashmir', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80', 5),
('Prof. Pragati Kumar', 'Academic Patron', 'Shri Mata Vaishno Devi University (SMVDU), Katra', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80', 6),
('Dr. Farooq Ahmad Lone', 'Environmental Scientist', 'Division of Environmental Sciences, SKUAST-Kashmir', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80', 7),
('Dr. Stanzin Norboo', 'Field Researcher', 'High Altitude Ecology Wing, Leh, Ladakh', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80', 8);
