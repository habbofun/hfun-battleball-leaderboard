import type { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  title: ReactNode;
};

export function NotFound({ children, title }: Props) {
  return (
    <div className="relative flex grow flex-col  py-36">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-1 h-[20500px] w-[20500px] translate-x-[-47.5%] rounded-full " />
      </div>
      <div className="container relative flex grow flex-col px-4">
        <h1 className="text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
          {title}
        </h1>
        <div className="mt-6 text-gray-400 md:text-lg">{children}</div>
      </div>
    </div>
  );
}
