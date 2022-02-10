import styled from '@emotion/styled'

const Template = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  min-width: 320px;
  min-height: 480px;
  height: 560px;
  overflow: hidden;
  width: 360px;
`

type Props = {
  className: string
}

export const CompoSection: React.FC<Props> = ({ className, children }) => (
  <Template className={className}>{children}</Template>
)
