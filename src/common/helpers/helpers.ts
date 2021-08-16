


export const getSequentialNumber = (length = 0) => {
    return Array.from({length}, (_, i) => i + 1)
}