import * as React from "react";
import {observer} from "mobx-react";
import { userStore } from "../../store";
import "./index.scss";

@observer
class UserCollection extends React.Component {
  static renderFetching = () => {
    return <div id="user-fetching">加载中。。。</div>;
  };

  render() {
    const { isFetching } = userStore;
    if (isFetching) {
      return UserCollection.renderFetching();
    }
    return (
      <div id="user-collection">
        COLLECTION
      </div>
    );
  }
}

export { UserCollection };
