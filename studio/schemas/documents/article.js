import React, { useState } from 'react';

const getVimeoThumb = async url => {
  const vimeoid = urlToId(url);

  return fetch(`https://vimeo.com/api/v2/video/${vimeoid}.json`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      return data[0].thumbnail_small;
    }).catch(err => {
      console.log("not found");
      return false;
    })
}

const urlToId = url => {
  const vimeoSplit = url.split('/');

  let id = vimeoSplit[vimeoSplit.length - 1]; // last value in url

  id = id.split('?')[0]; // remove queryStrings

  if (!/^\d+$/.test(id)) {
    // id there was a trailing backslash
    id = vimeoSplit[vimeoSplit.length - 2];
  }

  return id;
};

export default {
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: Rule => Rule.required()
    },
    {
      title: 'Tile',
      name: 'tileImage',
      type: 'image',
      validation: Rule => Rule.required(),
      fields: [
        {
          name: 'tileDescription',
          title: 'Description',
          type: 'string',
          validation: Rule => Rule.required(),
          options: {
            isHighlighted: true // <-- make this field easily accessible
          }
        }
      ]
    },
    {
      title: 'Hero',
      name: 'heroImage',
      type: 'image',
      validation: Rule => Rule.required(),
      fields: [
        {
          name: 'heroVideo',
          title: 'Video',
          type: 'url',
          description: 'Add a Vimeo link that is 1920 x 800px',
          options: {
            isHighlighted: true
          }
        },
        {
          name: 'heroDescription',
          title: 'Description',
          type: 'text',
          rows: 3,
          validation: Rule => Rule.required(),
          options: {
            isHighlighted: true
          }
        }
      ]
    },
    {
      name: 'modules',
      title: 'Modules',
      type: 'array',
      of: [
        {
          title: 'Paragraph',
          name: 'paragraph',
          type: 'object',
          fields: [
            {
              title: 'Paragraph',
              name: 'paragraph',
              type: 'text',
            } 
          ],
          preview: {
            select: {
              title: 'paragraph'
            },
            prepare (data) {
              return {
                title: data.title
              }
            }
          }
        },
        {
          title: 'Image',
          name: 'moduleImage',
          type: 'object',
          fields: [
            {
              title: 'Image',
              name: 'asset',
              type: 'image',
            } 
          ],
          preview: {
            select: {
              media: 'asset'
            },
            prepare (data) {
              return {
                ...data,
                title: "Image",
                subtitle: data.media.caption
              }
            }
          }
        },
        {
          name: 'imageSequence',
          title: 'Image Sequence',
          type: 'object',
          fields: [
            {
              name: 'images',
              title: 'Images',
              type: 'array',
              description: 'loop through images every 1.5s',
              of: [{type: 'image'}],
            }
          ],
          preview: {
            select: {
              images: 'images'
            },
            prepare (data) {
              return {
                media: data.images[0].asset,
                title: 'Image Sequence',
                subtitle: `Contains ${data.images.length} images`
              }
            }
          }
        },
        {
          title: 'Vimeo',
          name: 'vimeo',
          type: 'object',
          fields: [
            {
              title: 'Link',
              name: 'url',
              type: 'url',
              validation: Rule => Rule.required()
            },
            {
              title: 'Ambient',
              name: 'ambient',
              description: 'For short, looping videos with no Vimeo controls',
              type: 'boolean',
              initialValue: () => false,
            },
            {
              title: 'Sound Icon Colour',
              name: 'iconColor',
              type: 'string',
              options: {
                list: ['white', 'black'],
                layout: 'radio'
              }
            }
          ],
          preview: {
            select: {
              url: 'url'
            },
            component: ({ value }) => {
              const [src, setSrc] = useState(null);
              
              getVimeoThumb(value.url).then(thumb => setSrc(thumb));

              return (
                <div className="vimeoPreview" style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={src} style={{	width: '2.5rem', marginRight: '0.5rem' }}/>
                  <div className="vimeoPreview-text">
                    <p className="vimeoPreview-title" style={{ fontSize: '1em', margin: 0}}>Vimeo</p>
                    <p className="vimeoPreview-subtitle" style={{ fontSize: '0.7em', margin: 0 }}>{value.url}</p>
                  </div>
                </div>
              )
            }
          }
        },
      ]
    },
    {
      name: 'disciplines',
      title: 'Disciplines',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
        list: [
          {title: 'Brand & Identity', value: 'brand&identity'},
          {title: 'Film & Photography', value: 'film&photography'},
          {title: 'Digital', value: 'digital'},
          {title: 'Spatial', value: 'spatial'}
        ]
      }
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'externalLink',
      title: 'External Link',
      type: 'url',
      description: 'To link off to the project',
    },
    {
      name: 'relatedProjects',
      title: 'Related Projects',
      type: 'array',
      of: [{type: 'reference', to: {type: 'article'}}],
      validation: Rule => Rule.required().max(2)
    }
  ]
}
