import styled from '@emotion/styled';

const Template = styled.div`
  width: 100%;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  > img {
    width: 100%;
    height: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
  }
`;

type Props = {
  thumbnailUrl?: string;
};

export const AudioThumbnail: React.FC<Props> = ({
  thumbnailUrl = 'https://ia800109.us.archive.org/5/items/mbid-ce7fd084-e7a7-4b15-b5d8-17663ba111d5/mbid-ce7fd084-e7a7-4b15-b5d8-17663ba111d5-19010646691_thumb500.jpg',
}) => {
  return (
    <Template>
      <img src={thumbnailUrl} alt="thumbnail" />
    </Template>
  );
};
