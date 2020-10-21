import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

interface IProduct {
  id: string;
  title: string;
}

interface ICategories {
  id: string;
  title: string;
}

interface CategoriesProps {
  products: IProduct[]
}

export default function Category({ products }:CategoriesProps) {
  const router = useRouter();

  if(router.isFallback) {
    return <p>Carregando...</p>
  }

  return (
    <div>
      <h1>{router.query.slug}</h1>

      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

//dynamic static site generation
export const getStaticPaths: GetStaticPaths = async() => {
  const response = await fetch(`http://localhost:3333/categories`);
  const categories = await response.json();

  const paths = categories.map((category:ICategories) => {
    return {
      params: {
        slug: category.id,
      }
    };
  });

  return {
    paths,
    fallback: true,
  };
}

//static site generation
export const getStaticProps: GetStaticProps<CategoriesProps> = async(context) => {
  const { slug } = context.params;

  const response = await fetch(`http://localhost:3333/products?category_id=${slug}`);
  const products = await response.json();
  return {
    props: {
      products,
    },
    revalidate: 60,
  }
}