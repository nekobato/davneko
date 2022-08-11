import styled from '@emotion/styled';

const Template = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  min-width: 320px;
  min-height: 320px;
  height: 100%;
  overflow: hidden;
  width: 360px;
`;

type Props = {
  className: string;
};

export const CompoSection: React.FC<Props> = ({ className, children }) => <Template className={className}>{children}</Template>;
