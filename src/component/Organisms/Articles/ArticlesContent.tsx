import { PostArticleList } from "../../Molecules/PostArticles/PostArticleList"

export const ArticlesContent = () => {

  return (
    <section className="py-16">
      <h2 className="heading-1">投稿記事</h2>
      <PostArticleList items={20}/>
    </section>
  )
}