import React from "react";
import PlaylistPanel from "../PlaylistPanel/PlaylistPanel";
import PlaylistBanner from "../PlaylistBanner/PlaylistBanner";

type LayoutProps = {
  componentData?: any;
};

export const Layout = ({ componentData }: LayoutProps) => {
  return (
    <div className="layout">
      <div className="layout__aside-panel">
        <PlaylistPanel />
      </div>
      <div className="layout__main-panel">
        <PlaylistBanner />
      </div>
    </div>
  );
};

export default Layout;
