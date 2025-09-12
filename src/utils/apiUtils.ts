type ApiResponse = {
    result: {
        data: {
            json: Record<string, any>
        };
    };
}[];

export function parseData(response: ApiResponse) {
    if (!Array.isArray(response) || response.length === 0) {
        return null;
    }
    return response[0]?.result?.data?.json ?? null;
}