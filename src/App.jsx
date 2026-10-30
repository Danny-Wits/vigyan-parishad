import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { ScrollToTop } from './components/common/ScrollToTop';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { EventsPage } from './pages/EventsPage';
import { EventDetailPage } from './pages/EventDetailPage';
import { PublicationsPage } from './pages/PublicationsPage';
import { PublicationDetailPage } from './pages/PublicationDetailPage';
import { GalleryPage } from './pages/GalleryPage';
import { GalleryDetailPage } from './pages/GalleryDetailPage';
import { MembershipPage } from './pages/MembershipPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="events/:slug" element={<EventDetailPage />} />
          <Route path="publications" element={<PublicationsPage />} />
          <Route path="publications/:slug" element={<PublicationDetailPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="gallery/:slug" element={<GalleryDetailPage />} />
          <Route path="membership" element={<MembershipPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
