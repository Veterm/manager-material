const booksFields = {
  id: { type: 'id', label: 'ID' },

  title: {
    type: 'string',
    label: 'Title',

    options: [{ value: 'value', label: 'value' }],
  },

  author: {
    type: 'relation_one',
    label: 'Author',

    options: [{ value: 'value', label: 'value' }],
  },
};

export default booksFields;
