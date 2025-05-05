export const S_AIRSPACE_AUTHORIZATION_NOTICE = 
`THE FOLLOWING INFORMATION IS NOT AN AIRSPACE AUTHORIZATION OR APPROVAL

Pursuant to 14 CFR § 107`


export const S_OPERATION_LEGAL_WEATHER = 
`Your flight complies with weather-based operating limitations. `

export const S_OPERATION_PROHIBITED_WEATHER = 
`Your flight does not comply with weather-based operating limitations. Find out why below!`

export const S_HOME_DESCRIPTION =
"Designed specifically for drone pilots to check METAR and TAF conditions with ease."

export const S_OPERATION_ALTITUDE_WARNING = (altitudeLimit: number) => 
    `Unless the flight can predictably maintain at least 2000ft horizontal distance from a cloud, the maximum legal operational altitude is ${altitudeLimit}ft AGL due to the cloud ceiling.`;
