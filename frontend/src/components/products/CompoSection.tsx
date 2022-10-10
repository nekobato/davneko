import styled from '@emotion/styled';

const Template = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  min-height: 320px;
  max-height: 480px;
  height: 100%;
  overflow: hidden;
  width: 320px;
`;

type Props = {
  className: string;
};

export const CompoSection: React.FC<Props> = ({ className, children }) => <Template className={className}>{children}</Template>;
