import { Profile } from "../../Organisms/Home/Profile"
import { useHead } from "../../../hooks/useHead"
import { ProfilePagePath } from "../../../utils/Routes"

export const ProfilePage = () => {
  useHead({
    title: 'プロフィール - degudegu2510のポートフォリオ',
    description: 'degudegu2510のプロフィールページです。スキルや経歴をご覧いただけます。',
    url: ProfilePagePath(),
  });

  return (
    <main className="max-w-6xl px-4 w-full m-auto">
      <Profile />
    </main>
  )
}
