export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-gatsby-portfolio'
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5e5db78a3efd37d4ab81f1ce',
                  title: 'Sanity Studio',
                  name: 'sanity-gatsby-portfolio-studio-vzywdcu2',
                  apiId: 'c7fa87d8-1431-4b5e-9ea7-1e21c8ca8893'
                },
                {
                  buildHookId: '5e5db78a120760cc589b2b7e',
                  title: 'Portfolio Website',
                  name: 'sanity-gatsby-portfolio-web-xrq5gu3a',
                  apiId: 'a65a83be-5fda-4d76-8c45-a1c457909db2'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/hamishdw/sanity-gatsby-portfolio',
            category: 'Code'
          },
          {
            title: 'Frontend',
            value: 'https://sanity-gatsby-portfolio-web-xrq5gu3a.netlify.com',
            category: 'apps'
          }
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent projects', order: '_createdAt desc', types: ['sampleProject']},
      layout: {width: 'medium'}
    }
  ]
}
