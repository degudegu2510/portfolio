import { MaterialSymbols } from "../MaterialSymbols/MaterialSymbols";
import React from "react";

type ArticleProps = {
  title: string;
  link: string;
  likes: number;
  tags: string[];
};

export const Article: React.FC<ArticleProps> = ({ title, link, likes, tags }) => {
  return (
    <article className="backdrop-blur-[2px] backdrop-filter bg-surface-alpha rounded-lg">
      <a href={link} className="px-4 py-2 w-full group grid gap-1" target="_blank">
        <h3 className="font-bold subhead-2 text-high-emphasis group-hover:underline underline-offset-4">{title}</h3>
        <div className="flex gap-4 items-center">
          <div className="flex gap-1 items-center">
            <MaterialSymbols size={20} fill={false}>favorite</MaterialSymbols>
            <span>{likes}</span>
          </div>
          <ul className="flex gap-x-2 body-2 text-medium-emphasis flex-wrap">
            {tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
      </a>
    </article>
  );
};
