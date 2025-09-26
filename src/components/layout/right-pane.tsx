interface Props {
  children: React.ReactNode;
}

export const RightPane = ({ children }: Props) => {
  return (
    <div className="hidden desktop:flex desktop:h-full desktop:flex-1">
      {children}
    </div>
  );
};
