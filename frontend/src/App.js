import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Home from './components/Home';
import VetsList from './components/VetsList';
import OwnerSearch from './components/OwnerSearch';
import NewOwner from './components/NewOwner';
import OwnerResult from './components/OwnerResult';
import EditOwner from './components/EditOwner';
import AddPet from './components/AddPet';
import OwnerList from './components/OwnerList';
import OwnerDetails from './components/OwnerDetails';
import EditPet from './components/EditPet';
import AddVisit from './components/AddVisit';
import VisitSummary from './components/VisitSummary';
import OwnerResults from './components/OwnerResults';
function App() {
  return (
    <Router>
      <Routes>
        {/* Layout global avec Outlet pour le contenu des pages */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="vets" element={<VetsList />} />
          <Route path="owner-search" element={<OwnerSearch />} />
          <Route path="owners/new" element={<NewOwner />} />
          <Route path="owners/:id" element={<OwnerResult />} />
          <Route path="owners/:id/edit" element={<EditOwner />} />
          <Route path="owners/:id/pets/new" element={<AddPet />} />
          <Route path="owners" element={<OwnerList />} />
          <Route path="owners/:id/details" element={<OwnerDetails />} />
          <Route path="pets/:id/edit" element={<EditPet />} />
          <Route path="pets/:id/visits/new" element={<AddVisit />} />
          <Route path="summary/:ownerId" element={<VisitSummary />} />
          <Route path="/owners/results" element={<OwnerResults />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
