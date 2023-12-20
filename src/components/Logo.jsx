import React from 'react';

function Logo({ width = '50px' }) {
  const logoUrl = 'https://images.unsplash.com/photo-1509070016581-915335454d19?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  return (
    <div>
      <img src={logoUrl} className='rounded-full h-10 object-cover' alt="Logo" style={{ width: width }} />
    </div>
  );
}

export default Logo;
