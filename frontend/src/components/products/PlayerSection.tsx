import styled from '@emotion/styled';

const Template = styled.div`
  min-width: 320px;
  min-height: 320px;
  overflow: hidden;
  width: 360px;
`;

type Props = {
  className: string;
};

export const PlayerSection: React.FC<Props> = ({ className, children }) => <Template className={className}>{children}</Template>;
