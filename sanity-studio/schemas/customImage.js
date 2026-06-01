export default {
  name: 'customImage',
  title: 'Custom Image',
  type: 'object',
  fields: [
    { name: 'url', title: 'Image URL', type: 'url' },
    { name: 'alt', title: 'Alt text', type: 'string' },
    { name: 'caption', title: 'Caption', type: 'text' }
  ]
}
