export function getUpcomingLaunches(){
    fetch('https://api.spacexdata.com/v3/launches/upcoming')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}
export function getPastLaunch(){
    fetch('https://api.spacexdata.com/v4/launches/latest')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}
export function getLaunchpads(){
    fetch('https://api.spacexdata.com/v3/launchpads?limit=3')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}
