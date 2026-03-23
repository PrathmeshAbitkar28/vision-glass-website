import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop
 * - On every route change → instantly scroll to top
 * - On hard refresh → browser history may restore scroll position;
 *   the `history` scrollRestoration API overrides that to "manual" so
 *   we always land at the top.
 */
const ScrollToTop = () => {
    const { pathname } = useLocation();

    // Disable the browser's automatic scroll-position restore on refresh
    useEffect(() => {
        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }
    }, []);

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, [pathname]);

    return null;
};

export default ScrollToTop;