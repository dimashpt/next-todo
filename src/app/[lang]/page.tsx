import { NextPage } from 'next';
import { Todo } from '@/components/organisms';
import { GithubCard } from '@/components/organisms';

const RootPage: NextPage = () => {
  // TODO: Search todos ✅
  // TODO: Strikethrough completed todos ✅
  // TODO: Persist todos in local storage ✅
  // TODO: Refactor: split components
  // TODO: Fetch public API ✅
  // TODO: Unit testing
  // TODO: Make search mode more accessible in mobile ✅
  // TODO: Render github profile data using server side rendering to prevent key leak ✅
  return (
    <section className="flex flex-col h-full w-full">
      <div className="grid grid-cols-12 p-5 h-full relative">
        <div className="col-span-12 md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4 absolute flex flex-col top-0 bottom-0 w-full px-4">
          <h2 className="text-4xl text-center py-4">ToDo List</h2>
          <Todo />
          <div className="w-full flex justify-center py-4">
            <GithubCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RootPage;
