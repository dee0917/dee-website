import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    // 只有在進入新頁面 (PUSH/REPLACE) 時才滾動到頂部
    // 如果是用戶點擊「上一頁」(POP)，則保留瀏覽器預設的滾動恢復行為
    if (navType !== 'POP') {
      window.scrollTo(0, 0);
    }
  }, [pathname, navType]);

  return null;
};

export default ScrollToTop;
