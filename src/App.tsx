// App.tsx
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Loader from './common/Loader';
import SignInForm from './pages/Form/SignInForm';
import DefaultLayout from './layout/DefaultLayout';
import Calendar from './pages/Calendar';
import Profile from './pages/Profile';
import { Users } from './pages/Users';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Tables from './pages/Tables';
import Settings from './pages/Settings';
import Chart from './pages/Chart';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import CreateEvent from './pages/Form/EventForm';
import EventTable from './pages/EventTable';
import CreateEventForm from './pages/Form/EventForm';
import CreateForm from './pages/Profile';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Simulate loading time
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // Restore user session from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(storedUser);
    }
  }, []);

  const noLayoutRoutes = ['/', '/auth/signin', '/auth/signup'];
  const shouldUseLayout = !noLayoutRoutes.includes(pathname);

  return loading ? (
    <Loader />
  ) : (
    shouldUseLayout ? (
      <DefaultLayout currentUser={currentUser} setCurrentUser={setCurrentUser}>
        <Routes>
          <Route path="/events" element={<EventTable />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/users" element={<Users />} />
          <Route path="/forms/form-elements" element={<FormElements />} />
          <Route path="/forms/form-layout" element={<FormLayout />} />
          <Route path="/create-event-form" element={<CreateForm />} />
          <Route path="/tables" element={<Tables />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/chart" element={<Chart />} />
          <Route path="/ui/alerts" element={<Alerts />} />
          <Route path="/ui/buttons" element={<Buttons />} />
        </Routes>
      </DefaultLayout>
    ) : (
      <Routes>
        <Route path="/" element={<SignInForm setCurrentUser={setCurrentUser} />} />
        <Route path="/auth/signin" element={<SignInForm setCurrentUser={setCurrentUser} />} />
      </Routes>
    )
  );
}

export default App;
