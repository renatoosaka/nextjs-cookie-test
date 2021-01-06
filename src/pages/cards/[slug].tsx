import { GetServerSideProps } from "next"

interface CardProps {
  name: string;
}

export default function Card({ name }: CardProps) {
  return (
    <>
      <h1>Card</h1>
      <p>{name}</p>
    </>
  )
}

export const getServerSideProps:GetServerSideProps<CardProps> = async ({ params }) => {
  const { slug } = params

  return {
    props: {
      name: String(slug)
    }
  }
}