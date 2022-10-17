import styled from '@emotion/styled';

const Template = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  min-height: 400px;
  max-height: 480px;
  overflow: hidden;
  width: 300px;
  display: flex;
  flex-direction: column;
`;

type Props = {
  className: string;
};

export const CompoSection: React.FC<Props> = ({ className, children }) => <Template className={className}>{children}</Template>;
