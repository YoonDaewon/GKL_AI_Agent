import axios from "axios";
import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";
import { SiX, SiTelegram } from "@icons-pack/react-simple-icons";

interface Props {
  selectedPost: string | null;
  type: "twitter" | "tg";
}

const getQuotes = async () => {
  const response = await axios.get<{ data: string[] }>(
    "https://meowfacts.herokuapp.com/",
  );
  return response.data.data[0];
};

export const GeneratedPost: React.FC<Props> = ({ selectedPost, type }) => {
  const {
    data: quotes,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: [`cat-quotes-${type}`],
    queryFn: getQuotes,
    enabled: false,
  });

  useEffect(() => {
    if (selectedPost) refetch();
  }, [selectedPost]);

  if (!selectedPost) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        No message selected
      </div>
    );
  }

  if (quotes) {
    return (
      <div className="flex flex-col gap-4 p-8">
        {type === "twitter" ? (
          <SiX className="size-8" />
        ) : (
          <SiTelegram className="size-8" />
        )}
        {isFetching ? (
          <p className="text-sm">Loading...</p>
        ) : (
          <p className="text-lg">{quotes}</p>
        )}
      </div>
    );
  }
};
