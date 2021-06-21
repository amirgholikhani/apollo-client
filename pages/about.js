import {gql} from '@apollo/client';
import client from '../apollo-client';
import styles from '../styles/Home.module.css'

function about({ countries, countriesData }) {
    return <div className={styles.grid}>
    {countries.map((country) => (
      <div key={country.code} className={styles.card}>
        <h3>{country.name}</h3>
        <p>
          {country.code} - {country.emoji}
        </p>
      </div>
    ))}
  </div>
}

export default about;

export async function getStaticProps() {
    const {data} = await client.query({
        query: gql`
        query Countries {
            countries {
                code
                name
                emoji
            }
        }
        `
    });
    return {
        props : {
            countries: data.countries.slice(0, 4),
            countriesData: data.countries,
        },
    };
}