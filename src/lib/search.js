const config = {
  MAX_TIMEOUT: 3000,
};

const { MAX_TIMEOUT } = config;

const search = async (query, data) => {
  let error, results;

  try {
    const conditions = query
      .split(/\r?\n/)
      .filter(el => el && el.trim() && !el.trim().startsWith('#'))
      .map(toCondition);

    if (!conditions.length) {
      throw new RangeError('Must have at last one condition');
    }

    const searchWorker = new Worker('/search-worker.js');

    searchWorker.postMessage({
      type: 'SEARCH',
      conditions: conditions,
      entries: data,
    });

    results = await new Promise((resolve, reject) => {
      searchWorker.onmessage = ({ data }) => {
        if (data.type === 'ERROR') {
          reject(data.error);
        }

        searchWorker.terminate();

        resolve(data.results);
      }

      setTimeout(() => {
        searchWorker.terminate();

        reject('Timeout exceeded');
      }, MAX_TIMEOUT);

    });
  } catch (e) {
    error = e;
  }

  return { results, error };
};


function toCondition(clause) {
  const matcher = /^(?<prop>\S+)\s+(?<method>\S+)\s+(?<arg>.+)$/;

  const matches = clause.trim().match(matcher);

  if (!matches) {
    throw new SyntaxError('Each condition must be formatted as "prop method arg"');
  }

  return { ...matches.groups };
}

export { search };
