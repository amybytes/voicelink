import './SidebarFooter.css';
import GithubLogo from 'images/github_logo.svg?react';
import IconButton from 'components/common/IconButton/IconButton';
import {GITHUB_PROJECT_URL} from 'src/assets/constants/app';

const ICON_SIZE = '42px';

export default function SidebarFooter() {
  function navigateToUrl(url: string) {
    window.location.href = url;
  }

  return (
    <div className="sidebar-footer">
      <IconButton
        Icon={GithubLogo}
        IconProps={{
          width: ICON_SIZE,
          height: ICON_SIZE,
        }}
        onClick={() => navigateToUrl(GITHUB_PROJECT_URL)}
        animate
      />
    </div>
  );
}
