// Load variables from `.env` as soon as possible
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
})

const clientConfig = require('./client-config')
// const token = process.env.SANITY_READ_TOKEN
const token = "sk9BvP3jKFqskBn8VkOQRdE1R7nir8BZan8lUb8PdwHWOYl6t1feTqaooOzWuUhD7d7Xv7v6JMlMO9jnK1d39O42JhglIXNauvNObsatve5zhpqSm2Nn1aQQpGb2R5Ux4LraWUXf0pTPjOD28m8LokjoQlxtRrXJ8PGB79ZawEQWJNBSTmoq";

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  plugins: [
    'gatsby-plugin-postcss',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-sanity',
      options: {
        ...clientConfig.sanity,
        token,
        watchMode: !isProd,
        overlayDrafts: !isProd && token
      }
    }
  ]
}
