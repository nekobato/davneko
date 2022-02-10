import { AudioFile, File } from '@/types/api'
import styled from '@emotion/styled'

const Template = styled.div`
  display: flex;
  width: 100%;
  padding: 4px 8px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 14px;
  line-height: 20px;
  figure,
  picture,
  img {
    width: 40px;
    height: 40px;
  }
  picture {
    display: inline-flex;
    img {
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 4px;
    }
  }
  .text-container {
    margin-left: 16px;
    line-height: 20px;
    .artist,
    .title {
      display: block;
      line-height: 20px;
    }
    .artist {
    }
    .title {
      font-weight: bold;
    }
  }
`

type Props = {
  audio: AudioFile
  className?: string
  onClick?: (e: MouseEvent) => void
}

export const AudioItem: React.FC<Props> = ({ audio }) => (
  <Template>
    <figure>
      <picture>
        <img alt="サムネイル" src={audio.meta.imageUrl || ''} />
      </picture>
    </figure>
    <div className="text-container">
      <span className="artist">{audio.meta.artist}</span>
      <span className="title">{audio.meta.title}</span>
    </div>
  </Template>
)
