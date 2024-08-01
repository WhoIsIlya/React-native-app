export interface DataProps {
    id: number;
    created_at: string;
    articles: string;
    text: string;
    source_url: string;
    image_url: string;
    source_name: string;
  }

export type ParamList = {
  ContentDetails: {
    item: DataProps;
  };
};