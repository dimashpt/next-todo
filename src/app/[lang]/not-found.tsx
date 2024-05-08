import { NextPage } from 'next';

const NotFoundPage: NextPage = () => {
  return (
    <section className="flex flex-col flex-grow h-full w-full items-center justify-center">
      <h1 className="text-xl">Oops, you&apos;re lost...</h1>
    </section>
  );
};

export default NotFoundPage;
