import { Icons } from '@/assets';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/atoms/avatar';
import { Card } from '@/components/atoms/card';
import { env } from '@/env';

export const GithubCard: React.FC = async () => {
  const data: GithubProfile = await fetch('https://api.github.com/user', {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${env.GITHUB_TOKEN}`,
    },
  }).then((res) => res.json());

  return (
    <Card className="w-full max-w-sm border border-gray-200 dark:border-gray-800 p-2 md:p-4 rounded-lg">
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage alt={data?.name} src={data?.avatar_url} />
          <AvatarFallback>{data?.name}</AvatarFallback>
        </Avatar>
        <div className="space-y-1 flex-auto">
          <h4 className="text-lg font-semibold">@{data?.login}</h4>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {data?.location}
          </p>
          <p className="block md:hidden text-gray-500 dark:text-gray-400 text-[10px]">
            {data?.followers} followers · {data?.following} following
          </p>
        </div>
        <Icons.GitHub width={50} height={50} className="opacity-10" />
      </div>
      <div className="hidden mt-6 md:grid grid-cols-3 gap-4 text-center">
        <div className="space-y-1">
          <p className="text-2xl font-medium">{data?.followers}</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Followers</p>
        </div>
        <div className="space-y-1">
          <p className="text-2xl font-medium">{data?.following}</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Following</p>
        </div>
        <div className="space-y-1">
          <p className="text-2xl font-medium">{data?.public_repos}</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Public Repos
          </p>
        </div>
      </div>
    </Card>
  );
};
