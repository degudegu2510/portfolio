import { useState, useEffect } from 'react';

export interface UserInfo {
  id: string;
  name: string;
  items_count: number;
  followers_count: number;
  following_count: number;
  description: string;
  facebook_id: string | null;
  github_login_name: string | null;
  linkedin_id: string | null;
  location: string | null;
  organization: string | null;
  permanent_id: number;
  profile_image_url: string;
  team_only: boolean;
  twitter_screen_name: string | null;
  website_url: string | null;
}

export interface UseUserTotalPagesResult {
  totalPages: number;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useUserTotalPages = (perPage: number = 20): UseUserTotalPagesResult => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserInfo = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('https://qiita.com/api/v2/users/degudegu2510');

      if (!response.ok) {
        throw new Error('Qiita APIからユーザー情報の取得に失敗しました');
      }

      const userData = await response.json();
      setUserInfo(userData);
    } catch (err) {
      setError(err instanceof Error ? err.message : '予期しないエラーが発生しました');
      setUserInfo(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  // items_countからtotalPagesを計算
  const totalPages = userInfo ? Math.ceil(userInfo.items_count / perPage) : 0;

  return {
    totalPages,
    loading,
    error,
    refetch: fetchUserInfo,
  };
};
