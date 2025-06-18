import React, { useMemo } from 'react'
import { renderRangeNumber } from '~/utils/fn'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
const usePagination = ({ total = 0, currentPage = 1, limit = 1, sibling = 0 }) => {
    const paginationArray = useMemo(() => {
        const pageSize = +limit
        const pageNumber = Math.ceil(total / pageSize)
        const totalPaginationItem = 5 + sibling * 2
        if (pageNumber <= totalPaginationItem) {
            return renderRangeNumber(1, pageNumber)
        }
        const isShowDotsInLeft = currentPage - sibling > 3
        const isShowDotsRight = currentPage + sibling < pageNumber - 2
        if (isShowDotsInLeft && !isShowDotsRight) {
            const rightStart = pageNumber - 2 - sibling * 2
            const rightAray = renderRangeNumber(rightStart, pageNumber)
            return [1, <BiDotsHorizontalRounded size={20} />, ...rightAray]
        }
        if (isShowDotsRight && !isShowDotsInLeft) {
            const leftArray = renderRangeNumber(1, 3 + sibling * 2)
            return [...leftArray, <BiDotsHorizontalRounded size={20} />, pageNumber]
        }
        const siblingLeft = Math.max(1, currentPage - sibling)
        const siblingRight = Math.min(pageNumber, currentPage + sibling)
        if (isShowDotsInLeft && isShowDotsRight) {
            const middleArray = renderRangeNumber(siblingLeft, siblingRight)
            return [1, <BiDotsHorizontalRounded size={20} />, ...middleArray, <BiDotsHorizontalRounded size={20} />, pageNumber]
        }
    }, [total, limit, currentPage, sibling])
    return paginationArray
}

export default usePagination