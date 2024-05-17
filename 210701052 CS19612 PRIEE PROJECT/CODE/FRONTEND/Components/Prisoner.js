import React from 'react';
import { Link } from 'react-router-dom';

function PrisonersPage() {
  return (
    <div>
      <h1>Prisoners Page</h1>
      <Link to="/fetchlawyers"><button>Get Lawyers</button></Link>
      <Link to="/fetchclinics"><button>Get Clinics</button></Link>
    </div>
  );
}

export default PrisonersPage;
