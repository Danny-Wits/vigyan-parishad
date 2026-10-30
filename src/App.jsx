import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { ScrollToTop } from './components/common/ScrollToTop';

// Public Pages
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

// Admin Auth & Management Portal
import { AdminAuthProvider } from './context/AdminAuthContext';
import { AdminProtectedRoute } from './components/admin/AdminProtectedRoute';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminEventsPage } from './pages/admin/AdminEventsPage';
import { AdminPublicationsPage } from './pages/admin/AdminPublicationsPage';
import { AdminAnnouncementsPage } from './pages/admin/AdminAnnouncementsPage';
import { AdminGalleryPage } from './pages/admin/AdminGalleryPage';
import { AdminMembersPage } from './pages/admin/AdminMembersPage';
import { AdminApplicationsPage } from './pages/admin/AdminApplicationsPage';
import { AdminInquiriesPage } from './pages/admin/AdminInquiriesPage';

export function App() {
  return (
    <AdminAuthProvider>
      <ScrollToTop />
      <Routes>
        {/* Admin Public Login */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Admin Protected Management Portal */}
        <Route path="/admin" element={<AdminProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="events" element={<AdminEventsPage />} />
            <Route path="publications" element={<AdminPublicationsPage />} />
            <Route path="announcements" element={<AdminAnnouncementsPage />} />
            <Route path="gallery" element={<AdminGalleryPage />} />
            <Route path="members" element={<AdminMembersPage />} />
            <Route path="applications" element={<AdminApplicationsPage />} />
            <Route path="inquiries" element={<AdminInquiriesPage />} />
          </Route>
        </Route>

        {/* Public Website Routes */}
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
    </AdminAuthProvider>
  );
}

export default App;
