import * as React from "react";
import { ArticleInfo } from "../../types";
import { Icon, IconTypes } from "../icon";
import { articleStore, playerStore } from "../../store";
import { events, EventTypes } from "../../utils";
import "./index.scss";

export interface Props {
  articleInfo: ArticleInfo;
  index: number;
  isPlaying: boolean;
  isLiked: boolean;
}

class ArticleItem extends React.Component<Props> {
  private coverRef: HTMLImageElement | null = null;

  private getCoverRef = (i: HTMLImageElement | null) => {
    if (i) {
      this.coverRef = i;
    }
  };

  private onClick = () => {
    events.emit(
      EventTypes.ShowArticleBackground,
      this.props.articleInfo.cover,
      this.coverRef,
      () => articleStore.selectArticle(this.props.index)
    );
  };

  public render() {
    const { articleInfo, isPlaying, isLiked } = this.props;
    return (
      <div className="article-item" onClick={this.onClick}>
        <div
          ref={this.getCoverRef}
          className="article-item-cover"
          style={{
            backgroundImage: `url(${articleInfo.cover})`
          }}
        />
        <div className="article-item-info">
          <div className="article-item-info-container">
            <p className="article-item-info-title">{articleInfo.title}</p>
            <p className="article-item-info-meta">{articleInfo.metaInfo}</p>
          </div>
          <div className="article-item-operation">
            <Icon type={IconTypes.LIKE} />
            {isPlaying ? (
              <Icon
                type={IconTypes.PAUSE}
                onClick={playerStore.pause}
                preventDefault
              />
            ) : (
              <Icon
                type={IconTypes.PLAY}
                onClick={() => playerStore.playArticleTrack(articleInfo.id)}
                preventDefault
              />
            )}
          </div>
        </div>
        <div
          className="article-item-bg"
          style={{ backgroundColor: articleInfo.color }}
        />
      </div>
    );
  }
}

export { ArticleItem };