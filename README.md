# Hong Kong Body Check Plans Comparison

<https://hkbodycheck.info>

This app compares the body check plans from all the private hospitals in Hong Kong.

## Infrastructure

This app is built on Next.js and hosted on Vercel. Data is entered and stored in Airtable.

As it takes time to retrieve the large amounts of data from Airtable's API, Next.js's server-side rendering allows the app to be pre-rendered so users would not have to wait for the app to load everytime, as is the case with React.js.

Airtable also allow the entry of data to be separated from the app and be done by someone who isn't technically savvy.

## Contact

[![Twitter](https://img.shields.io/twitter/url/https/twitter.com/cloudposse.svg?style=social&label=%20%40FlyingNobita)](https://twitter.com/FlyingNobita)
