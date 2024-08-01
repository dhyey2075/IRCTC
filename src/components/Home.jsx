import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Home = (props) => {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();

  // if (isLoading) {
  //   return <img src="../assets/loader.svg alt="Loading" />;
  // }

  return (
    <div>
    <div style={{textAlign: 'center'}} className="loader">{isLoading && <img height="50px" style={{textAlign: 'center'}} src="/loader.gif" alt="Loading" />}</div>
    <h1 className='heading'>IRCTC Welcomes You!!</h1>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand pos" href="/">IRCTC</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse flax" id="navbarSupportedContent">
            <div className='flax'>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {isAuthenticated && <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/">Home</a>
              </li>}
              {isAuthenticated && <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/pnr">Check PNR Status</a>
              </li>}
              {isAuthenticated && <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/gettrains">Find Trains</a>
              </li>}
              {isAuthenticated ? (
                <li className="nav-item my-1">
                  <button className='pos' onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                    Log Out
                  </button>
                </li>
              ) : (
                <li className="nav-item">
                  <button onClick={() => loginWithRedirect()}>
                    Log In
                  </button>
                </li>
              )}
            </ul>
            </div>
            {isAuthenticated && <p className="navbar-text">Hello, {user.name} <img src={user.picture} height="40px" width="40px" alt="" /></p>}
          </div>
        </div>
      </nav>
    <br /><br />
    <div className='text-center'>
      <h3 className='text-center'>Our services</h3>
      <ul className='text=center'>
        <li>Check Trains</li>
        <li>Get Route</li>
        <li>Check PNR Status</li>
      </ul>
      {!isAuthenticated && <><h3>Login To avail our service</h3><br /> <br /> <br /></>}
      <h4>You can login using <img height="30px" src="/google.png" alt="" />, <img height="30px" src="/github.png" alt="" /> and <img height="30px" src="/732221.png" alt="" /></h4>
    </div>
  </div>
  );
}

export default Home;
