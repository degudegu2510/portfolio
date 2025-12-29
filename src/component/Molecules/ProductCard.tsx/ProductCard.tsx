import { Link } from "react-router"
import { ProductPagePath } from "../../../utils/Routes"

export interface ProductCardProps {
  title: string
  thumbnail: string
  slug: string
}

export const ProductCard = ({ title, thumbnail, slug }: ProductCardProps) => {
  return (
    <li>
      <Link to={ProductPagePath(slug)} className="hover:elevation-4 [&>img]:hover:scale-102">
        <img
          src={thumbnail}
          alt=""
          className="rounded-lg aspect-[16/9] object-cover border border-divider box-sizing-border w-full duration-300"
          width={352}
          height={198}
          loading="lazy"
        />
        <span className="flex mt-4">{title}</span>
      </Link>
    </li>
  )
}
