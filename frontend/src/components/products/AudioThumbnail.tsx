import styled from '@emotion/styled';

const Template = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

type Props = {
  thumbnailUrl?: string;
};

export const AudioThumbnail: React.FC<Props> = ({ thumbnailUrl }) => {
  return (
    <Template>
      <img src={thumbnailUrl} alt="thumbnail" />
    </Template>
  );
};
