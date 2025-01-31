export interface CourseFilters {
    search?: string;         // The search term for filtering courses
    sortBy?: string;         // The field used for sorting, e.g., "relevance"
    categories?: string;     // A comma-separated list of category IDs
    page: number;           // The current page number for pagination
    limit: number;          // The number of items per page
}
