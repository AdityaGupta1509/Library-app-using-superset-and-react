import React, { useEffect, useRef } from 'react';
import { embedDashboard } from "@superset-ui/embedded-sdk";

import "./BookA.css";

const BookA = () => {
  const supersetDefaultContainer = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      // Define the function to fetch the guest token from the backend
      async function fetchAccessToken() {
        try {
          const body = {
            username: "admin",
            password: "admin",
            provider: "db",
            refresh: true,
          }

          const response = await fetch(
            "http://localhost:8088/api/v1/security/login",
            {
              method: "POST",
              body: JSON.stringify(body),
              headers: {
                "Content-Type": "application/json",
              },
            }
          )

          const jsonResponse = await response.json()
          return jsonResponse?.access_token
        } catch (e) {
          console.error(e)
        }
      }
      
      const fetchGuestTokenFromBackend = async () => {
        const accessToken = await fetchAccessToken()
        try {
          const body = {
            resources: [
              {
                type: "dashboard",
                id: "49af4eca-1bd2-4d49-8f6d-3e566e91721a",
              },
            ],
            rls: [],
            user: {
              username: "guest",
              first_name: "Guest",
              last_name: "User",
            },
          }
          const response = await fetch(
            "http://localhost:8088/api/v1/security/guest_token/",
            {
              method: "POST",
              body: JSON.stringify(body),
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          const jsonResponse = await response.json()
          return jsonResponse?.token
        } catch (error) {
          console.error(error)
        }
      };

      // Define the config object if necessary
      const config = {
        // Your config data here
      };

      // Fetch the token from the backend
      const token = await fetchGuestTokenFromBackend(config);

      // Embed the Superset dashboard
      embedDashboard({
        id: "49af4eca-1bd2-4d49-8f6d-3e566e91721a",  // given by the Superset embedding UI
        supersetDomain: "http://localhost:8088",
        mountPoint: supersetDefaultContainer.current, // html element in which iframe render
        fetchGuestToken: () => token,
        dashboardUiConfig: { hideTitle: true }
      });
    };

    if (supersetDefaultContainer.current) {
      fetchData();
    }

  }, [supersetDefaultContainer]); // Empty array as second argument to run only once after component mounts

  return (
    <section className='about'>
      <div className='container'>
        <div className='section-title'>
          <h2>BOOKA</h2>
        </div>

        <div className="superset-container" ref={supersetDefaultContainer}>
          
        </div>
      </div>
    </section>
  )
}

export default BookA;
