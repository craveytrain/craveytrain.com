module.exports = file => {
  const date = new Date(file.data.date);
  const tags = file.data.tags || [];

  return {
    date,
    dateFormat: date.toLocaleDateString('en-us', {month: 'short', day: 'numeric', year: 'numeric'}),
    tags: tags.map(tag => ({
      title: tag,
      url: `/tags/${tag.replace(/\s/, '-')}`
    })),
    timestamp: date.toISOString(),
    title: file.data.title,
    url: `/${file.relative}`,
    excerpt: file.data.excerpt,
    contents: file.contents
  };
};
