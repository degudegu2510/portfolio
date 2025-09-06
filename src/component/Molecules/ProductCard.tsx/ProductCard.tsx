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
      <Link to={ProductPagePath(slug)}>
        <img
          src={thumbnail}
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
