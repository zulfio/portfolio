/**
 * Custom hook for pagination.
 *
 * @param {Object} props - The pagination properties.
 * @param {number} [props.boundaryCount=1] - The number of page buttons to show at the beginning and end of the pagination.
 * @param {number} [props.count=1] - The total number of pages.
 * @param {number} [props.currentPage=1] - The current active page.
 * @param {number} [props.defaultPage=1] - The default page to show.
 * @param {boolean} [props.disabled=false] - Whether the pagination is disabled.
 * @param {boolean} [props.hideNextButton=false] - Whether to hide the next button.
 * @param {boolean} [props.hidePrevButton=false] - Whether to hide the previous button.
 * @param {function} [props.onChange] - The callback function to handle page change.
 * @param {number} [props.page] - The controlled page value.
 * @param {boolean} [props.showFirstButton=false] - Whether to show the first button.
 * @param {boolean} [props.showLastButton=false] - Whether to show the last button.
 * @param {number} [props.siblingCount=1] - The number of page buttons to show before and after the current page.
 * @returns {Array} - The list of pagination items.
 */
export const usePagination = (props = {}) => {
    // keep default values in sync with @default tags in Pagination.propTypes
    const {
        boundaryCount = 1,
        count = 1,
        currentPage: page = 1,
        disabled = false,
        hideNextButton = false,
        hidePrevButton = false,
        onChange: handleChange,
        showFirstButton = false,
        showLastButton = false,
        siblingCount = 1,
    } = props;

    const handleClick = (event, value) => {
        if (handleChange) {
            handleChange(event, value);
        }
    };

    // https://dev.to/namirsab/comment/2050
    const range = (start, end) => {
        const length = end - start + 1;
        return Array.from({ length }, (_, i) => start + i);
    };

    const startPages = range(1, Math.min(boundaryCount, count));
    const endPages = range(Math.max(count - boundaryCount + 1, boundaryCount + 1), count);

    const siblingsStart = Math.max(
        Math.min(
            // Natural start
            page - siblingCount,
            // Lower boundary when page is high
            count - boundaryCount - siblingCount * 2 - 1,
        ),
        // Greater than startPages
        boundaryCount + 2,
    );

    const siblingsEnd = Math.min(
        Math.max(
            // Natural end
            page + siblingCount,
            // Upper boundary when page is low
            boundaryCount + siblingCount * 2 + 2,
        ),
        // Less than endPages
        endPages.length > 0 ? endPages[0] - 2 : count - 1,
    );

    // Basic list of items to render
    // e.g. itemList = ['first', 'previous', 1, 'ellipsis', 4, 5, 6, 'ellipsis', 10, 'next', 'last']
    const itemList = [
        ...(showFirstButton ? ["first"] : []),
        ...(hidePrevButton ? [] : ["previous"]),
        ...startPages,

        // Start ellipsis
        // eslint-disable-next-line no-nested-ternary
        ...(siblingsStart > boundaryCount + 2
            ? ["start-ellipsis"]
            : boundaryCount + 1 < count - boundaryCount
              ? [boundaryCount + 1]
              : []),

        // Sibling pages
        ...range(siblingsStart, siblingsEnd),

        // End ellipsis
        // eslint-disable-next-line no-nested-ternary
        ...(siblingsEnd < count - boundaryCount - 1
            ? ["end-ellipsis"]
            : count - boundaryCount > boundaryCount
              ? [count - boundaryCount]
              : []),

        ...endPages,
        ...(hideNextButton ? [] : ["next"]),
        ...(showLastButton ? ["last"] : []),
    ];

    const buttonPage = (type) => {
        switch (type) {
            case "first":
                return 1;
            case "previous":
                return page - 1;
            case "next":
                return page + 1;
            case "last":
                return count;
            default:
                return null;
        }
    };

    const items = itemList.map((item) =>
        typeof item === "number"
            ? {
                  onClick: (event) => {
                      handleClick(event, item);
                  },
                  type: "page",
                  page: item,
                  selected: item === page,
                  disabled: disabled,
              }
            : {
                  onClick: (event) => {
                      handleClick(event, buttonPage(item));
                  },
                  type: item,
                  page: buttonPage(item),
                  selected: false,
                  disabled:
                      disabled ||
                      (item.indexOf("ellipsis") === -1 &&
                          (item === "next" || item === "last" ? page >= count : page <= 1)),
              },
    );

    return items;
};
