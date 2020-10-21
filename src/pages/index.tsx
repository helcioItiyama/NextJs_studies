import { GetServerSideProps } from 'next';
import { Title } from '@/styles/pages/Home';
import SEO from '@/components/SEO';

interface IProduct {
  id: string;
  title: string;
}

interface HomeProps {
  recommendedProducts: IProduct[];
}

export default function Home({ recommendedProducts }:HomeProps) {
  async function handleSum() {
    const { sum } = (await import('../lib/maths')).default;
    alert(sum(2, 5));
  }

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
              {recommendedProduct.title}
            </li>
          ))}
        </ul>
      </section>

      <button onClick={handleSum}>Sum</button>
    </div>
  )
}

//server side rendering
export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recommended`);
  const recommendedProducts = await response.json();
  return {
    props: { 
      recommendedProducts
    }
  }
}
