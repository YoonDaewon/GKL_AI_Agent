interface Props {
  children: React.ReactNode;
}

export const LeftPane = ({ children }: Props) => {
  return (
    <div
      id="left-pane"
      className="flex size-full flex-col gap-6 overflow-y-scroll p-4 desktop:h-full desktop:w-[2vw] desktop:min-w-[332px] desktop:max-w-[550px] desktop:grow"
    >
      {children}
    </div>
  );
};
