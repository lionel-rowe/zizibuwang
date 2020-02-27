import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, TextField, FormControl, Link, CircularProgress } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import alasql from 'alasql';
import { search } from './lib/search';
import { handleQueryParams } from './lib/handle-query-params';
import Swal from 'sweetalert2'

const theme = createMuiTheme({
  palette: JSON.parse(`{"common":{"black":"#000","white":"#fff"},"type":"dark","primary":{"main":"#357","light":"rgb(91,119,146)","dark":"rgb(35,59,83)","contrastText":"#fff"},"secondary":{"main":"#26c6dd","light":"rgb(81,209,227)","dark":"rgb(26,138,154)","contrastText":"rgba(0,0,0,0.87)"},"error":{"light":"#e57373","main":"#f44336","dark":"#d32f2f","contrastText":"#fff"},"warning":{"light":"#ffb74d","main":"#ff9800","dark":"#f57c00","contrastText":"rgba(0,0,0,0.87)"},"info":{"light":"#64b5f6","main":"#2196f3","dark":"#1976d2","contrastText":"#fff"},"success":{"light":"#81c784","main":"#4caf50","dark":"#388e3c","contrastText":"rgba(0,0,0,0.87)"},"grey":{"50":"#fafafa","100":"#f5f5f5","200":"#eeeeee","300":"#e0e0e0","400":"#bdbdbd","500":"#9e9e9e","600":"#757575","700":"#616161","800":"#424242","900":"#212121","A100":"#d5d5d5","A200":"#aaaaaa","A400":"#303030","A700":"#616161"},"contrastThreshold":3,"tonalOffset":0.2,"text":{"primary":"#fff","secondary":"rgba(255,255,255,0.7)","disabled":"rgba(255,255,255,0.5)","hint":"rgba(255,255,255,0.5)","icon":"rgba(255,255,255,0.5)"},"divider":"rgba(255,255,255,0.12)","background":{"paper":"#424242","default":"#121212","level2":"#333","level1":"#212121"},"action":{"active":"#fff","hover":"rgba(255,255,255,0.08)","hoverOpacity":0.08,"selected":"rgba(255,255,255,0.16)","selectedOpacity":0.16,"disabled":"rgba(255,255,255,0.3)","disabledBackground":"rgba(255,255,255,0.12)","disabledOpacity":0.38,"focus":"rgba(255,255,255,0.12)","focusOpacity":0.12,"activatedOpacity":0.24}}`),
});

const _dbIsLoaded = new Promise(async (resolve) => {
  await alasql.promise(`CREATE INDEXEDDB DATABASE IF NOT EXISTS dict_data;
  ATTACH INDEXEDDB DATABASE dict_data;
  USE dict_data;`);

  resolve(0);
});

const _allRows = new Promise(async (resolve) => {
  await _dbIsLoaded;

  const all = await alasql.promise('SELECT * FROM cedict')

  resolve(all);
});

const getAllRows = async () => {
  const data = await _allRows;

  return data;
};

window.alasql = alasql;

const reseedDb = async () => {
  if (localStorage.dbSeeded) {
    return;
  }

  await _dbIsLoaded;

  // casting is necessary to avoid type coercion to number on certain records
  const data = await alasql.promise(`SELECT
    CAST(trad as STRING) as trad,
    CAST(simp as STRING) as simp,
    CAST(pinyin as STRING) as pinyin,
    CAST(def as STRING) as def
    FROM TSV("cc-cedict.tsv", {headers:true});`);

  await alasql.promise(`DROP INDEXEDDB DATABASE IF EXISTS dict_data;`);

  await alasql.promise('DROP TABLE IF EXISTS cedict;');

  await alasql.promise(`CREATE TABLE cedict
    (trad string,
    simp string,
    pinyin string,
    def string,
    PRIMARY KEY (trad, simp, pinyin));`);

  await alasql.promise('SELECT * INTO cedict FROM ?', [data]);

  console.info('db seeded');
  localStorage.dbSeeded = true;
};

reseedDb();

window.getAllRows = getAllRows;

const App = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleQueryParams();
  }, []);

  const submitForm = async e => {
    e.preventDefault();

    setResults([]);
    setLoading(true);

    const query = new FormData(e.currentTarget).get('search-conditions');

    const data = await getAllRows();

    const { results, error } = await search(query, data);

    if (error) {
      Swal.fire({ text: error.message, icon: 'error' });

      setLoading(false);
      setResults([]);
    } else {
      setLoading(false);
      setResults(results);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <header style={{
        color: 'antiquewhite',
        textAlign: 'center',
        padding: '2em'
      }}>
        <Typography variant="h1" component="h1">字字不忘</Typography>
      </header>
      <main>
        <Container maxWidth="sm">
          <form style={{marginTop: '1em'}} onSubmit={submitForm}>
            <FormControl style={{margin: '1em 0'}} fullWidth>
              <TextField id="search-conditions" InputProps={{style: {fontFamily: 'Consolas, monospace'}}} label="Search query" variant="filled" multiline autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" name="search-conditions" placeholder="Syntax: prop method arg"></TextField>
            </FormControl>
            <FormControl style={{margin: '1em 0'}}>
              <Button type="submit" variant="contained" color="primary">
                Search
              </Button>
            </FormControl>
          </form>
          <pre style={{whiteSpace: 'pre-wrap'}}><output className="output">{
            loading
              ? <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <CircularProgress style={{zoom: 1.2}} color="secondary" />
                </div>
              : results.slice(0, 100).map(({trad, simp, pinyin, def}) => {
                return <React.Fragment key={`${trad} ${simp} [${pinyin}]`}>
                  {`${trad} ${simp} [${pinyin}] /${def}/\n\n`}
                </React.Fragment>;
              })
          }</output></pre>
        </Container>
      </main>
      <footer>
        <Container maxWidth="sm" style={{marginTop: '2em'}}>
          <hr style={{opacity: 0.3}} />
          <Typography variant="body1" component="p">
            Data from <Link target="_blank" rel="noopener noreferrer" href="https://cc-cedict.org/wiki/">CC-CEDICT</Link> (<Link target="_blank" rel="noopener noreferrer" href="https://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</Link>).
          </Typography>
        </Container>
      </footer>
    </ThemeProvider>
  );
}

export default App;
