import * as React from "react";
import {observer} from "mobx-react";
import classnames from "classnames";
import {store, volStore} from "../../store";
import {ViewTypes, VolTypes} from "../../types";
import {Icon, IconTypes} from "../icon";
import {events, EventTypes} from "../../utils";
import LOGO from "../../static/logo.png";
import "./index.scss";

function hideClassName(willHide: boolean) {
  return classnames({ "nav-item-hide": willHide });
}

function goVolTypes() {
  events.emit(EventTypes.ScrollBackVolTypes);
  store.changeView(ViewTypes.VOLS_TYPE);
}

function goVols() {
  events.emit(EventTypes.ScrollBackVols);
  store.changeView(ViewTypes.VOLS);
}

function goSingles() {
  events.emit(EventTypes.ScrollBackSingles);
  store.changeView(ViewTypes.SINGLES);
}

function goArticles() {
  events.emit(EventTypes.ScrollBackArticles);
  store.changeView(ViewTypes.ARTICLES);
}

function INav() {
  return (
    <div
      id="nav"
      style={{
        opacity: store.view === ViewTypes.VOLS_TYPE ? 0 : 1
      }}
    >
      <div id="nav-actions">
        <div
          className={hideClassName(
            [ViewTypes.VOLS, ViewTypes.SINGLES, ViewTypes.ARTICLES].includes(
              store.view
            ) || store.showPlayer
          )}
          onClick={store.backView}
        >
          <Icon type={IconTypes.BACK} />
          <p>返回</p>
        </div>

        <div
            className={hideClassName(!store.showPlayer)}
            onClick={store.toggleShowPlayer}
        >
          <Icon type={IconTypes.BACK} />
          <p>返回</p>
        </div>

        <div className={hideClassName(!store.showPlayer)}>
          <Icon type={IconTypes.SOURCE} />
          <p>来源</p>
        </div>

        <div
          className={hideClassName(store.view !== ViewTypes.VOLS || store.showPlayer)}
          onClick={goVolTypes}
        >
          <Icon type={IconTypes.CATEGORY} />
          <p>
            {volStore.volType === VolTypes.ALL
              ? "分类"
              : volStore.volTypeItem.name}
          </p>
        </div>

        <div>
          <Icon type={IconTypes.SEARCH} />
          <p>搜索</p>
        </div>
      </div>

      <img id="nav-logo" src={LOGO} alt="logo" />

      <div id="nav-buttons">
        <div onClick={goVols}>
          <Icon type={IconTypes.VOL} />
          <p>期刊</p>
        </div>

        <div onClick={goSingles}>
          <Icon type={IconTypes.SINGLE} />
          <p>单曲</p>
        </div>

        <div onClick={goArticles}>
          <Icon type={IconTypes.ARTICLE} />
          <p>专栏</p>
        </div>

        <div>
          <Icon type={IconTypes.USER} />
          <p>我的</p>
        </div>
      </div>
    </div>
  );
}

const Nav = observer(INav);

export { Nav };
