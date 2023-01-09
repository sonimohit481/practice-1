// for connection to out back end
import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
export const client = sanityClient({
    projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
    token: process.env.REACT_APP_SANITY_PROJECT_TOKEN,
    dataset: 'production',
    apiVersion: '2023-01-07',
    useCdn: true
})
// just to remember 
const builder = imageUrlBuilder(client);
export const urlFor = (source) => { return builder.image(source) };
// function urlFor(source) { return builder.image(source) }

//  running our sanity manage commant to get prodict id and token from sanity 