import MiniSearch from 'minisearch';

export default (options, source, search) => {
  return new Promise((res, rej) => {
    let miniSearch = new MiniSearch(options);
    console.log(source);
    miniSearch.addAll(source);

    let results = miniSearch.search(search, { prefix: true });

    res(
      results.map(({ id, match, ...rest }) => ({
        id,
        match: Object.keys(match),
        ...rest,
      })),
    );
  });
};
