const API_URL = 'http://localhost:8000/api/v1';
async function httpGetPlanets() {
  const response = await fetch(API_URL + '/planets');
  const planets = await response.json();
  return planets
}

async function httpGetLaunches() {
  const response = await fetch(API_URL + '/launches');
  const launches = await response.json();
  return launches
}

async function httpSubmitLaunch(launch) {
  try {
    return await fetch(API_URL + '/launches',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(launch)
    })
  } catch (err) {
    return {
      ok: false
    }
  }

}

async function httpAbortLaunch(id) {
  try {
    return await fetch(API_URL + '/launches',{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id})
    })
  } catch (err) {
    return {
      ok: false
    }
  }

}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};