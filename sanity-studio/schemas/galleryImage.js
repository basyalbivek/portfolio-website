export default {
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
    { name: 'externalUrl', title: 'External URL (S3)', type: 'url' },
    { name: 'caption', title: 'Caption', type: 'text' },
    { name: 'alt', title: 'Alt text', type: 'string' },
    { name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] },
    { name: 'date', title: 'Date', type: 'datetime' }
  ]
}
