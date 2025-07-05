import { Link } from "react-router"

export interface ProductCardProps {
  title: string
  image: string
}

export const ProductCard = ({ title, image }: ProductCardProps) => {
  return (
    <li>
      <Link to="/">
        <img
          src={image}
          alt=""
          className="rounded-lg aspect-[16/9] object-cover border border-divider box-sizing-border w-full"
          width={352}
          height={198}
          loading="lazy"
        />
        <span className="flex mt-4">{title}</span>
      </Link>
    </li>
  )
}
