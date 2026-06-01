export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } },
    { name: 'excerpt', title: 'Excerpt', type: 'text' },
    // Portable Text body: allows blocks, images and custom image objects
    { name: 'body', title: 'Body', type: 'array', of: [ { type: 'block' }, { type: 'image' }, { type: 'customImage' } ] },
    { name: 'mainImage', title: 'Main image', type: 'image', options: { hotspot: true } },
    { name: 'mainImageUrl', title: 'Main image (external URL)', type: 'url' },
    { name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] },
    { name: 'publishedAt', title: 'Published at', type: 'datetime' }
  ]
}
