export const formatMoney = number => {
    if (!+number) return 0
    return Number(+number.toFixed(1)).toLocaleString()
}
export const renderRangeNumber = (start, end) => {
    const length = end - start + 1
    return Array.from({ length }, (_, idx) => start + idx)
}
export const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });