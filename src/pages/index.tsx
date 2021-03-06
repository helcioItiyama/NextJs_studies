import { GetServerSideProps } from 'next';
import Link  from 'next/link';
import { Title } from '@/styles/pages/Home';
import SEO from '@/components/SEO';
import { client } from '@/lib/prismic';
import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';
import { Document } from 'prismic-javascript/types/documents';

interface HomeProps {
  recommendedProducts: Document[];
}

export default function Home({ recommendedProducts }:HomeProps) {
  return (
    <div>
      <SEO 
        title="DevCommerce, your best e-commerce!" 
        image="boost.png"
        shouldExcludeTitleSuffix
      />
      
      <Title>Hello World</Title>

      <section>
        <Title>Products</Title>

        <ul>
          {recommendedProducts.map(recommendedProduct => (
            <li key={recommendedProduct.id}>
              <Link href={`/catalog/products/${recommendedProduct.uid}`}>
                <a>
                  {PrismicDOM.RichText.asText(recommendedProduct.data.title)}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

//server side rendering
export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const recommendedProducts = await client().query([
    Prismic.Predicates.at('document.type', 'product')
  ]);

  console.log(recommendedProducts.results[0].data.title)

  return {
    props: { 
      recommendedProducts: recommendedProducts.results,
    }
  }
}
