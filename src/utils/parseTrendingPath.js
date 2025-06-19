export const parseTrendingPath = (sourcePath) => {
    if (!sourcePath?.startsWith("/trending")) return null

    const parts = sourcePath.split("/").filter(Boolean)
    const mediaType = parts[1]

    if (!mediaType) return null

    return mediaType
}