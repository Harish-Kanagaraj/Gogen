import React from 'react';

const ProtectedComponent = () => {
  return (
    <div>
      <h1>Protected Component</h1>
      <p>This component is protected and can only be accessed when logged in.</p>
    </div>
  );
};

export default ProtectedComponent;
