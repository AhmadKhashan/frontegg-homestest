import './App.css';
import { useState } from 'react';
import { useAuth, useAuthActions, ContextHolder, useLoginWithRedirect } from '@frontegg/react';
import { AdminPortal } from '@frontegg/react';

function App() {
  const { switchTenant } = useAuthActions();
  const { user, isAuthenticated } = useAuth();
  const loginWithRedirect = useLoginWithRedirect();

  
  const [selectedTenant, setSelectedTenant] = useState(user?.tenantIds[0] || '');

  
  const handleSwitchTenant = async () => {
    await switchTenant({ tenantId: selectedTenant });
    console.log(`Tenant switched to: ${selectedTenant}`);
  };

  const handleLogout = () => {
    const baseUrl = ContextHolder.getContext().baseUrl;
    window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location}`;
  };

  const handleAdminPortal = () => {
    AdminPortal.show();
  };

  return (
    <div className="App">
      {isAuthenticated ? (
        <div>
          <div>
            <img src={user?.profilePictureUrl ?? '/default-profile.png'} alt={user?.name ?? 'User'} />
          </div>
          <div>
            <span>Logged in as: {user?.name}</span>
          </div>
          <div>
            <button onClick={() => alert(user?.accessToken)}>What is my access token?</button>
          </div>
          <div>
            <button onClick={handleAdminPortal}>Settings</button>
          </div>
          <div>
            <button onClick={handleLogout}>Click to logout</button>
          </div>

          
          {user?.tenantIds && user.tenantIds.length > 1 ? (
            <div>
              <label htmlFor="tenant-switcher">Select Tenant: </label>
              <select
                id="tenant-switcher"
                value={selectedTenant}
                onChange={(e) => setSelectedTenant(e.target.value)}
              >
                {user.tenantIds.map((tenantId) => (
                  <option key={tenantId} value={tenantId}>
                    {tenantId}
                  </option>
                ))}
              </select>
              <div>
                
                <button onClick={handleSwitchTenant}>Switch Tenant</button>
              </div>
            </div>
          ) : (
            <div>
              <span>There is only 1 tenant. Tenant ID: {user?.tenantIds?.[0]}</span>
            </div>
          )}

          
          <div>
            <p>Current Tenant ID: {user?.tenantId}</p>
          </div>
        </div>
      ) : (
        <div>
          <button onClick={() => loginWithRedirect()}>Click me to login</button>
        </div>
      )}
    </div>
  );
}

export default App;




